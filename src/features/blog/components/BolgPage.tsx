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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { IBlog } from "../interfaces";
import { NavLink, useNavigate, useParams } from "react-router";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

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
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="h-3 w-20 shimmer rounded-full mb-10" />
        <div className="h-9 w-3/4 shimmer rounded mb-4" />
        <div className="h-3 w-48 shimmer rounded-full mb-10 opacity-70" />
        <div className="w-full h-64 shimmer rounded mb-10" />
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 shimmer rounded ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
              style={{ opacity: 1 - i * 0.1 }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center gap-4 py-32 text-center">
        <p
          className="text-6xl font-extrabold"
          style={{
            color: "#1a1a1a",
            fontFamily:
              "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          404
        </p>
        <p style={{ color: "#757575" }}>Story not found.</p>
        <NavLink
          to="/"
          className="mt-2 px-5 py-2 text-sm font-semibold transition-all"
          style={{
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "999px",
          }}
        >
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
    <article className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <NavLink
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium transition-colors group"
          style={{ color: "#757575" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#757575")
          }
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All stories
        </NavLink>

        {checkOwnership && (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="cursor-pointer w-8 h-8 flex items-center justify-center transition-all"
              style={{
                background: "#f2f2f2",
                border: "1px solid #e6e6e6",
                borderRadius: "50%",
                color: "#757575",
              }}
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm w-36 p-1 z-10"
              style={{
                background: "#fff",
                border: "1px solid #e6e6e6",
                borderRadius: "4px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <li>
                <NavLink
                  to={`/update-blog/${id}`}
                  className="flex items-center gap-2 text-sm rounded text-[#292929] hover:bg-[#f2f2f2]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Update
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-sm rounded text-[#c62828] hover:bg-[#fdecea]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <h1
        className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6"
        style={{
          fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#1a1a1a",
          letterSpacing: "-0.02em",
        }}
      >
        {blog.title}
      </h1>
      <div
        className="flex items-center gap-3 mb-8 pb-8"
        style={{ borderBottom: "1px solid #e6e6e6" }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
          alt={blog.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-col leading-tight">
          <span
            className="text-sm font-semibold"
            style={{
              color: "#292929",
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {blog.author.name}
          </span>
          <div
            className="flex items-center gap-2 text-xs"
            style={{
              color: "#757575",
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            <span>
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="opacity-40">·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
      {blog.image_url && (
        <div className="w-full mb-10 overflow-hidden rounded-sm">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      )}
      <div className="prose-medium">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
      {deleteError && (
        <div
          className="flex items-center gap-2 mt-6 px-4 py-3 text-sm"
          style={{
            background: "#fdecea",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
            color: "#c62828",
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {deleteError}
        </div>
      )}
      <div
        className="mt-12 pt-8 flex items-center justify-between"
        style={{ borderTop: "1px solid #e6e6e6" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
            alt={blog.author.name}
            className="w-11 h-11 rounded-full"
          />
          <div className="flex flex-col leading-tight">
            <p
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{
                color: "#757575",
                fontFamily:
                  "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              Written by
            </p>
            <p
              className="font-semibold text-sm"
              style={{
                color: "#292929",
                fontFamily:
                  "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              }}
            >
              {blog.author.name}
            </p>
          </div>
        </div>
        <NavLink
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium px-4 py-2 transition-all"
          style={{
            background: "#fff",
            border: "1px solid #1a1a1a",
            borderRadius: "999px",
            color: "#1a1a1a",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#1a1a1a";
            el.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "#fff";
            el.style.color = "#1a1a1a";
          }}
        >
          More stories
          <ChevronRight className="w-3.5 h-3.5" />
        </NavLink>
      </div>
    </article>
  );
}

export default BolgPage;
