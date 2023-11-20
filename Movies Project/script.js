let upComingMovies = document.getElementById("upComingMovies");
let upComingMoviesURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=9c34f07be9be54aa8e3fbe2e5b416d45";
let topRatedMovies = document.getElementById("topRatedMovies");
let topRatedMoviesULR =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=9c34f07be9be54aa8e3fbe2e5b416d45";

let bestTvSeries = document.getElementById("bestTvSeries");
let bestTvSeriesULR =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=9c34f07be9be54aa8e3fbe2e5b416d45";

let imgPath = "https://image.tmdb.org/t/p/original/";

let loader = `
<div class="spinner">
    <div class="spinnerin"></div>
</div>`;

function getDataFromAPISeries(url, element) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", `${url}`);
  httpRequest.send();
  element.innerHTML = loader;

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let moviesResponse = JSON.parse(httpRequest.response);
      let moviesResult = moviesResponse.results;
      console.log(moviesResult);

      let resultElement = "";

      for (let i = 1; i < moviesResult.length; i++) {
        let imgFullPath = imgPath + moviesResult[i].poster_path;
        console.log("hi");
        if (moviesResult[i].name == undefined) {
          continue;
        }
        resultElement += `
        <li>
          <div class="movie-card" >     
              <figure class="card-banner" >
                <img src="${imgFullPath}" alt="The Northman movie poster" >
                <p class='card-overview'>${moviesResult[i].overview}</p>

              </figure>   
                
            <div class='d-flex flex-column textHeight justify-content-end gap-2 '>
            <div class="title-wrapper mb-2">      
                <h3 class="card-title" >${
                  moviesResult[i].name
                }</h3>              
              
            </div>        
  
            <div class="card-meta">
              <div class="badge badge-outline">HD</div>            
              <div class="rating">
                <ion-icon name="star"></ion-icon>
                <data>${Number(moviesResult[i].vote_average).toFixed(1)}</data>
              </div>
            </div>
            
            </div>
        
          </div>
        </li>`;
      }
      element.innerHTML = resultElement;
    }
  };
}
function getDataFromAPI(url, element) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open("GET", `${url}`);
  httpRequest.send();
  element.innerHTML = loader;

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      let moviesResponse = JSON.parse(httpRequest.response);
      let moviesResult = moviesResponse.results;
      // console.log(imgPath+moviesResponse.results[0].backdrop_path);
      let resultElement = "";
      for (let i = 1; i < moviesResult.length; i++) {
        let imgFullPath = imgPath + moviesResult[i].poster_path;
        // let title = "";
        // console.log(moviesResult[i].release_date.split('-')[0])
        if (moviesResult[i].title == undefined) {
          // console.log("undefined");
          // title = moviesResult[i].name;
          continue;
        } else {
          // title = moviesResult[i].title;
        }

        resultElement += `
        <li>
          <div class="movie-card">     
              <figure class="card-banner">
                <img src="${imgFullPath}" alt="The Northman movie poster">
                <p class='card-overview'>${moviesResult[i].overview}</p>
              </figure>        
            <div class='d-flex flex-column textHeight justify-content-end gap-2 '>
            <div class="title-wrapper mb-2">      
                <h3 class="card-title" >${
                  moviesResult[i].title
                }</h3>              
              <time datetime="2022">${
                moviesResult[i].release_date.split("-")[0]
              }</time>
            </div>        
  
            <div class="card-meta">
              <div class="badge badge-outline">HD</div>            
              <div class="rating">
                <ion-icon name="star"></ion-icon>
                <data>${Number(moviesResult[i].vote_average).toFixed(1)}</data>
              </div>
            </div>
            
            </div>
        
          </div>
        </li>`;
      }
      element.innerHTML = resultElement;
    }
  };
}

getDataFromAPI(upComingMoviesURL, upComingMovies);
getDataFromAPI(topRatedMoviesULR, topRatedMovies);
getDataFromAPISeries(bestTvSeriesULR, bestTvSeries);

let searchInput = document.getElementById("search");
function searchMovies() {}

let date = new Date();
document.getElementById("currentTime").innerHTML = date.getFullYear();

//--------------------------------------------------------------------------------------------------------//
// ("use strict");

// /**
//  * navbar variables
//  */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}

/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10
    ? header.classList.add("active")
    : header.classList.remove("active");
});

/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  window.scrollY >= 500
    ? goTopBtn.classList.add("active")
    : goTopBtn.classList.remove("active");
});

