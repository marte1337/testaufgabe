export default function createCard(data) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
            <div class='card__image-container'>
              <img
              class="card__image"
              src="https://picsum.photos/id/${data.id}/640/360"
              width="640" height="360"
              alt="A Photography by ${data.author}"
              loading="lazy"
              />
            <div class="card__content">
              <p >Author: ${data.author}</p>
              <a href="${data.download_url}" target="_blank">View Full-Res (${data.width} x ${data.height})</a>
            </div>
    `;
  return card;
}

// src="https://picsum.photos/id/${data.id}/500/300"
