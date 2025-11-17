document.addEventListener('DOMContentLoaded', () => {
    const nativeImage = document.getElementById('native-image');
    const upscaledImage = document.getElementById('upscaled-image');
    const upscaledLabel = document.getElementById('upscaled-label');
    const upscalerSelect = document.getElementById('upscaler-select');
    const printButtons = document.querySelectorAll('.print-btn');
    const slider = document.querySelector('img-comparison-slider');

    let currentPrint = '1';
    let currentUpscaler = 'fsr_q';
    let scale = 1;
    let panning = false;
    let sliding = false;
    let pointX = 0;
    let pointY = 0;
    let start = { x: 0, y: 0 };

    const images = {
        '1': {
            native: 'prints/print1/cp77_nativo.png',
            fsr_q: 'prints/print1/cp77_fsr_q.png',
            fsr_p: 'prints/print1/cp77_fsr_p.png',
            xess_q: 'prints/print1/cp77_xess_q.png',
            xess_p: 'prints/print1/cp77_xess_p.png',
        },
        '2': {
            native: 'prints/print2/cp77_nativo_2.png',
            fsr_q: 'prints/print2/cp77_fsr_q_2.png',
            fsr_p: 'prints/print2/cp77_fsr_p_2.png',
            xess_q: 'prints/print2/cp77_xess_q_2.png',
            xess_p: 'prints/print2/cp77_xess_p_2.png',
        },
        '3': {
            native: 'prints/print3/sh2_nativo.png',
            fsr_q: 'prints/print3/sh2_fsr_q.png',
            fsr_p: 'prints/print3/sh2_fsr_p.png',
            xess_q: 'prints/print3/sh2_xess_q.png',
            xess_p: 'prints/print3/sh2_xess_p.png',
        },
        '4': {
            native: 'prints/print4/ln3_nativo.png',
            fsr_q: 'prints/print4/ln3_fsr_q.png',
            fsr_p: 'prints/print4/ln3_fsr_p.png',
            xess_q: 'prints/print4/ln3_xess_q.png',
            xess_p: 'prints/print4/ln3_xess_p.png',
        },
    };

    const updateImages = () => {
        nativeImage.src = images[currentPrint].native;
        upscaledImage.src = images[currentPrint][currentUpscaler];
        const selectedOption = upscalerSelect.querySelector(`option[value="${currentUpscaler}"]`);
        if (selectedOption) {
            upscaledLabel.textContent = selectedOption.textContent;
        }
    };

    function setTransform() {
        const bounds = slider.getBoundingClientRect();
        const max_x = (bounds.width * (scale - 1)) / 2;
        const max_y = (bounds.height * (scale - 1)) / 2;

        if (pointX > max_x) pointX = max_x;
        if (pointX < -max_x) pointX = -max_x;
        if (pointY > max_y) pointY = max_y;
        if (pointY < -max_y) pointY = -max_y;

        nativeImage.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
        upscaledImage.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
    }

    printButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentPrint = button.dataset.print;
            printButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateImages();
        });
    });

    upscalerSelect.addEventListener('change', (e) => {
        currentUpscaler = e.target.value;
        updateImages();
    });

    slider.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (e.button === 0) {
            start = { x: e.clientX - pointX, y: e.clientY - pointY };
            panning = true;
        } else if (e.button === 2) {
            sliding = true;
        }
    });

    slider.addEventListener('mouseup', () => {
        panning = false;
        sliding = false;
    });

    slider.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (panning) {
            pointX = (e.clientX - start.x);
            pointY = (e.clientY - start.y);
            setTransform();
        } else if (sliding) {
            const bounds = slider.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const exposure = (x / bounds.width) * 100;
            if (exposure > 0 && exposure < 100) {
                slider.style.setProperty('--exposure', `${exposure}%`);
            }
        }
    });

    slider.addEventListener('wheel', (e) => {
        e.preventDefault();
        const xs = (e.clientX - pointX) / scale;
        const ys = (e.clientY - pointY) / scale;
        const delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);

        (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);

        if (scale < 1) {
            scale = 1;
            pointX = 0;
            pointY = 0;
        } else {
            pointX = e.clientX - xs * scale;
            pointY = e.clientY - ys * scale;
        }

        setTransform();
    });

    slider.addEventListener('contextmenu', (e) => e.preventDefault());

    // Initial setup
    updateImages();
});
