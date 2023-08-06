import createCard from "./components/item-card/item-card.js";
import createNavButton from "./components/nav-button/nav-button.js";

const cardContainer = document.getElementById("cardContainer");
const navigation = document.getElementById("navigation");

// State
let page = 1;
let maxPage = 30;

// Navigation Buttons
const prevButton = createNavButton("prev", () => {
  if (page <= 1) return;
  page--;
  fetchImages();
  scrollToTop();
});

const nextButton = createNavButton("next", () => {
  if (page >= maxPage) return;
  page++;
  fetchImages();
  scrollToTop();
});

navigation.append(prevButton, nextButton);

// Navigation Appearance
window.addEventListener("scroll", function () {
  let scrollY = window.scrollY;

  if (scrollY > 100) {
    navigation.classList.add("fixed");
  } else {
    navigation.classList.remove("fixed");
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
}

// Fetch
async function fetchImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?limit=10&page=${page}`
    );
    if (response.ok) {
      const data = await response.json();
      cardContainer.innerHTML = "";
      data.map(createCard).forEach((card) => cardContainer.append(card));
    } else {
      if (response.status === 404) {
        console.error("Not found - 404 error");
      } else if (response.status === 500) {
        console.error("Internal server error - 500 error");
      } else {
        console.error("Unknown error:", response.status);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

fetchImages();
