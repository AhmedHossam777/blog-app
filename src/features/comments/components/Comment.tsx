import { ThumbsUp } from "lucide-react";

interface CommentProps {
  text: string;
  username: string;
  date: string;
  likes?: number;
}

function Comment({ text, username, date, likes }: CommentProps) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${username}`}
            alt={username}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <h2 className="card-title">{username}</h2>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <p>{text}</p>
        <div className="flex gap-2">
          <button className="hover:text-blue-500 transition cursor-pointer">
            <ThumbsUp className="size-6" />
          </button>
          <span className="text-sm text-gray-500">{likes || 12} likes</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
