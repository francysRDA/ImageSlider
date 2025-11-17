document.addEventListener('DOMContentLoaded', () => {
    const nativeImage = document.getElementById('native-image');
    const upscaledImage = document.getElementById('upscaled-image');
    const upscaledLabel = document.getElementById('upscaled-label');
    const upscalerSelect = document.getElementById('upscaler-select');
    const printButtons = document.querySelectorAll('.print-btn');

    let currentPrint = '1';
    let currentUpscaler = 'fsr_q';

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
            native: 'prints/print3/bf6_nativo.png',
            fsr_q: 'prints/print3/bf6_fsr_q.png',
            fsr_p: 'prints/print3/bf6_fsr_p.png',
            xess_q: 'prints/print3/bf6_xess_q.png',
            xess_p: 'prints/print3/bf6_xess_p.png',
        },
        '4': {
            native: 'prints/print4/sh2_nativo.png',
            fsr_q: 'prints/print4/sh2_fsr_q.png',
            fsr_p: 'prints/print4/sh2_fsr_p.png',
            xess_q: 'prints/print4/sh2_xess_q.png',
            xess_p: 'prints/print4/sh2_xess_p.png',
        },
        '5': {
            native: 'prints/print5/ln3_nativo.png',
            fsr_q: 'prints/print5/ln3_fsr_q.png',
            fsr_p: 'prints/print5/ln3_fsr_p.png',
            xess_q: 'prints/print5/ln3_xess_q.png',
            xess_p: 'prints/print5/ln3_xess_p.png',
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
