//GLOBAL VAR
const url = 'https://striveschool-api.herokuapp.com/api/product/';
//INPUT FORM-DATA
const productName = document.getElementById('productName');
const linkProduct = document.getElementById('linkProduct');
const brandProduct = document.getElementById('brandProduct');
const priceProduct = document.getElementById('priceProduct');
const descProduct = document.getElementById('descProuct');
const deleteProduct = document.getElementById('deleteProduct');
const formError = document.getElementById('formError');
const addProduct = document.getElementById('addProduct');
const modProduct = document.getElementById('modPrduct');
const formProduct = document.getElementById("myForm");

// Classe per gestire i prodotti conformemente all'API
class Product {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    }
}

// Variabile per diversificare l'inserimento dalla modifica
let productMod;


let myphoto;

document.addEventListener('load', init());

function init() {
    loadList();
}

async function loadList() {
    await fetch(url, {
        method:'GET',
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MzA3ZGI3MzAwMTU0MDYzYjIiLCJpYXQiOjE3MzQwODMwMjYsImV4cCI6MTczNTI5MjYyNn0.rD8PAahmZbW25bdkpccCc5YFq6o5Cw5YYXTfWCxoS0s"
        }
    }).then((response) => {
        console.log(response.json());
    }).then((data) => {
        myphoto = JSON.stringify(data);
            console.log(myphoto);
            let main = document.getElementById("fetchData");
            let objCard = document.createElement("div");
            let objImg = document.createElement("img");
            objCard.className = "card";
            objCard.style.width = "18rem";
            objImg.className = "card-img-top";
            objImg.src = myphoto;
            objCard.appendChild(objImg);
            main.appendChild(objCard);
    }).catch((error) => {
       console.log(error);
    });
}

async function createProduct() {
    await fetch(url, {
        method:'POST',
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MzA3ZGI3MzAwMTU0MDYzYjIiLCJpYXQiOjE3MzQwODMwMjYsImV4cCI6MTczNTI5MjYyNn0.rD8PAahmZbW25bdkpccCc5YFq6o5Cw5YYXTfWCxoS0s",
        "Content-type":"application/json"
        }
    });
}



// Funzione che gestisce l'aggiunta record O avvia il processo di modifica record
const manageItem = async id => {
    if (!id) { // Aggiunta record
        let newProduct = new User(productName.value, descProduct.value, brandProduct.value, linkProduct.value, priceProduct.value);
        try {
            await fetch(dataURL, {
                method: 'POST',
                body: JSON.stringify(newProduct),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.log(error);
        }
        readList();
        myForm.reset();
    } else { // Avvio del processo di modifica record
        printForm(id);
    }
}

// Funzione di cancellazione record
const deleteItem = async id => {
    try {
        await fetch(dataURL + id, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
    readList();
    myForm.reset();
}

// Funzione di cancellazione record
const modifyItem = async id => {
    userMod.name = userName.value;
    userMod.surname = userSurname.value;
    userMod.phone = userPhone.value;
    userMod.email = userEmail.value;
    try {
        await fetch(dataURL + id, {
            method: 'PUT',
            body: JSON.stringify(userMod),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
    userMod = '';
    readList();
    myForm.reset();
    btnSendForm.innerText = 'AGGIUNGI';
    btnSendForm.setAttribute('disabled', 'true');
}

// Funzione di riempimento del form con i dati del record da modificare
function printForm(id) {
    for (let i = 0; i < usersList.length; i++) {
        if (id == usersList[i].id) {
            userMod = new Product(productName[i].value, descProduct[i].value, brandProduct[i].value, linkProduct[i].value, priceProduct[i].value);
            userMod.id = usersList[i].id;
        }
    }
    userName.value = userMod.name;
    userSurname.value = userMod.surname;
    userPhone.value = userMod.phone;
    userEmail.value = userMod.email;
    btnSendForm.innerText = 'MODIFICA';
    btnSendForm.removeAttribute('disabled');
}


