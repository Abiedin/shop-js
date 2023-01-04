export const readArrayStorage = () => {
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
};
