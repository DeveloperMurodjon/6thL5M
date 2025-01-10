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

//4-MASHQ
