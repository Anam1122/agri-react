import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      alert("Mohon isi email dan password.");
      return;
    }

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);

    try {
      const res = await fetch("https://agrinuklir.rf.gd/api/login.php", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal menghubungi server.");

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "Email atau password salah.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", color: "#333" }}>
          🔐 Selamat Datang Kembali
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            style={inputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#43a047")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Masuk
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "#555" }}>
          Belum punya akun?{" "}
          <Link
            to="/register"
            style={{
              color: "#388e3c",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "1rem",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "background 0.3s ease",
};
