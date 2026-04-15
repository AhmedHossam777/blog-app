import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/apiClient";
import { BookOpen, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import BlogCard from "../blog/components/BlogCard";
import type { IBlog } from "../blog/interfaces";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    apiClient<{ data: IBlog[]; total_count: number }>(`/blogs/my`, {
      method: "GET",
      requiresAuth: true,
    })
      .then((response) => {
        setBlogs(response.data ?? []);
        setCount(response.total_count ?? 0);
      })
      .catch((err) => console.error("Failed to fetch user's blogs:", err))
      .finally(() => setLoading(false));
  }, [user?.id]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Profile header */}
      <div
        className="flex flex-col sm:flex-row items-center sm:items-end gap-5 mb-10 pb-8"
        style={{ borderBottom: "1px solid oklch(100% 0 0 / 0.06)" }}
      >
        <div className="relative shrink-0">
          <img
            alt="User avatar"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
            className="w-24 h-24 rounded-full"
            style={{
              boxShadow:
                "0 0 0 3px oklch(66% 0.27 278 / 0.3), 0 0 0 6px oklch(66% 0.27 278 / 0.08), 0 8px 32px -8px oklch(0% 0 0 / 0.5)",
            }}
          />
          {/* Online dot */}
          <div
            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full"
            style={{
              background: "oklch(65% 0.25 150)",
              border: "2px solid oklch(11% 0.022 265)",
              boxShadow: "0 0 8px oklch(65% 0.25 150 / 0.6)",
            }}
          />
        </div>

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-base-content/95">
            {user.name}
          </h1>
          <p className="text-base-content/40 text-sm mt-0.5">{user.email}</p>
          <div
            className="inline-flex items-center gap-1.5 mt-3 text-sm px-3 py-1 rounded-full"
            style={{
              background: "linear-gradient(135deg, oklch(66% 0.27 278 / 0.1), oklch(74% 0.17 58 / 0.06))",
              border: "1px solid oklch(66% 0.27 278 / 0.2)",
              color: "oklch(72% 0.15 278)",
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>
              <span className="font-semibold">{count}</span>{" "}
              {count === 1 ? "story" : "stories"} published
            </span>
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-base-content/90">Your stories</h2>
        <div className="flex-1 h-px" style={{ background: "oklch(100% 0 0 / 0.04)" }} />
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="flex flex-col gap-2">
          {[...Array(3)].map((_, i) => (
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

      {/* Empty state */}
      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, oklch(17% 0.025 265), oklch(21% 0.026 265))",
              border: "1px solid oklch(66% 0.27 278 / 0.12)",
            }}
          >
            <BookOpen className="w-8 h-8" style={{ color: "oklch(66% 0.27 278 / 0.5)" }} />
          </div>
          <p className="text-base-content/35 text-sm font-medium">
            You haven't published any stories yet.
          </p>
          <NavLink
            to="/create-blog"
            className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
              color: "oklch(98% 0.005 278)",
              boxShadow: "0 4px 16px -4px oklch(66% 0.27 278 / 0.4)",
            }}
          >
            Write your first story
          </NavLink>
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
    </div>
  );
}

export default Profile;
