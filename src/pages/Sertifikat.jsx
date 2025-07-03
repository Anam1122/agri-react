import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function Sertifikat() {
  const { id } = useParams();
  const sertifikatRef = useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const skor = localStorage.getItem(`skor_modul_${id}_${user?.id}`);

  const handleDownload = () => {
    const opt = {
      margin: 0,
      filename: `Sertifikat_Modul_${id}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(sertifikatRef.current).save();
  };

  if (!user || skor < 70) {
    return (
      <div className="container">
        <h3>⚠️ Akses ditolak</h3>
        <p>Kamu harus login dan lulus kuis modul ini (skor ≥ 70) untuk melihat sertifikat.</p>
      </div>
    );
  }

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div ref={sertifikatRef} className="sertifikat-modern">
        <h1 className="sertifikat-title">SERTIFIKAT</h1>
        <p className="sertifikat-subtitle">Diberikan kepada</p>
        <h2 className="sertifikat-nama">{user.username}</h2>
        <p className="sertifikat-isi">
          Atas keberhasilan menyelesaikan <strong>Kuis Modul #{id}</strong> <br />
          dengan skor memuaskan:
        </p>
        <h1 className="sertifikat-skor">{skor}</h1>
        <p className="sertifikat-isi">Diberikan pada tanggal <strong>{tanggal}</strong></p>

        <div className="sertifikat-footer">
          <p className="ttd-label">Penanggung Jawab</p>
          <div className="garis-ttd" />
          <p className="ttd-nama">🌾 Tim AgriNuklir</p>
        </div>
      </div>

      <button onClick={handleDownload} style={{ marginTop: "2rem" }}>
        📥 Unduh PDF
      </button>
    </div>
  );
}
