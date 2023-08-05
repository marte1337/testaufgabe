import createCard from "./components/item-card/item-card.js";
import createNavButton from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 42;
let page = 1;

// Components
const prevButton = createNavButton("prev", () => {
  if (page <= 1) return;
  page--;
  fetchImages();
});

const nextButton = createNavButton("next", () => {
  if (page >= maxPage) return;
  page++;
  fetchImages();
});

navigation.append(prevButton, nextButton);

async function fetchImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?limit=10&page=${page}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      cardContainer.innerHTML = "";
      data.map(createCard).forEach((card) => cardContainer.append(card));
      // return data;
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
