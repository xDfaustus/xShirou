/* PARTICULAS CAYENDO */
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.4 ? '#ff8c00' : (Math.random() > 0.5 ? '#ff0033' : '#ffffff'),
      alpha: Math.random() * 0.7 + 0.3
    }));

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    /* REDIRECCIÓN DEL BADGE "Married" */
    document.getElementById('collector-badge').addEventListener('click', () => {
      window.open('https://xat.me/iDaviiessx', '_blank');
    });

    /* REPRODUCTOR DE MÚSICA */
    const playlist = [
      {
        title: "酔いどれ知らず",
        artist: "【Kanaria】",
        src: "assets/0.mp3"
      },
      {
        title: "BLEACH",
        artist: "Romaji",
        src: "assets/1.mp3"
      }
    ];

    let currentTrack = 0;
    let isPlaying = false;

    const audio = new Audio();

    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');

    function loadTrack(index) {
      currentTrack = index;
      titleEl.textContent = playlist[currentTrack].title;
      artistEl.textContent = playlist[currentTrack].artist;
      audio.src = playlist[currentTrack].src;
    }

    function playTrack() {
      isPlaying = true;
      playIcon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
      audio.play().catch(err => {
        console.warn("Autoplay o carga bloqueada:", err);
      });
    }

    function pauseTrack() {
      isPlaying = false;
      playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
      audio.pause();
    }

    playBtn.addEventListener('click', () => {
      if (isPlaying) pauseTrack();
      else playTrack();
    });

    prevBtn.addEventListener('click', () => {
      currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrack);
      if (isPlaying) playTrack();
    });

    nextBtn.addEventListener('click', () => {
      currentTrack = (currentTrack + 1) % playlist.length;
      loadTrack(currentTrack);
      if (isPlaying) playTrack();
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = pct + '%';
      }
    });

    audio.addEventListener('ended', () => {
      nextBtn.click();
    });

    progressContainer.addEventListener('click', (e) => {
      const width = progressContainer.clientWidth;
      const clickX = e.offsetX;
      if (audio.duration) {
        audio.currentTime = (clickX / width) * audio.duration;
      }
    });

    // Cargar la primera pista por defecto
    loadTrack(0);
