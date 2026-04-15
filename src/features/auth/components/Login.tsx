import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Eye, EyeOff, Lock, Mail, PenLine } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const inputStyle = {
  background: "#fff",
  border: "1px solid #d0d0d0",
  color: "#292929",
  borderRadius: "4px",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4 py-12"
      style={{ background: "#fff" }}
    >
      <div className="w-full max-w-sm">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-12 h-12 mb-4"
            style={{ background: "#1a1a1a", borderRadius: "2px" }}
          >
            <PenLine className="w-6 h-6 text-white" />
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'sohne', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome back
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#757575" }}>
            Sign in to continue to your account
          </p>
        </div>

        {/* Card */}
        <div
          className="p-8"
          style={{
            border: "1px solid #e6e6e6",
            borderRadius: "4px",
          }}
        >
          {error && (
            <div
              className="flex items-start gap-3 px-4 py-3 mb-6 text-sm"
              style={{
                background: "#fdecea",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
                color: "#c62828",
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#aaa" }}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#aaa" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 text-sm transition-all outline-none"
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#aaa" }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: "999px",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-xs" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#757575" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium hover:underline"
              style={{ color: "#1a8917" }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
