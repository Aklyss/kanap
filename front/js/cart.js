const cart__items = document.getElementById('cart__items');
const tableau = localStorage.getItem("panier");
let tableauJson = tableau ? JSON.parse(tableau) : [];
tableauJson = tableauJson.sort((a,b) => a.kanapId > b.kanapId?1:-1);
let sommeQuantite = 0;
let sommePrice = 0;
const totalPrice = document.getElementById('totalPrice');
const totalQuantite = document.getElementById('totalQuantity');

console.log(tableauJson);

async function synch(element) {
  const url_url = (`http://localhost:3000/api/products/${element.kanapId}`);
  const reponse = await fetch(url_url)
  const data = await reponse.json();

  const title = data.name;
  const price = data.price;
  const image = data.imageUrl;
  const altTxt = data.altTxt;
  sommeQuantite = sommeQuantite + Number(element.leNombre);
  sommePrice = sommePrice + (Number(price) * Number(element.leNombre));
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
  couleur.textContent = element.laCouleur;
  div2_1.appendChild(couleur);

  let prix = document.createElement("p");
  prix.textContent = price;
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
  input.setAttribute("name", "itemQuantity");
  input.setAttribute("min", "1");
  input.setAttribute("max", "100");
  input.setAttribute("type", "number");
  input.setAttribute("value", element.leNombre);
  div2_2_1.appendChild(input);


  let div2_2_2 = document.createElement("div");
  div2_2_2.classList.add("cart__item__content__settings__delete");
  div2_2.appendChild(div2_2_2);


  let supprimer = document.createElement("p");
  supprimer.classList.add("deleteItem");
  supprimer.textContent = 'supprimer';
  div2_2_2.appendChild(supprimer);



  // supprimer un element du panier
  supprimer.addEventListener('click', function (event) {
    const parent = event.target.parentElement.parentElement.parentElement.parentElement;
    // recuperer le local storage et le mettre en array
    let panier = localStorage.getItem("panier")
    let tableau = panier ? JSON.parse(panier) : [];
    // prendre l'id du canapé choisi
    const supId = element.kanapId
    // recuperer l'objet qui correspond a l'id choisi 
    const supIndex = tableau.find(iddd => iddd.kanapId === supId && iddd.laCouleur === element.laCouleur);
    const oldValue = supIndex.leNombre;
    // prend l'index de l'objet choisi
    let grosIndex = tableau.indexOf(supIndex);
    // supprimer l'objet correspondant a l'index 
    tableau.splice(grosIndex, 1);
    // remettre le panier modifier dans le localStorage
    let panierLinea = JSON.stringify(tableau);
    localStorage.setItem("panier", panierLinea);
    sommeQuantite = sommeQuantite - Number(oldValue);
    sommePrice = sommePrice - (Number(price) * Number(oldValue));
    totalPrice.innerHTML = sommePrice;
    totalQuantite.innerHTML = sommeQuantite;
    parent.remove();
  })



  // changer la quantité d'un element du panier
  input.addEventListener('change', function () {
    let newValue = input.value;
    // recuperer le local storage et le mettre en array
    let panier = localStorage.getItem("panier")
    let tableau = panier ? JSON.parse(panier) : [];
    // prendre l'id du canapé choisi
    const supId = element.kanapId
    // recuperer l'objet qui correspond a l'id choisi 
    const supIndex = tableau.find(iddd => iddd.kanapId === supId && iddd.laCouleur === element.laCouleur);
    // prend l'index de l'objet choisi
    let oldValue = supIndex.leNombre
    // mettre à jour la nouvelle valeur 
    supIndex.leNombre = newValue;
    // remettre le panier modifier dans le localStorage
    let panierLinea = JSON.stringify(tableau);
    localStorage.setItem("panier", panierLinea);
    sommeQuantite = sommeQuantite - Number(oldValue) + Number(newValue);
    sommePrice = sommePrice - (Number(price) * Number(oldValue)) + (Number(price) * Number(newValue));
    totalPrice.innerHTML = sommePrice;
    totalQuantite.innerHTML = sommeQuantite;
  })
  totalPrice.innerHTML = sommePrice;
  totalQuantite.innerHTML = sommeQuantite;
};

async function init(){
  for (let i = 0; i < tableauJson.length; i++) {
    const element = tableauJson[i];
    const grosId = element.kanapId
    console.log(grosId);
    await synch(element);
    const submit = document.getElementById('order');

    // pour la validation du formulaire
    submit.addEventListener('click', function (event) {
      event.preventDefault();
      // regex pour les nom prénom 
      const nomPrenom = new RegExp("^[a-zÀ-ÿ ,.'-]{3,30}$", "i");
      //  regex pour les adresses mails
      const eMail = new RegExp("^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$");
      // regex pour les villes
      const ville = new RegExp("^[a-zÀ-ÿ .'-]{3,30}$", "i");
      // regex pour les adresses
      const adresse = new RegExp("^[a-zÀ-ÿ0-9 .'-]{3,30}$", "i");

      let erreur = false;
      const ePrenom = document.getElementById('firstNameErrorMsg');
      const eName = document.getElementById('lastNameErrorMsg');
      const eAdresse = document.getElementById('addressErrorMsg');
      const eVille = document.getElementById('cityErrorMsg');
      const eEmail = document.getElementById('emailErrorMsg');

      let vPrenom = document.getElementById("firstName").value;
      if (nomPrenom.test(vPrenom) === true) {

        ePrenom.textContent = '';
      } else {
        ePrenom.textContent = 'Le prénom saisit est invalide.';
        erreur = true;
      }


      let vNom = document.getElementById("lastName").value;
      if (nomPrenom.test(vNom) === true) {

        eName.textContent = '';
      } else {
        eName.textContent = 'Le nom saisit est invalide.';
        erreur = true;
      }


      let vAdresse = document.getElementById("address").value;
      if (adresse.test(vAdresse) === true) {

        eAdresse.textContent = '';
      } else {
        eAdresse.textContent = `L'adresse saisit est invalide.`;
        erreur = true;
      }


      let vVille = document.getElementById("city").value;
      if (ville.test(vVille) === true) {

        eVille.textContent = '';
      } else {
        eVille.textContent = 'La ville saisit est invalide.';
        erreur = true;
      }


      let vMail = document.getElementById("email").value;
      if (eMail.test(vMail) === true) {

        eEmail.textContent = '';
      } else {
        eEmail.textContent = 'Le mail saisit est invalide.';
        erreur = true;
      }


      if (erreur === false) {


        const order = {
          contact: {
            firstName: vPrenom,
            lastName: vNom,
            address: vAdresse,
            city: vVille,
            email: vMail,
          },
          products: [element.kanapId],
        }



        function poster() {
          fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
          })

            .then((res) => res.json())
            .then((data) => {
              localStorage.clear();
              console.log(data);
              let confi = "./confirmation.html?id=" + element.kanapId
              window.location.href = confi;
            })
        } poster()
      }
    }
    )

  };

}

init();