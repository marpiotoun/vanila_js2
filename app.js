const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');


let painting = false;


function stopPainting() {
    painting = false;
}


function startPainting() {
    painting = true;
}


function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function ChangeStrockStyle(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

function changeBrushSize(event) {
    ctx.lineWidth = event.target.value
}

function changeBackgroundColor() {
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fillRect(0, 0, 650, 650);
}

function handleSave() {
    const image = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS';
    link.click();
}

function handleCM(event) {
    event.preventDefault();
}

function init() {
    if (canvas) {
        canvas.width = 650;
        canvas.height = 650;
        ctx.strokeStyle = '#2c2c2c';
        ctx.lineWidth = 2.5;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 650, 650);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mousedown', startPainting);
        canvas.addEventListener('mouseup', stopPainting);
        canvas.addEventListener('mouseleave', stopPainting);
        window.addEventListener('contextmenu', handleCM);
    }

    const colors = document.querySelectorAll('.controls__colors .control__color');
    Array.from(colors).forEach(color => color.addEventListener('click', ChangeStrockStyle));
    const brushSize = document.getElementById('jsRange');
    brushSize.addEventListener('change', changeBrushSize);
    const fillBtn = document.getElementById('jsMode');
    fillBtn.addEventListener('click', changeBackgroundColor)
    const saveBtn = document.getElementById('jsSave');
    saveBtn.addEventListener('click', handleSave);
}

init()