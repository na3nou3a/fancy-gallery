// =================== VARIABLES =============================
const numOfImages = 9;

// =================== FUNCTIONS =============================
function createGallery() {
  createBoxes();
  createIcons();
  addBackgroundImages();
  addEventsToEachBox();
}
function createBoxes() {
  const gallery = document.querySelector('.gallery');
  const mainImg = document.createElement('div');
  mainImg.className = 'main-img-box';
  gallery.innerHTML = '';
  gallery.appendChild(mainImg);
  for (let i = 0; i < numOfImages; i++) {
    const box = document.createElement('div');
    box.className = 'img-box';
    box.setAttribute('data-index', i + 1);
    gallery.appendChild(box);
  }
}
function createIcons() {
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach((box, i) => {
    const imgIcon = document.createElement('img');
    imgIcon.className = 'img-icon';
    imgIcon.src = `images/icon-${i + 1}.jpg`;
    box.appendChild(imgIcon);
  });
}
function createIcon(box) {
  const imgIcon = document.createElement('img');
  imgIcon.className = 'img-icon';
  imgIcon.src = `images/icon-${box.dataset.index}.jpg`;
  box.appendChild(imgIcon);
}
function addBackgroundImages() {
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach((box, i) => {
    const imgUrl = `url(images/img-${i + 1}.jpg)`;
    box.style.backgroundImage = imgUrl;
  });
}
function addEventsToEachBox() {
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach((box) => {
    box.addEventListener('mouseenter', handleMouseEnterEvent);
    box.addEventListener('mousemove', handleMouseMove);
    box.addEventListener('mouseleave', handleMouseLeaveEvent);
  });
}

function handleMouseEnterEvent(e) {
  const box = e.currentTarget;
  const extandBox = document.createElement('div');
  extandBox.textContent = 'extand';
  extandBox.className = 'extand';
  box.appendChild(extandBox);
  extandBox.addEventListener('mouseover', changeImg);
}
function handleMouseMove(e) {
  const box = e.currentTarget;
  const imgIcon = box.querySelector('img');
  const top = e.clientY - box.getBoundingClientRect().top;
  const left = e.clientX - box.getBoundingClientRect().left;
  imgIcon.style.top = `${top}px`;
  imgIcon.style.left = `${left}px`;
}
function changeImg(e) {
  const extandBox = e.currentTarget;
  const heroImg = document.querySelector('.main-img-box');
  const parentBox = extandBox.parentElement;
  const imgIcon = parentBox.querySelector('img');
  const bgUrl = `url(images/img-${parentBox.dataset.index}.jpg)`;
  imgIcon.classList.add('child');
  imgIcon.style.top = 0;
  imgIcon.style.left = 0;
  extandBox.textContent = '';
  extandBox.append(imgIcon);
  extandBox.style.opacity = 0;
  parentBox.removeEventListener('mousemove', handleMouseMove);
  extandBox.removeEventListener('mouseover', changeImg);
  heroImg.style.backgroundImage = bgUrl;
  heroImg.classList.add('active');
  hideImages();
}
function handleMouseLeaveEvent(e) {
  const box = e.currentTarget;
  const extandBox = box.querySelector('.extand');
  extandBox.removeEventListener('mouseover', changeImg);
  let imgIcon = extandBox.querySelector('img');
  if (!imgIcon) {
    imgIcon = box.querySelector('img');
    box.removeChild(imgIcon);
  }
  box.removeChild(extandBox);
  const heroImg = document.querySelector('.main-img-box');
  heroImg.classList.remove('active');
  showImages();
  createIcon(box);
  box.addEventListener('mousemove', handleMouseMove);
}
function showImages() {
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach((box) => {
    box.style.opacity = 1;
  });
}
function hideImages() {
  const boxes = document.querySelectorAll('.img-box');
  boxes.forEach((box) => {
    box.style.opacity = 0;
  });
}

// =================== START =============================
createGallery();
