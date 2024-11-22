const eanRadio = document.getElementById("ean-radio");
const empRadio = document.getElementById("emp-radio");
const addProductForm = document.getElementById("add-product-form");
const addEmplacementForm = document.getElementById("add-emplacement-form");

const radois = document.querySelectorAll('input[name="option"]');

eanRadio.addEventListener("change", () => {
  if (eanRadio) {
    addProductForm.style.display = "flex";
    addEmplacementForm.style.display = "none";
  }
});

empRadio.addEventListener("change", () => {
  if (empRadio) {
    addEmplacementForm.style.display = "flex";
    addProductForm.style.display = "none";
  }
});

if (eanRadio){
    
}