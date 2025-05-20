/* ---------- CONFIG ---------- */
const images = [
  '001.jpeg','0062.jpeg','0063.jpeg','0064.jpeg','0057.jpeg',
  '0073.jpeg','0074.jpeg','011.jpeg'
];               // 8 imágenes distintas (16 cartas en total)

const maxErrors = 5;

/* ---------- VARIABLES DE ESTADO ---------- */
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let errorCount = 0;6

/* ---------- ELEMENTOS DOM ---------- */
const grid = document.getElementById("memory-grid");
const message = document.getElementById("message");

/* ---------- UTILIDADES ---------- */
const shuffle = (array) =>
  array.concat(array).sort(() => Math.random() - 0.5);

const resetTurn = () => {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
};

const showMessage = (text) => {
  message.textContent = text;
};

/* ---------- CREAR CARTA ---------- */
function createCard(imgSrc) {
  const card = document.createElement("div");
  card.classList.add("card");

  const inner = document.createElement("div");
  inner.classList.add("card-inner");

  const front = document.createElement("div");
  front.classList.add("card-front");

  const back = document.createElement("div");
  back.classList.add("card-back");
  const img = document.createElement("img");
  img.src = `images/${imgSrc}`;
  img.alt = "Foto para el juego de memoria";
  back.appendChild(img);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => handleCardClick(card, imgSrc));

  return card;
}

/* ---------- LÓGICA DE CLICK ---------- */
function handleCardClick(card, imgSrc) {
  if (lockBoard || card.classList.contains("flipped")) return;

  card.classList.add("flipped");

  /* primera carta */
  if (!firstCard) {
    firstCard = { card, imgSrc };
    return;
  }

  /* segunda carta */
  secondCard = { card, imgSrc };
  lockBoard = true;

  /* comprobamos coincidencia */
  if (firstCard.imgSrc === secondCard.imgSrc) {
    matchedPairs++;
    showMessage("Acertaste 🎉🎉 sigue ,sigue no te detengas !!!")
    resetTurn();

    if (matchedPairs === images.length) {
      showMessage("🎉 ¡oooohhhhh...!tu memoria es más allá de los tiempos.Entonces prepárate para el juego 2 !! ");
    }
  } else {
    errorCount++;

    if (errorCount > maxErrors) {
      showMessage("😢 Agotaste tus 4 intentos. Reiniciando…");
      setTimeout(() => location.reload(), 2000);
    } else {
      showMessage(`⚠️ Error ${errorCount}/${maxErrors}. ¡acuérdate tienes 5 chances,es que nos caes bien!`);
    }

    setTimeout(() => {
      firstCard.card.classList.remove("flipped");
      secondCard.card.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

/* ---------- INICIO DEL JUEGO ---------- */
function startGame() {
  /* por si ya existe contenido (hot‑reload) */
  grid.innerHTML = "";

  const shuffledImages = shuffle(images);
  shuffledImages.forEach((imgSrc) => grid.appendChild(createCard(imgSrc)));
}

/* ---------- ARRANCAMOS ---------- */
startGame();
