const mazeSize = 30;
const maze = Array(mazeSize).fill().map(() => Array(mazeSize).fill('wall'));

// Define free cells (you should replace this with your maze generation logic)
for (let i = 1; i < mazeSize - 1; i++) {
    for (let j = 1; j < mazeSize - 1; j++) {
        maze[i][j] = 'free';
    }
}


// Define player starting position
let playerPosition = { row: mazeSize / 2, col: mazeSize / 2 };
maze[playerPosition.row][playerPosition.col] = 'player';

// Define exits
maze[0][0] = 'exit1';
maze[0][mazeSize - 1] = 'exit2';
maze[mazeSize - 1][0] = 'exit3';
maze[mazeSize - 1][mazeSize - 1] = 'exit4';


function renderMaze() {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.innerHTML = '';
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            const cell = maze[row][col];
            const cellElement = document.createElement('div');
            cellElement.id = `cell-${row}-${col}`; // Assign a unique id to the cell
            cellElement.className = 'cell ' + cell;
            cellElement.addEventListener('click', () => tryMove(row, col));
            mazeContainer.appendChild(cellElement);
            if (col === maze[row].length - 1) {
                mazeContainer.appendChild(document.createElement('br'));
            }
        }
    }
}

let isAnimating = false;  // Added this variable to track if an animation is in progress

function tryMove(row, col) {
    if (isAnimating) return;  // Ignore clicks if an animation is in progress

    if (maze[row][col] === 'free' || isExit(row, col)) { // Allow movement to an exit
        isAnimating = true;  // Set the animation flag to true

        // Get the HTML elements of the old and new cells
        const oldPlayerCell = document.getElementById(`cell-${playerPosition.row}-${playerPosition.col}`);
        const newPlayerCell = document.getElementById(`cell-${row}-${col}`);

        // Create a ghost player and set its initial position to the old cell's position
        const ghostPlayer = oldPlayerCell.cloneNode();
        ghostPlayer.id = 'ghost-player';
        ghostPlayer.style.position = 'absolute';
        ghostPlayer.style.left = `${oldPlayerCell.offsetLeft}px`;
        ghostPlayer.style.top = `${oldPlayerCell.offsetTop}px`;
        ghostPlayer.style.width = `${oldPlayerCell.offsetWidth}px`;
        ghostPlayer.style.height = `${oldPlayerCell.offsetHeight}px`;
        document.getElementById('maze').appendChild(ghostPlayer);

        // Remove 'player' class from old player cell for the duration of the animation
        oldPlayerCell.classList.remove('player');

        // Animate the ghost player to the new cell's position
        ghostPlayer.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            ghostPlayer.style.left = `${newPlayerCell.offsetLeft}px`;
            ghostPlayer.style.top = `${newPlayerCell.offsetTop}px`;
        }, 0);

        // After the animation is done, remove the ghost player, move the real player to the new cell,
        // check for the exit, and reset the animation flag
        setTimeout(() => {
            document.getElementById('maze').removeChild(ghostPlayer);
            newPlayerCell.classList.add('player');

            // Check for the exit before updating the player's position
            if (isExit(row, col)) {
                // alert('Congratulations, you reached the exit!');
                // Redirect to a different page (you should replace this with your own URLs)
                if (maze[row][col] == 'exit1') window.location.href = "introduction.html";
                else if (maze[row][col] == 'exit2') window.location.href = "projects.html";
                else if (maze[row][col] == 'exit3') window.location.href = "https://drive.google.com/file/d/1NUT-xahY0JNtIRteXJbZghRZ7HKa8Sc7/view?usp=sharing";
                else if (maze[row][col] == 'exit4') window.location.href = "contact.html";
            }

            // Update the player's position in the maze array
            maze[playerPosition.row][playerPosition.col] = 'free';
            playerPosition = { row, col };
            maze[row][col] = 'player';

            isAnimating = false;  // Reset the animation flag
        }, 500);
    }
}



function isExit(row, col) {
    return ['exit1', 'exit2', 'exit3', 'exit4'].includes(maze[row][col]);
}


renderMaze();