document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email dan Password harus diisi!");
    return;
  }

  try {
    // --- PERBAIKAN: Gunakan /api/login (tanpa localhost) ---
    // Ini agar script otomatis memanggil server tempat dia di-host (Vercel)
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Selamat Datang!");

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", email.split("@")[0]);

      // Redirect ke halaman utama
      window.location.href = "index.html";
    } else {
      alert(data.message || "Login gagal, periksa email/password.");
    }
  } catch (error) {
    console.error("Error saat login:", error);
    alert("Gagal terhubung ke server. Pastikan koneksi internet stabil.");
  }
});
