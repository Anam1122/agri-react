import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/");
        } else {
          alert(data.message || "Registrasi gagal.");
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>📝 Daftar Akun Baru</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Daftar</button>
        </form>
        <p style={{ marginTop: "1rem" }}>
          Sudah punya akun?{" "}
          <Link to="/login" style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
