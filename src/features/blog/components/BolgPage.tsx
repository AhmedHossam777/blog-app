import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/apiClient";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { IBlog } from "../interfaces";
import { NavLink, useNavigate, useParams } from "react-router";

const API_URL = "http://localhost:8080/api/v1/blogs";

function BolgPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteError, setDeleteError] = useState("");

  const checkOwnership = user && blog && user.id === blog.author.id;

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data.data ?? data))
      .catch((err) => console.error("Failed to fetch blog:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    setDeleteError("");
    apiClient(`/blogs/${id}`, {
      method: "DELETE",
      requiresAuth: true,
    })
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("Failed to delete blog:", err);
        setDeleteError("Failed to delete. Please try again.");
      });
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="h-4 w-20 bg-base-300 rounded-full mb-8" />
        <div className="h-10 w-3/4 bg-base-300 rounded-xl mb-4" />
        <div className="h-4 w-48 bg-base-200 rounded-full mb-8" />
        <div className="w-full h-72 bg-base-300 rounded-2xl mb-8" />
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-base-200 rounded-full ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <p className="text-5xl">404</p>
        <p className="text-base-content/50">Story not found.</p>
        <NavLink to="/" className="btn btn-primary btn-sm mt-2">
          Back to home
        </NavLink>
      </div>
    );
  }

  const readingTime = Math.max(
    1,
    Math.ceil(blog.content.split(" ").length / 200),
  );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <NavLink
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-primary transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All stories
        </NavLink>

        {checkOwnership && (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm bg-base-100 border border-base-200 shadow-lg rounded-xl w-36 p-1 z-10"
            >
              <li>
                <NavLink
                  to={`/blogs/${id}/edit`}
                  className="flex items-center gap-2 text-sm"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Update
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-sm text-error"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
        {blog.title}
      </h1>

      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-base-200">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
          alt={blog.author.name}
          className="w-10 h-10 rounded-full ring-2 ring-base-300"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{blog.author.name}</span>
          <div className="flex items-center gap-2 text-base-content/50 text-xs">
            <span>
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>

      {blog.image_url && (
        <div className="w-full mb-10 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      )}

      <div className="prose prose-base max-w-none text-base-content/80 leading-[1.9] text-[1.0625rem]">
        {blog.content
          .split("\n")
          .map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />,
          )}
      </div>

      {deleteError && (
        <div className="flex items-center gap-2 mt-6 bg-error/10 border border-error/20 text-error rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {deleteError}
        </div>
      )}

      <div className="mt-8 pt-8 border-t border-base-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full ring-2 ring-base-300"
          />
          <div className="flex flex-col leading-tight">
            <p className="text-xs text-base-content/40 uppercase tracking-wider mb-0.5">
              Written by
            </p>
            <p className="font-semibold text-sm">{blog.author.name}</p>
          </div>
        </div>
        <NavLink to="/" className="btn btn-ghost btn-sm gap-1.5">
          More stories
          <ChevronRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </article>
  );
}

export default BolgPage;
