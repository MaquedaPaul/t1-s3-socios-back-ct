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
    const objMod = transformData(formData)
    console.log(objMod) 
    const data = JSON.stringify(objMod)
    //const data = Object.fromEntries(objMod)
    console.log(data)
    fetch('/socios',{
        method: 'POST',
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
        
    })
}
function transformData(data){
  const phone = {
    "areaCode": "",
    "number": "",
    "type": ""
  };
  const objeto = {
    "denomination": "",
    "name": "",
    "street": "",
    "image": "",
    "streetAddress": "",
    "floor": "",
    "apartment": "",
    "department": "",
    "province": "",
    "phones": [],
    "emails": [],
    "webSites": [],
    "partnerType": "",
    "categories": [],
    "value": 100.0,
    "membershipID": 1,
    "startDate": "2023-09-20"
};

for (const [clave, valor] of data.entries()) {
  objeto[clave] = valor;
};
objeto["phones"].push(constructorObj (phone,data));
objeto["emails"].push(data.get('email'));
objeto["webSites"].push(data.get('webSite'))
delete objeto.areaCode;
delete objeto.number;
delete objeto.type;
delete objeto.webSite;
delete objeto.email;


return objeto;
}

function constructorObj (objeto,data){
  
  for (const [clave, valor] of data.entries()) {
    if (objeto.hasOwnProperty(clave)) {
      objeto[clave] = valor;
    }
  }
 return objeto;
}
