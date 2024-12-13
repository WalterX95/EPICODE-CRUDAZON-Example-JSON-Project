const url = 'https://striveschool-api.herokuapp.com/api/product/';

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
    }).then((data)) => {
         
    };
}


