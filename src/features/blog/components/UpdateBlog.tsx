import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import type { IBlog } from "../interfaces";

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
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Update Blog</h1>
      {loading ? (
        <p>Loading blog data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border rounded-md px-3 py-2 h-40"
            />
          </div>
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 bg-primary text-white rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateBlog;
