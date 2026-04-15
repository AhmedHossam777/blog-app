import { useAuth } from "@/context/AuthContext";
import { BookOpen, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 border-b border-white/6"
      style={{
        background: "linear-gradient(to bottom, oklch(14% 0.024 265 / 0.95), oklch(11% 0.022 265 / 0.85))",
        backdropFilter: "blur(24px) saturate(180%)",
        boxShadow: "0 1px 0 0 oklch(66% 0.27 278 / 0.08), 0 4px 24px -4px oklch(0% 0 0 / 0.4)"
      }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(135deg, oklch(66% 0.27 278), oklch(74% 0.17 58))",
              boxShadow: "0 4px 16px -2px oklch(66% 0.27 278 / 0.5), 0 0 0 1px oklch(66% 0.27 278 / 0.2)"
            }}
          >
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-bold text-lg tracking-tight"
            style={{
              background: "linear-gradient(135deg, oklch(95% 0.005 265) 0%, oklch(75% 0.12 278) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent"
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
              `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-base-content/50 hover:text-base-content/90 hover:bg-white/6"
              }`
            }
            style={({ isActive }) => isActive ? {
              background: "linear-gradient(135deg, oklch(66% 0.27 278 / 0.25), oklch(74% 0.17 58 / 0.12))",
              border: "1px solid oklch(66% 0.27 278 / 0.3)",
              boxShadow: "0 2px 12px -2px oklch(66% 0.27 278 / 0.25)"
            } : {}}
          >
            Feed
          </NavLink>

          <div className="w-px h-5 bg-white/8 mx-2" />

          {/* Avatar dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm avatar transition-all duration-200"
              style={{
                border: "1.5px solid oklch(100% 0 0 / 0.1)",
                boxShadow: "0 0 0 2px transparent"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.border = "1.5px solid oklch(66% 0.27 278 / 0.5)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px oklch(66% 0.27 278 / 0.12)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.border = "1.5px solid oklch(100% 0 0 / 0.1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px transparent";
              }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-base-300 flex items-center justify-center">
                {user && (
                  <img
                    alt="User avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=80`}
                  />
                )}
                {!user && (
                  <UserRound className="w-5 h-5 text-base-content/40" />
                )}
              </div>
            </div>

            {user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 rounded-2xl w-44"
                style={{
                  background: "linear-gradient(135deg, oklch(17% 0.025 265 / 0.95), oklch(14% 0.022 265 / 0.9))",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(100% 0 0 / 0.08)",
                  boxShadow: "0 8px 40px -8px oklch(0% 0 0 / 0.6), 0 1px 0 0 oklch(100% 0 0 / 0.05) inset"
                }}
              >
                <li>
                  <Link to="/profile" className="text-sm rounded-xl text-base-content/80 hover:text-base-content hover:bg-white/6">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="text-sm rounded-xl text-error/80 hover:text-error hover:bg-error/10" onClick={logout}>
                    Sign out
                  </a>
                </li>
              </ul>
            )}

            {!user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 rounded-2xl w-44"
                style={{
                  background: "linear-gradient(135deg, oklch(17% 0.025 265 / 0.95), oklch(14% 0.022 265 / 0.9))",
                  backdropFilter: "blur(24px)",
                  border: "1px solid oklch(100% 0 0 / 0.08)",
                  boxShadow: "0 8px 40px -8px oklch(0% 0 0 / 0.6), 0 1px 0 0 oklch(100% 0 0 / 0.05) inset"
                }}
              >
                <li>
                  <Link to="/login" className="text-sm rounded-xl text-base-content/80 hover:text-base-content hover:bg-white/6">
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
