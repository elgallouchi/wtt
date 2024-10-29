let lists = document.getElementById("lists");

const getDataLocal = () => {
  let dataLocal = JSON.parse(localStorage.getItem("local-data"));
  let output = `<li class="list-head">
                    <span>ean</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  if (dataLocal !== null) {
    dataLocal.forEach((data) => {
      output += `<li class="list-content">
                      <span>${data.code}</span>
                      <span>${data.emplacement}</span>
                      <span onclick="deleteCode('${
                        data.code + "" + data.emplacement
                      }')">x</span>
                  </li>`;
    });
    lists.innerHTML = output;
  } else {
    lists.innerHTML = "Pas encore de code ajouté";
  }
};
getDataLocal();

const deleteCode = (code) => {
  const dataLocal = JSON.parse(localStorage.getItem("local-data"));
  console.log(code);
  console.log(code, dataLocal[0].code+ '' + dataLocal[0].emplacement)
  if (dataLocal !== null) {
    const dataFiltred = dataLocal.filter(
      (el) => el.code + '' + el.emplacement !== code
    );
    if (confirm("Are you sure you want to delete this code ?")) {
      localStorage.setItem("local-data", JSON.stringify(dataFiltred));
    }
  }
  getDataLocal();
};
