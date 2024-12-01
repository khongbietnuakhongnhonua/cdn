window.onscroll = function() {
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
};

function setupHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open'); // Thêm hiệu ứng cho nút hamburger
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHamburger);
} else {
    setupHamburger();
}
