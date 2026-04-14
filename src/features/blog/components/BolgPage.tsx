import { useEffect, useState } from "react";
import type { IBlog } from "../interfaces";
import { useParams, NavLink } from "react-router";

const API_URL = "http://localhost:8080/api/v1/blogs";

function BolgPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_URL}/${id}`)
      .then((response) => response.json())
      .then((data) => setBlog(data.data ?? data))
      .catch((err) => console.error("Failed to fetch blog:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
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
      {/* Back link */}
      <NavLink
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-base-content/50 hover:text-primary transition-colors mb-8 group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
        All stories
      </NavLink>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-5">
        {blog.title}
      </h1>

      {/* Meta row */}
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

      {/* Hero image */}
      {blog.image_url && (
        <div className="w-full mb-10 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-base max-w-none text-base-content/80 leading-[1.9] text-[1.0625rem]">
        {blog.content
          .split("\n")
          .map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />,
          )}
      </div>

      {/* Footer divider */}
      <div className="mt-14 pt-8 border-t border-base-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(blog.author.name)}&background=random&size=80`}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full ring-2 ring-base-300"
          />
          <div>
            <p className="text-xs text-base-content/40 uppercase tracking-wider mb-0.5">
              Written by
            </p>
            <p className="font-semibold text-sm">{blog.author.name}</p>
          </div>
        </div>
        <NavLink to="/" className="btn btn-ghost btn-sm gap-1.5">
          More stories
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3.5 h-3.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </NavLink>
      </div>
    </article>
  );
}

export default BolgPage;
