document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Memanggil API tanpa localhost agar otomatis menyesuaikan dengan domain Vercel
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Selamat Datang!");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", email.split("@")[0]);
      
      // Pastikan file index.html sudah ada di halaman depan GitHub
      window.location.href = "index.html"; 
    } else {
      alert(data.message || "Login gagal!");
    }
  } catch (error) {
    alert("Gagal terhubung ke server cloud.");
  }
});
