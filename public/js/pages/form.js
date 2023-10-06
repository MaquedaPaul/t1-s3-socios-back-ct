

function mostrarForm(ev) {
  ev.preventDefault();
  const form = document.getElementById("addAssociate");
  form.classList.toggle("hide");
}

document.querySelector('#showForm').addEventListener('click', mostrarForm)
document.querySelector('#closeForm').addEventListener('click', mostrarForm)

//pluss button behavior

let cont = 1;
const inputsTypes = {
  phone: `<div class="phoneContainer">` +
    `<div class="inputContainer">` +
    `<label for="codArea${cont}">Codigo Area</label>` +
    `<input type="text" id="codArea${cont}" name="codArea${cont}">` +
    `<div class="inputContainer">` +
    `<label for="phone${cont}">telefono</label>` +
    `<input type="text" id="phone${cont}" name="phone${cont}">` +
    `<div class="inputContainer">` +
    `<label for="PhoneType${cont}">Tipo de Telefono</label>` +
    `<input type="text" id="PhoneType${cont}" name="PhoneType${cont}">` +
    `</div>`
}
function createInput(ev, inputType) {
  ev.preventDefault()
  const parser = new DOMParser();
  const newPhone = parser.parseFromString(inputsTypes[inputType], 'text/html').querySelector(`.${inputType}Container`);
  console.log(newPhone)
  ev.target.parentElement.innerHTML += newPhone.outerHTML;
  cont++;
}

document.querySelector('#addPhone').addEventListener('click', (ev) => {
  createInput(ev, 'phone');
})
