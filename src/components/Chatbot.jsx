import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState([
    { from: "bot", text: "Halo! Aku AgriBot 🌾 Siap bantu kamu belajar tentang AgriNuklir." }
  ]);
  const [input, setInput] = useState("");

  const balasBot = (pesan) => {
    const msg = pesan.toLowerCase();

    // Respon sapaan
    if (["halo", "hai", "hi", "assalamualaikum", "selamat pagi", "selamat siang", "selamat malam"].some(s => msg.includes(s))) {
      return "Halo juga! 👋 Ada yang bisa AgriBot bantu hari ini?";
    }

    // Respon konten
    if (msg.includes("iradiasi"))
      return "🔬 Iradiasi membantu memperbaiki genetik tanaman agar lebih tahan penyakit.";
    if (msg.includes("kuis"))
      return "📝 Kuis bisa diakses di akhir setiap modul. Nilai minimal 70 untuk dapat sertifikat!";
    if (msg.includes("sertifikat"))
      return "📜 Kamu akan mendapatkan sertifikat setelah lulus kuis. Cek di halaman Sertifikat ya.";
    if (msg.includes("modul"))
      return "📘 Modul memuat materi tentang nuklir & pertanian seperti iradiasi benih dan konservasi pangan.";
    if (msg.includes("simulasi"))
      return "🎮 Simulasi iradiasi bisa kamu coba di halaman simulasi untuk memahami prosesnya.";

    // Jika tidak dipahami
    return "❓ Maaf, AgriBot belum mengerti maksudmu. Coba tanya tentang 'iradiasi', 'modul', 'kuis', atau 'sertifikat'.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const pesanUser = { from: "user", text: input };
    const pesanBot = { from: "bot", text: balasBot(input) };

    setChat((prev) => [...prev, pesanUser, pesanBot]);
    setInput("");
  };

  return (
    <div>
      {open && (
        <div style={{
          position: "fixed", bottom: "80px", right: "20px", width: "300px",
          background: "#fff", border: "1px solid #ccc", borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)", padding: "10px", zIndex: 999
        }}>
          <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "10px" }}>
            {chat.map((c, i) => (
              <div key={i} style={{
                textAlign: c.from === "bot" ? "left" : "right",
                marginBottom: "6px"
              }}>
                <span style={{
                  background: c.from === "bot" ? "#eee" : "#DCF8C6",
                  padding: "6px 10px", borderRadius: "10px", display: "inline-block"
                }}>
                  {c.text}
                </span>
              </div>
            ))}
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
            style={{ width: "80%", padding: "6px" }}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>Kirim</button>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "20px", right: "20px", zIndex: 999,
          background: "#4CAF50", color: "white", border: "none",
          borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
        }}
        title="AgriBot"
      >
        💬
      </button>
    </div>
  );
}
