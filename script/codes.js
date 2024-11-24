// let lists = document.getElementById("lists");

// const deleteCode = (code) => {
//   const dataLocal = JSON.parse(localStorage.getItem("local-data"));
//   console.log(dataLocal);
//   if (dataLocal !== null) {
//     const dataFiltred = dataLocal.filter((el) => {
//       console.log(el.code);
//       return (
//         el.code.toLowerCase() + "" + el.emplacement.toLowerCase() !==
//         code.toLowerCase()
//       );
//     });
//     if (confirm("Are you sure you want to delete this code ?")) {
//       localStorage.setItem("local-data", JSON.stringify(dataFiltred));
//     }
//   }
//   getDataLocalCodes();
// };

const getDataLocalCodes = () => {
  let dataLocal = JSON.parse(localStorage.getItem("local-data"));
  let output = `<li class="list-head">
                    <span>Produit</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  if (dataLocal !== null) {
    dataLocal.reverse();
    dataLocal.forEach((data) => {
      output += `<li class="list-content">
      <div class="ean-ref">
      <span>EAN: ${data.code ? data.code : "NC"}</span>
      <span>REF: ${data.reference ? data.reference : "NC"}</span>
      </div>
                      <span class="${
                      data.emplacement.slice(-1) === "0" ? "sol" : ""
                    }">${data.emplacement}</span>
                      <span class="btn-delete" onclick="deleteCode('${
                        data.code + "" + data.emplacement
                      }')">x</span>
                  </li>`;
    });
    lists.innerHTML = output;
  } else {
    lists.innerHTML = "Pas encore de code ajouté";
  }
  console.log("gatdatalocal code.js");
};

document.getElementById("show-list-code").addEventListener("click", (e) => {
  getDataLocalCodes();
});
