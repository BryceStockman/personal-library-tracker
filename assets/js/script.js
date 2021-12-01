// Link to open library 2 APIS
fetch('http://openlibrary.org/search.json?q=the+lord+of+the+rings')
  .then(response => response.json())
  .then(data => console.log(data));

  // Covers URL, 6 digit number is the cover_i - SIZE
  // https://covers.openlibrary.org/b/id/269727-M.jpg
  

  // Free Dictionary API
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/chameleon')
  .then(response => response.json())
  .then(data => console.log(data));

// Search functionality
// Look into URI encoding to handle spaces
formEl = document.querySelector('#search-box')

// store input value as a variable, remove spaces in second variable
var getInputValue = function() {
var inputVal = document.getElementById("search-input").value;
var urlReadyValue = encodeURIComponent(inputVal);

console.log(urlReadyValue)



  var apiSearchUrl = "http://openlibrary.org/search.json?q=" + urlReadyValue;

  fetch(apiSearchUrl)
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        console.log(data.docs[0].cover_i)

        
      
      })
    }
  })
}





// var urlUri = encodeURIComponent(searchValue)

// Search API to find books - parse data for needed fields (determine what they are)

// Covers API for cover images, link to Search API using cover_i 