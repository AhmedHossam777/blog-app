import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { IBlog } from "../interfaces";
import { NavLink } from "react-router";

const API_URL = "http://localhost:8080/api/v1/blogs";
const ITEMS_PER_PAGE = 10;

function BlogList() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data.data ?? data);
        setTotalCount(data.total_count ?? 0);
      })
      .catch((err) => console.error("Failed to fetch blogs:", err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const pageCount = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function handleSelectCurrentPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-2 ">
          Latest Stories
        </h1>
        <p className="text-base-content/50 text-base">
          Thoughts, ideas, and insights — freshly published.
        </p>
        <div className="mt-4 h-px bg-linear-to-r from-primary/40 via-secondary/30 to-transparent" />
      </div>

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-5 p-5 rounded-2xl animate-pulse">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full bg-base-300" />
                  <div className="h-3 w-24 rounded-full bg-base-300" />
                </div>
                <div className="h-5 w-3/4 rounded-full bg-base-300" />
                <div className="h-3 w-full rounded-full bg-base-200" />
                <div className="h-3 w-5/6 rounded-full bg-base-200" />
              </div>
              <div className="w-28 h-28 rounded-xl bg-base-300 shrink-0" />
            </div>
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-base-content/30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </div>
          <p className="text-base-content/40 text-sm font-medium">
            No stories yet. Check back soon.
          </p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="flex flex-col divide-y divide-base-200">
          {blogs.map((blog) => (
            <NavLink
              to={`/blogs/${blog.id}`}
              key={blog.id}
              className="outline-none"
            >
              <BlogCard
                title={blog.title}
                content={blog.content}
                imageUrl={blog.image_url}
                author={blog.author.name}
                date={new Date(blog.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              />
            </NavLink>
          ))}
        </div>
      )}

      {pageCount > 1 && (
        <div className="join flex justify-center mt-4">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 1}
            onClick={() => handleSelectCurrentPage(currentPage - 1)}
          >
            «
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${currentPage === i + 1 ? "btn-active" : ""}`}
              onClick={() => handleSelectCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === pageCount}
            onClick={() => handleSelectCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      )}
    </main>
  );
}

export default BlogList;
