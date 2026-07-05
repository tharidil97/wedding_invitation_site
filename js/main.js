/* 
  Tharinda & Ranmini Wedding Invitation Site
  Interactive Logic Script
  Senior Web Developer (20 Years Experience Portfolio Standard)
*/

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. BACKGROUND MUSIC CONFIGURATION
    // ----------------------------------------------------
    const bgMusic = new Audio("music/wed.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.4; // A pleasant background volume level

    const musicToggle = document.getElementById("music-toggle");
    let isMusicPlaying = false;

    function playMusic() {
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
                musicToggle.classList.add("playing");
                musicToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            })
            .catch(err => {
                console.log("Audio autoplay prevented by browser. Music will play on user interaction.", err);
            });
    }

    function pauseMusic() {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove("playing");
        musicToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }

    // Toggle Music Button Click
    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isMusicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // ----------------------------------------------------
    // 2. THE INTERACTIVE GATE OPENING SYSTEM
    // ----------------------------------------------------
    const gateOverlay = document.getElementById("gate-overlay");
    const waxSealBtn = document.getElementById("wax-seal-btn");
    const navbar = document.getElementById("navbar");

    // Check if user already visited in this session to skip gate (optional, but let's keep the gate for the experience)
    waxSealBtn.addEventListener("click", () => {
        // Start background music instantly upon user interaction
        playMusic();
        
        // Add class to trigger CSS 3D gate opening slide transitions
        gateOverlay.classList.add("gate-opened");
        
        // Smoothly fade-in the sticky navigation bar
        setTimeout(() => {
            navbar.classList.add("visible");
            // Start the falling rose petals
            startFallingPetals();
        }, 1000);

        // Remove gate from DOM after animations complete to prevent scroll blocking
        setTimeout(() => {
            gateOverlay.style.display = "none";
        }, 2200);
    });

    // ----------------------------------------------------
    // 3. DYNAMIC CSS FALLING ROSE PETALS ANIMATION
    // ----------------------------------------------------
    const petalsContainer = document.getElementById("petals-container");
    const maxPetals = 25; // Keep low for optimal frame rates on low-end mobile devices

    // Palette of ivory/cream and blush pink shades
    const petalColors = [
        "#FFE5EC", // blush pink
        "#FFC2D1", // light rose
        "#F3D7D7", // cream pink
        "#FDFBF7", // ivory
        "#FFF0F5"  // lavender blush
    ];

    function createPetal() {
        if (!petalsContainer || petalsContainer.children.length >= maxPetals) return;

        const petal = document.createElement("div");
        petal.classList.add("petal");
        
        // Randomize dimensions
        const size = Math.random() * 12 + 10; // 10px to 22px
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        
        // Randomize screen positioning
        petal.style.left = `${Math.random() * 100}vw`;
        
        // Randomize starting delay and falling speed
        const duration = Math.random() * 6 + 7; // 7s to 13s
        const delay = Math.random() * 2;
        petal.style.animationDuration = `${duration}s`;
        petal.style.animationDelay = `${delay}s`;
        
        // Randomize rotation angles and opacity
        const opacity = Math.random() * 0.4 + 0.5; // 0.5 to 0.9
        petal.style.opacity = opacity;
        
        // Assign a luxury themed rose color
        petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        
        // Shape variations
        const borderRadii = [
            "150px 0 150px 150px",
            "100px 0 100px 100px",
            "120px 10px 120px 120px"
        ];
        petal.style.borderRadius = borderRadii[Math.floor(Math.random() * borderRadii.length)];

        petalsContainer.appendChild(petal);

        // Clean up from DOM once it reaches bottom
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    function startFallingPetals() {
        // Initial batch
        for (let i = 0; i < 10; i++) {
            createPetal();
        }
        // Continuous cycle
        setInterval(createPetal, 450);
    }

    // ----------------------------------------------------
    // 4. PRECISE WEDDING COUNTDOWN TIMER
    // ----------------------------------------------------
    // Target date: Dec 11, 2026 at 3:00 PM (Church Mass)
    const weddingDate = new Date("Dec 11, 2026 15:00:00").getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference <= 0) {
            clearInterval(countdownTimer);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            document.querySelector(".countdown-sub").innerText = "Happily Married!";
            return;
        }

        // Time Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Display update
        document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
        document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
    }, 1000);

    // ----------------------------------------------------
    // 5. DYNAMIC URL PARAMETER GUEST PERSONALIZATION
    // ----------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const guestPrefix = urlParams.get('prefix');
    const guestName = urlParams.get('guest');

    const prefixEl = document.getElementById("guest-prefix");
    const nameEl = document.getElementById("guest-name");
    const introTextEl = document.getElementById("default-invitation-text");

    if (guestName) {
        // Clean name parameter (e.g. "Ranmini" or "Dr. Silva")
        const formattedName = decodeURIComponent(guestName).trim();
        nameEl.innerText = formattedName;

        if (guestPrefix) {
            const formattedPrefix = decodeURIComponent(guestPrefix).trim();
            prefixEl.innerText = formattedPrefix;
        } else {
            // Default elegant prefix if name is present but prefix is empty
            prefixEl.innerText = "Dearest";
        }
        introTextEl.innerText = "We cordially invite you to witness and celebrate the union of our lives in love and commitment.";
    } else {
        // Default welcoming state if no parameters are present
        prefixEl.style.display = "none";
        nameEl.innerText = "Welcome to Our Wedding Invitation";
        nameEl.style.fontSize = "2.1rem";
        introTextEl.innerText = "Dearest family and friends, you are cordially invited to witness and celebrate the union of our lives in love and commitment.";
    }

    // ----------------------------------------------------
    // 6. SCROLL REVEAL (FADE AND SLIDE UP)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => scrollObserver.observe(el));

    // ----------------------------------------------------
    // 7. MOBILE NAVIGATION TOGGLE
    // ----------------------------------------------------
    const navToggleBtn = document.getElementById("nav-toggle-btn");
    const navLinks = document.getElementById("nav-links");

    navToggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
            navToggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Close menu when clicking any nav link
    const links = navLinks.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Highlight active link on scroll
    const sections = document.querySelectorAll("section, header");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(a => {
            a.classList.remove("active");
            if (a.getAttribute("href") === `#${current}`) {
                a.classList.add("active");
            }
        });
    });

    // ----------------------------------------------------
    // 8. LIGHTBOX GALLERY
    // ----------------------------------------------------
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");
    
    let activeImageIndex = 0;
    const galleryImagesList = [];

    // Construct image registry for slides
    galleryItems.forEach((item, index) => {
        const img = item.querySelector(".gallery-img");
        galleryImagesList.push({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt")
        });

        item.addEventListener("click", () => {
            activeImageIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.style.display = "flex";
        document.body.style.overflow = "hidden"; // Lock screen scrolling
        updateLightboxImage();
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }

    function updateLightboxImage() {
        const item = galleryImagesList[activeImageIndex];
        lightboxImg.src = item.src;
        lightboxCaption.innerText = item.alt;
    }

    function nextImage() {
        activeImageIndex = (activeImageIndex + 1) % galleryImagesList.length;
        updateLightboxImage();
    }

    function prevImage() {
        activeImageIndex = (activeImageIndex - 1 + galleryImagesList.length) % galleryImagesList.length;
        updateLightboxImage();
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxNext.addEventListener("click", (e) => { e.stopPropagation(); nextImage(); });
    lightboxPrev.addEventListener("click", (e) => { e.stopPropagation(); prevImage(); });
    lightbox.addEventListener("click", closeLightbox);
    
    // Key bindings for lightbox
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        }
    });

    // ----------------------------------------------------
    // 9. RSVP FORM SUBMISSION (FORMSUBMIT AJAX INTEGRATION)
    // ----------------------------------------------------
    const rsvpForm = document.getElementById("wedding-rsvp-form");
    const rsvpSuccessModal = document.getElementById("rsvp-success-modal");
    const rsvpSubmitBtn = rsvpForm.querySelector(".btn-rsvp-submit");
    const closeSuccessBtn = document.getElementById("btn-close-success");

    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // UI Loading State
        const originalBtnText = rsvpSubmitBtn.innerText;
        rsvpSubmitBtn.disabled = true;
        rsvpSubmitBtn.innerText = "Sending Reservation...";

        // Fields values extraction
        const guestNameVal = document.getElementById("guest_name").value;
        const guestCountVal = document.getElementById("guest_count").value;
        const attendanceRadio = document.querySelector('input[name="Attendance"]:checked').value;

        // Custom payload values
        const formAction = rsvpForm.getAttribute("action");
        const formData = new FormData(rsvpForm);

        // Perform background post request
        fetch(formAction, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("FormSubmit server responded with an error.");
            }
        })
        .then(data => {
            // Restore UI Submit state
            rsvpSubmitBtn.disabled = false;
            rsvpSubmitBtn.innerText = originalBtnText;

            // Trigger success modal
            showSuccessModal(guestNameVal, guestCountVal, attendanceRadio);
            rsvpForm.reset();
        })
        .catch(error => {
            console.error("Submit error: ", error);
            rsvpSubmitBtn.disabled = false;
            rsvpSubmitBtn.innerText = originalBtnText;
            
            // Execute fallback mailto option for safety and complete offline-first support
            fallbackMailToSubmission();
        });
    });

    function showSuccessModal(name, count, status) {
        document.getElementById("success-guest-name").innerText = name;
        const detailEl = document.getElementById("success-guest-details");
        if (status === "Accept") {
            detailEl.innerText = `confirming attendance for ${count} guest(s)`;
        } else {
            detailEl.innerText = "regretfully declining our invitation";
        }
        rsvpSuccessModal.classList.add("active");
    }

    closeSuccessBtn.addEventListener("click", () => {
        rsvpSuccessModal.classList.remove("active");
    });

    // Fallback Client-side mailto compiler
    function fallbackMailToSubmission() {
        const name = document.getElementById("guest_name").value;
        const email = document.getElementById("guest_email").value;
        const phone = document.getElementById("guest_phone").value;
        const count = document.getElementById("guest_count").value;
        const status = document.querySelector('input[name="Attendance"]:checked').value;
        const message = document.getElementById("guest_message").value;

        const subject = encodeURIComponent(`Wedding RSVP: ${name} - ${status.toUpperCase()}`);
        const bodyText = encodeURIComponent(
            `Wedding Reservation Details:\n\n` +
            `Full Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Attendance: ${status === 'Accept' ? 'Will Attend' : 'Regretfully Decline'}\n` +
            `Guest Count: ${count}\n` +
            `Message/Wishes:\n${message || 'No messages.'}\n\n` +
            `Best regards,\n${name}`
        );
        
        // Open local client
        window.location.href = `mailto:tharindadilshan7@gmail.com?subject=${subject}&body=${bodyText}`;

        // Show standard success modal to keep UI consistent
        showSuccessModal(name, count, status);
        rsvpForm.reset();
    }

    // ----------------------------------------------------
    // 10. INVITATION CARD OFFLINE TEXT DOWNLOADER
    // ----------------------------------------------------
    const downloadBtn = document.getElementById("btn-download-invitation");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            const printContent = `
==========================================================
      THARINDA & RANMINI'S WEDDING INVITATION DETAILS
==========================================================

Dearest Guest,

You are cordially invited to celebrate the marriage of:
THARINDA DILSHAN & RANMINI NISANSALA

Date: Friday, December 11, 2026
Theme: Luxurious Cream & Dusty Blush Pink

--------------------- SCHEDULE ---------------------------
1. CHURCH MASS
   Time: 3:00 PM
   Location: Immaculate Conception Virgin Mary's Church, Seeduwa
   
2. TRADITIONAL PORUWA CEREMONY
   Time: 5:30 PM
   Location: Hotel Garden, Amora Lagoon, Seeduwa
   
3. GRAND WEDDING RECEPTION
   Time: 7:00 PM onwards
   Location: Main Banquet Hall, Amora Lagoon, Seeduwa
   
--------------------- VENUES & DIRECTIONS ----------------
Church Location Address:
   Kotugoda Rd, Seeduwa 11410
   Map Link: https://www.google.com/maps/search/?api=1&query=Immaculate+Conception+Virgin+Mary's+Church+Seeduwa

Reception Venue:
   Amora Lagoon Hotel, Seeduwa
   Map Link: https://google.com/maps/place/Amora+Lagoon/@7.139736,79.8685271,1111m/data=!3m1!1e3!4m5!3m4!1s0x0:0xc0a8f677e4ef0f8c!8m2!3d7.1411721!4d79.8683769?hl=en-US

--------------------- RSVP DETAILS ------------------------
Please RSVP through the website or notify us by:
   Email: tharindadilshan7@gmail.com

We look forward to celebrating our special day with you!
==========================================================
            `.trim();

            const blob = new Blob([printContent], { type: "text/plain;charset=utf-8" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Wedding_Invitation_Tharinda_&_Ranmini.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});

// ----------------------------------------------------
// 11. PLUS CODE CLIPBOARD COPY HELPER
// ----------------------------------------------------
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHtml = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        button.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
        
        setTimeout(() => {
            button.innerHTML = originalHtml;
            button.style.backgroundColor = 'transparent';
        }, 2500);
    }).catch(err => {
        console.error("Could not copy address plus code: ", err);
    });
}
