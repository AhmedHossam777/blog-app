interface BlogCardProps {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string;
  comments?: string[];
  likes?: number;
}

function BlogCard({
  title,
  description,
  imageUrl,
  author,
  date,
  comments,
  likes = 0,
}: BlogCardProps) {
  return (
    <div className="border border-gray-200 p-4 hover:bg-gray-50 transition cursor-pointer max-w-3xl">
      <div className="flex gap-3">
        <img
          src={`https://ui-avatars.com/api/?name=${author}`}
          alt={author}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold hover:underline">{author}</span>
            <span className="text-gray-500 text-sm">·</span>
            <span className="text-gray-500 text-sm">{date}</span>
          </div>
          <h3 className="font-bold text-base mt-2">{title}</h3>
          <p className="text-gray-700 text-sm mt-2">{description}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="rounded-2xl w-full mt-3 border border-gray-200"
            />
          )}
          <div className="flex justify-between mt-2 mx-20">
            <button className="hover:text-blue-500 transition cursor-pointer flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              <span className="text-sm text-gray-500">{likes}</span>
            </button>
            <button className="hover:text-blue-500 transition cursor-pointer flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span className="text-sm text-gray-500">
                {comments?.length || 0}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
