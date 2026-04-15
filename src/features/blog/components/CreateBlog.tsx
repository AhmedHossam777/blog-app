import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/apiClient";
import { AlertCircle, FileText, ImagePlus, Type, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const inputStyle = {
  background: "oklch(13% 0.022 265 / 0.8)",
  border: "1px solid oklch(100% 0 0 / 0.08)",
  color: "oklch(93% 0.008 265)",
};

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const clearImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("content", content.trim());
      if (image) formData.append("image", image);

      await apiClient("/blogs", {
        method: "POST",
        requiresAuth: true,
        body: formData,
      });

      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create blog. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-start justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(66% 0.27 278 / 0.12), transparent), oklch(11% 0.022 265)",
      }}
    >
      <div className="w-full max-w-2xl">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(66% 0.27 278 / 0.2), oklch(74% 0.17 58 / 0.12))",
              border: "1px solid oklch(66% 0.27 278 / 0.3)",
              boxShadow: "0 8px 24px -4px oklch(66% 0.27 278 / 0.25)",
            }}
          >
            <FileText
              className="w-7 h-7"
              style={{ color: "oklch(72% 0.2 278)" }}
            />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient">
            Write a new post
          </h1>
          <p className="text-base-content/45 mt-1 text-sm">
            Share your thoughts with the world
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(16% 0.024 265 / 0.9), oklch(13% 0.022 265 / 0.85))",
            backdropFilter: "blur(24px)",
            border: "1px solid oklch(100% 0 0 / 0.07)",
            boxShadow:
              "0 1px 0 0 oklch(100% 0 0 / 0.05) inset, 0 24px 64px -16px oklch(0% 0 0 / 0.5)",
          }}
        >
          {error && (
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{
                background: "oklch(64% 0.27 22 / 0.08)",
                border: "1px solid oklch(64% 0.27 22 / 0.2)",
                color: "oklch(75% 0.2 22)",
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1.5 text-base-content/80"
              >
                Title
              </label>
              <div className="relative">
                <Type
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "oklch(55% 0.01 265)" }}
                />
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Give your post a title"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1.5 text-base-content/80"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                placeholder="Write your post content here…"
                className="w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none resize-none"
                style={inputStyle}
              />
            </div>

            {/* Cover image */}
            <div>
              <label className="block text-sm font-medium mb-1.5 text-base-content/80">
                Cover image{" "}
                <span className="text-base-content/35 font-normal">
                  (optional)
                </span>
              </label>

              {preview ? (
                <div
                  className="relative rounded-xl overflow-hidden"
                  style={{ border: "1px solid oklch(100% 0 0 / 0.08)" }}
                >
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{
                      background: "oklch(13% 0.022 265 / 0.85)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid oklch(100% 0 0 / 0.1)",
                      color: "oklch(75% 0.01 265)",
                    }}
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div
                    className="px-3 py-2 text-xs truncate"
                    style={{
                      background: "oklch(13% 0.022 265 / 0.7)",
                      color: "oklch(60% 0.01 265)",
                    }}
                  >
                    {image?.name}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                  style={{
                    border: "2px dashed oklch(100% 0 0 / 0.1)",
                    color: "oklch(50% 0.01 265)",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "oklch(66% 0.27 278 / 0.35)";
                    el.style.color = "oklch(66% 0.27 278 / 0.7)";
                    el.style.background = "oklch(66% 0.27 278 / 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "oklch(100% 0 0 / 0.1)";
                    el.style.color = "oklch(50% 0.01 265)";
                    el.style.background = "transparent";
                  }}
                >
                  <ImagePlus className="w-6 h-6" />
                  <span className="text-sm">Click to upload a cover image</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background:
                  "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
                color: "oklch(98% 0.005 278)",
                boxShadow:
                  "0 4px 20px -4px oklch(66% 0.27 278 / 0.5), 0 1px 0 0 oklch(100% 0 0 / 0.15) inset",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-xs" />
                  Publishing…
                </span>
              ) : (
                "Publish post"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
