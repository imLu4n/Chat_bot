document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.4
    });

    const images = document.querySelectorAll(".fade-in");
    images.forEach(img => observer.observe(img));
});