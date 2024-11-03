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
  searchData(val);
  getDataLocal();
};

