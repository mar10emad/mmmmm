//loading func
$(document).ready(function () {
  $("#loading").fadeOut(1000, function () {
      $("body").css("overflow", "visible")
  })
});
//side-nav
$('.side-btn ,.nav li a').click(function(){
    let currentWidth= $('.nav').outerWidth();
    if($('.side').css('left')=='0px'){
      $('.side').animate({'left':-currentWidth},1000)
      $('.nav ul').animate({'bottom':'15%','opacity':'0'},1500)
      $(".side-btn").html('<i class="fa fa-align-justify"></i>')
    }
    else{
     $('.side').animate({'left':0},1000)
      $('.nav ul').animate({'bottom':'58%','opacity':'1'},1500)
       $(".side-btn").html('<i class="fa fa-align-justify fa-times"></i>')
   } 
 })

//first-page
firstPage();
async function firstPage(){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
  response=await response.json()
  let item=response.meals
  let items=""
  for (let i = 0; i<item.length; i++) {
    items +=`
     <div class="col-lg-3 col-md-6">
      <div class="recipe">
        <img src="${item[i].strMealThumb}"  class="w-100 h-50 rounded" alt="${item[i].idMeal}">
        <div class="overlay rounded">
          <h2 class="p-2">${item[i].strMeal}</h2>
        </div>
      </div>
     </div>
    `
  }
  $(".recipes").html(items)
  recipeDetails()
} 
//search
document.getElementById('search').addEventListener("click", getSearch)

function getSearch(){
  $("#search-container").css("display", "block")
  $("#first-page").css("display", "none")
  $("#contact").css("display", "none")
}

//search name func
let searchWithName = document.getElementById("searchName")
 searchWithName.addEventListener("keyup", searchByName)
async function searchByName(){
  $("#loading").fadeIn(100)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWithName.value}`)
  response=await response.json()
  let item =response.meals
  // console.log(getItem)
  $("#loading").fadeOut(100)
  $("#first-page").css("display", "block")
  $("#contact").css("display", "none")
  let items=""
  for (let i = 0; i<item.length; i++) {
    items +=`
     <div class="col-lg-3 ">
      <div class="recipe">
        <img src="${item[i].strMealThumb}" class="w-100 h-50 rounded" alt="${item[i].idMeal}">
        <div class="overlay rounded">
          <h2 class="p-2">${item[i].strMeal}</h2>
        </div>
      </div>
     </div> 
     `}
     $(".recipes").html(items)
     recipeDetails()
}
//search letter func
let searchWithLetter = document.getElementById("searchLetter")
 searchWithLetter.addEventListener("keyup", searchByLetter)
async function searchByLetter(){
  $("#loading").fadeIn(100)
  $("#loading").fadeOut(100)
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchWithLetter.value}`)
  response=await response.json()
  let item =response.meals
  // console.log(getItem)
  $("#first-page").css("display", "block")
  $("#contact").css("display", "none")
  let items=""
  for (let i = 0; i<item.length; i++) {
    items +=`
     <div class="col-lg-3 ">
      <div class="recipe">
        <img src="${item[i].strMealThumb}" class="w-100 h-50 rounded" alt="${item[i].idMeal}">
        <div class="overlay rounded">
          <h2 class="recipeName p-2">${item[i].strMeal}</h2>
        </div>
      </div>
     </div> 
     `}
     $(".recipes").html(items)
     recipeDetails()
}
//recipesDetails
function recipeDetails(){
  $(".recipe").click(async function () {
    $("#loading").fadeIn(100)
    let text = $(this).find("h2").text()
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
    response=await response.json()
    let item =response.meals[0]
    $("#loading").fadeOut(100)
    let details=""
    details += `
    <div class="col-lg-4">
       <div>
        <img class="w-100" src="${item.strMealThumb}" alt=""><br>
        <h1 class="text-white text-center ">${item.strMeal}</h1>
      </div>
    </div>
    <div class="col-lg-8">
        <div class="text-white">
            <h2>Instructions</h2>
            <p>${item.strInstructions}</p>
            <p><b class="fw-bolder">Area :</b> ${item.strArea}</p>
            <p><b class="fw-bolder">Category :</b> ${item.strCategory}</p>
            <h3>Recipes :</h3>
            <div id="recipes">
            </div>
            <h3 class="mt-2 mx-1 p-1 mb-4">Tags :</h3>
            <div id="tags-color"></div>
            <a class="btn btn-success my-5 text-white" target="_blank"
                href="${item.strSource}">Source</a>
            <a class="btn btn-danger text-white" target="_blank"
                href="${item.strYoutube}">Youtub</a>
        </div>
    </div>
    `
    $(".recipes").html(details)
    var ingredients=""
    for(let i=1; i<20; i++)
    {
        if(item[`strIngredient${i}`])
        {
          ingredients +=`<p class="my-3 recipes-color rounded">${item[`strMeasure${i}`]}${item[`strIngredient${i}`]}</p>`
        }
    }
    $("#recipes").html(ingredients);
    var tags=""
    if(item.strTags!=null){
        tags= item.strTags.split(",")     
}
  var Tags=""
   for(let i=0; i <tags.length; i++)
   {
    Tags +=`<p class="tags-color">${tags[i]}</p>`
   }
  $("#tags-color").html(Tags)
})
}
/* category*/ 
document.getElementById('categories').addEventListener("click", getCategory)

function getCategory(){
  $("#loading").fadeIn(500)
  $("#search-container").css("display", "none")
  $("#first-page").css("display", "block")
  $("#contact").css("display", "none")
  $("#loading").fadeOut(500)
  category()
}

async function category(){
  
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response=await response.json()
    let item =response.categories
   
    let items=""
    for (let i = 0; i < item.length; i++) {
        items += `<div class="col-lg-3 col-md-6  my-3 ">
     <div class="category text-center ">
         <img class="w-100 rounded" src="${item[i].strCategoryThumb}" alt="">
         <div class="overlay pb-3  px-2  rounded ">
           <div>
            <h2 class="pt-5 mt-3">${item[i].strCategory}</h2>
            <p>${item[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
           </div>

         </div>
     </div>
    </div>`
    }
    $(".recipes").html(items)
   
    getCategoryDetails()
}

function getCategoryDetails() {
  $(".category").click(async function () {
      let thisCategory = this
      let categoryDetails = $(thisCategory).find("h2").text()
      $("#loading").fadeIn(300)
      let response=await fetch( `https://themealdb.com/api/json/v1/1/filter.php?c=${categoryDetails}`)
      response=await response.json()
      let item =response.meals
      $("#loading").fadeOut(300)
      let items = ""
      for (let i = 0; i < item.length; i++) {
          items += 
          `<div class="col-lg-3 col-md-6 my-3 ">
      <div class="recipe">
       <img class="w-100 rounded" src="${item[i].strMealThumb}" alt="${item[i].idMeal}">
       <div class="overlay rounded">
           <h2 class="p-2 text-center">${item[i].strMeal}</h2>
       </div>
   </div>
   </div>`
 }
   $(".recipes").html(items)
  recipeDetails()
})
}

// area 
document.getElementById('area').addEventListener("click", getArea)

function getArea(){
  $("#loading").fadeIn(500)
  $("#search-container").css("display", "none")
  $("#first-page").css("display", "block")
  $("#contact").css("display", "none")
  $("#loading").fadeOut(500)
  area()
}
async function area() {
  
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response=await response.json()
  let item =response.meals

  let items=""
  for (let i = 0; i < 20; i++) {
      items += `<div class="col-md-3 my-3 ">
   <div class="area text-center ">
     <i class="fa-solid fa-city fa-3x"></i>
     <div">
       <h2 class="text-white" >${item[i].strArea}</h2>
     </div>
   </div>
  </div>`
  }
  $(".recipes").html(items)
  getAreaDetails() 
  
  }

function getAreaDetails() {
 
    $(".area").click(async function () {
      $("#loading").fadeIn(300)
        let thisArea = this
        let areaDetails = $(thisArea).find("h2").text()
        let response=await fetch( `https://themealdb.com/api/json/v1/1/filter.php?a=${areaDetails}`)
        response=await response.json()
        let item =response.meals
        $("#loading").fadeOut(300)
        let items = ""
        for (let i = 0; i < item.length; i++) {
            items += 
            `<div class="col-lg-3 col-md-6 my-3 ">
        <div class="recipe">
         <img class="w-100 rounded" src="${item[i].strMealThumb}" alt="${item[i].idMeal}">
         <div class="overlay rounded">
             <h2 class="p-2 text-center">${item[i].strMeal}</h2>
         </div>
     </div>
     </div>`
   }
     $(".recipes").html(items)
    recipeDetails()
  })
  }  
//ingredients
  document.getElementById('ingredients').addEventListener("click", getIngredients)
  function getIngredients(){
    $("#loading").fadeIn(500)
    $("#search-container").css("display", "none")
    $("#contact").css("display", "none")
    $("#first-page").css("display", "block")
    
    $("#loading").fadeOut(500)
    ingredients()
  }

 async function ingredients(){
  let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response=await response.json()
  let item =response.meals
  let items = ""
  for (let i = 0; i < 20; i++) {
      items += ` <div class="col-lg-3  col-md-6 text-center ing">
      <div class="ing ">
      <i class="fa-solid fa-bowl-food fa-3x"></i>
      <h2>${item[i].strIngredient}</h2>
      <p>${item[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
  </div>`
  }
  $(".recipes").html(items)
  getIntDetails()
 }
 async function getIntDetails(){
  $(".ing").click(async function (){
    $("#loading").fadeIn(300)
        let thisIng = this
        let intDetails = $(thisIng).find("h2").text()
        let response=await fetch( `https://themealdb.com/api/json/v1/1/filter.php?i=${intDetails}`)
        response=await response.json()
        let item =response.meals
        let items=""
        $("#loading").fadeOut(300)
        for (let i = 0; i < item.length; i++) {
          items += 
      `<div class="col-lg-3 col-md-6 my-3 ">
         <div class="recipe">
            <img class="w-100 rounded" src="${item[i].strMealThumb}" alt="${item[i].idMeal}">
            <div class="overlay rounded">
               <h2 class="p-2 text-center">${item[i].strMeal}</h2>
            </div>
        </div>
      </div>`
   } 
   $(".recipes").html(items)
  recipeDetails()
  })
 }

//contacts
 document.getElementById('contactUs').addEventListener("click", getContact)

function getContact(){
  $("#loading").fadeIn(500)
  $("#search-container").css("display", "none")
  $("#first-page").css("display", "none")
   $("#contact").css("display", "block")
  $("#loading").fadeOut(500)
}

let namaRegex = /^[a-zA-Z ]+$/
let userName = document.getElementById("Name")
let emailRegex = /@[a-z0-9]{1,10}(\.)[a-z]{1,10}$/
let email = document.getElementById("Email")
let phoneRegex = /^01[0125][0-9]{8}$/
let phone = document.getElementById("Phone")
let ageRegex = /^[1-9][0-9]?$|^100$/
let age = document.getElementById("Age")
let PasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
let Password = document.getElementById("Password")
let Repassword = document.getElementById("Repassword")
userName.onkeyup = function () {
    if (namaRegex.test(userName.value) == true) {
        $("#name").css("display", "none");
        $("#Name").addClass("is-valid")
        $("#Name").removeClass("is-invalid")
    }
    else {
        $("#name").css("display", "block");
        $("#Name").addClass("is-invalid")
        $("#Name").removeClass("is-valid")
    }

}


email.onkeyup = function () {
    if (emailRegex.test(email.value) == true) {
        $("#email").css("display", "none");
        $("#Email").addClass("is-valid")
        $("#Email").removeClass("is-invalid")
    }
    else {
        $("#email").css("display", "block");
        $("#Email").addClass("is-invalid")
        $("#Email").removeClass("is-valid")
    }
}

phone.onkeyup = function () {
    if (phoneRegex.test(phone.value) == true) {
        $("#phone").css("display", "none");
        $("#Phone").addClass("is-valid")
        $("#Phone").removeClass("is-invalid")
    }
    else {
        $("#phone").css("display", "block");
        $("#Phone").addClass("is-invalid")
        $("#Phone").removeClass("is-valid")
    }
}


age.onkeyup = function () {
    if (ageRegex.test(age.value) == true) {
        $("#age").css("display", "none");
        $("#Age").addClass("is-valid")
        $("#Age").removeClass("is-invalid")
    }
    else {
        $("#age").css("display", "block");
        $("#Age").addClass("is-invalid")
        $("#Age").removeClass("is-valid")
    }
}


Password.onkeyup = function () {
    if (PasswordRegex.test(Password.value) == true) {
        $("#password").css("display", "none");
        $("#Password").addClass("is-valid")
        $("#Password").removeClass("is-invalid")
    }
    else {
        $("#password").css("display", "block");
        $("#Password").addClass("is-invalid")
        $("#Password").removeClass("is-valid")
    }
}


Repassword.onkeyup = function () {
    if (Password.value == Repassword.value) {
        $("#repassword").css("display", "none");
        $("#Repassword").addClass("is-valid")
        $("#Repassword").removeClass("is-invalid")
    }
    else {
        $("#repassword").css("display", "block");
        $("#Repassword").addClass("is-invalid")
        $("#Repassword").removeClass("is-valid")
    }
}
function validation() {
    if (namaRegex.test(userName.value) == true && emailRegex.test(email.value) == true && phoneRegex.test(phone.value) == true && ageRegex.test(age.value) == true && PasswordRegex.test(Password.value) == true && Password.value == Repassword.value) {
        document.getElementById("submitBtn").disabled = false;
    }
    else {
        document.getElementById("submitBtn").disabled = true;
    }
    setTimeout(validation, 100);
}
validation()