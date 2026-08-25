let currentFilter = "todos";

/* Abrir modal */

function openModal() {
  document.getElementById("modal").classList.add("active");
}

/* Fechar modal */

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}

/* Fechar clicando fora */

document.getElementById("modal").addEventListener("click", function (event) {
  if (event.target === this) {
    closeModal();
  }
});

/* Filtrar materiais */

function filterMaterials(type, button) {
  currentFilter = type;

  document.querySelectorAll(".category").forEach(category => {
    category.classList.remove("active");
  });

  button.classList.add("active");

  applyFilters();
}

/* Pesquisa */

function searchMaterials() {
  applyFilters();
}

/* Aplicar filtro + pesquisa */

function applyFilters() {
  const search = document
    .getElementById("searchInput")
    .value
    .toLowerCase();

  const cards = document.querySelectorAll(".material-card");

  let visibleCards = 0;

  cards.forEach(card => {
    const type = card.dataset.type;
    const name = card.dataset.name.toLowerCase();

    const matchesFilter =
      currentFilter === "todos" || type === currentFilter;

    const matchesSearch =
      name.includes(search);

    if (matchesFilter && matchesSearch) {
      card.style.display = "block";
      visibleCards++;
    } else {
      card.style.display = "none";
    }
  });

  const emptyState = document.getElementById("emptyState");

  if (visibleCards === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }
}

/* Ordenar */

function sortMaterials() {
  const grid = document.getElementById("materialsGrid");
  const cards = Array.from(grid.querySelectorAll(".material-card"));

  const option = document.getElementById("sortSelect").value;

  cards.sort((a, b) => {
    if (option === "name") {
      return a.dataset.name.localeCompare(b.dataset.name);
    }

    return 0;
  });

  cards.forEach(card => grid.appendChild(card));
}

/* Adicionar novo material */

function addMaterial(event) {
  event.preventDefault();

  const name = document.getElementById("materialName").value;
  const subject = document.getElementById("materialSubject").value;
  const type = document.getElementById("materialType").value;

  const grid = document.getElementById("materialsGrid");

  const icons = {
    pdf: "📄",
    video: "▶️",
    foto: "🖼️",
    anotacao: "📝"
  };

  const labels = {
    pdf: "PDF",
    video: "VÍDEO",
    foto: "FOTO",
    anotacao: "ANOTAÇÃO"
  };

  const card = document.createElement("article");

  card.className = "material-card";

  card.dataset.type = type;
  card.dataset.name = name;

  card.innerHTML = `
    <div class="card-header">
      <div class="subject-icon biology">
        ${icons[type]}
      </div>

      <span class="type ${type}">
        ${labels[type]}
      </span>
    </div>

    <h3>${name}</h3>

    <p class="subject">${subject}</p>

    <div class="card-info">
      <span>📚 Novo material</span>
      <span>🕐 Agora</span>
    </div>

    <button
      class="access-button"
      onclick="accessMaterial('${name}')">
      Acessar material →
    </button>
  `;

  grid.prepend(card);

  document.getElementById("materialForm").reset();

  closeModal();

  alert("Material adicionado com sucesso!");

  applyFilters();
}

/* Acessar material */

function accessMaterial(name) {
  alert(`Abrindo material: ${name}`);
}
