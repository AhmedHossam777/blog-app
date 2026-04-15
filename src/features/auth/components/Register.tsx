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
  background: "#fff",
  border: "1px solid #d0d0d0",
  color: "#292929",
  borderRadius: "4px",
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
            Create an account
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#757575" }}>
            Join and start writing today
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
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Full name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#aaa" }}
                />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="w-full pl-10 pr-4 py-2.5 text-sm transition-all outline-none"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
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

              {strength && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i <= strength.score ? strength.color : "bg-[#e6e6e6]"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "#757575" }}>
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#292929" }}
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "#aaa" }}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-11 py-2.5 text-sm transition-all outline-none"
                  style={{
                    ...inputStyle,
                    ...(confirmPassword
                      ? {
                          border: passwordsMatch
                            ? "1px solid #1a8917"
                            : "1px solid #c62828",
                        }
                      : {}),
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#aaa" }}
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-error mt-1">
                  Passwords do not match.
                </p>
              )}
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
                  Creating account…
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#757575" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium hover:underline"
              style={{ color: "#1a8917" }}
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
