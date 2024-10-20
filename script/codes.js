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
                      <span>x</span>
                  </li>`;
    });
    lists.innerHTML = output;
  } else {
    lists.innerHTML = "Pas encore de code ajouté";
  }
};
getDataLocal();
