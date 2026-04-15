import { useAuth } from "@/context/AuthContext";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  PenLine,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-error" };
  if (score === 2) return { score, label: "Fair", color: "bg-warning" };
  if (score === 3) return { score, label: "Good", color: "bg-info" };
  return { score, label: "Strong", color: "bg-success" };
}

const inputStyle = {
  background: "oklch(13% 0.022 265 / 0.8)",
  border: "1px solid oklch(100% 0 0 / 0.08)",
  color: "oklch(93% 0.008 265)",
};

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = (): string => {
    if (name.trim().length < 2) return "Name must be at least 2 characters.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register({ email, password, name: name.trim() });
      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const strength = password ? getPasswordStrength(password) : null;
  const passwordsMatch = confirmPassword && password === confirmPassword;

  return (
    <div
      className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(66% 0.27 278 / 0.12), transparent), oklch(11% 0.022 265)",
      }}
    >
      <div className="w-full max-w-md">
        {/* Icon + title */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(66% 0.27 278 / 0.2), oklch(74% 0.17 58 / 0.12))",
              border: "1px solid oklch(66% 0.27 278 / 0.3)",
              boxShadow: "0 8px 24px -4px oklch(66% 0.27 278 / 0.25)",
            }}
          >
            <PenLine className="w-7 h-7" style={{ color: "oklch(72% 0.2 278)" }} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient">
            Create an account
          </h1>
          <p className="text-base-content/45 mt-1 text-sm">
            Join and start writing today
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border-gradient"
          style={{
            background:
              "linear-gradient(135deg, oklch(16% 0.024 265 / 0.9), oklch(13% 0.022 265 / 0.85))",
            backdropFilter: "blur(24px)",
            border: "1px solid oklch(100% 0 0 / 0.07)",
            boxShadow:
              "0 1px 0 0 oklch(100% 0 0 / 0.05) inset, 0 24px 64px -16px oklch(0% 0 0 / 0.5)",
          }}
        >
          {error && (
            <div
              className="flex items-start gap-3 rounded-xl px-4 py-3 mb-6 text-sm"
              style={{
                background: "oklch(64% 0.27 22 / 0.08)",
                border: "1px solid oklch(64% 0.27 22 / 0.2)",
                color: "oklch(75% 0.2 22)",
              }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-base-content/80">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "oklch(55% 0.01 265)" }} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
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
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Password */}
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
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={inputStyle}
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

              {strength && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= strength.score ? strength.color : "bg-base-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-base-content/45">
                    Strength:{" "}
                    <span
                      className={
                        strength.score <= 1
                          ? "text-error"
                          : strength.score === 2
                            ? "text-warning"
                            : strength.score === 3
                              ? "text-info"
                              : "text-success"
                      }
                    >
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5 text-base-content/80">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: "oklch(55% 0.01 265)" }} />
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl text-sm transition-all outline-none"
                  style={{
                    ...inputStyle,
                    ...(confirmPassword
                      ? {
                          border: passwordsMatch
                            ? "1px solid oklch(65% 0.25 150 / 0.5)"
                            : "1px solid oklch(64% 0.27 22 / 0.5)",
                        }
                      : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "oklch(50% 0.01 265)" }}
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-error mt-1">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl font-semibold text-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, oklch(66% 0.27 278), oklch(60% 0.28 288))",
                color: "oklch(98% 0.005 278)",
                boxShadow:
                  "0 4px 20px -4px oklch(66% 0.27 278 / 0.5), 0 1px 0 0 oklch(100% 0 0 / 0.15) inset",
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-xs" />
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-base-content/45 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: "oklch(72% 0.2 278)" }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
