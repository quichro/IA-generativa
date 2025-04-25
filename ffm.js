

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Forest Fire Simulation</title>
  <style>
    body { text-align: center; background: #222; }
    canvas { background: #eee; margin-top: 20px; }
  </style>
</head>
<body>
  <h1 style="color:white;">Forest Fire Simulation</h1>
  <canvas id="forestCanvas" width="500" height="500"></canvas>

  <script>
    const canvas = document.getElementById('forestCanvas');
    const ctx = canvas.getContext('2d');

    const gridSize = 100;
    const cellSize = canvas.width / gridSize;
    const p = 0.4; // Probability of fire spreading

    // State codes
    const TREE = 0;
    const FIRE = 1;
    const ASH = 2;

    // Create grid filled with trees
    let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(TREE));

    // Start a random fire
    const startX = Math.floor(Math.random() * gridSize);
    const startY = Math.floor(Math.random() * gridSize);
    grid[startY][startX] = FIRE;

    function drawGrid() {
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x] === TREE) {
            ctx.fillStyle = 'green';
          } else if (grid[y][x] === FIRE) {
            ctx.fillStyle = 'red';
          } else if (grid[y][x] === ASH) {
            ctx.fillStyle = 'black';
          }
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }

    function step() {
      let newGrid = grid.map(row => row.slice());
      let fireExists = false;

      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          if (grid[y][x] === FIRE) {
            // Turn current fire into ash
            newGrid[y][x] = ASH;

            // Try to ignite neighbors (Von Neumann)
            const neighbors = [
              [y - 1, x],
              [y + 1, x],
              [y, x - 1],
              [y, x + 1]
            ];

            neighbors.forEach(([ny, nx]) => {
              if (ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize) {
                if (grid[ny][nx] === TREE && Math.random() < p) {
                  newGrid[ny][nx] = FIRE;
                }
              }
            });
          }

          if (newGrid[y][x] === FIRE) {
            fireExists = true;
          }
        }
      }

      grid = newGrid;
      drawGrid();

      if (fireExists) {
        requestAnimationFrame(step);
      }
    }

    drawGrid();
    requestAnimationFrame(step);

  </script>
</body>
</html>
