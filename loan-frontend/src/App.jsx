import { useState } from "react";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import AdminPanel from "./pages/AdminPanel";
import LenderDashboard from "./pages/LenderDashboard";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import AnalystDashboard from "./pages/AnalystDashboard";

const INITIAL_USERS = [
  { id: 1, name: "John Doe",      email: "john@example.com",    role: "borrower", status: "active",  joined: "2024-01-15" },
  { id: 2, name: "Jane Smith",    email: "jane@example.com",    role: "lender",   status: "active",  joined: "2024-02-20" },
  { id: 3, name: "Bob Johnson",   email: "bob@example.com",     role: "borrower", status: "active",  joined: "2024-03-10" },
  { id: 4, name: "Alice Williams",email: "alice@example.com",   role: "lender",   status: "blocked", joined: "2024-01-05" },
  { id: 5, name: "Charlie Brown", email: "charlie@example.com", role: "borrower", status: "active",  joined: "2024-04-12" },
  { id: 6, name: "Diana Prince",  email: "diana@example.com",   role: "analyst",  status: "active",  joined: "2024-02-01" },
];

const INITIAL_LOANS = [
  { id: "L001", borrower: "John Doe",     lender: "Jane Smith",    amount: 50000,  purpose: "Home Renovation",    duration: 24, status: "active",   applied: "2024-05-01", approved: "2024-05-05", paidEmis: 8,  interestRate: 8.5 },
  { id: "L002", borrower: "Bob Johnson",  lender: "Jane Smith",    amount: 100000, purpose: "Business Expansion", duration: 36, status: "pending",  applied: "2024-06-15", approved: null,         paidEmis: 0,  interestRate: 8.5 },
  { id: "L003", borrower: "Charlie Brown",lender: "Alice Williams", amount: 25000,  purpose: "Education",          duration: 12, status: "approved", applied: "2024-06-10", approved: "2024-06-12", paidEmis: 0,  interestRate: 8.5 },
  { id: "L004", borrower: "John Doe",     lender: "Jane Smith",    amount: 75000,  purpose: "Medical Emergency",  duration: 18, status: "rejected", applied: "2024-04-20", approved: null,         paidEmis: 0,  interestRate: 8.0 },
  { id: "L005", borrower: "Bob Johnson",  lender: "Jane Smith",    amount: 30000,  purpose: "Vehicle Purchase",   duration: 24, status: "active",   applied: "2024-03-01", approved: "2024-03-05", paidEmis: 12, interestRate: 8.5 },
];

export default function App() {
  const [screen,   setScreen]   = useState("login");
  const [username, setUsername] = useState("");
  const [role,     setRole]     = useState(null);
  const [users,    setUsers]    = useState(INITIAL_USERS);
  const [loans,    setLoans]    = useState(INITIAL_LOANS);

  const handleLogin      = (email) => { setUsername(email.split("@")[0]); setScreen("role"); };
  const handleRole       = (r)     => { setRole(r); setScreen("app"); };
  const handleChangeRole = ()      => setScreen("role");
  const handleLogout     = ()      => { setScreen("login"); setRole(null); setUsername(""); };

  if (screen === "login")    return <Login onLogin={handleLogin} />;
  if (screen === "role")     return <RoleSelection username={username} onSelect={handleRole} />;
  if (role === "admin")      return <AdminPanel    username={username} users={users} loans={loans} setUsers={setUsers} onChangeRole={handleChangeRole} onLogout={handleLogout} />;
  if (role === "lender")     return <LenderDashboard   username={username} loans={loans} setLoans={setLoans} onChangeRole={handleChangeRole} onLogout={handleLogout} />;
  if (role === "borrower")   return <BorrowerDashboard username={username} loans={loans} setLoans={setLoans} onChangeRole={handleChangeRole} onLogout={handleLogout} />;
  if (role === "analyst")    return <AnalystDashboard  username={username} loans={loans} onChangeRole={handleChangeRole} onLogout={handleLogout} />;
  return null;
}