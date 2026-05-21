const cartList = document.querySelector(".list");
const remainingList = document.querySelector(".summary section:first-child ul");
const boughtList = document.querySelector(".summary section:last-child ul");
const addInput = document.querySelector(".add input");
const addBtn = document.querySelector(".butadd");

function addItem(name){
  const li = document.createElement("li");
  li.innerHTML = `
    <label>${name}</label>
    <button data-tooltip="Зменшити кількість" type="button" class="btn-minus">−</button>
    <span class="qty">1</span>
    <button data-tooltip="Збільшити кількість" type="button" class="btn-plus">+</button>
    <button>Куплено</button>
    <button data-tooltip="Видалити товар" type="reset">×</button>`;
  cartList.append(li);
}

addBtn.addEventListener("click", () => {
  const name = addInput.value.trim();
  if (!name) return;
  addItem(name);
  addInput.value = "";
  addInput.focus();
});
addInput.addEventListener("keydown", (event) => {
  if (event.key==="Enter") addBtn.click();
});

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const item = button.closest("li");
  const quantity = item.querySelector(".qty");
  const currentQuantity = Number(quantity.textContent);

  if (button.type === "reset"){
    item.remove();
    updateSummary();
    return;
  }

  if(button.getAttribute("class")==="btn-plus") quantity.textContent = currentQuantity + 1;
  else if(button.getAttribute("class")==="btn-minus" && currentQuantity > 1) quantity.textContent = currentQuantity - 1;
  else if(button.textContent === "Куплено"){
    item.innerHTML=`
     <label>${item.querySelector("label").textContent}</label>
    <span class="qty">${currentQuantity}</span>
    <button>Не куплено</button>`;
  }
  updateSummary();
});