import { validate, createRow, getData } from "./functions.js";

// 1-MASHQ
const userForm = document.getElementById("userForm");
const tableBody = document.querySelector("#dataTable tbody");
const addBtn = document.querySelector("#addBtn");
const search = document.querySelector("#search");
addBtn &&
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const row = document.createElement("tr");
    const rowIndex = tableBody.children.length + 1;
    row.innerHTML = `
    <td>${rowIndex}</td>
    <td>${name}</td>
    <td>${surname}</td>
    <td>${email}</td>
    <td><button class="delete-btn">O'chirish</button></td> 
    `;
    tableBody.appendChild(row);
    userForm.reset();
  });
tableBody &&
  tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const row = e.target.closest("tr");
      row.remove();
      changeNumber();
    }
  });
function changeNumber() {
  [...tableBody.children].forEach((row, index) => {
    row.children[0].textContent = index + 1;
  });
}

// 4
search &&
  search.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    const troads = document.querySelectorAll("tbody tr");
    troads.forEach(function (tr) {
      if (tr.textContent.toLocaleLowerCase().includes(searchValue)) {
        tr.style.display = "block";
      } else {
        tr.style.display = "none";
      }
    });
    userForm.reset();
  });

// 2-MASHQ
const colorPicker = document.querySelector("#colorPicker");
const exampleText = document.querySelector("#exampleText");
colorPicker &&
  colorPicker.addEventListener("input", function () {
    exampleText.style.backgroundColor = colorPicker.value;
  });

// 3-MASHQ
const valForm = document.getElementById("valForm");
const infos = document.querySelectorAll(".info");
const submitBtn = document.getElementById("submitBtn");
submitBtn &&
  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let isFormValid = true;
    infos.forEach((info) => {
      if (info.value.trim() == "") {
        info.classList.add("invalid");
        info.classList.remove("valid");
        isFormValid = false;
      } else {
        info.classList.add("valid");
        info.classList.remove("invalid");
        isFormValid = true;
      }
    });

    if (isFormValid) {
      alert("Forma muvaffaqiyatli to'ldirildi");
      valForm.reset();
      infos.forEach((info) => info.classList.remove("valid"));
    }
  });

//8-mashq
document
  .getElementById("greeting")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("hiName").value.trim();
    const gender = document.getElementById("gender").value;
    const greetingMessage = document.getElementById("greetingMessage");

    let greetingText = "";

    if (gender == "male") {
      greetingText = `Assalomu alaykum, ${name}`;
    } else if (gender == "female") {
      greetingText = `Salom, ${name}`;
    }
    greetingMessage.textContent = greetingText;
  });

// 9-MASHQ
document.getElementById("math").addEventListener("submit", function (event) {
  event.preventDefault();
  const oper = document.getElementById("mathOperation").value;
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const result = document.getElementById("result");

  let sum;
  if (oper === "+") {
    sum = num1 + num2;
  } else if (oper === "-") {
    sum = num1 - num2;
  } else if (oper === "*") {
    sum = num1 * num2;
  } else if (oper === "/") {
    if (num2 !== 0) {
      sum = num1 / num2;
    } else {
      sum = "Xatolik: Nolga bo'linmaydi";
    }
  }

  result.textContent = `${num1} ${oper} ${num2} = ${sum}`;
});

// 10-MASHQ
const prForm = document.querySelector("#productForm");
const prName = document.querySelector("#productName");
const prPrice = document.querySelector("#productPrice");
const prCount = document.querySelector("#productCount");
const prBtnSave = document.querySelector("#btnSaveProduct");
const tbody = document.querySelector("#tbody");
const overallCount = document.querySelector("#overallCount");
const overallPrice = document.querySelector("#overallPrice");

prBtnSave &&
  prBtnSave.addEventListener("click", function (event) {
    event.preventDefault();
    if (!validate()) return;

    const product = {
      id: Date.now(),
      name: prName.value,
      price: prPrice.value,
      count: prCount.value,
    };

    let products = getData();
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    prForm.reset();

    let index = tbody.children.length + 1;
    let row = createRow(product, index);
    tbody.innerHTML += row;

    overallCount.innerHTML = +overallCount.innerHTML + Number(product.count);
    overallPrice.innerHTML = +overallPrice.innerHTML + Number(product.price);
  });

document.addEventListener("DOMContentLoaded", function () {
  let products = getData();
  let sum = 0;
  let counter = 0;

  products.forEach((product, index) => {
    let row = createRow(product, index + 1);
    tbody.innerHTML += row;
    sum += Number(product.price);
    counter += Number(product.count);
  });

  overallCount.innerHTML = counter;
  overallPrice.innerHTML = sum;

  document.querySelectorAll("button.delete-tool").forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      if (!confirm("Rostdan ham o'chirmoqchimisiz?")) return;

      let elementId = this.getAttribute("data-id");
      let products = getData().filter((product) => product.id != elementId);

      localStorage.setItem("products", JSON.stringify(products));
      this.closest("tr").remove();
    });
  });

  document.querySelectorAll("button.edit-tool").forEach((editBtn) => {
    editBtn.addEventListener("click", function () {
      let elementId = this.getAttribute("data-id");
      let products = getData();
      let oldValue = products.find((product) => product.id == elementId);

      let name = prompt("Nomi", oldValue.name) || oldValue.name;
      let price = +prompt("Narxi", oldValue.price) || oldValue.price;
      let count = +prompt("Soni", oldValue.count) || oldValue.count;

      products = products.map((product) =>
        product.id == elementId
          ? { id: product.id, name, price, count }
          : product
      );

      localStorage.setItem("products", JSON.stringify(products));
      window.location.reload();
    });
  });
});
