const lien = new URLSearchParams(window.location.search);
const idCom = lien.get('id');
const orderIdid = document.getElementById('orderId');

orderIdid.innerHTML = idCom;

