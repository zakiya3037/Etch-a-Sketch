
const container = document.querySelector("#grid-container");
const resizeButton = document.querySelector("#resize-button");

function createGrid(size) {
  container.innerHTML = "";

  const squareSize = 960 / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");

    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseenter", function () {
      // Generate a random RGB color.
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      square.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

      // Increase darkness by 10% per interaction.
      const darkness = Number(square.dataset.darkness || 0);
      const newDarkness = Math.min(darkness + 0.1, 1);

      square.dataset.darkness = newDarkness;
      square.style.backgroundColor =
        `rgb(${Math.round(red * (1 - newDarkness))}, ` +
        `${Math.round(green * (1 - newDarkness))}, ` +
        `${Math.round(blue * (1 - newDarkness))})`;
    });

    container.appendChild(square);
  }
}

resizeButton.addEventListener("click", function () {
  const input = prompt("Enter squares per side (1–100):");

  if (input === null || input.trim() === "") {
    return;
  }

  const size = Number(input);

  if (!Number.isInteger(size) || size < 1 || size > 100) {
    alert("Enter a whole number between 1 and 100.");
    return;
  }

  createGrid(size);
});

createGrid(16);
