// !API URL
const WHOLE_WORLD_COUNTRIES = "https://restcountries.com/v3.1/all";

// !SELECT ELEMENTS
const countryCardContainer = document.querySelector(".country-card-container");
const searchInput = document.getElementById("input-search");
// searc type btns
const searchTypeBtns = document.querySelectorAll(
  ".search-type-btns-container button"
);
const startWordBtn = document.querySelector(".start-word-btn");
const anyWordBtn = document.querySelector(".any-word-btn");
const sortBtn = document.querySelector(".sort-btn");

const totalCountryInfo = document.querySelector(".total");
const seachStatusInfo = document.querySelector(".search-status");
console.log(seachStatusInfo);

// !FUNCTIONS
// get countries
const getCountry = async () => {
  return await fetch(WHOLE_WORLD_COUNTRIES)
    .then((res) => res.json())
    .catch((e) => console.log("error"));
};
// get countries common name only
const getCountryName = async () => {
  const allCountries = await getCountry();
  let countryName = [];
  allCountries.forEach((country) => countryName.push(country.name.common));
  return countryName;
};

// CREATE COUNTRY CARD ELEMENT
const createCountryCard = (countryArr) => {
  countryArr.forEach((country) => {
    //create element
    const countryCardEl = document.createElement("div");
    countryCardEl.classList.add("country-card");
    const countryNameEl = document.createElement("h1");
    countryNameEl.classList.add("country-name");

    // set inner content of elements
    countryNameEl.innerText = country;

    // append child
    countryCardEl.appendChild(countryNameEl);
    countryCardContainer.appendChild(countryCardEl);
  });
};

// SORT TOGGLE
const sortArr = (arr) => {
  return sortBtn.value == "z-a" ? sortAZ(arr) : sortZA(arr);
};

// SORT ARRAY A-Z
const sortAZ = (arr) => {
  arr.sort((a, b) => {
    return a > b ? 1 : b > a ? -1 : 0;
  });
};
// SORT ARRAY Z-A
const sortZA = (arr) => {
  arr.sort((a, b) => {
    return a > b ? -1 : b > a ? 1 : 0;
  });
};

// when sort btn clicked
const sorting = () => {
  if (sortBtn.value == "z-a") {
    // sorting based on selected type card
    if (startWordBtn.classList.contains("active")) searchWithStartingWord();
    else if (anyWordBtn.classList.contains("active")) searchWithAnyWord();

    sortBtn.value = "a-z"; // change value
    sortBtn.innerText = "a-z"; // change text
  } else if (sortBtn.value == "a-z") {
    // sorting based on selected type card
    if (startWordBtn.classList.contains("active")) searchWithStartingWord();
    else if (anyWordBtn.classList.contains("active")) searchWithAnyWord();
    sortBtn.value = "z-a"; // change value
    sortBtn.innerText = "z-a"; // change text
  }
};

// const sort = (arr) => {
//   sortBtn.addEventListener("click", () => {
//     if (sortBtn.value == 1) {
//       // value 1 = a-z
//       sortBtn.textContent = "z-a";
//       sortBtn.value = -1;
//       //   organize array base on value
//     } else {
//       sortBtn.textContent = "a-z";
//       sortBtn.value = 1;

//       //   organize array base on value
//     }
//   });
// };

// filter array when search item
const filteredByStartWord = (arr) => {
  return arr.filter((item) => {
    item = item.toLowerCase();
    return (
      item.slice(0, searchInput.value.trim().length) ===
      searchInput.value.trim().toLowerCase()
    );
  });
};
const filteredByAnyWord = (arr) => {
  return arr.filter((item) => {
    item = item.toLowerCase();
    return item.includes(searchInput.value.trim().toLowerCase());
  });
};

// make country container empty
const emptyChildren = (parentEl) => {
  parentEl.innerHTML = "";
};
// for showing all countries
const totalCountries = async () => {
  let allCountries = await getCountryName();
  // set total countries count
  totalCountryInfo.innerHTML = allCountries.length;
};

//SEARCH WITH STARTING WORD
const searchWithStartingWord = async () => {
  //call country api
  const countryName = await getCountryName();
  // sort country name
  sortArr(countryName); // initially  a to z
  // empty parent element
  emptyChildren(countryCardContainer);
  //   filter by searched and create elements
  let filteredCountry = filteredByStartWord(countryName);
  // set status
  if (filteredCountry.length == 0) {
    seachStatusInfo.innerHTML = `<h1><span>opps!!</span> </span> there is no country starting with '<span>${searchInput.value.trim()}</span>' </h1>`;
  } else if (filteredCountry.length == 1) {
    seachStatusInfo.innerHTML = `<h1><span>only one country</span> starting with '<span>${searchInput.value.trim()}</span>'</h1>`;
  } else {
    seachStatusInfo.innerHTML = `<h1>starting with '<span>${searchInput.value.trim()}</span>' are <span>${
      filteredCountry.length
    }</span> countries</h1>`;
  }

  // get elements
  if (searchInput.value.trim() !== "") createCountryCard(filteredCountry);
};

// SEARCH WITH ANY WORD
const searchWithAnyWord = async () => {
  // get all countries name
  let allCountries = await getCountryName();
  // sort based on sort btn vlaue
  sortArr(allCountries);
  // empty parent element
  emptyChildren(countryCardContainer);
  //filtered by searched and create elements
  let filteredCountry = filteredByAnyWord(allCountries);
  // set status
  if (filteredCountry.length == 0) {
    seachStatusInfo.innerHTML = `<h1><span>opps!!</span> </span> there is no country with contains '<span>${searchInput.value.trim()}</span>' </h1>`;
  } else if (filteredCountry.length == 1) {
    seachStatusInfo.innerHTML = `<h1><span>only one country</span> with contains '<span>${searchInput.value.trim()}</span>'</h1>`;
  } else {
    seachStatusInfo.innerHTML = `<h1>contains '<span>${searchInput.value.trim()}</span>' are <span>${
      filteredCountry.length
    }</span> countries</h1>`;
  }

  // get elements
  if (searchInput.value.trim() !== "") createCountryCard(filteredCountry);
};

// change search type by clicking search type btns
const changeSearchType = () => {
  searchTypeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // remove activation
      searchTypeBtns.forEach((btn) => btn.classList.remove("active"));
      // set activation
      e.currentTarget.classList.add("active");
    });
  });
};
// search changing
const search = () => {
  if (startWordBtn.classList.contains("active")) {
    console.log("startWordBtn");
    searchWithStartingWord();
  } else if (anyWordBtn.classList.contains("active")) {
    console.log("anyWordBtn");
    searchWithAnyWord();
  }
};
// search type btns click

// !CALL FUNCTION INITIALLY
// initally show all countries

// !EVENT LISTENER
window.addEventListener("DOMContentLoaded", () => {
  totalCountries();
  // change search btns activation
  changeSearchType();
});
searchInput.addEventListener("keyup", search);
sortBtn.addEventListener("click", sorting);
