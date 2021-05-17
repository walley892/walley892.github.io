async function loadText(title){
	return await fetch("/" + title).then(response => response.text();
}
