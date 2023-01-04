const tagProducts = document.querySelector(".main__products");
const tagUl = document.getElementById("main_ul");
const inputProduct = document.getElementById("main__input");
let globalIdentifier = "";

const arr = [
  {
    name: "Bentley Longhouse",
    img: "product_img/1.jpg",
    company: "Ikea",
    price: 4500,
  },
  {
    name: "Bentley Hiro",
    img: "product_img/2.jpg",
    company: "Ikea",
    price: 4200,
  },
  {
    name: "Rainbow",
    img: "product_img/3.jpg",
    company: "Ikea",
    price: 7000,
  },
  {
    name: "Piney Point Estate",
    img: "product_img/4.jpg",
    company: "Marcos",
    price: 2500,
  },
  {
    name: "Piney Point Ruk",
    img: "product_img/5.jpg",
    company: "Marcos",
    price: 2000,
  },
  {
    name: "Bungalow Renovation",
    img: "product_img/6.jpg",
    company: "Caressa",
    price: 6542,
  },
  {
    name: "French Country",
    img: "product_img/7.jpg",
    company: "Caressa",
    price: 2354,
  },
  {
    name: "Bungalow Renovation",
    img: "product_img/8.jpg",
    company: "Liddy",
    price: 8500,
  },
  {
    name: "10 Hubert Street",
    img: "product_img/9.jpg",
    company: "Liddy",
    price: 1507,
  },
  {
    name: "Lakeshore Residence",
    img: "product_img/10.jpg",
    company: "Liddy",
    price: 350.25,
  },
];

class Bag {
  newArr(arr, howManyProducts, id) {
    let arrStorage = [];
    for (let i = 0; i <= arr.length; i++) {
      if (i == id) {
        arr[i].idd = i;
        arr[i].valueInput = howManyProducts;
        arr[i].sumPrice = howManyProducts * arr[i].price;
        arrStorage.push(arr[i]);
      }
    }
    return arrStorage;
  }

  readArrayStorage() {
    const data = JSON.parse(localStorage.getItem("data"));
    const valueBagCount = document.querySelector(".header__bag-count");
    const overFlow = document.getElementById("bag__product");
    if (data) {
      if (data.length > 4) {
        overFlow.style.overflowY = "scroll";
      } else {
        overFlow.style.overflowY = "hidden";
      }
      valueBagCount.textContent = data.length;
    }
  }

  cyclForPlusProdukt(data, howManyProducts, id) {
    let getValue = 0;
    let newValue = 0;
    let count = 0;
    for (let j = 0; j < data.length; j++) {
      console.log(data);
      if (data[j].idd == id) {
        count++;
        getValue = data[j].valueInput;
        newValue = getValue + howManyProducts;
        data[j].valueInput = newValue;
        data[j].sumPrice = newValue * data[j].price;
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
    return count;
  }

  boxProduct(namee, img, company, price, index) {
    const div = document.createElement("div");
    div.className = "product";
    div.id = "product";
    div.setAttribute("data-id", `${company}`);
    div.innerHTML = ` <img src="img/${img}" alt="${namee}" class="product__img">
    <div class="product__desk">
      <div class="product__name">${namee}</div>
      <div class="product__company">${company}</div>
    </div>
    <div class="product__price">
      <div class="product__price-text">${price}</div>
      <div class="product__currency">$</div>
      <div class="product__count">
        <div class="product__count-hidden">${index}</div>
        <div class="product__minus" id="product__minus">-</div>
        <input class="product__count-input" id="product__count-input" min="1" max="10" value="1">
        <div class="product__add" id="product__add">+</div>                        
      </div>
    </div>                    
    <button class="product__push-bag">To Bag</button>
    `;
    return div;
  }
  /*-------------------------------------------------------------------вывод на раб стол массивa объектов arr----- */
  pushProducts() {
    tagProducts.innerHTML = "";

    const par = document.createElement("div");
    par.className = "psevdoproducts";
    arr.forEach((item, index) => {
      const nameCo = item.name;
      const itemImg = item.img;
      const itemCo = item.company;
      const itemPrice = item.price;
      const itemI = index;

      const parPar = ({ namee, img, company, price, index }) => {
        par.append(this.boxProduct(namee, img, company, price, index));
      };
      parPar({
        namee: nameCo,
        img: itemImg,
        company: itemCo,
        price: itemPrice,
        index: itemI,
      });
    });
    tagProducts.append(par);
  }
  /*------------------------------------------------------------------------раотат с фиьтрами-----------------------*/
  forRenge(newArr) {
    tagProducts.innerHTML = "";
    const par = document.createElement("div");
    par.className = "psevdoproducts";

    newArr.forEach((item, index) => {
      const nameCo = item.name;
      const itemImg = item.img;
      const itemCo = item.company;
      const itemPrice = item.price;
      const itemI = index;

      const parPar = ({ namee, img, company, price, index }) => {
        par.append(this.boxProduct(namee, img, company, price, index));
      };
      parPar({
        namee: nameCo,
        img: itemImg,
        company: itemCo,
        price: itemPrice,
        index: itemI,
      });
    });
    tagProducts.append(par);
  }
}

const bagcl = new Bag();

bagcl.pushProducts();
bagcl.readArrayStorage();
countCompany(arr);
/*-------------------------------------------------фильтр Range------------------------------------------------ */
function selectRange(value) {
  const valueInput = document
    .querySelector(".main__input")
    ?.value.toLowerCase();
  let newArr = [];
  let newArray = [];

  if (valueInput.length === 0 && !globalIdentifier) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].price <= value) {
        newArr.push(arr[j]);
      }
    }
    countCompany(newArr);
    bagcl.forRenge(newArr);
  }
  if (valueInput.length > 1 && !globalIdentifier) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j].name.toLowerCase().includes(valueInput)) {
        newArray.push(arr[j]);
      }
    }
    for (let g = 0; g < newArray.length; g++) {
      if (newArray[g].price <= value) {
        newArr.push(newArray[g]);
      }
    }
    countCompany(newArr);
    bagcl.forRenge(newArr);
  }
  if (valueInput.length == 0 && globalIdentifier !== "all") {
    for (let d = 0; d < arr.length; d++) {
      if (arr[d].company == globalIdentifier) {
        newArray.push(arr[d]);
      }
    }
    for (let k = 0; k < newArray.length; k++) {
      if (newArray[k].price <= value) {
        newArr.push(newArray[k]);
      }
    }
    bagcl.forRenge(newArr);
  }

  if (valueInput.length == 0 && globalIdentifier == "all") {
    for (let d = 0; d < arr.length; d++) {
      newArray.push(arr[d]);
    }
    for (let k = 0; k < newArray.length; k++) {
      if (newArray[k].price <= value) {
        newArr.push(newArray[k]);
      }
    }
    bagcl.forRenge(newArr);
  }
}

/*----------------------------------------------------   инпут  ------------------------------------------------- */
inputProduct.addEventListener("keyup", (e) => {
  const valueInput = document
    .querySelector(".main__input")
    ?.value.toLowerCase();
  const valueRange = document.querySelector(".range_value").textContent;

  let newArr = [];
  let arrReng = [];
  let arrTwo = [];

  if (valueRange == 10000) {
    if (
      globalIdentifier !== "all" &&
      valueInput.length > 1 &&
      e.key !== "Enter"
    ) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].company == globalIdentifier) {
          arrReng.push(arr[j]);
        }
      }
      for (let k = 0; k < arrReng.length; k++) {
        if (arrReng[k].name.toLowerCase().includes(valueInput)) {
          newArr.push(arrReng[k]);
        }
      }
      bagcl.forRenge(newArr);
    }

    if (
      globalIdentifier !== "all" &&
      valueInput.length < 2 &&
      e.key !== "Enter"
    ) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].company == globalIdentifier) {
          newArr.push(arr[j]);
        }
      }
      bagcl.forRenge(newArr);
    } else if (
      (globalIdentifier === "all" && valueInput.length == 0) ||
      (valueInput.length == 1 && e.key !== "Enter")
    ) {
      for (let j = 0; j < arr.length; j++) {
        newArr.push(arr[j]);
      }
      bagcl.forRenge(newArr);
    }
    if (!globalIdentifier && valueInput.length > 1 && e.key !== "Enter") {
      for (let m = 0; m < arr.length; m++) {
        if (arr[m].name.toLowerCase().includes(valueInput)) {
          newArr.push(arr[m]);
        }
        bagcl.forRenge(newArr);
      }
    }
    if (!globalIdentifier && valueInput.length < 2 && e.key !== "Enter") {
      for (let h = 0; h < arr.length; h++) {
        newArr.push(arr[h]);
      }
      bagcl.forRenge(newArr);
    }
  } else {
    if (
      globalIdentifier !== "all" &&
      valueInput.length > 1 &&
      e.key !== "Enter"
    ) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].company == globalIdentifier) {
          arrReng.push(arr[j]);
        }
      }
      for (let k = 0; k < arrReng.length; k++) {
        if (arrReng[k].name.toLowerCase().includes(valueInput)) {
          arrTwo.push(arrReng[k]);
        }
      }
      for (let q = 0; q < arrTwo.length; q++) {
        if (arrTwo[q].price <= valueRange) {
          newArr.push(arrTwo[q]);
        }
      }
      bagcl.forRenge(newArr);
    } else if (
      (globalIdentifier !== "all" && valueInput.length == 0) ||
      (valueInput.length == 1 && e.key !== "Enter")
    ) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j].company == globalIdentifier) {
          arrReng.push(arr[j]);
        }
      }
      for (let q = 0; q < arrReng.length; q++) {
        if (arrReng[q].price <= valueRange) {
          newArr.push(arrReng[q]);
        }
      }
      bagcl.forRenge(newArr);
    }
    if (!globalIdentifier && valueInput.length > 1 && e.key !== "Enter") {
      for (let y = 0; y < arr.length; y++) {
        if (arr[y].price <= valueRange) {
          arrReng.push(arr[y]);
        }
      }
      for (let q = 0; q < arrReng.length; q++) {
        if (arrReng[q].name.toLowerCase().includes(valueInput)) {
          newArr.push(arrReng[q]);
        }
      }
      bagcl.forRenge(newArr);
    } else if (
      !globalIdentifier &&
      valueInput.length < 2 &&
      e.key !== "Enter"
    ) {
      for (let y = 0; y < arr.length; y++) {
        if (arr[y].price <= valueRange) {
          newArr.push(arr[y]);
        }
      }
      bagcl.forRenge(newArr);
    }
  }
});

/*-------------------------------------------------клик по коипании-------------------------------------------- */
tagUl.addEventListener("click", (event) => {
  const target = event.target.id;

  document.querySelectorAll("[data-id]").forEach(() => {
    let newArr = [];
    if (event.target.className == "li__text") {
      if (target === "all") {
        for (let i = 0; i < arr.length; i++) {
          newArr.push(arr[i]);
        }
        bagcl.forRenge(newArr);
        globalIdentifier = "";
      } else {
        for (let k = 0; k < arr.length; k++) {
          if (arr[k].company === target) {
            newArr.push(arr[k]);
          }
        }
        globalIdentifier = target;
        bagcl.forRenge(newArr);
      }
    }
  });
});

/*-------------------------------------------------каунтеры в компаниях---------------------------------------- */
function countCompany(newArr) {
  const all = document.querySelector(".li__count__all");
  const linkall = document.getElementById("all");
  const ikea = document.querySelector(".li__count__ikea");
  const linkIkea = document.getElementById("Ikea");
  const marcos = document.querySelector(".li__count__macros");
  const linkMarcos = document.getElementById("Marcos");
  const caressa = document.querySelector(".li__count__caressa");
  const linkСaressa = document.getElementById("Caressa");
  const liddy = document.querySelector(".li__count__liddy");
  const linkLiddy = document.getElementById("Liddy");
  const mono = document.querySelector(".li__count__mono");
  const linkMono = document.getElementById("Mono");
  let countikea = 0;
  let countmarcos = 0;
  let countcaressa = 0;
  let countliddy = 0;
  let countmono = 0;
  let sum = 0;

  for (let i = 0; i < newArr.length; i++) {
    if (newArr[i].company === "Ikea") {
      countikea++;
      linkIkea.setAttribute(
        "style",
        "cursor: pointer",
        "pointer-events : auto"
      );
    } else if (countikea == 0) {
      linkIkea.setAttribute("style", "pointer-events : none");
      linkIkea.style.opacity = "0.6";
    }

    if (newArr[i].company === "Marcos") {
      countmarcos++;
      linkMarcos.setAttribute(
        "style",
        "cursor: pointer",
        "pointer-events : auto"
      );
      linkMarcos.style.opacity = "1.0";
    } else if (countmarcos == 0) {
      linkMarcos.setAttribute("style", "pointer-events : none");
      linkMarcos.style.opacity = "0.6";
    }

    if (newArr[i].company === "Caressa") {
      countcaressa++;
      linkСaressa.setAttribute(
        "style",
        "cursor: pointer",
        "pointer-events : auto"
      );
    } else if (countcaressa == 0) {
      linkСaressa.setAttribute("style", "pointer-events : none");
      linkСaressa.style.opacity = "0.6";
    }

    if (newArr[i].company === "Liddy") {
      countliddy++;
      linkLiddy.setAttribute(
        "style",
        "cursor: pointer",
        "pointer-events : auto"
      );
    } else if (countliddy == 0) {
      linkLiddy.setAttribute("style", "pointer-events : none");
      linkLiddy.style.opacity = "0.6";
    }

    if (newArr[i].company === "Mono") {
      countmono++;
      linkMono.setAttribute(
        "style",
        "cursor: pointer",
        "pointer-events : auto"
      );
    } else if (countmono == 0) {
      linkMono.setAttribute("style", "pointer-events : none");
      linkMono.style.opacity = "0.6";
    }
  }
  sum = countikea + countmarcos + countcaressa + countliddy + countmono;

  if (sum > 0) {
    linkall.setAttribute("style", "cursor: pointer");
  }

  all.innerHTML = sum;
  ikea.innerHTML = countikea;
  marcos.innerHTML = countmarcos;
  caressa.innerHTML = countcaressa;
  liddy.innerHTML = countliddy;
  mono.innerHTML = countmono;
}

/*-------------------------------------------------   +- продукт на рабстоле---------------------------------- */
tagProducts.addEventListener("click", (event) => {
  const target = event.target;

  if (target.className == "product__push-bag") {
    const howManyProducts = Number(
      target.closest(".product").querySelector(".product__count-input")?.value
    );
    const id = Number(
      target.closest(".product").querySelector(".product__count-hidden")
        .textContent
    );
    let data = JSON.parse(localStorage.getItem("data"));

    let arrStorage = bagcl.newArr(arr, howManyProducts, id);

    if (!data) {
      localStorage.setItem("data", JSON.stringify(arrStorage));
    } else {
      let count = bagcl.cyclForPlusProdukt(data, howManyProducts, id);

      if (count == 0) {
        data.push(...arrStorage);
        localStorage.setItem("data", JSON.stringify(data));
      }
    }
    /*------------------------------------------------------ перезапись countForBag -------------------------------*/
    bagcl.readArrayStorage();
  }

  /*-------------------------------------------------   + - продукт на рабстоле---------------------------------- */
  if (target.className == "product__add") {
    let par = target
      .closest(".product")
      .querySelector(".product__count-input")?.value;
    if (par < 10) {
      par++;
      target.closest(".product").querySelector(".product__count-input").value =
        par;
    }
  }

  if (target.className == "product__minus") {
    let par = target
      .closest(".product")
      .querySelector(".product__count-input")?.value;
    par = Number(par);
    if (par > 1) {
      par--;
      target.closest(".product").querySelector(".product__count-input").value =
        par;
    }
  }
});
