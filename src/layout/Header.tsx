import { useAuth } from "@/context/AuthContext";
import { BookOpen, UserRound } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:shadow-primary/40 transition-shadow">
            <BookOpen className="w-4 h-4 text-primary-content" />
          </div>
          <span className="font-bold text-lg tracking-tight">Inkwell</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-content shadow-sm"
                  : "text-base-content/70 hover:text-base-content hover:bg-base-200"
              }`
            }
            rounded-full
          >
            Feed
          </NavLink>

          <div className="w-px h-5 bg-base-300 mx-2" />

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm avatar ring-2 ring-base-200 hover:ring-primary transition-all"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-base-300 flex items-center justify-center">
                {user && (
                  <img
                    alt="User avatar"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=80`}
                  />
                )}
                {!user && (
                  <UserRound className="w-5 h-5 text-base-content/50" />
                )}
              </div>
            </div>
            {user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-40 border border-base-200"
              >
                <li>
                  <Link to="/profile" className="text-sm">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="text-sm text-error" onClick={logout}>
                    Sign out
                  </a>
                </li>
              </ul>
            )}

            {!user && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-40 border border-base-200"
              >
                <li>
                  <Link to="/login" className="text-sm">
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
