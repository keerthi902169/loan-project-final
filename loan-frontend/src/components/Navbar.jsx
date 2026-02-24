export default function Navbar({ onChangeRole, onLogout }) {
  return (
    <div style={{
      background: "#18181b", height: 52, padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 100, flexShrink: 0
    }}>
      <div style={{ width: 40 }} />

      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
        Loan Issuance Management App
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onChangeRole}
          style={{
            background: "transparent", border: "1px solid #3f3f46",
            color: "#d4d4d8", borderRadius: 8, padding: "5px 14px",
            fontSize: 13, fontWeight: 500, cursor: "pointer"
          }}
        >⌂ Change Role</button>
        <button
          onClick={onLogout}
          style={{
            background: "transparent", border: "1px solid #3f3f46",
            color: "#d4d4d8", borderRadius: 8, padding: "5px 14px",
            fontSize: 13, fontWeight: 500, cursor: "pointer"
          }}
        >→ Logout</button>
      </div>
    </div>
  );
}