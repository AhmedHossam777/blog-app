import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { IBlog } from "../interfaces";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, PenLine } from "lucide-react";

const API_URL = "http://localhost:8080/api/v1/blogs";
const ITEMS_PER_PAGE = 10;

function BlogList() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();

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
        {user ? (
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            <span className="text-gradient">Welcome back,</span>{" "}
            <span className="text-base-content/90">
              {user.name.split(" ")[0]}
            </span>
          </h1>
        ) : (
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-gradient">
            Latest Stories
          </h1>
        )}
        <p className="text-base-content/45 text-base">
          Thoughts, ideas, and insights — freshly published.
        </p>
        <div className="mt-5 divider-gradient" />
      </div>

      {loading && (
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-5 p-5 rounded-2xl">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 rounded-full shimmer" />
                  <div className="h-3 w-28 rounded-full shimmer" />
                </div>
                <div className="h-5 w-3/4 rounded-full shimmer" />
                <div className="h-3 w-full rounded-full shimmer opacity-70" />
                <div className="h-3 w-5/6 rounded-full shimmer opacity-50" />
              </div>
              <div className="w-28 h-28 rounded-xl shimmer shrink-0" />
            </div>
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(17% 0.025 265), oklch(21% 0.026 265))",
              border: "1px solid oklch(66% 0.27 278 / 0.12)",
            }}
          >
            <BookOpen
              className="w-8 h-8"
              style={{ color: "oklch(66% 0.27 278 / 0.5)" }}
            />
          </div>
          <p className="text-base-content/35 text-sm font-medium">
            No stories yet. Check back soon.
          </p>
        </div>
      )}

      {/* Blog list */}
      {!loading && blogs.length > 0 && (
        <div className="flex flex-col">
          {blogs.map((blog, idx) => (
            <NavLink
              to={`/blogs/${blog.id}`}
              key={blog.id}
              className="outline-none"
            >
              {idx > 0 && (
                <div
                  className="mx-5 h-px"
                  style={{ background: "oklch(100% 0 0 / 0.04)" }}
                />
              )}
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
        <div className="flex justify-center mt-8 gap-1">
          <button
            className="cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
            style={{
              background: "oklch(17% 0.025 265)",
              border: "1px solid oklch(100% 0 0 / 0.06)",
              color: "oklch(75% 0.01 265)",
            }}
            disabled={currentPage === 1}
            onClick={() => handleSelectCurrentPage(currentPage - 1)}
          >
            «
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className="cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={
                currentPage === i + 1
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(66% 0.27 278 / 0.25), oklch(74% 0.17 58 / 0.12))",
                      border: "1px solid oklch(66% 0.27 278 / 0.35)",
                      color: "oklch(88% 0.08 278)",
                      boxShadow: "0 2px 12px -2px oklch(66% 0.27 278 / 0.25)",
                    }
                  : {
                      background: "oklch(17% 0.025 265)",
                      border: "1px solid oklch(100% 0 0 / 0.06)",
                      color: "oklch(65% 0.01 265)",
                    }
              }
              onClick={() => handleSelectCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="cursor-pointer px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-30"
            style={{
              background: "oklch(17% 0.025 265)",
              border: "1px solid oklch(100% 0 0 / 0.06)",
              color: "oklch(75% 0.01 265)",
            }}
            disabled={currentPage === pageCount}
            onClick={() => handleSelectCurrentPage(currentPage + 1)}
          >
            »
          </button>
        </div>
      )}

      {user && (
        <button
          onClick={() => navigate("/create-blog")}
          aria-label="Create new blog"
          className="cursor-pointer fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm active:scale-95 transition-all btn-float"
          style={{
            background:
              "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
            color: "oklch(98% 0.005 278)",
            boxShadow:
              "0 8px 32px -4px oklch(66% 0.27 278 / 0.5), 0 0 0 1px oklch(66% 0.27 278 / 0.2)",
          }}
        >
          <PenLine className="size-5" />
          Write
        </button>
      )}
    </main>
  );
}

export default BlogList;
