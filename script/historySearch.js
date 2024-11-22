// let lists = document.getElementById("lists");

const showHistory = async () => {
  lists.innerHTML =
    await '<h4><span>Dernières recherches</span><img id="delete-icon" onclick="deleteHistory()" src="./assets/delete-icon.png"/></h4><div id="history-html"></div>';
  let output = await "";
  let historyData = await JSON.parse(localStorage.getItem("history-data"));
  if (historyData !== null) {
    historyData.reverse();
    historyData.forEach((element) => {
      output += `<span onclick="searchData('${element.ean}')">${element.ean}</span>`;
    });
  } else {
    output += `Pas encore des recherches !`;
  }
  let el = await document.getElementById("history-html");
  el.innerHTML = await output;
};

const deleteHistory = () => {
  const data = JSON.parse(localStorage.getItem("history-data"));
  if (data !== null) {
    if (confirm("Tu sure de vouloir effacer l'historique ?")) {
      localStorage.removeItem("history-data");
    }
  } else {
    alert("Tu n'as pas encore d'historique !");
  }
  showHistory();
};

showHistory();

document.getElementById("show-list-history").addEventListener("click", (e) => {
  showHistory();
});
