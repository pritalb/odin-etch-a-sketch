let canDraw = false;
let canErase = false;

function CreateGrid(size) {
	const cell = document.createElement('div');
	cell.className = 'cell';
	cell.style.height = '1rem';
	cell.style.width = '1rem';

	let row = document.createElement('div');
	row.className = 'row';
	row.width = size;

	const grid = document.querySelector('div');
	grid.addEventListener('mousedown', () => {
		canDraw = true;
	})
	grid.addEventListener('mouseup', () => {
		canDraw = false;
	})
	
	for (let index = 0; index < size; index++) {
		row.append(cell.cloneNode());
	}

	for (let index = 0; index < size; index++) {
		grid.append(row.cloneNode(true));
	}
}


function changeColor(cell) {
	if (canDraw) {
		console.log('change color function called.');
		let color = document.querySelector('#color-picker').value;;

		if (canErase) {
			color = '#ffffff';
		}
	
		cell.style.backgroundColor = color;
	}
}

function toggleEraser() {
	canErase = !canErase;
}

function main() {
	CreateGrid(4);

	document.querySelectorAll('.cell').forEach(cell => {
		cell.addEventListener('mousedown', (event) => {
			changeColor(cell);
		})
		cell.addEventListener('mouseover', (event) => {
			changeColor(cell);
		})
	});

	const eraserButton = document.querySelector('#eraser');
	eraserButton.addEventListener('click', () => {
		toggleEraser();

		let buttonColor = '#ffffff';

		if (canErase) {
			buttonColor = '#dddddd';
		}

		eraserButton.style.backgroundColor = buttonColor;
	})
}

main();