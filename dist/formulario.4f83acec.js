function setupCanvas(container) {
    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const toggleBtn = container.querySelector('label');
    const buttonHolder = document.createElement('div');
    buttonHolder.classList.add('assinatura__btn--holder');
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.textContent = 'Apagar Assinatura';
    clearBtn.className = 'btn--form';
    clearBtn.style.display = 'none';
    buttonHolder.appendChild(clearBtn);
    const sairBtn = document.createElement('button');
    sairBtn.type = 'button';
    sairBtn.textContent = 'Fechar assinatura';
    sairBtn.className = 'btn--form';
    sairBtn.style.display = 'none';
    buttonHolder.appendChild(sairBtn);
    container.appendChild(buttonHolder);
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    function setupContext() {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        drawGuideLine();
    }
    function resizeCanvas() {
        if (!canvas.hasAttribute('hidden')) {
            let salvaCanva = null;
            if (canvas.width * canvas.height > 0) salvaCanva = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // As duas linhas abaixo arrumam o canva mas apagam o conteudo
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            setupContext();
            if (salvaCanva) ctx.putImageData(salvaCanva, 0, 0);
        }
    }
    toggleBtn.addEventListener('click', async ()=>{
        canvas.toggleAttribute('hidden');
        if (canvas.hasAttribute('hidden')) {
            clearBtn.style.display = 'none';
            sairBtn.style.display = 'none';
        } else {
            clearBtn.style.display = 'block';
            sairBtn.style.display = 'block';
        }
        // Rotate screen
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            const body = document.querySelector('body');
            try {
                if (body.requestFullscreen) await body.requestFullscreen();
                else if (body.webkitRequestFullScreen) await body.webkitRequestFullScreen();
                if (screen.orientation && screen.orientation.lock) {
                    await screen.orientation.lock("landscape-primary");
                    console.log('landscape-primary');
                }
            } catch (error) {
                console.log("Erro na rota\xe7\xe3o:", error);
            } finally{
                setTimeout(()=>{
                    resizeCanvas();
                }, 1000);
            }
        } else resizeCanvas();
    });
    clearBtn.addEventListener('click', ()=>{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGuideLine();
        assinaturas;
    });
    sairBtn.addEventListener('click', async ()=>{
        try {
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                if (document.exitFullscreen) await document.exitFullscreen();
                else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
            }
            canvas.setAttribute('hidden', 'true');
            clearBtn.style.display = 'none';
            sairBtn.style.display = 'none';
            if (screen.orientation && screen.orientation.lock) await screen.orientation.lock("portrait-primary");
            if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock();
        } catch (error) {
            console.error("Erro de restaura\xe7\xe3o de orientati\xe7\xe3o :", error);
        }
    });
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    // --- Funções de desenho ---
    function drawGuideLine() {
        // Colocando uma linha central para basear a assinatira
        ctx.beginPath();
        ctx.beginPath();
        ctx.moveTo(canvas.width * (1 / 6), canvas.height * (2 / 3));
        ctx.lineTo(canvas.width * (5 / 6), canvas.height * (2 / 3));
        ctx.stroke();
    }
    function startDrawing(e) {
        const pos = getPosition(e);
        isDrawing = true;
        lastX = pos.x;
        lastY = pos.y;
    }
    function draw(e) {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }
    function stopDrawing() {
        isDrawing = false;
    }
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw, {
        passive: false
    });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchcancel', stopDrawing);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
}
const containers = document.querySelectorAll('.assinatura');
if (containers.length >= 2) {
    const cliente = containers[0];
    const responsavel = containers[1];
    setupCanvas(cliente);
    setupCanvas(responsavel);
}

//# sourceMappingURL=formulario.4f83acec.js.map
