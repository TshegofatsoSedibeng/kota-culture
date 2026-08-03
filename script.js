// ======================================
// Kota Culture Website
// Created for EBS Market Day
// ======================================

// Smooth welcome message
console.log("🍔 Welcome to Kota Culture!");

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
