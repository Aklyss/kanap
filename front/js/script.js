const items = document.getElementById('items')

function init () {
    fetch('http://localhost:3000/api/products').then((data)=>{
        return data.json()
    }).then((data)=>{
        for(let produit of data){
            displayItems(produit)
        }
    }).catch((error)=>{
        console.error(error)
    })
}

function displayItems(produit){
    items.innerHTML+=`<a href="./product.html?id=${produit._id}">
    <article>
      <img src="${produit.imageUrl}" alt="${produit.altTxt}">
      <h3 class="productName">${produit.name}</h3>
      <p class="productDescription">${produit.description}</p>
    </article>
  </a>`
}

init()