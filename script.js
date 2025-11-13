document.addEventListener('DOMContentLoaded', () => {
    const nativeImage = document.getElementById('native-image');
    const upscaledImage = document.getElementById('upscaled-image');
    const upscaledLabel = document.getElementById('upscaled-label');
    const upscalerSelect = document.getElementById('upscaler-select');
    const printButtons = document.querySelectorAll('.print-btn');

    let currentPrint = '1';
    let currentUpscaler = 'dlss';

    const images = {
        '1': {
            native: 'images/print1/nativo.png',
            dlss: 'images/print1/dlss_q1.png',
            fsr: 'images/print1/fsr_q1.png',
            xess: 'images/print1/xess_q1.png',
        },
        '2': {
            native: 'images/print2/nativo2.png',
            dlss: 'images/print2/dlss_q2.png',
            fsr: 'images/print2/fsr_q2.png',
            xess: 'images/print2/xess_q2.png',
        },
        '3': {
            native: 'images/print3/nativo3.png',
            dlss: 'images/print3/dlss_q3.png',
            fsr: 'images/print3/fsr_q3.png',
            xess: 'images/print3/xess_q3.png',
        },
    };

    const updateImages = () => {
        nativeImage.src = images[currentPrint].native;
        upscaledImage.src = images[currentPrint][currentUpscaler];
        upscaledLabel.textContent = currentUpscaler.toUpperCase();
    };

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

    // Initial setup
    updateImages();
});
