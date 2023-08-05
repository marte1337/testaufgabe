import createCard from "./components/item-card/item-card.js";
import createNavButton from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const navigation = document.querySelector('[data-js="navigation"]');

window.addEventListener("scroll", function () {
  let scrollY = window.scrollY;

  // Add 'fixed' class when the user has scrolled down 100px
  if (scrollY > 100) {
    navigation.classList.add("fixed");
  } else {
    navigation.classList.remove("fixed");
  }
});

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// States
let maxPage = 30;
let page = 1;

// Components
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

// prevButton.classList.add("disabled");
// prevButton.classList.remove("disabled");

navigation.append(prevButton, nextButton);

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
