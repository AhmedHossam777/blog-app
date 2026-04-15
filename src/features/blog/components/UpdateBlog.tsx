import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { IBlog } from "../interfaces";
import { AlertCircle, Pencil, Type } from "lucide-react";

const inputStyle = {
  background: "#fff",
  border: "1px solid #d0d0d0",
  color: "#292929",
  borderRadius: "4px",
};

function UpdateBlog() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    apiClient<{ success: boolean; data: IBlog }>(`/blogs/${id}`, {
      method: "GET",
      requiresAuth: true,
    })
      .then(({ data: blog }) => {
        setTitle(blog.title);
        setContent(blog.content);
      })
      .catch((err) => {
        console.error("Failed to fetch blog:", err);
        setError("Failed to fetch blog data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    setUpdating(true);
    apiClient(`/blogs/${id}`, {
      method: "PUT",
      requiresAuth: true,
      body: { title, content },
    })
      .then(() => {
        navigate("/blogs/" + id);
      })
      .catch((err) => {
        console.error("Failed to update blog:", err);
        setError("Failed to update blog.");
      })
      .finally(() => {
        setUpdating(false);
      });
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
            <Pencil className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Update your post
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#757575" }}>
            Edit and republish your story. Markdown is supported.
          </p>
        </div>

        <div
          className="p-8"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "4px",
          }}
        >
          {loading ? (
            <div className="flex flex-col gap-4">
              <div className="h-4 w-16 shimmer rounded" />
              <div className="h-10 w-full shimmer rounded" />
              <div className="h-4 w-20 shimmer rounded mt-2" />
              <div className="h-40 w-full shimmer rounded" />
            </div>
          ) : (
            <>
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

              <form onSubmit={handleUpdate} className="space-y-5">
                <div>
                  <label
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "#292929" }}
                  >
                    Content{" "}
                    <span className="font-normal text-xs" style={{ color: "#aaa" }}>
                      — Markdown supported
                    </span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={14}
                    className="w-full px-4 py-2.5 text-sm transition-all outline-none resize-y"
                    style={{
                      ...inputStyle,
                      fontFamily: "'Courier New', Courier, monospace",
                      lineHeight: "1.6",
                      fontSize: "0.875rem",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full py-2.5 px-4 font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: "#1a1a1a",
                    color: "#fff",
                    borderRadius: "999px",
                  }}
                >
                  {updating ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="loading loading-spinner loading-xs" />
                      Saving…
                    </span>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;
