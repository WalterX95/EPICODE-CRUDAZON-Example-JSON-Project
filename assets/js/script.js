//INPUT FORM-DATA
const productName = document.getElementById('productName');
const linkProduct = document.getElementById('linkProduct');
const brandProduct = document.getElementById('brandProduct');
const priceProduct = document.getElementById('priceProduct');
const descProduct = document.getElementById('descProduct');
const deleteProduct = document.getElementById('deleteProduct');
const formError = document.getElementById('formError');
const addProduct = document.getElementById('addProduct');
const modProduct = document.getElementById('modPrduct');
const formProduct = document.getElementById("myForm");


const classConfig = {
    containerClass: 'col-12 col-md-6 col-lg-4 mb-4', // Classi per il contenitore della card
    cardClass: 'card h-100',                         // Classi per la card
    imageClass: 'card-img-top',                      // Classi per l'immagine
    bodyClass: 'card-body',                          // Classi per il corpo della card
    titleClass: 'card-title',                        // Classi per il titolo
    textClass: 'card-text',                          // Classi per il testo
    footerClass: 'card-footer',                      // Classi per il footer
    buttonClass: 'btn btn-primary'                   // Classi per il pulsante
};


// Classe per gestire i prodotti conformemente all'API
//https://m.media-amazon.com/images/I/51CFftTWcTL._AC_SL1080_.jpg
class Product {
    constructor(_name, _description, _brand, _imageUrl, _price) {
        this.name = _name;
        this.description = _description;
        this.brand = _brand;
        this.imageUrl = _imageUrl;
        this.price = _price;
    }
    createJSONProduct() {
        return {
            "name": this.name,
            "description": this.description,
            "brand": this.brand,
            "price": this.price,
            "imageUrl": this.imageUrl
        };
    }
}

let jsonArr = [];

//let objProd = new Product(productName.value,descProduct.value,brandProduct.value,linkProduct.value).createJSONProduct();

class CRUDAPI {
    constructor(_AuthType, _key,_endpoint) {
        this.AuthType = _AuthType;
        this.key = _key;
        this.endpoint = _endpoint;
    }
    async fetchData() {
        try {
            const response = await fetch(this.endpoint, {
                method: 'GET',
                headers: {
                    "Authorization": `${this.AuthType}  ${this.key}`,
                    'Content-Type': 'application/json;charset=utf-8'
                }
            });

            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status}`);
            }

            const result = await response.json(); // Recupero il risultato come oggetto JSON
            this.fetchToHTML(result, classConfig);
            console.log(`Oggetto recuperato:`, result);
            return result; // Restituisco l'oggetto JSON
        } catch (error) {
            console.error(`Errore durante il recupero: ${error}`);
        }
    }
    fetchToHTML(data, classConfig) {
        // Seleziona il contenitore principale dove aggiungere le card
        const mainContainer = document.getElementById('fetchData');
        mainContainer.classList.add('row'); // Assicurati che il contenitore principale abbia la classe 'row'
    
        // Itera su ogni elemento dei dati
        data.forEach(item => {
            // Crea un div per il contenitore della card
            const containerDiv = document.createElement('div');
            containerDiv.className = classConfig.containerClass;
    
            // Crea l'elemento della card
            const cardDiv = document.createElement('div');
            cardDiv.className = classConfig.cardClass;
    
            // Aggiungi l'immagine alla card
            const imgElement = document.createElement('img');
            imgElement.className = classConfig.imageClass;
            imgElement.src = item.imageUrl;
            imgElement.alt = item.name;
            cardDiv.appendChild(imgElement);
    
            // Crea il corpo della card
            const cardBody = document.createElement('div');
            cardBody.className = classConfig.bodyClass;
    
            // Aggiungi il titolo
            const titleElement = document.createElement('h5');
            titleElement.className = classConfig.titleClass;
            titleElement.textContent = item.name;
            cardBody.appendChild(titleElement);
    
            // Aggiungi la descrizione
            const descriptionElement = document.createElement('p');
            descriptionElement.className = classConfig.textClass;
            descriptionElement.textContent = item.description;
            cardBody.appendChild(descriptionElement);
    
            // Aggiungi il prezzo
            const priceElement = document.createElement('p');
            priceElement.className = classConfig.textClass;
            priceElement.textContent = `Prezzo: €${item.price}`;
            cardBody.appendChild(priceElement);
    
            // Aggiungi il corpo alla card
            cardDiv.appendChild(cardBody);
    
            // Crea il footer della card
            const cardFooter = document.createElement('div');
            cardFooter.className = classConfig.footerClass;
    
            // Aggiungi un pulsante al footer
            const buttonElement = document.createElement('a');
            buttonElement.className = classConfig.buttonClass;
            buttonElement.href = '#'; // Modifica l'URL secondo necessità
            buttonElement.textContent = 'Acquista ora';
            cardFooter.appendChild(buttonElement);
    
            // Aggiungi il footer alla card
            cardDiv.appendChild(cardFooter);
    
            // Aggiungi la card al contenitore
            containerDiv.appendChild(cardDiv);
    
            // Aggiungi il contenitore al mainContainer nel DOM
            mainContainer.appendChild(containerDiv);
        });
    }
    async insertData() {
        try {
            let response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    "Authorization": `${this.AuthType}  ${this.key}`,
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(objProd)
            });
        
            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status}`);
            }
        
            let res = await response.json();
            jsonArr.push(res);
            console.log(res);
            console.log(jsonArr);
        
            await obj.fetchData();
        } catch (error) {
            console.error(`Errore durante l'invio dei dati: ${error}`);
        }
    }
}
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE0MzA3ZGI3MzAwMTU0MDYzYjIiLCJpYXQiOjE3MzM4NjQ3NjYsImV4cCI6MTczNTA3NDM2Nn0.AtlwDoFZd_JRknCwksFaCUAnXsv0O_e0HTkIV8NsvCo";
const endpoint = 'https://striveschool-api.herokuapp.com/api/product/';

let obj = new CRUDAPI('Bearer',apiKey,endpoint);

//obj.insertData();
obj.fetchData();


// Array per gestire l'elenco dei prodotti ottenuti dalla fetch in locale
let productList = [];

// Variabile per diversificare l'inserimento dalla modifica
let productMod;


let myProduct;

