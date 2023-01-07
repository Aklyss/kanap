const item__img = document.querySelector('.item__img') 

const title = document.getElementById('title')

const price = document.getElementById('price')

const description = document.getElementById('description')

const colors = document.getElementById('colors')


const url_id = window.location.search;


const Id = url_id.slice(4);


const url_url = (`http://localhost:3000/api/products/${Id}`)


    fetch(url_url)
    .then(reponse => reponse.json())
    .then(data => {
        title.innerHTML += data.name
        price.innerHTML += data.price
        description.innerHTML += data.description
        item__img.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`
        data.colors.forEach((elementColor) => {
            colors.innerHTML += `<option value="${elementColor}">${elementColor}</option>`
        });
    }
    )


