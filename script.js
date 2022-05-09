let canDraw = false;
let canErase = false;

function round(num, precision) {
    return +(Math.round(num + `e+${precision}`)  + `e-${precision}`);
};

function CreateGrid() {
	const grid = document.querySelector('div');
	grid.innerHTML = '';

	const cell = document.createElement('div');
	const grid_size = document.querySelector('#slider').value;
	const cell_size = round(600/grid_size, 2); // 600px is the canvas width/height
	const cell_size_formatted = `${cell_size}px`
	cell.className = 'cell';
	cell.style.height = cell_size_formatted;
	cell.style.width = cell_size_formatted;

	console.log(`grid size: ${grid_size}, cell size: ${cell_size}, ${cell_size_formatted}`);

	let row = document.createElement('div');
	row.className = 'row';

	grid.addEventListener('mousedown', (event) => {
		event.preventDefault();
		// console.log('canDraw set to true.')
		canDraw = true;
	})
	grid.addEventListener('mouseup', () => {
		// console.log('canDraw set to false.')
		canDraw = false;
	})
	
	for (let index = 0; index < grid_size; index++) {
		row.append(cell.cloneNode());
	}

	for (let index = 0; index < grid_size; index++) {
		grid.append(row.cloneNode(true));
	}
}


function changeColor(cell) {
	if (canDraw) {
		// console.log('change color function called.');
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
	CreateGrid();
	document.querySelector('#slider').addEventListener('change', CreateGrid);

	document.querySelectorAll('.cell').forEach(cell => {
		cell.addEventListener('mousedown', (event) => {
			event.preventDefault();

			if (canDraw) {
				// console.log('mousedown on cell.');
			}

			changeColor(cell);
		})
		cell.addEventListener('mouseover', () => {
			if (canDraw) {
				// console.log('mouseover on cell.');
			}

			changeColor(cell);
		})
	});

	const eraserButton = document.querySelector('#eraser');
	eraserButton.addEventListener('click', () => {
		toggleEraser();
	})
}

main();