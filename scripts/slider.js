
let autoSlideInterval;

function autoSlide() {
    const slides = ['#slide1', '#slide2', '#slide3', '#slide4'];
    let currentSlideIndex = 0;

    autoSlideInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        window.location.hash = slides[currentSlideIndex];
    }, 3000); // Change slide every 3 seconds
}

// Function to stop auto-slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Start auto-sliding when the page loads
window.addEventListener('load', autoSlide);

// Stop auto-slide on scroll
window.addEventListener('scroll', stopAutoSlide);