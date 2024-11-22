let eanInput = document.getElementById("code-bare");
let refInput = document.getElementById("code-ref");
let emplacementInput = document.getElementById("emplacement");

let btnSearch = document.getElementById("btn-search");
let searchInput = document.getElementById("search-input");

let lists = document.getElementById("lists");
let btnAddCode = document.getElementById("btn-add-code");

let btnAddEmplacement = document.getElementById("btn-add-emplacement");
let empInput = document.getElementById("emplacement-input");

//

btnAddEmplacement.addEventListener("click", (e) => {
  let notyf = new Notyf({
    duration: 2000, // La notification reste pendant 4 secondes
    position: { x: "center", y: "top" }, // Position centrée en haut
  });
  e.preventDefault();
  let empValue = empInput?.value?.trim();
  if (empValue.length < 4) {
    alert("l'emplacement est obligatoire !");
  } else {
    let data = [];
    const emplacementsVidesLocal = JSON.parse(
      localStorage.getItem("emplacements-vides")
    );
    if (emplacementsVidesLocal !== null) {
      // check if emplacement exist
      const exist = emplacementsVidesLocal.some(
        (el) => el.emplacement.trim() === empInput.value.trim()
      );
      if (exist) {
        notyf.error("Cet emplacement est déjà ajouté 😏!");
        // alert("Cet emplacement est déjà ajouté !");
      } else {
        emplacementsVidesLocal.push({ emplacement: empInput.value });

        localStorage.setItem(
          "emplacements-vides",
          JSON.stringify(emplacementsVidesLocal)
        );
        notyf.success("Bien joué, tout s'est bien passé !");
      }
    } else {
      data.push({ emplacement: empInput.value });
      localStorage.setItem("emplacements-vides", JSON.stringify(data));
      notyf.success("Bien joué, tout s'est bien passé !");
    }
    addCode.style.display = "none";
    getDataLocal();
  }
});

btnAddCode.addEventListener("click", (e) => {
  let notyf = new Notyf({
    duration: 2000, // La notification reste pendant 4 secondes
    position: { x: "center", y: "top" }, // Position centrée en haut
  });
  e.preventDefault();

  eanValue = eanInput?.value?.trim();
  refValue = refInput?.value?.trim();
  empValue = emplacementInput?.value?.trim();

  if (empValue.length === 0) {
    alert("l'emplacement est obligatoire !");
  } else {
    let allEmplacements = empValue.split(".");

    const valuesArray = allEmplacements
      .map((val) => val.trim())
      .filter((val) => val !== "");
    const uniqueValues = [...new Set(valuesArray)];

    // return;
    if ((eanValue.length <= 13 && eanValue.length >= 4) || refValue !== "") {
      let bolean = false;
      uniqueValues.forEach((emp) => {
        let setDataDone = setDataLocal({
          code: eanValue,
          reference: refValue,
          emplacement: emp,
        });
        bolean = setDataDone;
      });

      searchData(eanValue);
      addCode.style.display = "none";
      eanInput.value = "";
      refInput.value = "";
      emplacementInput.value = "";
      if (bolean) {
        notyf.success("Bien joué !");
      }
    } else {
      alert("Oops! Tu dois saisir soit le EAN ou Référence !");
    }
  }
  //

  //
  // if (
  //   eanValue.length.length > 13 ||
  //   eanValue.length.length < 4 ||
  //   refValue.length === 0 ||
  //   empValue.length === 0
  // ) {
  //   if (eanValue.length.length > 13 || eanValue.length.length < 4) {
  //     eanInput.style.border = "1px solid red";
  //   } else {
  //     eanInput.style.border = "1px solid #333";
  //   }
  //   if (refValue.length === 0) {
  //     refInput.style.border = "1px solid red";
  //   } else {
  //     refInput.style.border = "1px solid #333";
  //   }
  //   if (empValue.length === 0) {
  //     emplacementInput.style.border = "1px solid red";
  //   } else {
  //     emplacementInput.style.border = "1px solid #333";
  //   }
  // } else {
  //   emplacementInput.style.border = "1px solid #333";
  //   refInput.style.border = "1px solid #333";
  //   eanInput.style.border = "1px solid #333";
  //   setDataLocal({
  //     code: eanValue.length,
  //     reference: refValue,
  //     emplacement: empValue,
  //   });
  //   addCode.style.display = "none";
  //   searchData(eanValue.length);
  // }
});

// wrrite in localestorage
const setDataLocal = (data) => {
  let localData = JSON.parse(localStorage.getItem("local-data"));
  if (!localData) {
    localStorage.setItem("local-data", JSON.stringify([data]));
    return true;
  } else {
    // verifier si il existe déjà !
    let filtredata = localData.some((element) => {
      return (
        (element.code === data.code &&
          element.emplacement === data.emplacement) ||
        (element.reference === data.reference &&
          element.emplacement === data.emplacement)
      );
    });
    if (filtredata) {
      alert("Ce produit est déjà ajouté !");
      return false;
    } else {
      let getData = getDataLocal();
      getData.push(data);
      localStorage.setItem("local-data", JSON.stringify(getData));
      return true;
    }
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
  if (searchInput?.value?.trim().length === 0) {
    alert("Recherche requise !");
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
                    <span>produit</span>
                    <span>emp</span>
                    <span></span>
                </li>`;
  if (localData === null) {
    lists.innerHTML = `Pas encore de code ajouté`;
    return;
  }
  let response = await localData.filter((el) => {
    console.log(el);
    return (
      el?.code
        ?.toString()
        .toLowerCase()
        .includes(val?.toString().toLowerCase()) ||
      el?.reference
        ?.toString()
        .toLowerCase()
        .includes(val?.toString().toLowerCase())
    );
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
      <div class="ean-ref">
                    <span>EAN: ${data.code ? data.code : "NC"}</span>
                    <span>REF: ${data.reference ? data.reference : "NC"}</span>
                    </div>
                    <span>${data.emplacement}</span>
                    <span class="btn-delete" onclick="deleteCode('${
                      data.code + "" + data.emplacement
                    }')">x</span>
                </li>`;
    });
  }
  lists.innerHTML = output;
};
