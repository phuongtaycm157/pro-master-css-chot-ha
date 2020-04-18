var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');
var e = document.getElementById('e');
axios.get('http://localhost:8009/mangas')
.then(res => {
	let mangas = res.data;
	mangas.sort((x, y) => y.statistics.view - x.statistics.view);
	console.log(mangas);
	highlightRender(c, mangas[0]);
	highlightRender(a, mangas[1]);
	highlightRender(b, mangas[2]);
	highlightRender(d, mangas[3]);
	highlightRender(e, mangas[4]);
})

function highlightRender(HTMLElement, obj) {
	let inner = '<div class="highlight-card" id="'+obj.id+'"><a href="#"><div>Chương '+obj.totalChapter+'</div><div>'+obj.name+'</div></a></div>';
	HTMLElement.innerHTML = inner;
	HTMLElement.firstChild.style.backgroundImage = 'url('+obj.picture+')';
}