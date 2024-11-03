let lists = document.getElementById("lists");

const deleteCode = (code) => {
  const dataLocal = JSON.parse(localStorage.getItem("local-data"));
  let val = "";
  if (dataLocal !== null) {
    const dataFiltred = dataLocal.filter((el) => {
      val = el.code;
      return (
        el.code.toLowerCase() + "" + el.emplacement.toLowerCase() !==
        code.toLowerCase()
      );
    });
    if (confirm("Are you sure you want to delete this code ?")) {
      localStorage.setItem("local-data", JSON.stringify(dataFiltred));
    }
  }
  getDataLocal();
};

const getDataLocal = () => {
  let dataLocal = JSON.parse(localStorage.getItem("local-data"));
  let output = `<li class="list-head">
                    <span>ean</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  if (dataLocal !== null) {
    dataLocal.reverse();
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
  console.log("gatdatalocal code.js");
};
getDataLocal();
