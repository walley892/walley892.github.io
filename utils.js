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

function sizeAndPlaceElementInCircle(centerX, centerY, radius, canvas, element){
	var w_radius = radius*canvas.width;
	var h_radius = radius*canvas.height;
	var height = 0;
	var target_width = w_radius*1.5;
	height = (target_width)/(element.innerHTML.length*0.6);
	element.style.position = "absolute";
	element.style.padding = "0";
	element.style.margin = "0";
	element.style.fontSize = String(height) + "px";
	element.style.height = String(height * 1.25) + "px";
	element.style.left = String(centerX * canvas.clientWidth - element.clientWidth/2) + "px";
	element.style.bottom = String(centerY * canvas.clientHeight - element.clientHeight/2) + "px";
}

export {loadText, getMousePos, sizeAndPlaceElementInCircle};
