const roles = [
  { key: "admin",    label: "Admin",             color: "#ef4444", icon: "🛡️", desc: "Oversee platform operations and manage users" },
  { key: "lender",   label: "Lender",            color: "#22c55e", icon: "🤝", desc: "Create loan offers and track payments" },
  { key: "borrower", label: "Borrower",          color: "#3b82f6", icon: "👤", desc: "Apply for loans and manage repayments" },
  { key: "analyst",  label: "Financial Analyst", color: "#a855f7", icon: "📈", desc: "Analyze loan data and generate reports" },
];

export default function RoleSelection({ onSelect }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dde8f5 0%, #eaf0fa 50%, #dce9f7 100%)",
      display: "flex", flexDirection: "column"
    }}>
      <div style={{
        background: "#18181b", height: 52, padding: "0 24px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexShrink: 0
      }}>
        {/* ✅ AI watermark removed */}
        <div style={{ width: 40 }} />

        <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
          Loan Issuance Management App
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            background: "#6366f1", color: "#fff", border: "none",
            borderRadius: 8, padding: "6px 16px",
            fontWeight: 600, fontSize: 13, cursor: "pointer"
          }}>Sign up with email</button>
          <button style={{
            background: "#fff", color: "#333", border: "1px solid #e4e4e7",
            borderRadius: 8, padding: "6px 16px",
            fontWeight: 600, fontSize: 13, cursor: "pointer"
          }}>🌐 Continue with Google</button>
        </div>
      </div>

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "40px 24px"
      }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#18181b", marginBottom: 8 }}>
          Select Your Role
        </h1>
        <p style={{ color: "#71717a", fontSize: 15, marginBottom: 48 }}>
          Choose how you want to access the platform
        </p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {roles.map(r => (
            <div key={r.key} style={{
              background: "#fff", borderRadius: 20, padding: "36px 28px",
              width: 240, textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              border: "1px solid #f0f0f0", transition: "transform 0.15s"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{
                background: r.color, width: 64, height: 64, borderRadius: "50%",
                margin: "0 auto 16px", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 28
              }}>{r.icon}</div>

              <h3 style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 17, color: "#18181b" }}>
                {r.label}
              </h3>
              <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 24px", lineHeight: 1.6 }}>
                {r.desc}
              </p>
              <button
                onClick={() => onSelect(r.key)}
                style={{
                  background: "#18181b", color: "#fff", border: "none",
                  borderRadius: 10, padding: "11px 20px", width: "100%",
                  fontWeight: 700, fontSize: 14, cursor: "pointer"
                }}
              >Continue as {r.label}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}