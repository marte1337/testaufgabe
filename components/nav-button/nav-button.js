export default function createNavButton(text, onClick) {
  const button = document.createElement("button");
  button.classList.add("navigation__button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}
