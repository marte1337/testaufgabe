export default function createNavPagination() {
  const pagination = document.createElement("span");
  pagination.classList.add("navigation__pagination");
  pagination.textContent = "1 / 99";
  return pagination;
}
