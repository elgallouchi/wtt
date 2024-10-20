let btnOpenPopUp = document.getElementById("btn-open-pop-up");
let addCode = document.getElementById("add-code");
let closePopUp = document.getElementById("close-pop-up");

let codeBarInput = document.getElementById("code-bare");
let emplacementInput = document.getElementById("emplacement");
let btnAddCode = document.getElementById("btn-add-code");

let btnSearch = document.getElementById("btn-search");
let searchInput = document.getElementById("search-input");

let lists = document.getElementById("lists");

btnOpenPopUp.addEventListener("click", () => {
  console.log("hello");
  addCode.style.display = "flex";
  console.log("hello2");
});

closePopUp.addEventListener("click", () => {
  addCode.style.display = "none";
});

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

// check if data is available
const checkData = (newData) => {
  let localData = JSON.parse(localStorage.getItem("local-data"));
  let editData = [];
  let rt = localData.filter((data) => {
    newData.code === data.code ? true : false;
  });
};

// search
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  searchData(searchInput?.value);
  console.log("first");
});

// search function
const searchData = (val) => {
  let localData = getDataLocal();
  let output = `<li class="list-head">
                    <span>ean</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  console.log(localData);
  if (localData === null) {
    lists.innerHTML = `Pas encore de code ajouté`;
    return;
  }
  let response = localData.filter((el) => {
    return val === el.code;
  });
  if (response.length === 0) {
    output = `Pas d'emplacement avec ce code "${val}"`;
  } else {
    response.forEach((data) => {
      output += `<li class="list-content">
                    <span>${data.code}</span>
                    <span>${data.emplacement}</span>
                    <span>x</span>
                </li>`;
    });
  }
  lists.innerHTML = output;
};
