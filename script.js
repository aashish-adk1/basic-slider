const container = document.querySelector('.scroll-container');
let boxes = []; // Track the three visible boxes

// Helper function to create a box
let boxCounter = 1;
function createBox() {
  const box = document.createElement('div');
  box.className = 'box';

  const photo = document.createElement('div');
  photo.className = 'photo-placeholder';

  const profileContainer = document.createElement('div');
  profileContainer.className = 'profile-placeholder';

  const circle = document.createElement('div');
  circle.className = 'circle-placeholder';

  const line = document.createElement('div');
  line.className = 'line-placeholder';

  profileContainer.appendChild(circle);
  profileContainer.appendChild(line);

  box.appendChild(photo);
  box.appendChild(profileContainer);

  box.dataset.id = boxCounter++;
  return box;
}

// Initialize with three boxes
function initializeBoxes() {
  for (let i = 0; i < 3; i++) {
    const box = createBox();
    container.appendChild(box);
    boxes.push(box);
  }
  updateFocus();
}

// Update focus to keep the middle box enlarged and centered
function updateFocus() {
  boxes.forEach((box, index) => {
    box.classList.remove('middle', 'above', 'below');
    if (index === 1) {
      box.classList.add('middle');
    } else if (index < 1) {
      box.classList.add('above');
    } else {
      box.classList.add('below');
    }
  });
}

// Scroll up and update boxes
function scrollUp() {
  const firstBox = boxes.shift(); // Remove the first box
  container.removeChild(firstBox);

  const newBox = createBox(); // Add a new box at the end
  container.appendChild(newBox);
  boxes.push(newBox);

  updateFocus();
}

// Drag functionality
let isDragging = false;
let startY = 0;

container.addEventListener('mousedown', (e) => {
  const middleBox = boxes[1]; // The middle box
  if (middleBox.contains(e.target)) {
    isDragging = true;
    startY = e.clientY;
    middleBox.style.cursor = 'grabbing';
  }
});

container.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  const middleBox = boxes[1];
  middleBox.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const deltaY = e.clientY - startY;
  if (deltaY < -50) {
    // Dragging up: Scroll the middle box out of view
    scrollUp();
    isDragging = false;
  }
});

// Initialize
initializeBoxes();
