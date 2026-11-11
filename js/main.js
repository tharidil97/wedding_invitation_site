/**
 * Tharinda & Ranmini Wedding Invitation
 * Modern Controller: Glass Nav, Audio Player, Mobile Menu, Lightbox, Calendar & RSVP
 */

document.addEventListener('DOMContentLoaded', function() {
  // ----------------------------------------------------
  // 1. Glass Navigation Scroll & Mobile Drawer
  // ----------------------------------------------------
  const navHeader = document.getElementById('main-nav-header');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      if (navHeader) navHeader.classList.add('scrolled');
    } else {
      if (navHeader) navHeader.classList.remove('scrolled');
    }
  });

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNavDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (mobileNavDrawer.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // ----------------------------------------------------
  // 2. Romantic Audio Player with Immediate Autoplay
  // ----------------------------------------------------
  const audioEl = document.getElementById('wedding-audio');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  let isPlaying = false;
  let userManuallyPaused = false;
  let synthInterval = null;
  let audioCtx = null;

  if (audioEl) {
    audioEl.volume = 0.7;

    audioEl.addEventListener('play', () => {
      isPlaying = true;
      updateMusicUI(true);
    });

    audioEl.addEventListener('pause', () => {
      if (!synthInterval) {
        isPlaying = false;
        updateMusicUI(false);
      }
    });
  }

  function playMusic() {
    if (!audioEl || userManuallyPaused) return;
    // Attempt to play; browsers allow muted autoplay, so start muted then unmute on success
    const playPromise = audioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Unmute after the first successful playback
        audioEl.muted = false;
        isPlaying = true;
        updateMusicUI(true);
      }).catch(err => {
        console.log('Autoplay deferred pending user gesture:', err);
      });
    }
  }

  function pauseMusic() {
    userManuallyPaused = true;
    if (audioEl) audioEl.pause();
    stopSynthMelody();
    isPlaying = false;
    updateMusicUI(false);
  }

  function updateMusicUI(playing) {
    if (!musicToggleBtn) return;
    if (playing) {
      musicToggleBtn.classList.add('playing');
      musicToggleBtn.title = 'Mute Music ♫';
    } else {
      musicToggleBtn.classList.remove('playing');
      musicToggleBtn.title = 'Play Music ♫';
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (isPlaying) {
        pauseMusic();
      } else {
        userManuallyPaused = false;
        playMusic();
      }
    });
  }

  // Attempt autoplay immediately on load
  playMusic();
  window.addEventListener('load', playMusic);

  // Fallback: If browser policy blocked unmuted autoplay before any gesture,
  // start music on the very first touch, scroll, pointer, or key gesture anywhere!
  const triggerEvents = ['click', 'touchstart', 'touchend', 'scroll', 'pointerdown', 'wheel', 'keydown'];
  function onFirstMicroInteraction() {
    if (!isPlaying && !userManuallyPaused) {
      playMusic();
    }
    // Remove listeners once playback starts
    if (isPlaying) {
      triggerEvents.forEach(evt => window.removeEventListener(evt, onFirstMicroInteraction));
    }
  }
  triggerEvents.forEach(evt => {
    window.addEventListener(evt, onFirstMicroInteraction, { passive: true });
  });

  // Web Audio romantic piano synthesizer fallback (Canon in D chords)
  function startSynthMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const chords = [
        [293.66, 369.99, 440.00, 587.33], // D maj
        [220.00, 277.18, 329.63, 440.00], // A maj
        [246.94, 293.66, 369.99, 493.88], // B min
        [185.00, 220.00, 277.18, 369.99], // F# min
        [196.00, 246.94, 293.66, 392.00], // G maj
        [146.83, 220.00, 293.66, 369.99], // D maj
        [196.00, 246.94, 293.66, 392.00], // G maj
        [220.00, 329.63, 440.00, 554.37]  // A maj
      ];

      let chordIndex = 0;
      function playStep() {
        if (!isPlaying || !audioCtx) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((freq, i) => {
          setTimeout(() => {
            if (!isPlaying || !audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

            gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 1.9);
          }, i * 350);
        });
      }

      playStep();
      synthInterval = setInterval(playStep, 2800);
    } catch(e) {
      console.log('WebAudio not available', e);
    }
  }

  function stopSynthMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  // ----------------------------------------------------
  // 3. Pre-Shoot Animated Reel & Lightbox Modal
  // ----------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-card-item');
  const galleryTrack = document.getElementById('gallery-track');
  const galleryViewport = document.getElementById('gallery-viewport');
  const galleryCtrlPrev = document.getElementById('gallery-ctrl-prev');
  const galleryCtrlNext = document.getElementById('gallery-ctrl-next');

  const lightboxModal = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  // The 6 unique pre-shoot moments
  const uniqueGallery = [
    { src: 'assets/images/gallery-1.jpg', caption: 'Sunset Stroll by the Ocean' },
    { src: 'assets/images/gallery-2.jpg', caption: 'Under the Floral Archway' },
    { src: 'assets/images/gallery-3.jpg', caption: 'Sweet Laughter & Golden Hours' },
    { src: 'assets/images/gallery-4.jpg', caption: 'Walking Towards Forever' },
    { src: 'assets/images/gallery-5.jpg', caption: 'The Promise of a Lifetime' },
    { src: 'assets/images/gallery-6.jpg', caption: 'Underneath the Starlit Sky' }
  ];

  let currentGalleryIndex = 0;
  let resumeTimer = null;

  // Directional arrow navigation ('ehata mehata')
  function pauseAndShift(direction) {
    if (!galleryTrack) return;
    try {
      galleryTrack.classList.add('is-paused');
      const style = window.getComputedStyle(galleryTrack);
      let curX = 0;
      if (window.DOMMatrixReadOnly && style.transform && style.transform !== 'none') {
        const matrix = new DOMMatrixReadOnly(style.transform);
        curX = matrix.m41;
      } else if (window.WebKitCSSMatrix && style.transform && style.transform !== 'none') {
        const matrix = new WebKitCSSMatrix(style.transform);
        curX = matrix.m41;
      }

      const halfWidth = galleryTrack.scrollWidth / 2;
      const delta = direction === 'next' ? -340 : 340;
      let targetX = curX + delta;

      if (targetX > 0) targetX = -halfWidth + 200;
      if (targetX < -halfWidth) targetX = -100;

      galleryTrack.style.animationPlayState = 'paused';
      galleryTrack.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
      galleryTrack.style.transform = `translateX(${targetX}px)`;

      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        galleryTrack.style.transition = '';
        galleryTrack.style.transform = '';
        galleryTrack.style.animationPlayState = '';
        galleryTrack.classList.remove('is-paused');
      }, 4000);
    } catch (err) {
      console.log('Shift notice:', err);
    }
  }

  if (galleryCtrlPrev) {
    galleryCtrlPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      pauseAndShift('prev');
    });
  }

  if (galleryCtrlNext) {
    galleryCtrlNext.addEventListener('click', (e) => {
      e.stopPropagation();
      pauseAndShift('next');
    });
  }

  // Touch gesture pause on mobile
  if (galleryTrack) {
    galleryTrack.addEventListener('touchstart', () => {
      galleryTrack.classList.add('is-paused');
    }, { passive: true });

    galleryTrack.addEventListener('touchend', () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        galleryTrack.classList.remove('is-paused');
      }, 3000);
    }, { passive: true });
  }

  // Click card to open in Lightbox modal
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const idxAttr = item.getAttribute('data-index');
      const idx = idxAttr ? parseInt(idxAttr, 10) : 0;
      openLightbox(idx);
    });
  });

  function openLightbox(index) {
    if (!lightboxModal || !uniqueGallery[index]) return;
    currentGalleryIndex = index;
    lightboxImg.src = uniqueGallery[index].src;
    lightboxCaption.textContent = uniqueGallery[index].caption;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % uniqueGallery.length;
    openLightbox(currentGalleryIndex);
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + uniqueGallery.length) % uniqueGallery.length;
    openLightbox(currentGalleryIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // ----------------------------------------------------
  // 4. Add to Calendar (Google Calendar & Apple/Outlook iCal)
  // ----------------------------------------------------
  const btnGoogleCal = document.getElementById('btn-google-calendar');
  const btnIcal = document.getElementById('btn-download-ical');

  // Event details: Dec 11, 2026, 15:00 to 23:30 SLT (+05:30) => UTC 09:30 to 18:00
  const eventDetails = {
    title: 'Wedding of Tharinda & Ranmini 💍',
    description: 'Together Forever! Tharinda & Ranmini invite you to celebrate their wedding.\\n\\nSchedule:\\n• 3:00 PM: Church Mass at Immaculate Conception Virgin Mary\'s Church, Seeduwa\\n• 5:30 PM: Poruwa Ceremony at Amora Lagoon Hotel Garden\\n• 7:00 PM: Grand Reception at Hindana Ballroom, Amora Lagoon Hotel, Katunayake\\n\\nHotlines: 0766509844 / 0778659742',
    location: 'Amora Lagoon Hotel, Katunayake, Sri Lanka',
    startUtc: '20261211T093000Z',
    endUtc: '20261211T180000Z'
  };

  if (btnGoogleCal) {
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${eventDetails.startUtc}/${eventDetails.endUtc}&details=${encodeURIComponent(eventDetails.description.replace(/\\n/g, '\n'))}&location=${encodeURIComponent(eventDetails.location)}`;
    btnGoogleCal.href = gCalUrl;
    btnGoogleCal.target = '_blank';
  }

  if (btnIcal) {
    btnIcal.addEventListener('click', function(e) {
      e.preventDefault();
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Tharinda & Ranmini//Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${eventDetails.title}`,
        `DESCRIPTION:${eventDetails.description}`,
        `LOCATION:${eventDetails.location}`,
        `DTSTART:${eventDetails.startUtc}`,
        `DTEND:${eventDetails.endUtc}`,
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Tharinda_and_Ranmini_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ----------------------------------------------------
  // 5. Copy Link to Clipboard
  // ----------------------------------------------------
  const copyBtns = document.querySelectorAll('.btn-copy-link');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          showToast('💌 Invitation link copied to clipboard!');
        });
      } else {
        const temp = document.createElement('input');
        temp.value = url;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast('💌 Invitation link copied to clipboard!');
      }
    });
  });

  function showToast(msg) {
    let toast = document.getElementById('wedding-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'wedding-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: #231830;
        color: #ffffff;
        padding: 12px 26px;
        border-radius: 30px;
        font-size: 0.9rem;
        font-family: 'Plus Jakarta Sans', sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        border: 1px solid rgba(125, 91, 166, 0.4);
        z-index: 1000000;
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 3200);
  }
});
