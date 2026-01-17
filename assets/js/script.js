// --- FUNGSI TYPING EFFECT ---
function typeEffect(elementId, text, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = ''; // Clear existing text
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            if (callback) callback();
        }
    }, speed);
}

// --- FUNGSI UTAMA START APP ---
function startApp() {
    // 1. Putar Musik
    const audio = document.getElementById('bgm');
    audio.play().catch(e => console.log("Musik gagal putar otomatis (membutuhkan interaksi user)"));

    // 2. Hilangkan Overlay
    document.getElementById('overlay').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        
        // 3. Tampilkan Konten Utama dengan Efek Ketik
        const mainContent = document.getElementById('mainContent');
        mainContent.classList.add('show');
        
        // Panggil typing effect untuk judul utama
        typeEffect('main-title', 'Hi, Nang...', 100); 

    }, 800); // Waktu transisi overlay

    // 4. Mulai Animasi Hujan Hati
    setInterval(createHeart, 400);
}

// --- FUNGSI ANIMASI HATI ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Unicode heart symbol
    heart.style.left = Math.random() * 100 + 'vw'; // Posisi horizontal random
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's'; // Durasi animasi random
    heart.style.opacity = Math.random(); // Opacity random
    document.body.appendChild(heart);

    // Hapus hati setelah animasi selesai
    setTimeout(() => { heart.remove(); }, 5000); 
}

// --- FUNGSI KIRIM KE WHATSAPP ---
function sendStory() {
    const story = document.getElementById('userStory').value;
    const nomor = "6282362081565"; // <--- GANTI DENGAN NOMOR WA KAMU DISINI (Format: 628xxxx)
    
    if (story.trim() === "") {
        alert("Tulis sesuatu dulu yaa sebelum dikirim ❤️");
        return;
    }

    // Gabungkan pesan pembuka dengan isi ceritanya
    const pesanFinal = `Halo! Aku mau cerita tentang hariku:\n\n${story}`;
    
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesanFinal)}`;
    window.open(url, '_blank');
}

// --- INITIAL LOAD: Mulai Typing Effect di Overlay saat halaman pertama kali dibuka ---
document.addEventListener('DOMContentLoaded', () => {
    typeEffect('overlay-text', 'Ada pesan buat kamu...', 120, () => {
        // Setelah typing effect selesai, cursor di overlay h2 dihilangkan
        document.getElementById('overlay-text').style.borderRight = 'none'; 
    });
});