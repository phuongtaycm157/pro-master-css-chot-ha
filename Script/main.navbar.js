const kindDropdowm = document.getElementById('kindDropdown');
const sortDropdowm = document.getElementById('sortDropdown');
let dataKind = [];
let dataSort = [];

getData().then(function(datas) {
	dataKind = datas.kinds.data;
	datasort = datas.sorts.data;
	render(kindDropdowm ,dataKind, 7);
	render(sortDropdown ,datasort, 2);
});

async function getData() {
	const resKindList = await axios.get('http://localhost:8009/kind');
	const resSortList = await axios.get('http://localhost:8009/sort');
	return {kinds: resKindList, sorts: resSortList};
}

function render (HTMLElement, list, numberRow) {
	let colList = extract(list, numberRow);
	let stringColList = toStringDropdownCol(colList);
	let dropdownTableString = stringColList.map((e, i) => {
		if (i === 0) {
			return '<ul class="dropdown-table"><li>' + e + '</li>';
		} else if (i === stringColList.length-1) {
			return '<li>' + e + '</li></ul>';
		} else {
			return '<li>' + e + '</li>';
		}
	}).join('');
	HTMLElement.innerHTML = dropdownTableString;
}

function toStringDropdownCol (list) {
	let result = []
	for (let listItem of list) {
		let temp = listItem.map((e, i) => {
			if (i === 0) {
				return '<ul class="dropdown-col"><li><a href="#" data-kind-id="'+e.id+'">'+e.name+'</a></li>'
			} else if (i === listItem.length-1) {
				return '<li><a href="#" data-kind-id="'+e.id+'">'+e.name+'</a></li></ul>';
			} else {
				return '<li><a href="#" data-kind-id="'+e.id+'">'+e.name+'</a></li>'
			}
		});
		result.push(temp.join(''));
	}
	return result;
}

function extract(list, n) {
	let numberList = [];
	let i = 0;
	let arr = []
	for (let e of list) {
		arr.push(e);
		i++;
		if (i === n) {
			numberList.push(arr);
			arr = [];
			i = 0;
		}
	}
	if (arr.length !== 0) {
		numberList.push(arr);
	}
	return numberList;
}
