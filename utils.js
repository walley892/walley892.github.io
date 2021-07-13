async function loadText(title){
	return await fetch("/" + title).then(response => response.text());
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: canvas.height - ((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

export {loadText, getMousePos};
