
let canDraw = false;
let canErase = false;
let randomColorMode = false;

function round(num, precision) {
    return +(Math.round(num + `e+${precision}`)  + `e-${precision}`);
};

function getRandomColor() {
	color = '#';
	colCode = '0123456789abcdef';
	
	for(i = 0; i < 6; i++) {
		j = Math.floor(Math.random() * 16);
		color = color + colCode[j];
	}

	return color;
}

function CreateGrid() {
	const grid = document.querySelector('#grid');
	grid.innerHTML = '';

	const cell = document.createElement('div');
	const grid_size = document.querySelector('#slider').value;
	const cell_size = round(600/grid_size, 4); // 600px is the canvas width/height
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

}


function changeColor(cell) {
	if (canDraw) {
		console.log('change color function called.');
		let color = document.querySelector('#color-picker').value;;

		if (canErase) {
			color = '#ffffff';
		} else if (randomColorMode) {
			color = getRandomColor();
		}
	
		cell.style.backgroundColor = color;
	}
}

function toggleEraser() {
	canErase = !canErase;
	randomColorMode = false;
}

function toggleRandomColorMode() {
	randomColorMode = !randomColorMode;
	canErase = false;
}

function main() {
	console.log('main function called.');
	CreateGrid();

	const slider = document.querySelector('#slider');
	slider.addEventListener('change', () => {
		document.querySelector('#slider-label').innerHTML = `Canvas size: ${slider.value}`;
		CreateGrid();
	});
	
	document.querySelector('#reset').addEventListener('click', () => {
		CreateGrid();
	});
	
	document.querySelector('#random').addEventListener('click', () => {
		toggleRandomColorMode();
	});
	
	const eraserButton = document.querySelector('#eraser');
	eraserButton.addEventListener('click', () => {
		toggleEraser();
		console.log(`eraser mode: ${canErase}, random color mode: ${randomColorMode}`);
	});

}

main();