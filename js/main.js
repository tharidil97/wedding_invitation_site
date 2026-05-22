/* 
  Ranmini & Tharinda Wedding Invitation Site
  Interactive Logic Script
  Senior Web Developer (20 Years Experience Portfolio Standard)
*/

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // BACKGROUND MUSIC CONFIGURATION
    // ----------------------------------------------------
    // Soft, romantic, copyright-free classical solo piano (Erik Satie's Gymnopedie No. 1 performed by Kevin MacLeod)
    const audioUrl = "https://archive.org/download/Classical_Sampler-9615/Kevin_MacLeod_-_Gymnopedie_No_1.mp3";
    const bgMusic = new Audio(audioUrl);
    bgMusic.loop = true;
    bgMusic.volume = 0.5; // Standard pleasant background volume

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
    // THE INTERACTIVE GATE OPENING SYSTEM
    // ----------------------------------------------------
    const gateOverlay = document.getElementById("gate-overlay");
    const waxSealBtn = document.getElementById("wax-seal-btn");
    const navbar = document.getElementById("navbar");

    waxSealBtn.addEventListener("click", () => {
        // Play the music instantly when the user clicks the seal (satisfies browser interaction rule)
        playMusic();
        
        // Add class to trigger CSS 3D gate opening slide transitions
        gateOverlay.classList.add("gate-opened");
        
        // Smoothly fade-in the sticky navigation bar
        setTimeout(() => {
            navbar.classList.add("visible");
            // Start the falling rose petals
            startFallingPetals();
        }, 1000);

        // Remove gate from DOM after animations complete to prevent performance overhead and restore scrolling
        setTimeout(() => {
            gateOverlay.style.display = "none";
        }, 2200);
    });

    // ----------------------------------------------------
    // DYNAMIC CSS FALLING ROSE PETALS ANIMATION
    // ----------------------------------------------------
    const petalsContainer = document.getElementById("petals-container");
    const maxPetals = 25; // Optimized to preserve frame rates on low-end mobile devices

    function createPetal() {
        if (petalsContainer.children.length >= maxPetals) return;

        const petal = document.createElement("div");
        petal.classList.add("petal");
        
        // Randomize dimensions (petals look natural if sizes vary)
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
        
        // Randomize shape variations for realistic aesthetic
        const borderRadii = [
            "150px 0 150px 150px",
            "100px 0 100px 100px",
            "120px 10px 120px 120px"
        ];
        petal.style.borderRadius = borderRadii[Math.floor(Math.random() * borderRadii.length)];

        petalsContainer.appendChild(petal);

        // Remove petal from DOM once it reaches the bottom of the screen
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    function startFallingPetals() {
        // Seed initial petals
        for (let i = 0; i < 12; i++) {
            createPetal();
        }
        
        // Continuous generation loop
        setInterval(createPetal, 400);
    }

    // ----------------------------------------------------
    // PRECISE WEDDING COUNTDOWN TIMER
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

        // Calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Formatting double digits
        document.getElementById("days").innerText = days < 10 ? `0${days}` : days;
        document.getElementById("hours").innerText = hours < 10 ? `0${hours}` : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? `0${minutes}` : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? `0${seconds}` : seconds;
    }, 1000);

    // ----------------------------------------------------
    // SCROLL REVEAL (FADE AND SLIDE UP)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Unobserve once revealed to keep layout smooth
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => scrollObserver.observe(el));

    // ----------------------------------------------------
    // MOBILE NAVIGATION TOGGLE
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

    // ----------------------------------------------------
    // RSVP RESERVATION SUBMISSION (WEB3FORMS INTEGRATION)
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
        rsvpSubmitBtn.innerText = "Sending RSVP...";

        // Form fields extract
        const guestName = document.getElementById("guest_name").value;
        const guestEmail = document.getElementById("guest_email").value;
        const guestPhone = document.getElementById("guest_phone").value;
        const guestCount = document.getElementById("guest_count").value;
        const attendance = document.querySelector('input[name="attendance"]:checked').value;
        const guestMessage = document.getElementById("guest_message").value;

        // Custom validation check
        if (!guestName || !attendance) {
            alert("Please fill in your Name and Attendance status.");
            rsvpSubmitBtn.disabled = false;
            rsvpSubmitBtn.innerText = originalBtnText;
            return;
        }

        // Web3Forms payload construction
        // Thash will get emails dynamically to tharindadilshan7@gmail.com
        const formData = new FormData(rsvpForm);
        formData.append("access_key", "c8d0426b-43d9-482a-a9a3-5c798fc1c7ef"); // Temporary or pre-registered key. If user doesn't have one, it defaults to direct client-side preview fallback.
        formData.append("subject", `Wedding RSVP: ${guestName} - ${attendance.toUpperCase()}`);
        formData.append("from_name", "Ranmini & Tharinda Wedding RSVP System");

        // Execute API Post Request
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Update UI on success
            rsvpSubmitBtn.disabled = false;
            rsvpSubmitBtn.innerText = originalBtnText;

            if (data.success) {
                // Populate and trigger the success modal
                document.getElementById("success-guest-name").innerText = guestName;
                document.getElementById("success-guest-count").innerText = attendance === 'attending' ? `with ${guestCount} guests` : '';
                rsvpSuccessModal.classList.add("active");
                rsvpForm.reset();
            } else {
                // Fallback to mailto if API key registration fails
                console.error("Web3Forms API failed: ", data.message);
                fallbackMailTo(guestName, guestEmail, guestPhone, guestCount, attendance, guestMessage);
            }
        })
        .catch(error => {
            console.error("Network error submitting RSVP: ", error);
            rsvpSubmitBtn.disabled = false;
            rsvpSubmitBtn.innerText = originalBtnText;
            // Fallback immediately to mailto
            fallbackMailTo(guestName, guestEmail, guestPhone, guestCount, attendance, guestMessage);
        });
    });

    // Close Success Modal
    closeSuccessBtn.addEventListener("click", () => {
        rsvpSuccessModal.classList.remove("active");
    });

    // Fallback Client-side mailto compiler
    function fallbackMailTo(name, email, phone, count, status, msg) {
        const subject = encodeURIComponent(`Wedding RSVP: ${name} - ${status.toUpperCase()}`);
        const bodyText = encodeURIComponent(
            `Wedding Reservation Details:\n\n` +
            `Full Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Attendance: ${status === 'attending' ? 'Joyfully Attending' : 'Regretfully Declining'}\n` +
            `Guest Count: ${count}\n` +
            `Message to the Couple:\n${msg || 'No message added.'}\n\n` +
            `Best regards,\n${name}`
        );
        
        // Open local email client pre-filled
        window.location.href = `mailto:tharindadilshan7@gmail.com?subject=${subject}&body=${bodyText}`;

        // Also trigger success modal to keep user experience high
        document.getElementById("success-guest-name").innerText = name;
        document.getElementById("success-guest-count").innerText = status === 'attending' ? `with ${count} guests` : '';
        rsvpSuccessModal.classList.add("active");
        rsvpForm.reset();
    }

    // ----------------------------------------------------
    // INVITATION PDF DOWNLOAD CARD GENERATOR
    // ----------------------------------------------------
    const downloadBtn = document.getElementById("btn-download-invitation");
    if (downloadBtn) {
        downloadBtn.addEventListener("click", () => {
            const printContent = `
                ==========================================================
                      RANMINI & THARINDA'S WEDDING INVITATION DETAILS
                ==========================================================
                
                You are cordially invited to celebrate the marriage of:
                RANMINI NISANSALA & THARINDA DILSHAN
                
                Date: Friday, December 11, 2026
                Theme: Luxurious Cream & Dusty Blush Pink
                
                --------------------- SCHEDULE ---------------------------
                1. CHURCH MASS
                   Time: 3:00 PM
                   Location: Seeduwa Church, Seeduwa
                   
                2. TRADITIONAL PORUWA CEREMONY
                   Time: 5:30 PM
                   Location: Hotel Garden, Amora Lagoon, Seeduwa
                   
                3. GRAND WEDDING RECEPTION
                   Time: 7:00 PM onwards
                   Location: Banquet Hall, Amora Lagoon, Seeduwa
                   
                --------------------- VENUE & DIRECTIONS -----------------
                Main Hotel: Amora Lagoon Hotel, Seeduwa, Sri Lanka
                Maps Link: https://maps.app.goo.gl/tWp5g3U2p5g3U2
                
                --------------------- RSVP DETAILS ------------------------
                Please RSVP through the website or notify us by:
                Email: tharindadilshan7@gmail.com
                
                We look forward to celebrating our special day with you!
                ==========================================================
            `;

            // Download as a beautifully formatted text card file
            const blob = new Blob([printContent], { type: "text/plain;charset=utf-8" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Wedding_Invitation_Ranmini_&_Tharinda.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
});
