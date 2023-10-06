function mostrarForm(ev) {
    ev.preventDefault();
    const form = document.getElementById("addAssociate");
    form.classList.toggle("hide");
  }

  document.querySelector('#showForm').addEventListener('click', mostrarForm);
  document.querySelector('#closeForm').addEventListener('click', mostrarForm);
  document.querySelector('.creationForm').addEventListener('submit', creatAssociate);
  
  function creatAssociate(ev){
    ev.preventDefault();
    const formElem = document.querySelector('.creationForm');
    const formData = new FormData(formElem)
    const data = Object.fromEntries(formData)
    fetch('/socios',{
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
        
    })

}
function transformData(data){
  const objeto = {
    "denomination": "Denominación del socio",
    "name": "Nombre del socio",
    "street": "Calle principal",
    "image": "URL de la imagen",
    "streetAddress": "Dirección detallada",
    "floor": "Piso",
    "apartment": "Número de apartamento",
    "department": "Departamento",
    "province": "Provincia",
    "phones": [],
    "emails": [""],
    "webSites": [""],
    "partnerType": "0",
    "categories": [1],
    "value": 100.0,
    "membershipID": 1,
    "startDate": "2023-09-20"
};

for (const [clave, valor] of data.entries()) {
  objeto[clave] = valor;
};

}
const phone = {
  "areaCode": "011",
  "number": "123456789",
  "type": 0
};
function constructorObj (objeto,data,array){
  
  for (const [clave, valor] of data.entries()) {
    objeto[clave] = valor;
  }

  
  return objeto
}
