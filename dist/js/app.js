/********************
       HOOKS
*********************/
let h1Dom = document.querySelector("h1");
let nerdyDom = document.querySelector("#nerdy");
let generateDom = document.querySelector("button");
let mainDom = document.querySelector("main");
let firstDom = document.querySelector("#first-name");
let lastDom = document.querySelector("#last-name");

let resizeH1 = function() {
  let headingWidth =
    mainDom.offsetWidth / h1Dom.textContent.length / 6.5 + "rem";
  h1Dom.style.fontSize = headingWidth;
};
let populateH1 = function() {
  if (window.innerWidth < 444) {
    h1Dom.textContent = "Chuck Norris Joke Maker";
  } else {
    h1Dom.textContent = "The Chuck Norris Joke Generator";
  }
};
populateH1();
resizeH1();

/********************
    RESIZE EVENT
*********************/
window.addEventListener("resize", function(e) {
  populateH1();
  resizeH1();
});

window.addEventListener("orientationchange", function(e) {
  populateH1();
  resizeH1();
});

/********************
    GENERATE EVENT
*********************/
generateDom.addEventListener("click", function(e) {
  e.preventDefault();
  mainDom.innerHTML = `<div class = "loader"></div>`;
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

  xhr.onerror = function() {
    console.log(
      "The internet isn't available as it's currently surfing Chuck Norris. Please try again later :/"
    );
    mainDom.innerHTML = `<div class = "error"><p>The internet isn't available as it's currently surfing Chuck Norris. Please try again later :/</p></div>`;
  };
  xhr.send();
});

let changeFieldLength = function(field) {
  let width = Math.max(field.value.length + 1, 5);
  field.style.width = width + "ch";
};
changeFieldLength(firstDom);
changeFieldLength(lastDom);

/********************
   FIRSTNAME EVENT
*********************/
firstDom.addEventListener("keyup", function(e) {
  changeFieldLength(firstDom);
});

/********************
    LASTNAME EVENT
*********************/
lastDom.addEventListener("keyup", function(e) {
  changeFieldLength(lastDom);
});
