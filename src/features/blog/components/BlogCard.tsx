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
    <article
      className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300"
      style={{
        border: "1px solid transparent",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "linear-gradient(135deg, oklch(17% 0.025 265 / 0.7), oklch(14% 0.022 265 / 0.5))";
        el.style.border = "1px solid oklch(66% 0.27 278 / 0.18)";
        el.style.boxShadow = "0 0 0 1px oklch(66% 0.27 278 / 0.06), 0 8px 32px -8px oklch(66% 0.27 278 / 0.2), 0 20px 48px -12px oklch(0% 0 0 / 0.4)";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "transparent";
        el.style.border = "1px solid transparent";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      {imageUrl && (
        <div className="sm:order-last shrink-0 w-full sm:w-36 h-44 sm:h-28 rounded-xl overflow-hidden"
          style={{ boxShadow: "0 4px 16px -4px oklch(0% 0 0 / 0.5)" }}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        {/* Author row */}
        <div className="flex items-center gap-2">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random&size=64`}
            alt={author}
            className="w-7 h-7 rounded-full"
            style={{ boxShadow: "0 0 0 1.5px oklch(66% 0.27 278 / 0.3), 0 0 0 3px oklch(66% 0.27 278 / 0.08)" }}
          />
          <span className="text-sm font-medium text-base-content/90">{author}</span>
          <span className="text-base-content/25 text-sm">·</span>
          <span className="text-base-content/45 text-xs">{date}</span>
          <span className="text-base-content/25 text-sm">·</span>
          <span className="text-base-content/45 text-xs">{readingTime} min read</span>
        </div>

        {/* Title & excerpt */}
        <div>
          <h2
            className="font-bold text-lg leading-snug line-clamp-2 mb-1.5 transition-all duration-300"
            style={{ color: "oklch(93% 0.008 265)" }}
          >
            <span
              className="group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-base-content group-hover:to-primary"
              style={{ transition: "all 0.3s ease" }}
            >
              {title}
            </span>
          </h2>
          <p className="text-base-content/50 text-sm leading-relaxed line-clamp-2">
            {content}
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-4 text-base-content/35">
          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-medium">
            <ThumbsUp className="w-4 h-4" />
            {likes}
          </button>

          <button className="flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-medium">
            <MessageCircle className="w-4 h-4" />
            {comments?.length ?? 0}
          </button>

          <div className="ml-auto">
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-medium"
              style={{
                background: "linear-gradient(135deg, oklch(66% 0.27 278 / 0.12), oklch(74% 0.17 58 / 0.08))",
                border: "1px solid oklch(66% 0.27 278 / 0.2)",
                color: "oklch(72% 0.15 278)"
              }}
            >
              Article
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
