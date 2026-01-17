// Konfigurasi Pertanyaan
const questions = [
    "Gimana kabar harimu hari ini? Ceritain semuanya ke aku yuk... 😊",
    "Tadi kan aku tanya gimana harimu... tapi aku lebih penasaran, bagian mana dari hari ini yang paling bikin kamu senyum? ✨",
    "Terakhir... ada gak hal yang pengen kamu sampein ke aku tapi selama ini masih ragu? Tulis di sini ya, aku dengerin... 💖"
];

let currentStep = 0;
let allAnswers = "";

// 1. Fungsi Typing Effect
function typeEffect(elementId, text, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, speed);
}

// 2. Memulai Aplikasi
function startApp() {
    document.getElementById('bgm').play();
    document.getElementById('overlay').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('mainContent').classList.add('show');
        typeEffect('main-title', 'Hi, Nang...', 100);
    }, 800);

    setInterval(createHeart, 400);
}

// 3. Logika Pertanyaan Selanjutnya
function nextQuestion() {
    const input = document.getElementById('userStory');
    const questionDisplay = document.getElementById('question-text');
    const btn = document.getElementById('btnAction');
    const dots = document.querySelectorAll('.dot');

    if (input.value.trim() === "") {
        alert("Jangan dikosongin yaa, aku mau denger ceritamu... ❤️");
        return;
    }

    // Simpan jawaban
    allAnswers += `Pertanyaan ${currentStep + 1}: ${questions[currentStep]}\nJawaban: ${input.value}\n\n`;
    
    currentStep++;

    if (currentStep < questions.length) {
        // Efek transisi teks
        questionDisplay.style.opacity = '0';
        
        setTimeout(() => {
            questionDisplay.innerText = questions[currentStep];
            questionDisplay.style.opacity = '1';
            input.value = ""; // Reset textarea
            
            // Update dots
            dots[currentStep].classList.add('active');
            
            if (currentStep === questions.length - 1) {
                btn.innerText = "Kirim ke Aku ❤️";
            }
        }, 500);
    } else {
        sendToWA();
    }
}

// 4. Kirim ke WhatsApp
function sendToWA() {
    const nomor = "6282362081565"; // <--- GANTI NOMOR WA KAMU DISINI
    const pesanFinal = `Halo! Ini cerita hariku buat kamu:\n\n${allAnswers}`;
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesanFinal)}`;
    window.open(url, '_blank');
}

// 5. Animasi Hati
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

// Load overlay text
window.onload = () => {
    typeEffect('overlay-text', 'Ada pesan buat kamu...', 100);
};
