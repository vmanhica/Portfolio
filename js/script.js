const cursorOrb = document.querySelector(".cursor-orb");
document.addEventListener("mousemove", (e) => {
  cursorOrb.style.left = e.clientX + "px";
  cursorOrb.style.top = e.clientY + "px";
});

const progress = document.querySelector(".scroll-progress");
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? (window.scrollY / max) * 100 + "%" : "0%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const nav = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.toggle("active", item.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });
sections.forEach(section => sectionObserver.observe(section));

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(700px) rotateX(${y * -2.5}deg) rotateY(${x * 2.5}deg)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});

document.querySelectorAll(".skill-box,.metric,.training-row a").forEach(el => {
  el.addEventListener("mouseenter", () => el.style.setProperty("--hover-x", "1"));
  el.addEventListener("mouseleave", () => el.style.removeProperty("--hover-x"));
});
