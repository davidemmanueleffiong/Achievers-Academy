/**
 * ==============================================================================
 * ACHIEVERS ACADEMY - FORMS VALIDATION & SUBMISSION HANDLER
 * Handles Admissions and Contact form validation, accessibility, and
 * transparent static preview rendering.
 * ==============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initAdmissionsForm();
  initContactForm();
  initModalCloseHandlers();
});

/**
 * ------------------------------------------------------------------------------
 * Helper: Sensible Phone Number Validation
 * Accepts local, national, and international formats (min 7 digits, allowed symbols: +, -, (, ), spaces)
 * ------------------------------------------------------------------------------
 */
function isValidPhone(phone) {
  const trimmed = phone.trim();
  // Strip allowed formatting characters to count raw digits
  const digitsOnly = trimmed.replace(/[\s\-\(\)\+\.]/g, '');
  // Must contain between 7 and 15 digits, and only valid phone characters
  const validChars = /^[\d\s\-\(\)\+\.]{7,25}$/;
  return validChars.test(trimmed) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * ------------------------------------------------------------------------------
 * Helper: Email Format Validation
 * Standard RFC 5322 compatible regex check
 * ------------------------------------------------------------------------------
 */
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(String(email).toLowerCase().trim());
}

/**
 * ------------------------------------------------------------------------------
 * Helper: Field Error Rendering & Accessible ARIA Updates
 * ------------------------------------------------------------------------------
 */
function setFieldError(field, errorMsgId, message) {
  field.classList.add('is-invalid');
  field.setAttribute('aria-invalid', 'true');
  const errorEl = document.getElementById(errorMsgId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    field.setAttribute('aria-describedby', errorMsgId);
  }
}

function clearFieldError(field, errorMsgId) {
  field.classList.remove('is-invalid');
  field.removeAttribute('aria-invalid');
  const errorEl = document.getElementById(errorMsgId);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

/**
 * ------------------------------------------------------------------------------
 * Admissions Form Handler
 * ------------------------------------------------------------------------------
 */
function initAdmissionsForm() {
  const form = document.getElementById('admissions-form');
  if (!form) return;

  // Real-time error clearing when user edits a field
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      clearFieldError(input, `${input.id}-error`);
    });
    input.addEventListener('change', () => {
      clearFieldError(input, `${input.id}-error`);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;
    let firstErrorField = null;

    // Student Information Fields
    const studentName = document.getElementById('student-name');
    const studentDob = document.getElementById('student-dob');
    const studentGender = document.getElementById('student-gender');
    const studentClass = document.getElementById('student-class');
    const previousSchool = document.getElementById('previous-school');

    // Parent/Guardian Information Fields
    const parentName = document.getElementById('parent-name');
    const parentRelationship = document.getElementById('parent-relationship');
    const parentPhone = document.getElementById('parent-phone');
    const parentEmail = document.getElementById('parent-email');
    const parentAddress = document.getElementById('parent-address');

    // Additional Fields
    const admissionTerm = document.getElementById('admission-term');
    const studentNotes = document.getElementById('student-notes');
    const consentCheck = document.getElementById('consent-check');

    // 1. Student Name
    if (!studentName.value.trim()) {
      setFieldError(studentName, 'student-name-error', 'Please enter the student\'s full name.');
      hasErrors = true;
      firstErrorField = firstErrorField || studentName;
    } else {
      clearFieldError(studentName, 'student-name-error');
    }

    // 2. Student Date of Birth
    if (!studentDob.value) {
      setFieldError(studentDob, 'student-dob-error', 'Please select the student\'s date of birth.');
      hasErrors = true;
      firstErrorField = firstErrorField || studentDob;
    } else {
      clearFieldError(studentDob, 'student-dob-error');
    }

    // 3. Gender
    if (!studentGender.value) {
      setFieldError(studentGender, 'student-gender-error', 'Please select a gender option or choose "Prefer not to say".');
      hasErrors = true;
      firstErrorField = firstErrorField || studentGender;
    } else {
      clearFieldError(studentGender, 'student-gender-error');
    }

    // 4. Class applying for
    if (!studentClass.value) {
      setFieldError(studentClass, 'student-class-error', 'Please select the class or level applying for.');
      hasErrors = true;
      firstErrorField = firstErrorField || studentClass;
    } else {
      clearFieldError(studentClass, 'student-class-error');
    }

    // 5. Parent / Guardian Name
    if (!parentName.value.trim()) {
      setFieldError(parentName, 'parent-name-error', 'Please enter the parent or guardian\'s full name.');
      hasErrors = true;
      firstErrorField = firstErrorField || parentName;
    } else {
      clearFieldError(parentName, 'parent-name-error');
    }

    // 6. Relationship
    if (!parentRelationship.value) {
      setFieldError(parentRelationship, 'parent-relationship-error', 'Please specify the relationship to the student.');
      hasErrors = true;
      firstErrorField = firstErrorField || parentRelationship;
    } else {
      clearFieldError(parentRelationship, 'parent-relationship-error');
    }

    // 7. Phone Number
    if (!parentPhone.value.trim()) {
      setFieldError(parentPhone, 'parent-phone-error', 'Please provide a contact telephone number.');
      hasErrors = true;
      firstErrorField = firstErrorField || parentPhone;
    } else if (!isValidPhone(parentPhone.value)) {
      setFieldError(parentPhone, 'parent-phone-error', 'Please enter a valid telephone number (minimum 7 digits).');
      hasErrors = true;
      firstErrorField = firstErrorField || parentPhone;
    } else {
      clearFieldError(parentPhone, 'parent-phone-error');
    }

    // 8. Email Address
    if (!parentEmail.value.trim()) {
      setFieldError(parentEmail, 'parent-email-error', 'Please provide an email address.');
      hasErrors = true;
      firstErrorField = firstErrorField || parentEmail;
    } else if (!isValidEmail(parentEmail.value)) {
      setFieldError(parentEmail, 'parent-email-error', 'Please enter a valid email address (e.g., name@example.com).');
      hasErrors = true;
      firstErrorField = firstErrorField || parentEmail;
    } else {
      clearFieldError(parentEmail, 'parent-email-error');
    }

    // 9. Residential Address
    if (!parentAddress.value.trim()) {
      setFieldError(parentAddress, 'parent-address-error', 'Please provide your residential address.');
      hasErrors = true;
      firstErrorField = firstErrorField || parentAddress;
    } else {
      clearFieldError(parentAddress, 'parent-address-error');
    }

    // 10. Preferred Term / Session
    if (!admissionTerm.value) {
      setFieldError(admissionTerm, 'admission-term-error', 'Please select your preferred admission term or session.');
      hasErrors = true;
      firstErrorField = firstErrorField || admissionTerm;
    } else {
      clearFieldError(admissionTerm, 'admission-term-error');
    }

    // 11. Consent Checkbox
    if (!consentCheck.checked) {
      setFieldError(consentCheck, 'consent-check-error', 'You must confirm and consent before submitting.');
      hasErrors = true;
      firstErrorField = firstErrorField || consentCheck;
    } else {
      clearFieldError(consentCheck, 'consent-check-error');
    }

    if (hasErrors) {
      if (firstErrorField) {
        firstErrorField.focus();
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // If endpoint is configured in SCHOOL_CONFIG, submit via fetch
    const configuredEndpoint = window.SCHOOL_CONFIG && window.SCHOOL_CONFIG.formEndpoints && window.SCHOOL_CONFIG.formEndpoints.admissions;

    const submitBtn = document.getElementById('admissions-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit Application';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2 A10 10 0 0 1 22 12"></path>
        </svg>
        Validating Application...
      `;
    }

    // Assemble submitted data for display
    const formData = {
      studentName: studentName.value.trim(),
      studentDob: studentDob.value,
      studentGender: studentGender.value,
      studentClass: studentClass.value,
      previousSchool: previousSchool.value.trim() || 'None provided',
      parentName: parentName.value.trim(),
      parentRelationship: parentRelationship.value,
      parentPhone: parentPhone.value.trim(),
      parentEmail: parentEmail.value.trim(),
      parentAddress: parentAddress.value.trim(),
      admissionTerm: admissionTerm.value,
      studentNotes: studentNotes.value.trim() || 'None provided'
    };

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      if (configuredEndpoint && configuredEndpoint.trim() !== "") {
        // Production live delivery mode
        deliverFormPayload(configuredEndpoint, formData, 'Admissions Application');
      } else {
        // Transparent static mode preview
        showAdmissionsPreviewModal(formData);
      }
    }, 600);
  });
}

/**
 * ------------------------------------------------------------------------------
 * Contact Form Handler
 * ------------------------------------------------------------------------------
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      clearFieldError(input, `${input.id}-error`);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;
    let firstErrorField = null;

    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const subject = document.getElementById('contact-subject');
    const message = document.getElementById('contact-message');

    // 1. Name
    if (!name.value.trim()) {
      setFieldError(name, 'contact-name-error', 'Please enter your name.');
      hasErrors = true;
      firstErrorField = firstErrorField || name;
    } else {
      clearFieldError(name, 'contact-name-error');
    }

    // 2. Email
    if (!email.value.trim()) {
      setFieldError(email, 'contact-email-error', 'Please enter your email address.');
      hasErrors = true;
      firstErrorField = firstErrorField || email;
    } else if (!isValidEmail(email.value)) {
      setFieldError(email, 'contact-email-error', 'Please enter a valid email address.');
      hasErrors = true;
      firstErrorField = firstErrorField || email;
    } else {
      clearFieldError(email, 'contact-email-error');
    }

    // 3. Subject
    if (!subject.value.trim()) {
      setFieldError(subject, 'contact-subject-error', 'Please provide a subject for your enquiry.');
      hasErrors = true;
      firstErrorField = firstErrorField || subject;
    } else {
      clearFieldError(subject, 'contact-subject-error');
    }

    // 4. Message
    if (!message.value.trim()) {
      setFieldError(message, 'contact-message-error', 'Please type your message.');
      hasErrors = true;
      firstErrorField = firstErrorField || message;
    } else {
      clearFieldError(message, 'contact-message-error');
    }

    if (hasErrors) {
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    const configuredEndpoint = window.SCHOOL_CONFIG && window.SCHOOL_CONFIG.formEndpoints && window.SCHOOL_CONFIG.formEndpoints.contact;
    const submitBtn = document.getElementById('contact-submit-btn');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
          <path d="M12 2 A10 10 0 0 1 22 12"></path>
        </svg>
        Validating...
      `;
    }

    const contactData = {
      name: name.value.trim(),
      email: email.value.trim(),
      subject: subject.value.trim(),
      message: message.value.trim()
    };

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      if (configuredEndpoint && configuredEndpoint.trim() !== "") {
        deliverFormPayload(configuredEndpoint, contactData, 'Contact Enquiry');
      } else {
        showContactPreviewModal(contactData);
      }
    }, 500);
  });
}

/**
 * ------------------------------------------------------------------------------
 * Transparent Static Preview Modal: Admissions
 * ------------------------------------------------------------------------------
 */
function showAdmissionsPreviewModal(data) {
  const modal = document.getElementById('submission-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');

  if (!modal || !modalBody) return;

  if (modalTitle) {
    modalTitle.textContent = "Application Preview (Static Demo)";
  }

  modalBody.innerHTML = `
    <div class="notice-box notice-box-info" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <div>
        <strong>Form Validation Succeeded (Static Preview Mode)</strong>
        <p style="margin: 0.35rem 0 0; font-size: 0.88rem;">
          This website is running as a static demonstration. Because no live form backend or API service (such as Formspree or a school database) is currently configured, this application has <strong>not yet been delivered</strong> to Achievers Academy.
        </p>
      </div>
    </div>

    <p style="font-size: 0.95rem; margin-bottom: 0.75rem;">
      Below is a summary of the validated application data captured by the form:
    </p>

    <table class="preview-data-table" aria-label="Captured Application Data">
      <tbody>
        <tr><th>Student Name</th><td>${escapeHtml(data.studentName)}</td></tr>
        <tr><th>Date of Birth</th><td>${escapeHtml(data.studentDob)}</td></tr>
        <tr><th>Gender</th><td>${escapeHtml(data.studentGender)}</td></tr>
        <tr><th>Class / Level</th><td>${escapeHtml(data.studentClass)}</td></tr>
        <tr><th>Previous School</th><td>${escapeHtml(data.previousSchool)}</td></tr>
        <tr><th>Parent / Guardian</th><td>${escapeHtml(data.parentName)} (${escapeHtml(data.parentRelationship)})</td></tr>
        <tr><th>Phone</th><td>${escapeHtml(data.parentPhone)}</td></tr>
        <tr><th>Email</th><td>${escapeHtml(data.parentEmail)}</td></tr>
        <tr><th>Address</th><td>${escapeHtml(data.parentAddress)}</td></tr>
        <tr><th>Preferred Term</th><td>${escapeHtml(data.admissionTerm)}</td></tr>
        <tr><th>Additional Notes</th><td>${escapeHtml(data.studentNotes)}</td></tr>
      </tbody>
    </table>

    <div class="notice-box notice-box-warning" style="margin-top: 1.25rem;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <div>
        <strong>How to Connect Live Deliveries:</strong>
        <p style="margin: 0.35rem 0 0; font-size: 0.85rem;">
          To receive applications by email or store them in a database, set your endpoint in <code>js/main.js</code> under <code>SCHOOL_CONFIG.formEndpoints.admissions</code> or specify an <code>action</code> attribute on the form. Refer to the project <code>README.md</code> for step-by-step setup instructions.
        </p>
      </div>
    </div>
  `;

  openModal(modal);
}

/**
 * ------------------------------------------------------------------------------
 * Transparent Static Preview Modal: Contact
 * ------------------------------------------------------------------------------
 */
function showContactPreviewModal(data) {
  const modal = document.getElementById('submission-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');

  if (!modal || !modalBody) return;

  if (modalTitle) {
    modalTitle.textContent = "Message Preview (Static Demo)";
  }

  modalBody.innerHTML = `
    <div class="notice-box notice-box-info" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
      <div>
        <strong>Enquiry Validated (Static Mode)</strong>
        <p style="margin: 0.35rem 0 0; font-size: 0.88rem;">
          All required fields have passed validation. Because this is a static site demonstration without an active backend endpoint configured, your message has <strong>not been transmitted</strong> over the internet.
        </p>
      </div>
    </div>

    <table class="preview-data-table" aria-label="Captured Contact Data">
      <tbody>
        <tr><th>Sender Name</th><td>${escapeHtml(data.name)}</td></tr>
        <tr><th>Sender Email</th><td>${escapeHtml(data.email)}</td></tr>
        <tr><th>Subject</th><td>${escapeHtml(data.subject)}</td></tr>
        <tr><th>Message</th><td>${escapeHtml(data.message)}</td></tr>
      </tbody>
    </table>

    <div class="notice-box notice-box-warning" style="margin-top: 1.25rem;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <div>
        <strong>Production Setup:</strong>
        <p style="margin: 0.35rem 0 0; font-size: 0.85rem;">
          To route enquiries directly to the school administrative inbox, configure a form endpoint (such as Formspree or Basin) in <code>js/main.js</code> or update the <code>action</code> URL in <code>contact.html</code>.
        </p>
      </div>
    </div>
  `;

  openModal(modal);
}

/**
 * ------------------------------------------------------------------------------
 * Production Payload Delivery Function (Optional for future backend)
 * ------------------------------------------------------------------------------
 */
function deliverFormPayload(endpointUrl, payload, formType) {
  fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (response.ok) {
      alert(`${formType} submitted successfully! The school will contact you shortly.`);
    } else {
      alert(`There was an issue sending your submission. Please contact the school directly via phone.`);
    }
  })
  .catch(err => {
    console.error('Submission error:', err);
    alert(`Could not connect to the submission service. Please contact the school directly.`);
  });
}

/**
 * ------------------------------------------------------------------------------
 * Modal Helpers & Accessibility Focus Trap
 * ------------------------------------------------------------------------------
 */
let lastActiveElement = null;

function openModal(modal) {
  lastActiveElement = document.activeElement;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.modal-close-btn');
  if (closeBtn) closeBtn.focus();
}

function closeModal(modal) {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastActiveElement) {
    lastActiveElement.focus();
  }
}

function initModalCloseHandlers() {
  const modal = document.getElementById('submission-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('[data-dismiss="modal"]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeModal(modal));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });
}

function escapeHtml(string) {
  if (string === null || string === undefined) return '';
  const str = String(string);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Inline animation keyframe for spinner
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
