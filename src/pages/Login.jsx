const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    alert("Mohon isi email dan password.");
    return;
  }

  const formData = new FormData();
  formData.append("email", form.email);
  formData.append("password", form.password);

  fetch("https://agrinuklir.rf.gd/api/login.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Gagal menghubungi server.");
      }
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message || "Login gagal.");
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      alert("Terjadi kesalahan koneksi.");
    });
};

