let btnOpenPopUp = document.getElementById("btn-open-pop-up");
let addCode = document.getElementById("add-code");
let closePopUp = document.getElementById("close-pop-up");

closePopUp.addEventListener("click", () => {
    addCode.style.display = "none";
  });

btnOpenPopUp.addEventListener("click", () => {
    addCode.style.display = "flex";
  });
