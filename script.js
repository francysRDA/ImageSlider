document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.comparison-slider');
    const afterImage = document.querySelector('.after-image');
    const handle = document.querySelector('.slider-handle');
    const upscaledImage = document.getElementById('upscaled-image');
    const upscaledLabel = document.getElementById('upscaled-label');
    const controlButtons = document.querySelectorAll('.control-btn');

    let isDragging = false;

    const moveSlider = (x) => {
        const sliderRect = slider.getBoundingClientRect();
        let newX = x - sliderRect.left;

        // Clamp the value between 0 and slider width
        newX = Math.max(0, Math.min(newX, sliderRect.width));

        const percentage = (newX / sliderRect.width) * 100;
        afterImage.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isDragging = true;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            moveSlider(e.clientX);
        }
    });

    // Touch events
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        // Prevent page scrolling
        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length > 0) {
            moveSlider(e.touches[0].clientX);
        }
    });

    // Control buttons logic
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update image source and label
            const newImage = button.getAttribute('data-image');
            const newLabel = button.getAttribute('data-label');
            upscaledImage.src = newImage;
            upscaledLabel.textContent = newLabel;

            // Update active button state
            controlButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
