// Contact Page - Thematic JavaScript
let contactFlow = false;
let formMomentum = 0;

async function squishLoadContact() {
  try {
    const contactData = await fetch("data/contact-info.json");
    const contactContent = await contactData.json();
    squishRenderContact(contactContent);
  } catch (error) {
    console.error("Contact load error:", error);
    squishFallbackContact();
  }
}

function squishRenderContact(contactData) {
  const contactContainer = document.getElementById("contact-content");
  if (!contactContainer) return;

  let contactHTML = "";
  contactData.forEach((item) => {
    contactHTML += `
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">${item.icon}</div>
                <div class="contact-details-bubble">
                    <h3>${item.title}</h3>
                    <p>${item.value}</p>
                    ${
                      item.link
                        ? `<a href="${item.link}" class="contact-link-bubble">${item.linkText}</a>`
                        : ""
                    }
                </div>
            </div>
        `;
  });

  contactContainer.innerHTML = contactHTML;
}

function squishFallbackContact() {
  const contactContainer = document.getElementById("contact-content");
  if (contactContainer) {
    contactContainer.innerHTML = `
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📧</div>
                <div class="contact-details-bubble">
                    <h3>Email</h3>
                    <p>hello@jellydash3d.com</p>
                    <a href="mailto:hello@jellydash3d.com" class="contact-link-bubble">Send Email</a>
                </div>
            </div>
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📞</div>
                <div class="contact-details-bubble">
                    <h3>Phone</h3>
                    <p>+81-3-1234-5678</p>
                    <a href="tel:+81-3-1234-5678" class="contact-link-bubble">Call Us</a>
                </div>
            </div>
            <div class="contact-item-bubble">
                <div class="contact-icon-bubble">📍</div>
                <div class="contact-details-bubble">
                    <h3>Address</h3>
                    <p>Tokyo, Japan</p>
                    <a href="#" class="contact-link-bubble">View on Map</a>
                </div>
            </div>
        `;
  }
}

// Form Handling
function squishInitForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", squishHandleSubmit);
  }
}

function squishHandleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const phone = formData.get("phone");
  const message = formData.get("message");

  // Simulate form submission
  squishShowSuccess();

  // Reset form
  event.target.reset();
}

function squishShowSuccess() {
  const submitButton = document.querySelector(".submit-gel");
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = "Message Sent!";
    submitButton.style.background =
      "linear-gradient(45deg, var(--jelly-green), var(--jelly-blue))";

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.style.background =
        "linear-gradient(45deg, var(--jelly-yellow), var(--jelly-orange))";
    }, 3000);
  }
}

// Form Input Animations
function squishInitFormAnimations() {
  const formInputs = document.querySelectorAll(".form-input, .form-textarea");

  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      squishBounceEffect(input.parentElement);
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        input.style.borderColor = "rgba(255,255,255,0.3)";
      } else {
        input.style.borderColor = "var(--jelly-green)";
      }
    });
  });
}

// Initialize contact page
document.addEventListener("DOMContentLoaded", () => {
  squishLoadContact();
  squishInitForm();
  squishInitFormAnimations();
});
