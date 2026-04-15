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
    <article className="flex flex-col sm:flex-row gap-6 py-8 border-b border-[#e6e6e6] hover:bg-[#fafafa] transition-colors duration-150 px-1 -mx-1">
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        {/* Author row */}
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&size=64`}
            alt={author}
            className="w-5 h-5 rounded-full"
          />
          <span
            className="text-xs font-medium"
            style={{
              color: "#292929",
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            }}
          >
            {author}
          </span>
        </div>

        {/* Title + excerpt */}
        <div>
          <h2
            className="font-bold text-xl leading-snug line-clamp-2 mb-1"
            style={{
              fontFamily:
                "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h2>
          <p
            className="text-sm leading-relaxed line-clamp-2"
            style={{
              fontFamily:
                "charter, Georgia, Cambria, 'Times New Roman', Times, serif",
              color: "#757575",
            }}
          >
            {content}
          </p>
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 text-xs"
          style={{
            color: "#757575",
            fontFamily:
              "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          }}
        >
          <span>{date}</span>
          <span className="opacity-50">·</span>
          <span>{readingTime} min read</span>

          <div className="flex items-center gap-3 ml-auto">
            <button className="flex items-center gap-1 cursor-pointer hover:text-[#292929] transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              {likes}
            </button>
            <button className="flex items-center gap-1 cursor-pointer hover:text-[#292929] transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              {comments?.length ?? 0}
            </button>
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="sm:order-last shrink-0 w-full sm:w-40 h-24 overflow-hidden rounded-sm">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </article>
  );
}

export default BlogCard;
