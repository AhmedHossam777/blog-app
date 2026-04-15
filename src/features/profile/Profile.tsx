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
        style={{ borderBottom: "1px solid #e6e6e6" }}
      >
        <div className="relative shrink-0">
          <img
            alt="User avatar"
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
            className="w-24 h-24 rounded-full"
            style={{ border: "3px solid #e6e6e6" }}
          />
          {/* Online dot */}
          <div
            className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
            style={{
              background: "#1a8917",
              border: "2px solid #fff",
            }}
          />
        </div>

        <div className="text-center sm:text-left flex-1">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            {user.name}
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "#757575" }}>
            {user.email}
          </p>
          <div
            className="inline-flex items-center gap-1.5 mt-3 text-sm px-3 py-1"
            style={{
              background: "#f2f2f2",
              border: "1px solid #e6e6e6",
              borderRadius: "999px",
              color: "#292929",
            }}
          >
            <FileText className="w-3.5 h-3.5" style={{ color: "#1a8917" }} />
            <span>
              <span className="font-semibold">{count}</span>{" "}
              {count === 1 ? "story" : "stories"} published
            </span>
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="text-lg font-semibold"
          style={{ color: "#1a1a1a", fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Your stories
        </h2>
        <div className="flex-1 h-px" style={{ background: "#e6e6e6" }} />
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="flex flex-col gap-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-5 py-8 border-b border-[#e6e6e6]">
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div className="w-5 h-5 rounded-full shimmer" />
                  <div className="h-2.5 w-24 rounded shimmer" />
                </div>
                <div className="h-5 w-3/4 rounded shimmer" />
                <div className="h-3 w-full rounded shimmer opacity-70" />
                <div className="h-3 w-5/6 rounded shimmer opacity-50" />
              </div>
              <div className="w-24 h-20 rounded shimmer shrink-0" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && blogs.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div
            className="w-14 h-14 flex items-center justify-center"
            style={{
              background: "#f2f2f2",
              border: "1px solid #e6e6e6",
              borderRadius: "4px",
            }}
          >
            <BookOpen className="w-7 h-7" style={{ color: "#757575" }} />
          </div>
          <p className="text-sm" style={{ color: "#757575" }}>
            You haven't published any stories yet.
          </p>
          <NavLink
            to="/create-blog"
            className="px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: "999px",
            }}
          >
            Write your first story
          </NavLink>
        </div>
      )}

      {/* Blog list */}
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
    </div>
  );
}

export default Profile;
