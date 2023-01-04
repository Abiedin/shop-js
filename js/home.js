import { readArrayStorage } from "./get_function.js";
readArrayStorage();
import { arr } from "./arr.js";
const homeFeatured = document.querySelector(".main__featured-products");

featured();

function featured() {
  let count = 0;
  const par = document.createElement("div");
  par.className = "psevdopfeatured";

  for (let i = arr.length - 1; i >= 0; i--) {
    count++;
    const nameCo = arr[i].name;
    const itemImg = arr[i].img;
    const itemPrice = arr[i].price;
    const div = document.createElement("div");
    div.className = "product__home";

    div.innerHTML = `<img src="img/${itemImg}" alt="${nameCo}" class="product__img-home">
                      <div class="product__desk-home">
                        <div class="product__name-home">${nameCo}</div>                            
                      </div>
                      <div class="product__price-home">
                        <div class="product__price-text-home">${itemPrice}</div>
                        <div class="product__currency-home">$</div>
                      </div>`;
    par.append(div);
    if (count == 3) break;
  }
  homeFeatured.append(par);
}
