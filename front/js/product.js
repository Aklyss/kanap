const item__img = document.querySelector('.item__img');

const title = document.getElementById('title');

const price = document.getElementById('price');

const description = document.getElementById('description');

const colors = document.getElementById('colors');

let url_id = new URLSearchParams(window.location.search);

const Id = url_id.get('id');

const addToCart = document.getElementById('addToCart');

const url_url = (`http://localhost:3000/api/products/${Id}`);

const selection = document.querySelector('select');

// Cette fonction permet de recuperer les données du canapé choisir précédement, et de l'afficher abev les bonnes valeurs

function init(){
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
}

// la fonction click permet d'envoyer les information, donc le canapé, la couleur et la quantité au localstorage

function click(){
    addToCart.addEventListener("click", function() {
    const quantité = document.querySelector("#quantity").value;
    const selectionV = selection.selectedIndex;
    const x = Number(quantité);
        if( (selectionV != 0) && ( x > 0 ) && ( x < 101 )){
            let panierJson = {
                kanapId : Id,
                laCouleur : selection.value,
                leNombre : x,
            }
            let panier = localStorage.getItem("panier")
            let tableau = panier? JSON.parse(panier):[];
            let find = undefined;
            for(let Item of tableau) {
                if(Item.kanapId == panierJson.kanapId && Item.laCouleur == panierJson.laCouleur){
                    find = Item;
                    break;
                }


            }
            if(find){
                find.leNombre = Number(find.leNombre) + x;
                
            }else{
                tableau.push(panierJson);
            }
            let panierLinea = JSON.stringify(tableau);
            localStorage.setItem("panier",panierLinea);
            alert("L'élément a bien été ajouté au panier");
        }else{
            alert("Veuillez choisir une couleur et un nombre compris entre 1 et 100.");
        }
    }); 
}
 init()
 click()