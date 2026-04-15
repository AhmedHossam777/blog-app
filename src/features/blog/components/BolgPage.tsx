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
        <div className="h-4 w-20 shimmer rounded-full mb-8" />
        <div className="h-10 w-3/4 shimmer rounded-xl mb-4" />
        <div className="h-4 w-48 shimmer rounded-full mb-8 opacity-70" />
        <div className="w-full h-72 shimmer rounded-2xl mb-8" />
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-4 shimmer rounded-full ${i % 3 === 2 ? "w-2/3" : "w-full"}`}
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
        <p className="text-6xl font-extrabold text-gradient">404</p>
        <p className="text-base-content/45">Story not found.</p>
        <NavLink
          to="/"
          className="mt-2 px-5 py-2 rounded-full text-sm font-semibold transition-all"
          style={{
            background:
              "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
            color: "oklch(98% 0.005 278)",
            boxShadow: "0 4px 16px -4px oklch(66% 0.27 278 / 0.4)",
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
    <article className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <NavLink
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-all group"
          style={{ color: "oklch(60% 0.01 265)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "oklch(66% 0.27 278)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "oklch(60% 0.01 265)")
          }
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          All stories
        </NavLink>

        {checkOwnership && (
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "oklch(17% 0.025 265)",
                border: "1px solid oklch(100% 0 0 / 0.06)",
                color: "oklch(65% 0.01 265)",
              }}
              aria-label="Post options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-sm rounded-xl w-36 p-1 z-10"
              style={{
                background:
                  "linear-gradient(135deg, oklch(17% 0.025 265 / 0.97), oklch(14% 0.022 265 / 0.95))",
                backdropFilter: "blur(24px)",
                border: "1px solid oklch(100% 0 0 / 0.08)",
                boxShadow: "0 8px 32px -8px oklch(0% 0 0 / 0.5)",
              }}
            >
              <li>
                <NavLink
                  to={`/blogs/${id}/edit`}
                  className="flex items-center gap-2 text-sm rounded-lg text-base-content/70 hover:text-base-content hover:bg-white/6"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Update
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-sm rounded-lg text-error/70 hover:text-error hover:bg-error/10"
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
        className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5"
        style={{ color: "oklch(95% 0.006 265)" }}
      >
        {blog.title}
      </h1>

      <div
        className="flex items-center gap-3 mb-8 pb-8"
        style={{ borderBottom: "1px solid oklch(100% 0 0 / 0.06)" }}
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
          alt={blog.author.name}
          className="w-10 h-10 rounded-full"
          style={{
            boxShadow:
              "0 0 0 2px oklch(66% 0.27 278 / 0.25), 0 0 0 4px oklch(66% 0.27 278 / 0.07)",
          }}
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-base-content/90">
            {blog.author.name}
          </span>
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: "oklch(55% 0.01 265)" }}
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
        <div
          className="w-full mb-10 rounded-2xl overflow-hidden"
          style={{
            boxShadow:
              "0 8px 48px -8px oklch(0% 0 0 / 0.6), 0 0 0 1px oklch(100% 0 0 / 0.05)",
          }}
        >
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      )}

      <div
        className="max-w-none leading-[1.9] text-[1.0625rem] space-y-5"
        style={{ color: "oklch(82% 0.008 265)" }}
      >
        {blog.content
          .split("\n")
          .map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />,
          )}
      </div>

      {deleteError && (
        <div
          className="flex items-center gap-2 mt-6 rounded-xl px-4 py-3 text-sm"
          style={{
            background: "oklch(64% 0.27 22 / 0.08)",
            border: "1px solid oklch(64% 0.27 22 / 0.2)",
            color: "oklch(75% 0.2 22)",
          }}
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          {deleteError}
        </div>
      )}

      <div
        className="mt-10 pt-8 flex items-center justify-between"
        style={{ borderTop: "1px solid oklch(100% 0 0 / 0.06)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full"
            style={{
              boxShadow:
                "0 0 0 2px oklch(66% 0.27 278 / 0.25), 0 0 0 4px oklch(66% 0.27 278 / 0.07)",
            }}
          />
          <div className="flex flex-col leading-tight">
            <p
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{ color: "oklch(50% 0.01 265)" }}
            >
              Written by
            </p>
            <p className="font-semibold text-sm text-base-content/90">
              {blog.author.name}
            </p>
          </div>
        </div>
        <NavLink
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all"
          style={{
            background: "oklch(17% 0.025 265)",
            border: "1px solid oklch(100% 0 0 / 0.07)",
            color: "oklch(70% 0.01 265)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background =
              "linear-gradient(135deg, oklch(66% 0.27 278 / 0.15), oklch(74% 0.17 58 / 0.08))";
            el.style.borderColor = "oklch(66% 0.27 278 / 0.25)";
            el.style.color = "oklch(80% 0.08 278)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "oklch(17% 0.025 265)";
            el.style.borderColor = "oklch(100% 0 0 / 0.07)";
            el.style.color = "oklch(70% 0.01 265)";
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
