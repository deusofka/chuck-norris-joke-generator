/********************
       HOOKS
*********************/
let h1Dom = document.querySelector("h1");
let nerdyDom = document.querySelector("#nerdy");
let generateDom = document.querySelector("button");
let mainDom = document.querySelector("main");
let firstDom = document.querySelector("#first-name");
let lastDom = document.querySelector("#last-name");

let populateH1 = function() {
  if (window.innerWidth < 444) {
    h1Dom.textContent = "Chuck Norris Joke Maker";
  } else {
    h1Dom.textContent = "The Chuck Norris Joke Generator";
  }
};
let resizeHeading = function() {
  let headingWidth =
    mainDom.offsetWidth / h1Dom.textContent.length / 6.5 + "rem";
  h1Dom.style.fontSize = headingWidth;
};
resizeHeading();

/********************
    RESIZE EVENT
*********************/
window.addEventListener("resize", function(e) {
  resizeHeading();
  populateH1();
});

/********************
    GENERATE EVENT
*********************/
generateDom.addEventListener("click", function(e) {
  e.preventDefault();
  mainDom.innerHTML = `<div><br />Loading...</div>`;

  let xhr = new XMLHttpRequest();
  let url = "https://api.icndb.com/jokes/random/";

  // 1. Set number of jokes
  let numJokes = document.querySelector("input[name='no-of-jokes']:checked")
    .value;
  url += numJokes;

  // 2. Exclude explicit jokes
  url += "?exclude=[explicit]";

  // 3. Check if nerdy
  if (nerdyDom.checked === true) {
    url += "&limitTo=[nerdy]";
  }

  // 4. Append first and last names
  url += "&firstName=" + firstDom.value;
  url += "&lastName=" + lastDom.value;
  console.log(url);

  xhr.open("GET", url, true);

  xhr.onload = function() {
    if (this.status == "200") {
      let response = JSON.parse(this.responseText);
      if (response.type == "success") {
        // Single joke
        if (numJokes === 1) {
          mainDom.innerHTML = `<p>${response.value.joke}</p>`;
        }
        // Multiple jokes
        else {
          let content = "";
          response.value.forEach(function(joke) {
            content += `<p>${joke.joke}</p>`;
          });
          mainDom.innerHTML = content;
        }
      }
    }
  };
  xhr.send();
});

/********************
   FIRSTNAME EVENT
*********************/
firstDom.addEventListener("keyup", function(e) {
  console.log(e);
  let width = Math.max(this.value.length + 1, 5);
  firstDom.style.width = width + "ch";
});

/********************
    LASTNAME EVENT
*********************/
lastDom.addEventListener("keyup", function(e) {
  console.log(e);
  let width = Math.max(this.value.length + 1, 5);
  lastDom.style.width = width + "ch";
});
