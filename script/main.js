let codeBarInput = document.getElementById("code-bare");
let emplacementInput = document.getElementById("emplacement");

let btnSearch = document.getElementById("btn-search");
let searchInput = document.getElementById("search-input");

let lists = document.getElementById("lists");
let btnAddCode = document.getElementById("btn-add-code");

btnAddCode.addEventListener("click", (e) => {
  e.preventDefault();
  codeValue = codeBarInput?.value;
  empValue = emplacementInput?.value;
  if (codeValue.length != 4 || empValue.length != 4) {
    if (codeValue.length != 4) {
      codeBarInput.style.border = "1px solid red";
    } else {
      codeBarInput.style.border = "1px solid #333";
    }
    if (empValue.length != 4) {
      emplacementInput.style.border = "1px solid red";
    } else {
      emplacementInput.style.border = "1px solid #333";
    }
  } else {
    emplacementInput.style.border = "1px solid #333";
    codeBarInput.style.border = "1px solid #333";
    setDataLocal({ code: codeValue, emplacement: empValue });
    addCode.style.display = "none";
  }
  codeBarInput.value = "";
  emplacementInput.value = "";
  searchData(codeValue);
});

// wrrite in localestorage
const setDataLocal = (data) => {
  let localData = JSON.parse(localStorage.getItem("local-data"));
  if (!localData) {
    localStorage.setItem("local-data", JSON.stringify([data]));
    return true;
  } else {
    let getData = getDataLocal();
    getData.push(data);
    localStorage.setItem("local-data", JSON.stringify(getData));
    return true;
  }
};

// get data from local storage
const getDataLocal = () => {
  let localData = JSON.parse(localStorage.getItem("local-data"));
  return localData;
};

// search
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  // if input is empty
  if (searchInput?.value.length !== 4) {
    alert("Entrez les 4 dernèers chiffres SVP !");
  } else {
    searchData(searchInput?.value);
    
  }
});

// write history data to local storage
const writeHisoryData = (newInput) => {
  let data = JSON.parse(localStorage.getItem("history-data"));
  if (data !== null) {
    const exist = data.some((el) => el.ean === newInput);
    const filtred = data.filter((el) => el.ean !== newInput);
    if (!exist) {
      data.push({ ean: newInput });
      localStorage.setItem("history-data", JSON.stringify(data));
    } else {
      filtred.push({ ean: newInput });
      localStorage.setItem("history-data", JSON.stringify(filtred));
    }
  } else {
    localStorage.setItem("history-data", JSON.stringify([{ ean: newInput }]));
  }
};

// search function
const searchData = async (val) => {
  writeHisoryData(val);
  let localData = await getDataLocal();
  let output = `<li class="list-head">
                    <span>ean</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  if (localData === null) {
    lists.innerHTML = `Pas encore de code ajouté`;
    return;
  }
  let response = await localData.filter((el) => {
    return val === el.code;
  });
  if (response.length === 0) {
    output = `<div>Pas d'emplacement avec ce code "${val}"</div>
    <button onclick="showHistory()" id="btn-accueil">Accueil</button>`;
  } else {
    response.sort((a, b) =>
      a.emplacement.toLowerCase().localeCompare(b.emplacement.toLowerCase())
    );
    response.forEach((data) => {
      output += `<li class="list-content">
                    <span>${data.code}</span>
                    <span>${data.emplacement}</span>
                    <span onclick="deleteCode('${
                      data.code + "" + data.emplacement
                    }')">x</span>
                </li>`;
    });
  }
  lists.innerHTML = output;
};
