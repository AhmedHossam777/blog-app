import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Eye, EyeOff, Lock, Mail, PenLine } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

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
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(66% 0.27 278 / 0.12), transparent), oklch(11% 0.022 265)"
      }}
    >
      <div className="w-full max-w-md">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, oklch(66% 0.27 278 / 0.2), oklch(74% 0.17 58 / 0.12))",
              border: "1px solid oklch(66% 0.27 278 / 0.3)",
              boxShadow: "0 8px 24px -4px oklch(66% 0.27 278 / 0.25)"
            }}
          >
            <PenLine className="w-7 h-7" style={{ color: "oklch(72% 0.2 278)" }} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient">Welcome back</h1>
          <p className="text-base-content/45 mt-1 text-sm">
            Sign in to continue to your account
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border-gradient"
          style={{
            background: "linear-gradient(135deg, oklch(16% 0.024 265 / 0.9), oklch(13% 0.022 265 / 0.85))",
            backdropFilter: "blur(24px)",
            border: "1px solid oklch(100% 0 0 / 0.07)",
            boxShadow: "0 1px 0 0 oklch(100% 0 0 / 0.05) inset, 0 24px 64px -16px oklch(0% 0 0 / 0.5)"
          }}
        >
          {error && (
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{
                background: "oklch(64% 0.27 22 / 0.08)",
                border: "1px solid oklch(64% 0.27 22 / 0.2)",
                color: "oklch(75% 0.2 22)"
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-base-content/80">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "oklch(55% 0.01 265)" }} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "oklch(13% 0.022 265 / 0.8)",
                    border: "1px solid oklch(100% 0 0 / 0.08)",
                    color: "oklch(93% 0.008 265)"
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-base-content/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "oklch(55% 0.01 265)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: "oklch(13% 0.022 265 / 0.8)",
                    border: "1px solid oklch(100% 0 0 / 0.08)",
                    color: "oklch(93% 0.008 265)"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "oklch(50% 0.01 265)" }}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
                color: "oklch(98% 0.005 278)",
                boxShadow: "0 4px 20px -4px oklch(66% 0.27 278 / 0.5), 0 1px 0 0 oklch(100% 0 0 / 0.15) inset"
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

          <p className="text-center text-sm text-base-content/45 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium hover:underline" style={{ color: "oklch(72% 0.2 278)" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
