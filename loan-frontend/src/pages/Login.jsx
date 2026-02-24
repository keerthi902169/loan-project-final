import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("login"); // "login" | "signup"
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: "1px solid #e4e4e7", fontSize: 14, outline: "none",
    boxSizing: "border-box", background: "#f4f4f5"
  };

  const handleSignIn = () => {
    if (!email) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");
    setError("");
    onLogin(email);
  };

  const handleSignup = () => {
    if (!signupForm.name)     return setError("Please enter your name");
    if (!signupForm.email)    return setError("Please enter your email");
    if (!signupForm.password) return setError("Please enter a password");
    if (signupForm.password !== signupForm.confirm)
      return setError("Passwords do not match");
    setError("");
    setSuccess("Account created! Signing you in...");
    setTimeout(() => onLogin(signupForm.email), 1200);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth — in production replace with real OAuth flow
    setError("");
    const mockGoogleEmail = "googleuser@gmail.com";
    setSuccess("Continuing with Google...");
    setTimeout(() => onLogin(mockGoogleEmail), 1000);
  };

  const topBar = (
    <div style={{
      background: "#18181b", height: 52, padding: "0 24px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexShrink: 0
    }}>
      <div style={{ width: 40 }} />
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
        Loan Issuance Management App
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => { setView("signup"); setError(""); setSuccess(""); }}
          style={{
            background: "#6366f1", color: "#fff", border: "none",
            borderRadius: 8, padding: "6px 16px",
            fontWeight: 600, fontSize: 13, cursor: "pointer"
          }}
        >Sign up with email</button>
        <button
          onClick={handleGoogleLogin}
          style={{
            background: "#fff", color: "#333", border: "1px solid #e4e4e7",
            borderRadius: 8, padding: "6px 16px",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6
          }}
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-2.6-.4-4.5z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 16.3 5 9.7 9 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 45c4.9 0 9.3-1.9 12.7-4.9l-5.9-5c-1.8 1.3-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2l-6.5 5C9.5 41 16.3 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.2l5.9 5C36.9 40.2 44 35 44 25c0-1.5-.2-2.6-.4-4.5z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );

  // ── SIGN UP VIEW ──
  if (view === "signup") {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #dde8f5 0%, #eaf0fa 50%, #dce9f7 100%)",
        display: "flex", flexDirection: "column"
      }}>
        {topBar}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "40px 44px",
            width: 440, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", textAlign: "center"
          }}>
            <div style={{
              background: "#6366f1", width: 60, height: 60, borderRadius: "50%",
              margin: "0 auto 20px", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 26
            }}>🏦</div>

            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#18181b" }}>
              Create Account
            </h2>
            <p style={{ color: "#71717a", fontSize: 14, margin: "0 0 24px" }}>
              Sign up to get started
            </p>

            {/* Google signup button */}
            <button
              onClick={handleGoogleLogin}
              style={{
                width: "100%", background: "#fff", color: "#333",
                border: "1px solid #e4e4e7", borderRadius: 10, padding: "11px",
                fontWeight: 600, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 8, marginBottom: 20
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-2.6-.4-4.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 16.3 5 9.7 9 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 45c4.9 0 9.3-1.9 12.7-4.9l-5.9-5c-1.8 1.3-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2l-6.5 5C9.5 41 16.3 45 24 45z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.2l5.9 5C36.9 40.2 44 35 44 25c0-1.5-.2-2.6-.4-4.5z"/>
              </svg>
              Sign up with Google
            </button>

            {/* Divider */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginBottom: 20
            }}>
              <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
              <span style={{ fontSize: 12, color: "#a1a1aa" }}>or sign up with email</span>
              <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
            </div>

            {/* Name */}
            <div style={{ textAlign: "left", marginBottom: 14 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: "#18181b",
                display: "block", marginBottom: 6
              }}>Full Name</label>
              <input
                value={signupForm.name}
                onChange={e => setSignupForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Enter your full name"
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div style={{ textAlign: "left", marginBottom: 14 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: "#18181b",
                display: "block", marginBottom: 6
              }}>Email</label>
              <input
                value={signupForm.email}
                onChange={e => setSignupForm(p => ({ ...p, email: e.target.value }))}
                placeholder="Enter your email"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ textAlign: "left", marginBottom: 14 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: "#18181b",
                display: "block", marginBottom: 6
              }}>Password</label>
              <input
                value={signupForm.password}
                onChange={e => setSignupForm(p => ({ ...p, password: e.target.value }))}
                type="password"
                placeholder="Create a password"
                style={inputStyle}
              />
            </div>

            {/* Confirm Password */}
            <div style={{ textAlign: "left", marginBottom: 20 }}>
              <label style={{
                fontSize: 13, fontWeight: 600, color: "#18181b",
                display: "block", marginBottom: 6
              }}>Confirm Password</label>
              <input
                value={signupForm.confirm}
                onChange={e => setSignupForm(p => ({ ...p, confirm: e.target.value }))}
                type="password"
                placeholder="Confirm your password"
                style={inputStyle}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 8, padding: "10px 14px",
                fontSize: 13, color: "#dc2626", marginBottom: 16, textAlign: "left"
              }}>{error}</div>
            )}

            {/* Success */}
            {success && (
              <div style={{
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: 8, padding: "10px 14px",
                fontSize: 13, color: "#16a34a", marginBottom: 16, textAlign: "left"
              }}>{success}</div>
            )}

            <button
              onClick={handleSignup}
              style={{
                width: "100%", background: "#18181b", color: "#fff",
                border: "none", borderRadius: 12, padding: "13px",
                fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 14
              }}
            >Create Account</button>

            <p style={{ fontSize: 13, color: "#71717a" }}>
              Already have an account?{" "}
              <span
                onClick={() => { setView("login"); setError(""); setSuccess(""); }}
                style={{ color: "#6366f1", fontWeight: 600, cursor: "pointer" }}
              >Sign in</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── LOGIN VIEW ──
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dde8f5 0%, #eaf0fa 50%, #dce9f7 100%)",
      display: "flex", flexDirection: "column"
    }}>
      {topBar}

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "40px 44px",
          width: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", textAlign: "center"
        }}>
          <div style={{
            background: "#6366f1", width: 60, height: 60, borderRadius: "50%",
            margin: "0 auto 20px", display: "flex",
            alignItems: "center", justifyContent: "center", fontSize: 26
          }}>🏦</div>

          <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#18181b" }}>
            Loan Management System
          </h2>
          <p style={{ color: "#71717a", fontSize: 14, margin: "0 0 24px" }}>
            Sign in to continue to your account
          </p>

          {/* Google button */}
          <button
            onClick={handleGoogleLogin}
            style={{
              width: "100%", background: "#fff", color: "#333",
              border: "1px solid #e4e4e7", borderRadius: 10, padding: "11px",
              fontWeight: 600, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, marginBottom: 20
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 12.9 5 4 13.9 4 25s8.9 20 20 20 20-8.9 20-20c0-1.5-.2-2.6-.4-4.5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 7.1 29 5 24 5 16.3 5 9.7 9 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 45c4.9 0 9.3-1.9 12.7-4.9l-5.9-5c-1.8 1.3-4 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2l-6.5 5C9.5 41 16.3 45 24 45z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.2l5.9 5C36.9 40.2 44 35 44 25c0-1.5-.2-2.6-.4-4.5z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 20
          }}>
            <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
            <span style={{ fontSize: 12, color: "#a1a1aa" }}>or sign in with email</span>
            <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
          </div>

          {/* Email */}
          <div style={{ textAlign: "left", marginBottom: 16 }}>
            <label style={{
              fontSize: 13, fontWeight: 600, color: "#18181b",
              display: "block", marginBottom: 6
            }}>Email</label>
            <input
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              placeholder="Enter your email"
              style={inputStyle}
              onKeyDown={e => e.key === "Enter" && handleSignIn()}
            />
          </div>

          {/* Password */}
          <div style={{ textAlign: "left", marginBottom: 20 }}>
            <label style={{
              fontSize: 13, fontWeight: 600, color: "#18181b",
              display: "block", marginBottom: 6
            }}>Password</label>
            <input
              value={password}
              onChange={e => { setPassword(e.target.value); setError(""); }}
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              onKeyDown={e => e.key === "Enter" && handleSignIn()}
            />
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "#fef2f2", border: "1px solid #fecaca",
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: "#dc2626", marginBottom: 16, textAlign: "left"
            }}>{error}</div>
          )}

          {/* Success message */}
          {success && (
            <div style={{
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 8, padding: "10px 14px",
              fontSize: 13, color: "#16a34a", marginBottom: 16, textAlign: "left"
            }}>{success}</div>
          )}

          <button
            onClick={handleSignIn}
            style={{
              width: "100%", background: "#18181b", color: "#fff",
              border: "none", borderRadius: 12, padding: "13px",
              fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 14
            }}
          >Sign In</button>

          <p style={{ fontSize: 13, color: "#71717a" }}>
            Don't have an account?{" "}
            <span
              onClick={() => { setView("signup"); setError(""); setSuccess(""); }}
              style={{ color: "#6366f1", fontWeight: 600, cursor: "pointer" }}
            >Sign up</span>
          </p>

          <p style={{ fontSize: 12, color: "#a1a1aa", marginTop: 12 }}>
            Demo credentials: any email/password
          </p>
        </div>
      </div>
    </div>
  );
}