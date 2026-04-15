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
  const readingTime = Math.max(1, Math.ceil(content.split(" ").length / 200));

  return (
    <article className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl hover:bg-base-200/60 transition-all duration-300 cursor-pointer border border-transparent hover:border-base-300 hover:shadow-sm">
      {imageUrl && (
        <div className="sm:order-last shrink-0 w-full sm:w-36 h-44 sm:h-28 rounded-xl overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&size=64`}
            alt={author}
            className="w-7 h-7 rounded-full ring-1 ring-base-300"
          />
          <span className="text-sm font-medium">{author}</span>
          <span className="text-base-content/30 text-sm">·</span>
          <span className="text-base-content/50 text-xs">{date}</span>
          <span className="text-base-content/30 text-sm">·</span>
          <span className="text-base-content/50 text-xs">
            {readingTime} min read
          </span>
        </div>

        <div>
          <h2 className="font-bold text-base-content text-lg leading-snug line-clamp-2 mb-1.5 group-hover:text-primary transition-colors">
            {title}
          </h2>
          <p className="text-base-content/60 text-sm leading-relaxed line-clamp-2">
            {content}
          </p>
        </div>

        <div className="flex items-center gap-4 text-base-content/40">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-medium">
            <ThumbsUp className="w-4 h-4" />
            {likes}
          </button>

          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-medium">
            <MessageCircle className="w-4 h-4" />
            {comments?.length ?? 0}
          </button>

          <div className="ml-auto">
            <span className="badge badge-ghost badge-sm text-xs">Article</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
