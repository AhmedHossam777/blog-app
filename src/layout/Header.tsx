import { useAuth } from "@/context/AuthContext";
import { BookOpen, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e6e6e6",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 flex items-center justify-center transition-all duration-200 group-hover:opacity-80"
            style={{
              background: "#1a1a1a",
              borderRadius: "2px",
            }}
          >
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-bold text-xl tracking-tighter"
            style={{
              fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            TYPO
          </span>
        </NavLink>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
                isActive ? "text-[#1a1a1a]" : "text-[#757575] hover:text-[#292929]"
              }`
            }
          >
            Feed
          </NavLink>

          <div className="w-px h-4 bg-[#e6e6e6] mx-2" />

          {/* Avatar dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm avatar transition-all duration-200"
              style={{
                border: "1px solid #e6e6e6",
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f2f2f2] flex items-center justify-center">
                {user && (
                  <img
                    alt="User avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=80`}
                  />
                )}
                {!user && (
                  <UserRound className="w-4 h-4 text-[#757575]" />
                )}
              </div>
            </div>

            {user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 z-50 p-1.5 w-44"
                style={{
                  background: "#fff",
                  border: "1px solid #e6e6e6",
                  borderRadius: "4px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-sm rounded text-[#292929] hover:bg-[#f2f2f2] hover:text-[#1a1a1a]"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <a
                    className="text-sm rounded text-[#c62828] hover:bg-[#fdecea] hover:text-[#b71c1c]"
                    onClick={logout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            )}

            {!user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-2 z-50 p-1.5 w-44"
                style={{
                  background: "#fff",
                  border: "1px solid #e6e6e6",
                  borderRadius: "4px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                }}
              >
                <li>
                  <Link
                    to="/login"
                    className="text-sm rounded text-[#292929] hover:bg-[#f2f2f2] hover:text-[#1a1a1a]"
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
