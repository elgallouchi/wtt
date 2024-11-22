let emplacementList = document.getElementById("lists");
// let btnAddEmplacement = document.getElementById("btn-add-emplacement");
// let emplacementInput = document.getElementById("emplacement-input");

// btnAddEmplacement.addEventListener("click", (e) => {
//   e.preventDefault();
//   let data = [];
//   const emplacementsVidesLocal = JSON.parse(
//     localStorage.getItem("emplacements-vides")
//   );
//   if (emplacementsVidesLocal !== null) {
//     // check if emplacement exist
//     const exist = emplacementsVidesLocal.some(
//       (el) => el.emplacement.trim() === emplacementInput.value.trim()
//     );
//     if (exist) {
//       alert("Cet emplacement est déjà ajouté !");
//     } else {
//       emplacementsVidesLocal.push({ emplacement: emplacementInput.value });

//       localStorage.setItem(
//         "emplacements-vides",
//         JSON.stringify(emplacementsVidesLocal)
//       );
//     }
//   } else {
//     data.push({ emplacement: emplacementInput.value });
//     localStorage.setItem("emplacements-vides", JSON.stringify(data));
//   }
//   addCode.style.display = "none";
//   getDataLocalEmplacement();
// });

const getDataLocalEmplacement = () => {
  let dataLocal = JSON.parse(localStorage.getItem("emplacements-vides"));
  let output = `<li class="list-head">
                      <span>Emplacement</span>
                      <span></span>
                  </li>`;
  if (dataLocal !== null) {
    // dataLocal.reverse();
    dataLocal.sort((a, b) =>
      a.emplacement.toLowerCase().localeCompare(b.emplacement.toLowerCase())
    );
    dataLocal.forEach((data) => {
      output += `<li class="list-content">
                        <span>${data.emplacement}</span>
                        <span class="btn-delete" onclick="deleteEmplacement('${data.emplacement}')" id="${data.emplacement}">x</span>
                    </li>`;
    });
    emplacementList.innerHTML = output;
  } else {
    emplacementList.innerHTML = "Pas encore d'emplacement ajouté";
  }
};

document.getElementById("show-list-emplacement").addEventListener("click", (e) => {
  getDataLocalEmplacement();
});

const deleteEmplacement = (emplacement) => {
  const dataLocal = JSON.parse(localStorage.getItem("emplacements-vides"));
  //   console.log(emplacement, dataLocal[0].emplacement)
  if (dataLocal !== null) {
    const dataFiltred = dataLocal.filter(
      (el) => el.emplacement !== emplacement
    );
    if (confirm("Tu es sûr de supprimer cet emplacement ?")) {
      localStorage.setItem("emplacements-vides", JSON.stringify(dataFiltred));
    }
  }
  getDataLocalEmplacement();
};
