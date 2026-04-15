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
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 mb-8 pb-8 border-b border-base-200">
        <img
          alt="User avatar"
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=128`}
          className="w-24 h-24 rounded-full ring-4 ring-base-200 shrink-0"
        />
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-base-content/50 text-sm mt-0.5">{user.email}</p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-3 text-sm text-base-content/60">
            <FileText className="w-4 h-4" />
            <span>
              <span className="font-semibold text-base-content">{count}</span>{" "}
              {count === 1 ? "story" : "stories"} published
            </span>
          </div>
        </div>
      </div>

      {/* Blog list */}
      <h2 className="text-lg font-semibold mb-5">Your stories</h2>

      {loading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
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
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-base-content/30" />
          </div>
          <p className="text-base-content/40 text-sm font-medium">
            You haven't published any stories yet.
          </p>
          <NavLink to="/create-blog" className="btn btn-primary btn-sm">
            Write your first story
          </NavLink>
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
    </div>
  );
}

export default Profile;
