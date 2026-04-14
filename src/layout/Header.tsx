import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center shadow-md group-hover:shadow-primary/40 transition-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-primary-content"
            >
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.878V4.533ZM12.75 20.628A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.095Z" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">Inkwell</span>
        </NavLink>

        {/* Nav */}
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
          >
            Blog
          </NavLink>

          <div className="w-px h-5 bg-base-300 mx-2" />

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle btn-sm avatar ring-2 ring-base-200 hover:ring-primary transition-all"
            >
              <div className="w-8 rounded-full">
                <img
                  alt="User avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-lg bg-base-100 rounded-box w-40 border border-base-200"
            >
              <li>
                <a className="text-sm">Profile</a>
              </li>
              <li>
                <a className="text-sm">Settings</a>
              </li>
              <li>
                <a className="text-sm text-error">Sign out</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
