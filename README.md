# Tharinda & Ranmini Wedding Invitation Website

A premium, elegant, and fully responsive digital wedding invitation card for **Tharinda Dilshan & Ranmini Nisansala**. 

Designed with a luxurious cream, blush pink, and ivory palette, featuring custom entry gate animations, falling rose petals, background music player, photo gallery, countdown timer, and an integrated RSVP submission system.

---

## 📂 Project Directory Structure

```text
Wedding_Final/
├── index.html         # Main website layout
├── css/
│   └── style.css      # Luxury styles & animations
├── js/
│   └── main.js        # Dynamic logic, countdown & RSVP handler
├── images/
│   ├── pic1.jpeg      # Groom's photo
│   ├── pic2.jpeg      # Bride's photo
│   ├── pic3.jpeg      # Gallery item (Rings placeholder)
│   ├── pic4.jpeg      # Gallery item (Invitation placeholder)
│   ├── pic5.jpeg      # Gallery item (Couple photo 1)
│   ├── pic6.jpeg      # Gallery item (Couple photo 2)
│   ├── pic7.jpeg      # Gallery item (Bouquet placeholder)
│   ├── pic8.jpeg      # Gallery item (Cake placeholder)
│   ├── hotel.jpeg     # Venue photo (Amora Lagoon Hotel)
│   └── church.png     # Church photo (Seeduwa Church placeholder)
└── music/
    └── wed.mp3        # Background romantic music track
```

---

## 🔗 Personalized Guest Links

The website is equipped with a dynamic guest personalization engine. You can generate custom links to send to specific guests which will welcome them by name upon opening:

- **Format**: `https://yourdomain.com/?prefix=[PREFIX]&guest=[GUEST_NAME]`
- **Example 1**: `https://yourdomain.com/?prefix=Mr.&guest=Janaka+Silva`
  - *Displays*: **"Dear Mr. Janaka Silva"**
- **Example 2**: `https://yourdomain.com/?prefix=Miss.&guest=Ranmini`
  - *Displays*: **"Dear Miss. Ranmini"**
- **Example 3**: `https://yourdomain.com/?prefix=Dr.+%26+Mrs.&guest=Jayasinghe`
  - *Displays*: **"Dear Dr. & Mrs. Jayasinghe"**

If a guest opens the website without any URL parameters (e.g. `https://yourdomain.com/`), it automatically defaults to a beautiful generic heading: **"Welcome to Our Wedding Invitation"**.

---

## 💌 RSVP & Guest Reservation Setup (FormSubmit)

The RSVP form uses the free **FormSubmit** service to forward guest details directly to your email (`tharindadilshan7@gmail.com`) and log them in a database dashboard.

### 1. Activating the Email Endpoint (First-time setup)
Once you host the website online, you must activate the form:
1. Go to the website on your browser and scroll to the **RSVP section**.
2. Fill out the RSVP form with dummy details and click **Confirm Reservation**.
3. Check your Gmail inbox (`tharindadilshan7@gmail.com`) for an email from **FormSubmit**.
4. Click the **Activate Form** button in that email.
5. Your form is now active! All future submissions will automatically be forwarded to your inbox instantly.
*(Note: We have disabled CAPTCHAs in the HTML structure so that guests have a smooth, premium AJAX submit experience without puzzles).*

### 2. Downloading the Complete RSVP Datasheet (Spreadsheet)
To get the full list of who is attending and who is declining:
1. Log in to [FormSubmit.co](https://formsubmit.co/) using your email `tharindadilshan7@gmail.com` (you can create a free account if you haven't).
2. Go to your active endpoint dashboard.
3. You will see a clean, tabulated record of all guest details submitted (Names, Emails, Phones, Attendance statuses, Guest Counts, and Wishes).
4. Click the **Export to CSV / Excel** button in the top right to download your complete RSVP guest datasheet.

---

## 🚀 Free Hosting Guide

To host this website on the internet for free (just like your friend did):

### Option A: Vercel (Recommended - Same as friend's site)
1. Sign up for a free account at [Vercel](https://vercel.com/) (log in with GitHub or email).
2. Install the **Vercel CLI** or drag-and-drop your project folder directly into the Vercel dashboard.
3. To deploy via Drag-and-Drop:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Under the "Vercel Project" creator, drag and drop the `Wedding_Final` folder.
   - It will automatically deploy and give you a public URL (e.g. `tharinda-ranmini-wedding.vercel.app`) in 30 seconds!

### Option B: Netlify
1. Log into [Netlify](https://www.netlify.com/).
2. Drag and drop the `Wedding_Final` folder onto Netlify's deployment interface.
3. In seconds, your site is live with a free custom subdomain.

---

## 📸 Updating Photos in the Future

When your official preshoot and venue photos are ready, you can easily update the website:
1. Crop and save your new photos under the exact filenames matching those in the `images/` directory (e.g., `pic1.jpeg`, `pic2.jpeg`, `pic3.jpeg`, `hotel.jpeg`, `church.png`).
2. Overwrite the files inside the `images/` folder with your new photos.
3. Push/Re-upload the files to your hosting server (Vercel/Netlify). The website will immediately reflect the new images.
