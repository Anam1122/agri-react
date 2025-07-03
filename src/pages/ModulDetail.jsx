import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ModulDetail() {
  const { id } = useParams();
  const [modul, setModul] = useState(null);
  const [komentar, setKomentar] = useState([]);
  const [isiKomentar, setIsiKomentar] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  useEffect(() => {
    fetch('http://localhost:8000/api/modul.php')
      .then(res => res.json())
      .then(data => {
        const found = data.find(mod => mod.id === parseInt(id));
        setModul(found);
      });

    fetch(`http://localhost:8000/api/komentar.php?modul_id=${id}`)
      .then(res => res.json())
      .then(data => setKomentar(data));
  }, [id]);

  const kirimKomentar = () => {
    if (!user_id) {
      alert("Kamu harus login untuk mengirim komentar.");
      return;
    }

    fetch('http://localhost:8000/api/komentar.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id,
        modul_id: id,
        isi: isiKomentar
      })
    }).then(() => {
      setIsiKomentar('');
      fetch(`http://localhost:8000/api/komentar.php?modul_id=${id}`)
        .then(res => res.json())
        .then(data => setKomentar(data));
    });
  };

  if (!modul) return <p>⏳ Memuat...</p>;

  return (
    <div className="container">
      <h2>{modul.judul}</h2>
      <img
        src={modul.gambar_url || 'https://via.placeholder.com/600x300?text=Tanpa+Gambar'}
        alt={modul.judul}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <p>{modul.konten}</p>

      <Link
        to={`/kuis/${modul.id}`}
        className="btn-detail"
        style={{
          marginTop: '1rem',
          display: 'inline-block',
          padding: '10px 16px',
          background: '#4CAF50',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none'
        }}
      >
        🧪 Ikuti Kuis
      </Link>

      <hr />
      <h3>💬 Komentar</h3>

      <textarea
        value={isiKomentar}
        onChange={(e) => setIsiKomentar(e.target.value)}
        rows={3}
        placeholder="Tulis komentar..."
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          marginBottom: '0.5rem'
        }}
        disabled={!user_id}
      />
      <br />
      <button
        onClick={kirimKomentar}
        disabled={!user_id}
        style={{ padding: '10px 16px', marginBottom: '1rem' }}
      >
        Kirim Komentar
      </button>
      {!user_id && (
        <p style={{ color: 'red' }}>Silakan login terlebih dahulu untuk mengomentari.</p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {komentar.map((k) => (
          <li key={k.id} style={{ marginBottom: '10px' }}>
            <strong>{k.username}</strong>: {k.isi}
          </li>
        ))}
      </ul>
    </div>
  );
}
