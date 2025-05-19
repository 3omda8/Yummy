const row = document.querySelector("#row");
const inputFields = document.querySelector("#inputFields");
const menuBars = document.querySelector("#menu-bars");
const xMark = document.querySelector("#x-mark");
const menuToggle = document.querySelector("#menu-toggle");
const sideNav = document.querySelector("#sideNav");
const leftPart = document.querySelector(".left-part");
const catLink = document.querySelector("#cat-link");
const contactLink = document.querySelector("#contact-link");

// const areaLink = document.querySelector("#area-link");
// const ingLink = document.querySelector("#ing-link");

menuToggle.addEventListener("click", () => {
  menuBars.classList.toggle("d-none");
  xMark.classList.toggle("d-none");
  sideNav.classList.toggle("appear");
  leftPart.classList.toggle("show");
});

contactLink.addEventListener("click", () => {
  closeNav();
  inputFields.innerHTML = ``;
  row.innerHTML = ` <form
          onchange="check()"
          class="d-flex flex-column justify-content-center vh-80"
        >
          <div class="row">
            <div class="col-12 col-md-6 m-auto">
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Enter Your Name"
                oninput="validateName()"
              />
              <p id="nameValid" class="text-danger m-0 pt-1 d-none">
                Special characters and numbers not allowed
              </p>
            </div>
            <div class="col-12 col-md-6 m-auto">
              <input
                type="email"
                id="email"
                class="form-control"
                placeholder="Enter Your Email"
                oninput="validateEmail(); check()"
              />
              <p id="emailValid" class="text-danger m-0 pt-1 d-none">
                Enter Valid E-Mail "example@yyy.fff"
              </p>
            </div>
            <div class="col-12 col-md-6 m-auto pt-3">
              <input
                type="text"
                id="phone"
                class="form-control"
                placeholder="Enter Your Phone"
                oninput="validatePhone()"
              />
              <p id="phoneValid" class="text-danger m-0 pt-1 d-none">
                Enter Valid Phone Number
              </p>
            </div>
            <div class="col-12 col-md-6 m-auto pt-3">
              <input
                type="number"
                id="age"
                class="form-control"
                placeholder="Enter Your Age"
                oninput="validateAge()"
              />
              <p id="ageValid" class="text-danger m-0 pt-1 d-none">
                Enter Valid Age " 10 years old to 90 years old"
              </p>
            </div>
            <div class="col-12 col-md-6 m-auto pt-3">
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="Enter Your Password"
                oninput="validatePassword()"
              />
              <p id="passwordValid" class="text-danger m-0 pt-1 d-none">
                Not Valid Pass. "minimum 8 characters, at least letter & number"
              </p>
            </div>
            <div class="col-12 col-md-6 m-auto pt-3">
              <input
                type="password"
                id="rePassword"
                class="form-control"
                placeholder="Repassword"
                oninput="validateRePassword()"
              />
              <p id="rePasswordValid" class="text-danger m-0 pt-1 d-none">
                Password Not Match
              </p>
            </div>
          </div>
          <div class="w-5 mx-auto pt-3 d-flex justify-content-center">
            <button
              id="submit-btn"
              type="button"
              class="btn btn-danger"
              disabled
            >
              Submit
            </button>
          </div>
        </form>`;
});

function closeNav() {
  menuBars.classList.remove("d-none");
  xMark.classList.add("d-none");
  sideNav.classList.remove("appear");
  leftPart.classList.remove("show");
}

async function getCategories() {
  closeNav();
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  const data = await response.json();
  const categories = data.categories;
  console.log(categories);
  displayCategories(categories);
}

function displayCategories(cat) {
  inputFields.innerHTML = ``;
  let cartoona = ``;
  cat.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
     <div onclick="getCategoryMeals('${item.strCategory}')" 
       class=" card position-relative overflow-hidden cursor-pointer bg-transparent border-0">
            <img src="${item.strCategoryThumb}" alt="" class="w-100"/>
            <div class="overlay position-absolute text-center">
              <div class="text">
                <h3>${item.strCategory}</h3>
                <p>
                  ${item.strCategoryDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")} 
                </p>
              </div>
            </div>
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}
catLink.addEventListener("click", () => getCategories());

async function getCategoryMeals(category) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  const meals = data.meals;
  // console.log(meals.slice(0, 20));
  displayMeals(meals.slice(0, 20));
}

function displayMeals(meals) {
  let cartoona = ``;
  meals.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
     <div onclick="getMealDetails('${item.idMeal}')"
       class=" card position-relative overflow-hidden cursor-pointer bg-transparent border-0">
            <img src="${item.strMealThumb}" alt="" class="w-100"/>
            <div class="overlay position-absolute d-flex align-items-center ">
              <div class="text">
                <h3>${item.strMeal}</h3>
              </div>
            </div>
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}

async function getIngredients() {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  const data = await response.json();
  const ingredients = data.meals;
  console.log(ingredients);
  displayIngredients(ingredients.slice(0, 20));
}

function displayIngredients(ingredients) {
  inputFields.innerHTML = ``;
  let cartoona = ``;
  ingredients.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
     <div onclick="getIngredientMeals('${
       item.strIngredient
     }')" class="cursor-pointer bg-transparent border-0">           
              <div class="d-flex flex-column justify-content-center align-items-center">
                <i class="fa-solid fa-drumstick-bite text-white ficons"></i>
                <h3 class="text-white text-center">${item.strIngredient}</h3>
                <p class="text-white text-center">
                  ${item.strDescription.split(" ").slice(0, 20).join(" ")} 
                </p>           
            </div>
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}

async function getIngredientMeals(ingredient) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const data = await response.json();
  const meals = data.meals;
  console.log(meals);
  displayIngredientMeals(meals.slice(0, 20));
}

function displayIngredientMeals(meals) {
  inputFields.innerHTML = ``;
  let cartoona = ``;
  meals.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
      <div onclick="getMealDetails('${item.idMeal}')"
        class=" card position-relative overflow-hidden cursor-pointer bg-transparent border-0">
            <img src="${item.strMealThumb}" alt="" class="w-100"/>
            <div class="overlay position-absolute d-flex align-items-center ">
              <div class="text">
                <h3>${item.strMeal}</h3>
              </div>
            </div>
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}

$("#ing-link").click(() => {
  getIngredients();
  closeNav();
});

async function getMealDetails(mealId) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  const meal = data.meals[0];
  console.log(meal);
  displayMealDetails(meal);
}

function displayMealDetails(meal) {
  closeNav();
  inputFields.innerHTML = ``;
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-1 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsList = "";
  for (let i = 0; i < tags.length; i++) {
    tagsList += `
        <li class="alert alert-danger m-1 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
  <div class="col-md-4 pt-5">
    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-2"/>
  </div>
  <div class="col-md-8 text-white pt-5">
    <h2>${meal.strMeal}</h2>
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
    <h3>Area: ${meal.strArea}</h3>
    <h3>Category: ${meal.strCategory}</h3>
    <h3>Recipes:</h3>
    <ul class="list-unstyled d-flex flex-wrap gap-2">
      ${ingredients}
    </ul>

    <h3>Tags:</h3>
    <ul class="list-unstyled d-flex flex-wrap gap-2">
      ${tagsList}
    </ul>

    <a class="btn btn-success me-2" target="_blank" href="${meal.strSource}">Source</a>
    <a class="btn btn-danger" target="_blank" href="${meal.strYoutube}">Youtube</a>      
  </div>
  `;
  row.innerHTML = cartoona;
}

async function getArea() {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  const data = await response.json();
  const area = data.meals;
  console.log(area);
  displayArea(area);
}

function displayArea(area) {
  let cartoona = ``;
  area.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
     <div onclick="getAreaMeals('${item.strArea}')" class=" cursor-pointer bg-transparent border-0 p-3 d-flex flex-column justify-content-center align-items-center">
           
               <i class="fa-solid fa-house-laptop text-white ficons"></i>
               <h3 class="text-white">${item.strArea}</h3>
            
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}

$("#area-link").click(() => {
  getArea();
  closeNav();
});

async function getAreaMeals(area) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await response.json();
  const meals = data.meals;
  // console.log(meals);
  displayAreaMeals(meals.slice(0, 20));
}

function displayAreaMeals(meals) {
  let cartoona = ``;
  meals.map((item) => {
    cartoona += `
    <div class=" col-md-3 p-3">
     <div onclick="getMealDetails('${item.idMeal}')"
       class=" card position-relative overflow-hidden cursor-pointer bg-transparent border-0">
            <img src="${item.strMealThumb}" alt="" class="w-100"/>
            <div class="overlay position-absolute d-flex align-items-center ">
              <div class="text">
                <h3>${item.strMeal}</h3>
              </div>
            </div>
      </div>
      </div>
        `;
  });
  row.innerHTML = cartoona;
}

function searchMeals() {
  inputFields.innerHTML = `
  <div class="col-6">
  <input type="text" id="search-input" class="form-control w-100" placeholder="Search By Name" />
  </div>
  <div class="col-6">
  <input type="text" id="search-letter" class="form-control w-100" placeholder="Search By First Letter" maxlength="1" />
  </div>
  `;
  const searchInput = document.getElementById("search-input");
  const searchLetter = document.getElementById("search-letter");
  searchInput.addEventListener("keyup", () => {
    if (searchInput.value.length >= 1) {
      getSearchMealsByName(searchInput.value);
    } else {
      row.innerHTML = ``;
    }
  });
  searchLetter.addEventListener("keyup", () => {
    if (searchLetter.value.length == 1) {
      getSearchMealsByFirstLetter(searchLetter.value);
    } else {
      row.innerHTML = ``;
    }
  });
}

async function getSearchMealsByName(name) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  const data = await response.json();
  const meals = data.meals;
  // console.log(meals);
  meals ? displayMeals(meals.slice(0, 20)) : displayMeals([]);
}

async function getSearchMealsByFirstLetter(letter) {
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  if (letter.value !== "") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();
    const meals = data.meals;
    // console.log(meals);
    meals ? displayMeals(meals.slice(0, 20)) : displayMeals([]);
  } else {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=a`
    );
    const data = await response.json();
    const meals = data.meals;
    // console.log(meals);
    meals ? displayMeals(meals.slice(0, 20)) : displayMeals([]);
  }
}
$("#search").click(() => {
  row.innerHTML = ``;
  searchMeals();
  closeNav();
});

async function getStartMeals() {
  closeNav();
  row.innerHTML = `<div class="text-center w-100 my-5 d-flex justify-content-center align-items-center min-vh-100">
                     <div class="spinner-border text-primary" role="status">
                       <span class="visually-hidden">Loading...</span>
                     </div>
                   </div>`;
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  const data = await response.json();
  const meals = data.meals;
  // console.log(meals);
  displayMeals(meals.slice(0, 20));
}
getStartMeals();

// contact page Validation
function validateName() {
  const name = document.getElementById("name");
  const validMsg = document.getElementById("nameValid");
  const regex = /^[a-zA-Z\s]{1,}$/;
  if (regex.test(name.value)) {
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    name.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}

function validateEmail() {
  const email = document.getElementById("email");
  const validMsg = document.getElementById("emailValid");
  const regex = /^[a-zA-Z]{3,}@[a-zA-Z]{3,}\.[a-zA-Z]{3,}$/;
  if (regex.test(email.value)) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    email.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}

function validatePhone() {
  const phone = document.getElementById("phone");
  const validMsg = document.getElementById("phoneValid");
  const regex = /^(01)(0|1|2|5)[0-9]{8}$/;
  if (regex.test(phone.value)) {
    phone.classList.remove("is-invalid");
    phone.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    phone.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}
function validateAge() {
  const age = document.getElementById("age");
  const validMsg = document.getElementById("ageValid");
  const regex = /^(10|[1-8][0-9]|90)$/;
  if (regex.test(age.value)) {
    age.classList.remove("is-invalid");
    age.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    age.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}
function validatePassword() {
  const password = document.getElementById("password");
  const validMsg = document.getElementById("passwordValid");
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@\w]{8,}$/;
  if (regex.test(password.value)) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    password.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}

function validateRePassword() {
  const rePassword = document.getElementById("rePassword");
  const password = document.getElementById("password");
  const validMsg = document.getElementById("rePasswordValid");
  if (rePassword.value === password.value) {
    rePassword.classList.remove("is-invalid");
    rePassword.classList.add("is-valid");
    validMsg.classList.add("d-none");
    return true;
  } else {
    rePassword.classList.add("is-invalid");
    validMsg.classList.remove("d-none");
    return false;
  }
}

function validateForm() {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePassword() &&
    validateRePassword()
  ) {
    return true;
  } else {
    return false;
  }
}

function check() {
  const subBtn = document.querySelector("#submit-btn");
  if (validateForm()) {
    subBtn.removeAttribute("disabled");
  } else {
    subBtn.setAttribute("disabled", true);
  }
}
