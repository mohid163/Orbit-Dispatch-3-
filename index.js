// Simple tab switcher for the platform section
const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Smooth scroll for navigation links (anchor links only)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

function showApp(type) {
  const text = document.getElementById("switchText");
  const image = document.getElementById("switchImage");

  const buttons = document.querySelectorAll(".switch-btn");
  buttons.forEach(btn => btn.classList.remove("active"));

  if (type === "driver") {
    text.innerText = "Driver App allows drivers to receive trips instantly, navigate routes, and update trip status in real time.";
    image.src = "Screenshot 2026-05-10 111220.png";
    buttons[0].classList.add("active");
  }

  else if (type === "booking") {
    text.innerText = "Online Booking lets customers book rides instantly with automatic fare calculation and confirmation.";
    image.src = "Screenshot 2026-05-11 113057.png";
    buttons[1].classList.add("active");
  }

  else if (type === "dispatch") {
    text.innerText = "Dispatch System gives full control over trips, drivers, and fleet operations in real time.";
    image.src = "Screenshot 2026-05-11 111220.png";
    buttons[2].classList.add("active");
  }
}

const cards = document.querySelectorAll(".info-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});

cards.forEach(card => observer.observe(card));

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {

    faqItems.forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const queryReason = document.getElementById("queryReason").value;
  const message = document.getElementById("message").value;

  try {

    const response = await fetch("http://localhost:5000/send-message", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        queryReason,
        message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Message sent successfully!");
      contactForm.reset();
    }

    else {
      alert("Failed to send message.");
    }

  } catch (error) {

    console.log(error);

    alert("Server error.");
  }

});