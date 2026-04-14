import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import type { IBlog } from "../interfaces";

//     "success": true,
//     "data": {
//         "id": "69dd26140b90d543374b5e5b",
//         "title": "this is title",
//         "content": "my name is Ahmed Hossam",
//         "image_url": "https://react-blog-s3.s3.eu-north-1.amazonaws.com/blogs/1776100881429488767.png",
//         "author_id": "69dd259d0b90d543374b5e53",
//         "created_at": "2026-04-13T17:21:24.160182134Z",
//         "updated_at": "2026-04-13T17:21:24.160182191Z"
//     }
// }

// //   "author": {
//         "id": "69dd259d0b90d543374b5e53",
//         "name": "dod",
//         "email": "d2@email.com",
//         "role": "user",
//         "createdAt": "2026-04-13T17:19:25.61Z"
//       },

const API_URL = "http://localhost:8080/api/v1/blogs";
function BlogList() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBlogs(data.data ?? data))
      .catch((err) => console.error("Failed to fetch blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-4">
        Latest Posts
      </h1>

      {loading && (
        <div className="flex justify-center py-16">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-400 py-16">No posts yet.</p>
      )}

      <div className="flex flex-col divide-y divide-gray-100">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
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
        ))}
      </div>
    </main>
  );
}

export default BlogList;
