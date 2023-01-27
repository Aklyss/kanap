const cart__items = document.getElementById('cart__items');
    const tableau = localStorage.getItem("panier");
    const tableauJson = tableau? JSON.parse(tableau):[];
    

tableauJson.forEach(element => {
console.log(element)




const url_url = (`http://localhost:3000/api/products/${element.kanapId}`);

fetch(url_url)
    .then(reponse => reponse.json())
    .then(data => {
        const title = data.name;
        const price = data.price;
        const image = data.imageUrl;
        const altTxt= data.altTxt;


        // Définir la balise section 
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.dataset.id = element.kanapId;
        article.dataset.color = element.laCouleur;

        document.getElementById('cart__items').appendChild(article);

        // Définir la balise div 
        let div1 = document.createElement("div");
        div1.classList.add("cart__item__img");
        article.appendChild(div1);
        

        // Définir la balise img 
        let img = document.createElement("img");
        img.src = image;
        img.alt = altTxt;
        div1.appendChild(img);


        // Définir la balise div 
        let div2 = document.createElement("div");
        div2.classList.add("cart__item__content");
        article.appendChild(div2);

        // Définir la balise div
        let div2_1 = document.createElement("div");
        div2_1.classList.add("cart__item__content__description");
        div2.appendChild(div2_1);

        let h2 = document.createElement("h2");
        h2.textContent = title;
        div2_1.appendChild(h2);

        let couleur = document.createElement("p");
        couleur.textContent = element.laCouleur ;
        div2_1.appendChild(couleur);

        let prix = document.createElement("p");
        prix.textContent = price ;
        div2_1.appendChild(prix);

        // Définir la balise div
        let div2_2 = document.createElement("div");
        div2_2.classList.add("cart__item__content__settings");
        div2.appendChild(div2_2);

        // Définir la balise div
        let div2_2_1 = document.createElement("div");
        div2_2_1.classList.add("cart__item__content__settings__quantity");
        div2_2.appendChild(div2_2_1);

        let QTE = document.createElement("p");
        QTE.textContent = 'Qté :';
        div2_2_1.appendChild(QTE);

        let input = document.createElement("input");
        input.classList.add("itemQuantity");
        input.setAttribute("name","itemQuantity");
        input.setAttribute("min","1");
        input.setAttribute("max","100");
        input.setAttribute("type","number");
        input.setAttribute("value",element.leNombre);
        div2_2_1.appendChild(input);


        let div2_2_2 = document.createElement("div");
        div2_2_2.classList.add("cart__item__content__settings__delete");
        div2_2.appendChild(div2_2_2);


        let supprimer = document.createElement("p");
        supprimer.classList.add("deleteItem");
        supprimer.textContent = 'supprimer';
        div2_2_2.appendChild(supprimer);



      // supprimer un element du panier
      console.log(supprimer);
      supprimer.addEventListener('click', function(){
            // recuperer le local storage et le mettre en array
            let panier = localStorage.getItem("panier")
            let tableau = panier? JSON.parse(panier):[];
            console.log(tableau);
            // prendre l'id du canapé choisi
            const supId = element.kanapId
            console.log(supId);
            // recuperer l'objet qui correspond a l'id choisi 
            const supIndex = tableau.find( iddd => iddd.kanapId === supId);
            console.log(supIndex);
            // prend l'index de l'objet choisi
            let grosIndex = tableau.indexOf(supIndex);
            console.log(grosIndex);
            // supprimer l'objet correspondant a l'index 
            tableau.splice(grosIndex,1);
            console.log(tableau)
            // remettre le panier modifier dans le localStorage
            let panierLinea = JSON.stringify(tableau);
            localStorage.setItem("panier",panierLinea);
            // raffraichir la page pour afficher les modifications
            location.reload();
      })

      // changer la quantité d'un element du panier
      input.addEventListener('change', function(){
        let newValue = input.value;
        console.log(newValue)
        // recuperer le local storage et le mettre en array
        let panier = localStorage.getItem("panier")
        let tableau = panier? JSON.parse(panier):[];
        console.log(tableau);
        // prendre l'id du canapé choisi
        const supId = element.kanapId
        console.log(supId);
        // recuperer l'objet qui correspond a l'id choisi 
        const supIndex = tableau.find( iddd => iddd.kanapId === supId);
        console.log(supIndex);
        // prend l'index de l'objet choisi
        let grosIndex = tableau.indexOf(supIndex);
        console.log(grosIndex);
        // mettre à jour la nouvelle valeur 
        supIndex.leNombre = newValue;
        // remettre le panier modifier dans le localStorage
            let panierLinea = JSON.stringify(tableau);
            localStorage.setItem("panier",panierLinea);
            // raffraichir la page pour afficher les modifications (total)
            location.reload();
      })
    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = Number(totalPrice.textContent)+(price*element.leNombre);
    });
});



  