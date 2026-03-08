//Globals
let language = "pt-br";
let mode = "light-mode";
let ptBR;
let eng;
let illustrationsData;
let database;
let ageFilter = "2026";

//Getting Elements
const ptBtn = document.getElementById("pt-br");
const engBtn = document.getElementById("eng");
const modeBtn = document.getElementById("mode");
const languageBtns = [ptBtn, engBtn];
const btns = [ptBtn, engBtn, modeBtn];
const footerYear = document.querySelector(".footer-year");
const body = document.body;
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const filterBtns = document.querySelectorAll(".filter-btn");
const homeBtn = document.getElementById("home");
const bioBtn = document.getElementById("bio");
const instagramBtn = document.getElementById("instagram");
const artstationBtn = document.getElementById("artstation");
const menuBtns = [homeBtn, bioBtn, instagramBtn, artstationBtn];
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeModal = document.getElementById("close-modal");
const bioImg = document.getElementById("bio-img");
const bioText = document.getElementById("bio-text");
console.log(footerYear.textContent);

//Loading base texts in PT-BR
async function loadBaseInPTBR() {
  const response = await fetch("data/base/pt-br.json");
  const data = await response.json();
  return data;
}

loadBaseInPTBR().then((json) => {
  ptBR = json;
  database = ptBR;
});

//Loading base texts in English
async function loadBaseInEng() {
  const response = await fetch("data/base/eng.json");
  const data = await response.json();
  return data;
}

loadBaseInEng().then((json) => {
  eng = json;
});

//Loading the illustrations database
async function loadIllustrationsData() {
  const response = await fetch("data/base/illustrationsData.json");
  const data = await response.json();
  return data;
}

loadIllustrationsData().then((json) => {
  illustrationsData = json;
  setupIllustrations();
});

//Helper Functions
function setAttribute(object, attribute, value) {
  object.setAttribute(attribute, value);
  console.log(object.setAttribute(attribute, value));
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let index = 0; index < filterBtns.length; index++) {
      const element = filterBtns[index];
      element.classList.remove("active");
    }
    btn.classList.toggle("active");
    ageFilter = btn.textContent;
    gallery.innerHTML = "";

    setupIllustrations();
  });
});

menuBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let index = 0; index < menuBtns.length; index++) {
      const element = menuBtns[index];
      element.classList.remove("active-menu");
    }
    btn.classList.toggle("active-menu");
  });
});

footerYear.textContent = new Date().getFullYear();

// APP
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let index = 0; index < btns.length; index++) {
      const element = btns[index];
      element.classList.remove("active");
    }
    btn.classList.toggle("active");

    if (btn === ptBtn) {
      language = "pt-br";
      database = ptBR;
      document.documentElement.lang = language;
    } else if (btn === engBtn) {
      language = "en";
      database = eng;
      document.documentElement.lang = language;
    } else if (btn === modeBtn) {
      if (mode === "dark-mode") {
        mode = "light-mode";
        body.classList.add("light");
        body.classList.remove("dark");
      } else if (mode === "light-mode") {
        mode = "dark-mode";
        body.classList.add("dark");
        body.classList.remove("light");
      }
    }

    textsByLanguage();
  });
});

function textsByLanguage() {
  title.textContent = database.site.title;
  subtitle.textContent = database.site.subtitle;
  home.textContent = database.menu.home;
  bio.textContent = database.menu.bio;
  instagram.textContent = database.menu.instagram;
  artstation.textContent = database.menu.artstation;
  bioImg.alt = database.bio.alt;
  bioText.textContent = database.bio.text;
  btns.forEach((btn) => {
    if (btn === ptBtn || btn === engBtn) {
      setAttribute(btn, "aria-label", database.buttons[language]);
    } else {
      setAttribute(btn, "aria-label", database.buttons[mode]);
    }
  });
}

function setupIllustrations() {
  illustrationsData.forEach((illustration) => {
    filterByAge(illustration);
  });
}

function filterByAge(illustration) {
  if (ageFilter === "2026") {
    if (illustration.year === 2026) {
      createImage(illustration);
    }
  } else if (ageFilter === "2025") {
    if (illustration.year === 2025) {
      createImage(illustration);
    }
  } else if (ageFilter === "2024") {
    if (illustration.year === 2024) {
      createImage(illustration);
    }
  } else if (ageFilter === "2023") {
    if (illustration.year === 2023) {
      createImage(illustration);
    }
  } else if (ageFilter === "2022") {
    if (illustration.year === 2022) {
      createImage(illustration);
    }
  } else if (ageFilter === "2021") {
    if (illustration.year === 2021) {
      createImage(illustration);
    }
  } else if (ageFilter === "2020") {
    if (illustration.year === 2020) {
      createImage(illustration);
    }
  } else if (ageFilter === "2019") {
    if (illustration.year === 2019) {
      createImage(illustration);
    }
  } else if (ageFilter === "2018") {
    if (illustration.year === 2018) {
      createImage(illustration);
    }
  } else if (ageFilter === "2017") {
    if (illustration.year === 2017) {
      createImage(illustration);
    }
  } else if (ageFilter === "2016") {
    if (illustration.year === 2016) {
      createImage(illustration);
    }
  } else if (ageFilter === "2012-2015") {
    if (illustration.year <= 2015 && illustration.year >= 2012) {
      createImage(illustration);
    }
  }
}

function createImage(image) {
  const imageElement = document.createElement("img");
  imageElement.id = image.id;
  imageElement.src = image.link;
  imageElement.classList.add("gallery-img");

  const wrapper = document.createElement("div");
  wrapper.classList.add("gallery-item");

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const overlayText = document.createElement("div");
  overlayText.classList.add("overlay-text");
  overlayText.textContent = image.title;

  overlay.addEventListener("click", () => {
    modalImg.src = image.link;
    modalCaption.innerHTML = "";

    const line1 = document.createElement("div");
    line1.textContent = `${image.title} (${image.year})`;

    const line2 = document.createElement("div");
    line2.textContent = database.clients[image.client];

    const line3 = document.createElement("div");
    line3.textContent = `${database.medias[image.media]}`;

    modalCaption.appendChild(line1);
    modalCaption.appendChild(line2);
    modalCaption.appendChild(line3);
    modal.classList.add("active");
    modal.classList.remove("inactive");
    body.style.overflow = "hidden";
    modal.style.overflow = "auto";
    imageElement.loading = "lazy";
  });

  gallery.appendChild(wrapper);
  wrapper.appendChild(imageElement);
  wrapper.appendChild(overlay);
  overlay.appendChild(overlayText);
}

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
  modal.classList.add("inactive");
  body.style.overflow = "auto";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    modal.classList.add("inactive");
    body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.remove("active");
    modal.classList.add("inactive");
    body.style.overflow = "auto";
  }
});
