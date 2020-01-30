let mainDom = document.querySelector("main");
let nerdyDom = document.querySelector("#nerdy");
let firstDom = document.querySelector("#first-name");
let lastDom = document.querySelector("#last-name");

// Generate event
let generateDom = document
  .querySelector("button")
  .addEventListener("click", function(e) {
    e.preventDefault();
    mainDom.innerHTML = `<div><br />Loading...</div>`;

    let xhr = new XMLHttpRequest();
    let url = "https://api.icndb.com/jokes/random/";

    // 1. Check number of jokes
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

// Dynamically change first name width
firstDom.addEventListener("keyup", function(e) {
  console.log(e);
  let width = Math.max(this.value.length + 1, 5);
  firstDom.style.width = width + "ch";
});

// Dynamically change last name width
lastDom.addEventListener("keyup", function(e) {
  console.log(e);
  let width = Math.max(this.value.length + 1, 5);
  lastDom.style.width = width + "ch";
});
