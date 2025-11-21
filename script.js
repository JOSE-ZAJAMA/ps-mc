const cofres = [
  { id: "cofre1", code: "start", recurso: "Recurso 1: Teoria Slides" },
  { id: "cofre2", code: "torch", recurso: "Recurso 2: Teoría Video" },
  { id: "cofre3", code: "map", recurso: "Recurso 3: Mapa conceptual Visual" },
  { id: "cofre4", code: "blaze", recurso: "Recurso 4: Music" },
  { id: "cofre5", code: "craft", recurso: "Recurso 5: Game" },
  { id: "cofre6", code: "portal", recurso: "Recurso 6: Quiz" },
  { id: "cofreFinal", code: "947321", recurso: "Recompensa final: certificado + stickers" }
];

function cargarCofres() {
  const mural = document.getElementById("mural");
  const final = document.getElementById("cofre-final");
  mural.innerHTML = "";
  final.innerHTML = "";

  cofres.forEach((cofre, index) => {
    const estado = localStorage.getItem(cofre.id) === "unlocked";
    const bloque = document.createElement("div");
    bloque.className = cofre.id === "cofreFinal" ? "cofre especial" : "cofre";

    if (estado && cofre.id === "cofreFinal") {
      bloque.classList.add("unlocked");
    }

    bloque.innerHTML = `
      <img src="assets/cofres/${estado ? "cofre-abierto.png" : "cofre-cerrado.png"}" />
      <input type="text" id="${cofre.id}-input" placeholder="Enter code" />
      <button onclick="verificar('${cofre.id}', '${cofre.code}', ${index})">Unlock</button>
    `;

    if (cofre.id === "cofreFinal") {
  console.log("AGREGANDO COFRE FINAL");
  final.appendChild(bloque);
} else {
  mural.appendChild(bloque);
}
  });
}

window.onload = function() {
  cargarCofres();

  // test
  console.log("test:", document.getElementById("cofreFinal-input")?.parentElement?.parentElement?.id);
};

function verificar(id, code, index) {
  const input = document.getElementById(`${id}-input`).value.trim().toLowerCase();
  
  if (input === code) {
    localStorage.setItem(id, "unlocked");
    new Audio("assets/audios/mc-xp.mp3").play();
    mostrarModal(cofres[index].recurso, id);
    cargarCofres();

    // ---> acá adentro
    if (id === "cofreFinal") {
      document.getElementById("fireworks").style.display = "block";
      setTimeout(() => {
        document.getElementById("fireworks").style.display = "none";
      }, 5000);
    }

  } else {
    alert("Try again, adventurer!");
  }
}

function mostrarModal(contenido, id) {
  const modal = document.getElementById("modal");
  const contenidoDiv = document.getElementById("contenido");

  switch(id) {

    case "cofre1":
      contenidoDiv.innerHTML = `
        <h2>#1 - Theory</h2>
        <img src="assets/thumbs/1.png" class="imgRecurso"">
        <p><a href="https://present-simple-guide-8nj9vyw.gamma.site/" target="_blank" class="enlace-personalizado">Open</a></p>
      `;
      break;

    case "cofre2":
      contenidoDiv.innerHTML = `
        <h2>#2 - Video</h2>
        <img src="assets/thumbs/2.png" class="imgRecurso"">
        <p><a href="https://youtu.be/EohOtj0nAwI" target="_blank" class="enlace-personalizado">Watch the video</a></p>
      `;
      break;

    case "cofre3":
      contenidoDiv.innerHTML = `
        <h2>#3 - Visual</h2>
        <img src="assets/thumbs/3.png" class="imgRecurso"">
        <p><a href="https://www.canva.com/design/DAG4Zz1FiCg/hmIX1K3u-oQAYi14Fq7d7w/view?utm_content=DAG4Zz1FiCg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h78d365318f" target="_blank" class="enlace-personalizado">Open</a></p>
      `;
      break;

    case "cofre4":
      contenidoDiv.innerHTML = `
        <h2>#4 - Music</h2>
        <img src="assets/thumbs/4.png" class="imgRecurso"">
        <p><a href="https://drive.google.com/file/d/1DXZD9IFm4B2HvZD-V4aWiHHuNAjNcTei/view?usp=drive_link" target="_blank" class="enlace-personalizado">Listen to the song</a></p>
      `;
      break;

    case "cofre5":
      contenidoDiv.innerHTML = `
        <h2>#5 - Game</h2>
        <img src="assets/thumbs/5.png" class="imgRecurso"">
        <p><a href="https://kahoot.it/challenge/01879053?challenge-id=99c624c3-63eb-480d-a019-198d6fae2d02_1762911883593" target="_blank" class="enlace-personalizado">Play game</a></p>
      `;
      break;

    case "cofre6":
      contenidoDiv.innerHTML = `
        <h2>#6 - Quiz</h2>
        <img src="assets/thumbs/6.png" class="imgRecurso"">
        <p><a href="https://chat.qwen.ai/s/deploy/b8db9274-db18-457c-bcd7-8014b0799a06" target="_blank" class="enlace-personalizado">Open</a></p>
      `;
      break;

    case "cofreFinal":
      contenidoDiv.innerHTML = `
        <h2>Congratulations, Adventurer!</h2>
        <p>You’ve completed all the challenges!</p>
        <img src="assets/thumbs/7.png" class="imgRecurso"">
        <a href="assets/docs/mc-certificate.pdf" target="_blank" class="enlace-personalizado">Claim your certificate</a><br>
        <a href="assets/docs/mc-stickers-demo.pdf" target="_blank" class="enlace-personalizado">Claim your stickers</a>
      `;
      break;

    default:
      contenidoDiv.innerText = contenido;
  }

  modal.style.display = "block";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function reiniciar() {
  cofres.forEach(c => localStorage.removeItem(c.id));
  cargarCofres();
}

window.onload = cargarCofres;
