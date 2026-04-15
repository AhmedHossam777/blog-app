import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/apiClient";
import { AlertCircle, FileText, ImagePlus, Type, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

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
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-base-200 via-base-100 to-base-200 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <FileText className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Write a new post
          </h1>
          <p className="text-base-content/60 mt-1 text-sm">
            Share your thoughts with the world
          </p>
        </div>

        <div className="bg-base-100 border border-base-200 shadow-xl rounded-2xl p-8">
          {error && (
            <div className="flex items-start gap-3 bg-error/10 border border-error/20 text-error rounded-xl px-4 py-3 mb-6 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1.5"
              >
                Title
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 pointer-events-none" />
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Give your post a title"
                  className="w-full pl-10 pr-4 py-2.5 border border-base-300 rounded-xl bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1.5"
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
                className="w-full px-4 py-2.5 border border-base-300 rounded-xl bg-base-200/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Cover image{" "}
                <span className="text-base-content/40 font-normal">
                  (optional)
                </span>
              </label>

              {preview ? (
                <div className="relative rounded-xl overflow-hidden border border-base-300">
                  <img
                    src={preview}
                    alt="Cover preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300 flex items-center justify-center hover:bg-error hover:text-error-content hover:border-error transition-all"
                    aria-label="Remove image"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="px-3 py-2 bg-base-200/60 text-xs text-base-content/60 truncate">
                    {image?.name}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-base-300 rounded-xl flex flex-col items-center justify-center gap-2 text-base-content/40 hover:border-primary/50 hover:text-primary/60 hover:bg-primary/5 transition-all"
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
              className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-content font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm"
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
