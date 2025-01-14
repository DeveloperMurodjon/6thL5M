function validate() {
  return prName.value.trim() !== "" && prPrice.value > 0 && prCount.value > 0;
}

function getData() {
  let products = [];
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
  }
  return products;
}

function createRow(product, index) {
  return `  
      <tr>
         <td>${index}</td>
         <td>${product.name}</td>
         <td>${product.price}</td>
         <td>${product.count}</td>
         <td>
             <button class="delete-tool" data-id="${product.id}">delete</button>
             <button class="edit-tool" data-id="${product.id}">edit</button>
         </td>
       </tr>`;
}

export { validate, createRow, getData };
