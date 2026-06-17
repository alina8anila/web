const cartList = document.querySelector(".list");
const remainingList = document.querySelector(".summary section:first-child ul");
const boughtList = document.querySelector(".summary section:last-child ul");
const addInput = document.querySelector(".add input");
const addBtn = document.querySelector(".butadd");

document.querySelectorAll(".list li").forEach(li => {
  const statusBtn = li.querySelector("button:not([class]):not([type=reset])");
  if (statusBtn && statusBtn.textContent === "Не куплено") {
    li.querySelector("label").style.textDecoration = "line-through";
  }
});
updateSummary();

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
  updateSummary();
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
  const label = event.target.closest("label");
  if (label){
    const item = label.closest("li");
    const statusBtn = item.querySelector("button:not([class]):not([type=reset])");
  if (statusBtn && statusBtn.textContent === "Куплено") {
      const oldName = label.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = oldName;
      label.replaceWith(input);
      input.focus();
      input.select();

      input.addEventListener("blur", () => {
        const newLabel = document.createElement("label");
        newLabel.textContent = input.value.trim() || oldName;
        input.replaceWith(newLabel);
        updateSummary();
      });
    }
    return;
  }

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
     <label style="text-decoration: line-through">${item.querySelector("label").textContent}</label>
    <span class="qty">${currentQuantity}</span>
    <button>Не куплено</button>`;
  }
  else if(button.textContent === "Не куплено"){
    item.innerHTML=`
    <label>${item.querySelector("label").textContent}</label>
    <button data-tooltip="Зменшити кількість" type="button" class="btn-minus">−</button>
    <span class="qty">${currentQuantity}</span>
    <button data-tooltip="Збільшити кількість" type="button" class="btn-plus">+</button>
    <button>Куплено</button>
    <button data-tooltip="Видалити товар" type="reset">×</button>`;
  }
  updateSummary();
});


function updateSummary(){
  remainingList.innerHTML = "";
  boughtList.innerHTML = "";

  cartList.querySelectorAll("li").forEach(li => {
    const name = li.querySelector("label").textContent;
    const qty = li.querySelector(".qty").textContent;
    const statusBtn = li.querySelector("button:not([class]):not([type=reset])");
    const html = `<li>${name}<span class="number">${qty}</span></li>`;
    if (statusBtn && statusBtn.textContent === "Не куплено") remainingList.innerHTML += html;
    else boughtList.innerHTML += html;
  });
}