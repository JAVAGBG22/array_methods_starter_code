// Select DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMilliBtn = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calcWealth = document.getElementById("calculate-wealth");

// init array
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// get random user from API
async function getRandomUser() {
  /* fetch("https://randomuser.me/api")
  .then((res) => res.json())
  .then(); */

  const res = await fetch("https://randomuser.me/api");

  const data = await res.json();
  //console.log(data);

  const user = data.results[0];

  // create our user object
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  //console.log(newUser);

  // add user data
  addData(newUser);
}

// add data to data array
function addData(obj) {
  data.push(obj);

  // update DOM
  updateDOM();
}

// update DOM
function updateDOM(providedata = data) {
  // default value is our data array

  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedata.forEach((person) => {
    // create new div
    const element = document.createElement("div");

    // add CSS class to div
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;

    main.appendChild(element);
  });
}

// funktion för att formatera nummer som pengar
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// function for double the money
function double() {
  data = data.map(user => ({ ...user, money: user.money * 2 }))
  updateDOM()
}
doubleBtn.addEventListener("click", double)

// function for showing only millionaires
function onlyMils() {
  data = data.filter(user => user.money >= 1_000_000)
  updateDOM()
}
showMilliBtn.addEventListener('click', onlyMils)

// function for sorting richest persons
function sortByMoney() {
  data = data.sort((a, b) => b.money - a.money)
  updateDOM()
}
sort.addEventListener('click', sortByMoney)

// function for calculating the total wealth of all persons
function totalWealth() {
  const sum = data.reduce((prevValue, currentValue) => prevValue + currentValue.money, 0)
  data.push({
    name: "Total wealth",
    money: sum
  })
  updateDOM()
}
calcWealth.addEventListener('click', totalWealth)

// add new user, event listener
addUserBtn.addEventListener("click", getRandomUser);
