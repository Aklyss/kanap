const item__img = document.querySelector('.item__img') 
console.log(item__img);
const title = document.getElementById('title')
console.log(title);
const price = document.getElementById('price')
console.log(price);
const description = document.getElementById('description')
console.log(description);


const url_id = window.location.search;
console.log(url_id);

const Id = url_id.slice(4);
console.log(Id);

const url_url = (`http://localhost:3000/api/products/${Id}`)

    fetch(url_url)
    .then(reponse => reponse.json())
    .then(data => {
        title.innerHTML += data.name
        price.innerHTML += data.price
        description.innerHTML += data.description
        item__img.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}"></img>`
    }
    )


