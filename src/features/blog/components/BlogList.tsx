import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { IBlog } from "../interfaces";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, PenLine } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/blogs`;
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
      <div className="mb-8">
        {user ? (
          <h1
            className="text-3xl font-bold tracking-tight mb-1"
            style={{
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back,{" "}
            <span style={{ color: "#1a8917" }}>{user.name.split(" ")[0]}</span>
          </h1>
        ) : (
          <h1
            className="text-3xl font-bold tracking-tight mb-1"
            style={{
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Latest Stories
          </h1>
        )}
        <p className="text-sm" style={{ color: "#757575" }}>
          Thoughts, ideas, and insights — freshly published.
        </p>
        <div className="mt-5 divider-medium" />
      </div>

      {loading && (
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-5 py-8 border-b border-[#e6e6e6]">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 rounded-full shimmer" />
                  <div className="h-2.5 w-24 rounded-full shimmer" />
                </div>
                <div className="h-5 w-3/4 rounded shimmer" />
                <div className="h-3 w-full rounded shimmer opacity-70" />
                <div className="h-3 w-5/6 rounded shimmer opacity-50" />
              </div>
              <div className="w-28 h-20 rounded shimmer shrink-0" />
            </div>
          ))}
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <div
            className="w-14 h-14 flex items-center justify-center"
            style={{
              background: "#f2f2f2",
              borderRadius: "4px",
              border: "1px solid #e6e6e6",
            }}
          >
            <BookOpen className="w-7 h-7" style={{ color: "#757575" }} />
          </div>
          <p className="text-sm" style={{ color: "#757575" }}>
            No stories yet. Check back soon.
          </p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="flex flex-col">
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
        <div className="flex justify-center mt-8 gap-1">
          <button
            className="cursor-pointer px-3 py-1.5 text-sm font-medium transition-all disabled:opacity-30"
            style={{
              background: "#fff",
              border: "1px solid #e6e6e6",
              borderRadius: "2px",
              color: "#292929",
            }}
            disabled={currentPage === 1}
            onClick={() => handleSelectCurrentPage(currentPage - 1)}
          >
            «
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              className="cursor-pointer px-3 py-1.5 text-sm font-medium transition-all"
              style={
                currentPage === i + 1
                  ? {
                      background: "#1a8917",
                      border: "1px solid #1a8917",
                      borderRadius: "2px",
                      color: "#fff",
                    }
                  : {
                      background: "#fff",
                      border: "1px solid #e6e6e6",
                      borderRadius: "2px",
                      color: "#292929",
                    }
              }
              onClick={() => handleSelectCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="cursor-pointer px-3 py-1.5 text-sm font-medium transition-all disabled:opacity-30"
            style={{
              background: "#fff",
              border: "1px solid #e6e6e6",
              borderRadius: "2px",
              color: "#292929",
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
          className="cursor-pointer fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-2.5 font-semibold text-sm active:scale-95 transition-all"
          style={{
            background: "#1a1a1a",
            color: "#fff",
            borderRadius: "999px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          }}
        >
          <PenLine className="size-4" />
          Write
        </button>
      )}
    </main>
  );
}

export default BlogList;
