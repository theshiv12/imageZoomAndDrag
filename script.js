// Get necessary elements
const container = document.getElementById("container");
const imageContainer = document.getElementById("image-container");
const image = document.getElementById("image");

// Initialize zoom level and position
let scale = 1;
let offsetX = 0;
let offsetY = 0;

// Add event listeners
imageContainer.addEventListener("mousedown", startDrag);
imageContainer.addEventListener("mouseup", endDrag);
imageContainer.addEventListener("mousemove", drag);
imageContainer.addEventListener("wheel", zoom);

// Drag variables
let isDragging = false;
let startX = 0;
let startY = 0;

function startDrag(event) {
  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;
  imageContainer.style.cursor = "grabbing";
}

function endDrag() {
  isDragging = false;
  imageContainer.style.cursor = "grab";
}

function drag(event) {
  if (!isDragging) return;
  event.preventDefault();
  const deltaX = event.clientX - startX;
  const deltaY = event.clientY - startY;
  startX = event.clientX;
  startY = event.clientY;
  offsetX += deltaX;
  offsetY += deltaY;
  updateImagePosition();
}

function zoom(event) {
  event.preventDefault();
  const zoomSpeed = 0.1;
  const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed;
  scale += delta;
  // Limit the zoom level to a minimum of 1 (original size)
  scale = Math.max(1, scale);
  updateImageSize();
}

function updateImageSize() {
  image.style.transform = `scale(${scale})`;
}

function updateImagePosition() {
  image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
}
