import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/apiClient";
import { AlertCircle, FileText, ImagePlus, Type, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const inputStyle = {
  background: "#fff",
  border: "1px solid #d0d0d0",
  color: "#292929",
  borderRadius: "4px",
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
      className="min-h-[calc(100vh-56px)] flex items-start justify-center px-4 py-12"
      style={{ background: "#fff" }}
    >
      <div className="w-full max-w-2xl">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 mb-4"
            style={{ background: "#1a1a1a", borderRadius: "2px" }}
          >
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Write a new post
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#757575" }}>
            Share your thoughts with the world. Markdown is supported.
          </p>
        </div>

        {/* Card */}
        <div
          className="p-8"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "4px",
          }}
        >
          {error && (
            <div
              className="flex items-start gap-3 px-4 py-3 mb-6 text-sm"
              style={{
                background: "#fdecea",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
                color: "#c62828",
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
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Title
              </label>
              <div className="relative">
                <Type
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#aaa" }}
                />
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Give your post a title"
                  className="w-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Content{" "}
                <span className="font-normal text-xs" style={{ color: "#aaa" }}>
                  — Markdown supported
                </span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                placeholder={`Write your post content here…\n\n# Heading\n**bold**, *italic*, \`code\`, [link](url)\n\n> blockquote`}
                className="w-full px-4 py-2.5 text-sm transition-all outline-none resize-y font-mono"
                style={{
                  ...inputStyle,
                  fontFamily: "'Courier New', Courier, monospace",
                  lineHeight: "1.6",
                  fontSize: "0.875rem",
                }}
              />
            </div>

            {/* Cover image */}
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Cover image{" "}
                <span className="font-normal" style={{ color: "#aaa" }}>
                  (optional)
                </span>
              </label>

              {preview ? (
                <div
                  className="relative overflow-hidden"
                  style={{
                    border: "1px solid #d0d0d0",
                    borderRadius: "4px",
                  }}
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
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid #d0d0d0",
                      color: "#292929",
                    }}
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div
                    className="px-3 py-2 text-xs truncate"
                    style={{
                      background: "#f9f9f9",
                      borderTop: "1px solid #e6e6e6",
                      color: "#757575",
                    }}
                  >
                    {image?.name}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-28 flex flex-col items-center justify-center gap-2 transition-all"
                  style={{
                    border: "2px dashed #d0d0d0",
                    borderRadius: "4px",
                    color: "#aaa",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#1a8917";
                    el.style.color = "#1a8917";
                    el.style.background = "#f0faf0";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#d0d0d0";
                    el.style.color = "#aaa";
                    el.style.background = "transparent";
                  }}
                >
                  <ImagePlus className="w-5 h-5" />
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
              className="w-full py-2.5 px-4 font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: "999px",
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
