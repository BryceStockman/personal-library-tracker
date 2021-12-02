var ulEl = document.getElementById('search-results');

  // Free Dictionary API
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/chameleon')
  .then(response => response.json())
  .then(data => console.log(data));

// Search functionality
// Look into URI encoding to handle spaces
formEl = document.querySelector('#search-box')

// store input value as a variable
var getInputValue = function() {
var inputVal = document.getElementById("search-input").value;
// remove spaces from inputVal
var urlReadyValue = encodeURIComponent(inputVal);

console.log(urlReadyValue)

  var apiSearchUrl = "http://openlibrary.org/search.json?q=" + urlReadyValue + "&fields=title,author_name,key,cover_i,number_of_pages_median,&limit=5";

  fetch(apiSearchUrl)
  .then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        var pageCoverId = data.docs[0].cover_i
        console.log(pageCoverId)
        var imgEl = document.getElementById('bookImg')
        // imgEl.innerHTML = 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg'

        // display book cover
        imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
        
        // var showSearchResults = function() {
        //   var searchResults = []
        //   searchResults.push({})

        var searchResults = data.docs
        console.log(searchResults)

        searchResults.forEach(function(result){
          var title = result?.title
          var author = result?.author_name?.[0]
          var coverId = result?.cover_i
          var pages = result?.number_of_pages_median
          var key = result?.key
          var criteria ="title: " + title + " | author: " + author + " | pages: " + pages

          var liEl = document.createElement('li')
          ulEl.appendChild(liEl)
          liEl.textContent = criteria


          console.log(title, author, coverId, pages, key)
        })
        }
   ) }
    }
  )}
//}

// var showSearchResults = function() {
// var searchResults = []
// searchResults.push({})
// }









// Search API to find books - parse data for needed fields (determine what they are)

// Covers API for cover images, link to Search API using cover_i 