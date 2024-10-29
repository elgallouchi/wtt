let emplacementList = document.getElementById("emplacement-list");
let btnAddEmplacement = document.getElementById("btn-add-emplacement");
let emplacementInput = document.getElementById("emplacement-input");

btnAddEmplacement.addEventListener("click", (e) => {
  e.preventDefault();
  let data = [];
  const emplacementsVidesLocal = JSON.parse(
    localStorage.getItem("emplacements-vides")
  );
  if (emplacementsVidesLocal !== null) {
    // check if emplacement exist
    const exist = emplacementsVidesLocal.some(
      (el) => el.emplacement === emplacementInput.value
    );
    if (exist) {
      alert("This emplacement is already added !");
    } else {
      emplacementsVidesLocal.push({ emplacement: emplacementInput.value });

      localStorage.setItem(
        "emplacements-vides",
        JSON.stringify(emplacementsVidesLocal)
      );
    }
  } else {
    data.push({ emplacement: emplacementInput.value });
    localStorage.setItem("emplacements-vides", JSON.stringify(data));
  }
  addCode.style.display = "none";
  getDataLocal();
});

const getDataLocal = () => {
  let dataLocal = JSON.parse(localStorage.getItem("emplacements-vides"));
  let output = `<li class="list-head">
                      <span>Emplacement</span>
                      <span></span>
                  </li>`;
  if (dataLocal !== null) {
    dataLocal.forEach((data) => {
      output += `<li class="list-content">
                        <span>${data.emplacement}</span>
                        <span onclick="deleteEmplacement('${data.emplacement}')" id="${data.emplacement}">x</span>
                    </li>`;
    });
    emplacementList.innerHTML = output;
  } else {
    emplacementList.innerHTML = "Pas encore d'emplacement ajouté";
  }
};
getDataLocal();

const deleteEmplacement = (emplacement) => {
  const dataLocal = JSON.parse(localStorage.getItem("emplacements-vides"));
  //   console.log(emplacement, dataLocal[0].emplacement)
  if (dataLocal !== null) {
    const dataFiltred = dataLocal.filter(
      (el) => el.emplacement !== emplacement
    );
    if (confirm("Are you sure you want to delete this emplacement ?")) {
      localStorage.setItem("emplacements-vides", JSON.stringify(dataFiltred));
    }
  }
  getDataLocal();
};
