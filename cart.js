const cartList = document.querySelector(".list");
const remainingList = document.querySelector(".summary section:first-child ul");
const boughtList = document.querySelector(".summary section:last-child ul");
const addInput = document.querySelector(".add input");
const addBtn = document.querySelector(".butadd");

cartList.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const item = button.closest("li");
  const quantity = item.querySelector(".qty");
  const currentQuantity = Number(quantity.textContent);

  if (button.type === "reset"){
    item.remove();
    return;
  }

  if(button.getAttribute("class")==="btn-plus") quantity.textContent = currentQuantity + 1;
  else if(button.getAttribute("class")==="btn-minus" && currentQuantity > 1) quantity.textContent = currentQuantity - 1;

});