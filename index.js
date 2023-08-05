import createCard from "./components/item-card/item-card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
// const navigation = document.querySelector('[data-js="navigation"]');

async function fetchPhotos() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?limit=10&page=2"
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

fetchPhotos();
