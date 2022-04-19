function CreateGrid(size) {
	const cell = document.createElement('div');
	cell.className = 'cell';
	cell.style.height = '1rem';
	cell.style.width = '1rem';

	let row = document.createElement('div');
	row.className = 'row';
	row.width = size;

	const grid = document.querySelector('div');
	
	for (let index = 0; index < size; index++) {
		console.log(index)
		row.append(cell.cloneNode());
	}

	for (let index = 0; index < size; index++) {
		grid.append(row.cloneNode(true));
	}
}

function main() {
	CreateGrid(16);

	console.log('js working.');
}

main();