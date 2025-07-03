import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ForumDetail() {
  const { id } = useParams();
  const [topik, setTopik] = useState(null);
  const [komentar, setKomentar] = useState([]);
  const [isiKomentar, setIsiKomentar] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:8000/api/forum.php")
      .then(res => res.json())
      .then(data => {
        const t = data.find((item) => item.id === parseInt(id));
        setTopik(t);
      });

    fetch(`http://localhost:8000/api/forum_komentar.php?forum_id=${id}`)
      .then(res => res.json())
      .then(data => setKomentar(data));
  }, [id]);

  const kirimKomentar = () => {
    if (!user) {
      alert("Kamu harus login untuk berkomentar.");
      return;
    }

    fetch("http://localhost:8000/api/forum_komentar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        forum_id: id,
        user_id: user.id,
        isi: isiKomentar
      })
    }).then(() => {
      setIsiKomentar("");
      fetch(`http://localhost:8000/api/forum_komentar.php?forum_id=${id}`)
        .then(res => res.json())
        .then(data => setKomentar(data));
    });
  };

  if (!topik) return <p>⏳ Memuat topik...</p>;

  return (
    <div className="container">
      <h2>{topik.judul}</h2>
      <p>{topik.isi}</p>
      <p><strong>👤 {topik.username}</strong> | 🕒 {new Date(topik.created_at).toLocaleString()}</p>

      <hr />
      <h3>🗨️ Komentar</h3>

      {user ? (
        <>
          <textarea
            rows={3}
            placeholder="Tulis komentar..."
            style={{ width: "100%" }}
            value={isiKomentar}
            onChange={(e) => setIsiKomentar(e.target.value)}
          />
          <button onClick={kirimKomentar}>Kirim Komentar</button>
        </>
      ) : (
        <p style={{ color: "red" }}>Login dulu untuk ikut berdiskusi.</p>
      )}

      <ul style={{ marginTop: "1rem" }}>
        {komentar.map((k) => (
          <li key={k.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{k.username}</strong>: {k.isi}
          </li>
        ))}
      </ul>
    </div>
  );
}
