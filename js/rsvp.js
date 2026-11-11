/**
 * RSVP Form Handler with FormSubmit.co Integration
 * Forwards responses to tharindadilshan7@gmail.com without page redirect
 */
document.addEventListener('DOMContentLoaded', function() {
  const rsvpForm = document.getElementById('wedding-rsvp-form');
  const submitBtn = document.getElementById('rsvp-submit-btn');
  const submitText = document.getElementById('rsvp-submit-text');
  const submitSpinner = document.getElementById('rsvp-submit-spinner');
  const successModal = document.getElementById('rsvp-success-modal');
  const closeModalBtn = document.getElementById('close-rsvp-modal-btn');
  const guestSummaryEl = document.getElementById('rsvp-summary-guest');

  // Handle radio button active styling
  const radioCards = document.querySelectorAll('.rsvp-choice-card, .radio-card');
  radioCards.forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('change', () => {
        radioCards.forEach(c => c.classList.remove('active-radio'));
        if (radio.checked) {
          card.classList.add('active-radio');
        }
      });
    }
  });

  if (!rsvpForm) return;

  rsvpForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const fullName = document.getElementById('guest-name').value.trim();
    const email = document.getElementById('guest-email').value.trim();
    const phone = document.getElementById('guest-phone').value.trim();
    const attendanceRadio = document.querySelector('input[name="attending"]:checked');
    const guestCount = document.getElementById('guest-count').value;
    const message = document.getElementById('guest-message').value.trim();

    if (!attendanceRadio) {
      alert('Please select whether you will be able to attend or not.');
      return;
    }

    const attending = attendanceRadio.value;

    // Collect selected events
    const selectedEvents = [];
    document.querySelectorAll('input[name="events"]:checked').forEach(cb => {
      selectedEvents.push(cb.value);
    });

    // Prepare JSON payload for FormSubmit AJAX API
    const payload = {
      _subject: `💍 Wedding RSVP from ${fullName} (${attending})`,
      _template: 'box',
      _captcha: 'false',
      'Guest Name': fullName,
      'Email Address': email,
      'Phone / WhatsApp': phone,
      'Attendance Status': attending,
      'Number of Guests': attending === 'Attending with Joy' ? guestCount : '0 (Declined)',
      'Attending Events': selectedEvents.length > 0 ? selectedEvents.join(', ') : 'None specified',
      'Special Wishes / Notes': message || 'Best wishes to the couple!'
    };

    // UI Loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending RSVP...';
    if (submitSpinner) submitSpinner.style.display = 'inline-block';

    try {
      const response = await fetch('https://formsubmit.co/ajax/tharindadilshan7@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        // Show success modal
        if (guestSummaryEl) {
          guestSummaryEl.textContent = `Thank you, ${fullName}! Your response (${attending}) has been directly sent to Tharinda & Ranmini.`;
        }
        if (successModal) {
          successModal.classList.add('show');
        }
        rsvpForm.reset();
        radioCards.forEach(c => c.classList.remove('active-radio'));
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX notice:', err);
      // Fallback: If network or adblocker blocks FormSubmit, give friendly WhatsApp alternative
      const confirmWa = confirm(
        `Thank you ${fullName}! Would you like to also send your RSVP confirmation directly to Tharinda via WhatsApp?`
      );
      if (confirmWa) {
        const waMsg = encodeURIComponent(
          `Hi Tharinda & Ranmini! Here is my RSVP for your wedding:\nName: ${fullName}\nAttendance: ${attending}\nGuests: ${guestCount}\nBest wishes!`
        );
        window.open(`https://wa.me/94766509844?text=${waMsg}`, '_blank');
      }
      if (successModal) {
        if (guestSummaryEl) {
          guestSummaryEl.textContent = `Thank you, ${fullName}! Your RSVP note is noted for Tharinda & Ranmini.`;
        }
        successModal.classList.add('show');
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send RSVP Confirmation 💌';
      if (submitSpinner) submitSpinner.style.display = 'none';
    }
  });

  // Close modal
  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.classList.remove('show');
    });
  }

  // Click outside to close modal
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('show');
      }
    });
  }
});
