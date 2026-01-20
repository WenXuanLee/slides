document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentSlideNum = document.getElementById('currentSlideNum');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Initialize state
    updateSlideState();

    function updateSlideState() {
        // Update Slides Visibility
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Progress Bar
        const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Update Counter
        currentSlideNum.textContent = currentIndex + 1;

        // Update Buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;

        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
    }

    function goToNextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateSlideState();
        }
    }

    function goToPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlideState();
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', goToNextSlide);
    prevBtn.addEventListener('click', goToPrevSlide);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        }
    });

    // Optional: Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            goToNextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            goToPrevSlide();
        }
    }

    // Fullscreen Toggle Logic
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const iconMaximize = fullscreenBtn.querySelector('.icon-maximize');
    const iconMinimize = fullscreenBtn.querySelector('.icon-minimize');

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function updateFullscreenIcon() {
        if (document.fullscreenElement) {
            iconMaximize.classList.add('hidden');
            iconMinimize.classList.remove('hidden');
        } else {
            iconMaximize.classList.remove('hidden');
            iconMinimize.classList.add('hidden');
        }
    }

    fullscreenBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenIcon);
});
