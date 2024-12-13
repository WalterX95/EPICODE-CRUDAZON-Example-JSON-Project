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

// Array per gestire l'elenco dei prodotti ottenuti dalla fetch in locale
let productList = [];

// Variabile per diversificare l'inserimento dalla modifica
let productMod;


let myProduct;

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
        myProduct = JSON.stringify(data);
            console.log(myProduct);
            let main = document.getElementById("fetchData");
            let objCard = document.createElement("div");
            let objImg = document.createElement("img");
            let objDesc = document.createElement("div");
            objCard.className = "card";
            objDesc.className = "card-body";
            objCard.style.width = "18rem";
            objImg.className = "card-img-top";
            objImg.src = myProduct;
            objCard.appendChild(objImg);
            objCard.appendChild(objDesc);
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
        myForm.reset();
    } else { // Avvio del processo di modifica record
        printForm(id);
    }
}

// Funzione di cancellazione record
const deleteItem = async id => {
    try {
        await fetch(url + id, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
    myForm.reset();
}

// Funzione di cancellazione record
const modifyItem = async id => {
    productMod.name = productName.value;
    productMod.description = descProduct.value;
    productMod.brand = brandProduct.value;
    productMod.price = priceProduct.value;
    productMod.imageUrl = linkProduct.value;
    try {
        await fetch(url + id, {
            method: 'PUT',
            body: JSON.stringify(productMod),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error);
    }
    productMod = '';
    myForm.reset();
}

// Funzione di riempimento del form con i dati del record da modificare
function printForm(id) {
    for (let i = 0; i < productList.length; i++) {
        if (id == productList[i].id) {
            productMod = new Product(productName[i].value, descProduct[i].value, brandProduct[i].value, linkProduct[i].value, priceProduct[i].value);
            productMod.id = productList[i].id;
        }
    }
    productMod.name = productName.value;
    productMod.description = descProduct.value;
    productMod.brand = brandProduct.value;
    productMod.price = priceProduct.value;
    productMod.imageUrl = linkProduct.value;
}


