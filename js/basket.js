const main = document.querySelector(".main__products");
const btnBag = document.getElementById("basket");
const bag = document.querySelector(".bag");
const bagClose = document.querySelector(".bag_close-img");
const btnClearItems = document.getElementById("bag__button");

class Products {
  readArrayStorage() {
    let countForBag = 0;
    const data = prod.dataPars();
    const valueBagCount = document.querySelector(".header__bag-count");
    const overFlow = document.getElementById("bag__product");

    if (data) {
      for (let k = 0; k < data.length; k++) {
        countForBag++;
      }
      if (data.length > 4) {
        overFlow.style.overflowY = "scroll";
      } else {
        overFlow.style.overflowY = "hidden";
      }
      valueBagCount.textContent = countForBag;
    }
  }

  totallPrice(data) {
    let totalPrice = document.querySelector(".bag__totall__price");
    const arrayPrice = data.map((item) => item.sumPrice);
    let summPrice = arrayPrice.reduce(function (previousValue, item) {
      return item + previousValue;
    }, 0);
    totalPrice.textContent = summPrice;
  }

  forPlusProduсt(id, howManyProducts) {
    const data = this.dataPars();

    for (let j = 0; j < data.length; j++) {
      if (j == id) {
        data[j].valueInput = howManyProducts;
        data[j].sumPrice = howManyProducts * data[j].price;
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
  }

  dataPars() {
    return JSON.parse(localStorage.getItem("data"));
  }

  setStorageItem(key, dataP) {
    localStorage.setItem(key, dataP);
  }
}

const prod = new Products();

function showElements() {
  const data = prod.dataPars();
  let bagProducts = document.querySelector(".bag__product");

  if (data.length < 1) {
    btnClearItems.style.display = "none";
  } else {
    btnClearItems.style.display = "block";
  }

  bagProducts.innerHTML = "";

  let par = document.createElement("div");
  par.className = "psevdo-bag-products";

  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product__item-bag";

    div.innerHTML = ` <div class="img-forbag"><img src="img/${item.img}" alt="${item.name}" class="img-forbag-img"></div>
                      <div class="product__box">
                        <div class="product__box__name">${item.name}</div>
                        <div class="product__box__price">${item.price}<span>$</span></div>
                        <div class="product__count-hidden">${index}</div>
                        <div class="product__box__remove">remove</div>                      
                      </div>
                      <div class="product__value__count">
                        <div class="product__more"><img src="img/arrow_more.jpg" alt="" class="product__more-img" ></div>
                        <div class="product__valueInput-inbag">${item.valueInput}</div>
                        <div class="product__less"><img src="img/arrow_less.jpg" alt="" class="product__less-img"></div>
                      </div>
                      `;
    par.appendChild(div);
  });

  bagProducts.appendChild(par);
  prod.totallPrice(data);
}

btnBag.addEventListener("click", () => {
  bag.style.display = "block";
  bag.style.display = "flex";
  showElements();
  document.body.style.overflow = "hidden";
});

document.addEventListener("click", (event) => {
  const target = event.target;
  const bagProducts = document.querySelector(".bag__product");
  const data = prod.dataPars();
  /*-----------------------------------------------------------------closee Bag------------------------------------*/
  if (target.className == "bag__opacity") {
    bag.style.display = "none";
    document.body.style.overflow = "scroll";
  }
  /*-------------------------------------------------------------remove items from bag-------------------------------*/
  if (target.className == "product__box__remove") {
    bagProducts.innerHTML = "";
    const index = target
      .closest(".product__item-bag")
      .querySelector(".product__count-hidden").textContent;

    data.splice(index, 1);
    const key = "data";
    const dataP = JSON.stringify(data);
    prod.setStorageItem(key, dataP);
    showElements(); //вывод data из Storage в корзину
    prod.readArrayStorage(); //вывод каунт корзины
  }
  /*----------------------------------------------------------------click on the Clear items-----------------------*/
  if (target.className == "bag__button") {
    btnClearItems.style.display = "none";
    localStorage.removeItem("data");
    bagProducts.innerHTML = "";
    document.querySelector(".header__bag-count").textContent = "0";
    document.querySelector(".bag__totall__price").textContent = "0";
    document.getElementById("bag__product").style.overflowY = "hidden";
  }

  /*-------------------------------------------------------увеличить колличество продукта в самой корзине--------- */
  if (target.className == "product__more-img") {
    const id = target
      .closest(".product__item-bag")
      .querySelector(".product__count-hidden").textContent;
    let howManyProducts = Number(
      target
        .closest(".product__item-bag")
        .querySelector(".product__valueInput-inbag").textContent
    );
    howManyProducts++;
    if (howManyProducts > 0 && howManyProducts < 100) {
      prod.forPlusProduсt(id, howManyProducts);
      showElements();
    }
  }

  /*-------------------------------------------------------уменьшить колличество продукта в самой корзине--------- */
  if (target.className == "product__less-img") {
    const id = target
      .closest(".product__item-bag")
      .querySelector(".product__count-hidden").textContent;
    let howManyProducts = Number(
      target
        .closest(".product__item-bag")
        .querySelector(".product__valueInput-inbag").textContent
    );
    howManyProducts--;
    if (howManyProducts > 0 && howManyProducts < 100) {
      prod.forPlusProduсt(id, howManyProducts);
      showElements();
    }
  }
});

bagClose.addEventListener("click", () => {
  bag.style.display = "none";
  document.body.style.overflow = "scroll";
});
