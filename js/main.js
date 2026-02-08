var links = document.querySelectorAll(".nav-link");

links.forEach(function (link) {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".main-header");

  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

var burger = document.querySelector(".burger-menu");
var mobileMenu = document.getElementById("mobileMenu");
var closeMenu = document.querySelector(".close-menu");

burger.addEventListener("click", function () {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", function () {
  mobileMenu.classList.remove("active");
});
// صور
// ننتظر تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {

  // نجيب كل العناصر الي فيها تأثير الصورة
  const imageBoxes = document.querySelectorAll(".img-hover");

  imageBoxes.forEach((box) => {
    const image = box.querySelector("img");

    if (!image) return;

    box.addEventListener("mousemove", (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      image.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    box.addEventListener("mouseleave", () => {
      image.style.transform =
        `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });

});
// slider
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    e.preventDefault(); // يمنع فتح الرابط
    alert("Added to cart ✅");
  }
});
AOS.init();
