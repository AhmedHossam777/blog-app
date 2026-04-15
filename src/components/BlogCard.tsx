import { MessageCircle, ThumbsUp } from "lucide-react";

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
          <ThumbsUp className="w-5 h-5" />
          {likes}
        </button>

        <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors text-sm">
          <MessageCircle className="w-5 h-5" />
          {comments?.length || 0}
        </button>
      </div>
    </article>
  );
}

export default BlogCard;
