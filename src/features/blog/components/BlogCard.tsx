interface BlogCardProps {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  comments?: string[];
  likes?: number;
}

function BlogCard({
  title,
  content,
  imageUrl,
  author,
  date,
  comments,
  likes = 0,
}: BlogCardProps) {
  return (
    <article className="py-5 hover:bg-gray-50 transition-colors cursor-pointer px-2 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`}
          alt={author}
          className="w-8 h-8 rounded-full shrink-0"
        />
        <span className="font-medium text-sm">{author}</span>
        <span className="text-gray-400 text-sm">·</span>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg leading-snug line-clamp-2 mb-1">
            {title}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {content}
          </p>
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-24 h-24 object-cover rounded-lg shrink-0 border border-gray-100"
          />
        )}
      </div>

      <div className="flex items-center gap-5 mt-4 text-gray-400">
        <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
          {likes}
        </button>

        <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          {comments?.length || 0}
        </button>
      </div>
    </article>
  );
}

export default BlogCard;
