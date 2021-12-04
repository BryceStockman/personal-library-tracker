var ulEl = document.getElementById('search-results');
var imgEl = document.createElement('img')
var btnEl = document.getElementById('add-book')

// create unique identifier based on key from api in /works/o235325l format
var trimKey = function (key) {
  var splitKey = key.split("/")
  var trimmedKey = splitKey[2]
  return trimmedKey;
}

// array for book items
var bookItems = [];

trimKey("/works/o235325l");

// Free Dictionary API
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/chameleon')
  .then(response => response.json())
  .then(data => console.log(data));

// Book Search functionality
formEl = document.querySelector('#search-box')

// store input value as a variable
var getInputValue = function () {
  var inputVal = document.getElementById("book-title").value;
  // remove spaces from inputVal
  var urlReadyValue = encodeURIComponent(inputVal);

  console.log(urlReadyValue)

  // Add searched term variable into url to pull up results
  var apiSearchUrl = "http://openlibrary.org/search.json?q=" + urlReadyValue + "&fields=title,author_name,key,cover_i,number_of_pages_median,&limit=5";

  fetch(apiSearchUrl)
    .then(function (response) {
      if (response.ok) {

        // remove previous search results
        ulEl.innerHTML = ""
        response.json().then(function (data) {
          var pageCoverId = data.docs[0].cover_i
          console.log(pageCoverId)
          var imgEl = document.getElementById('bookImg')
          var imgUrl = 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg'

          var searchResults = data.docs
          console.log(searchResults)

          searchResults.forEach(function (result) {
            var title = result?.title
            var author = result?.author_name?.[0]
            var coverId = result?.cover_i
            var pages = result?.number_of_pages_median
            var key = result?.key
            var criteria = "title: " + title + " | author: " + author + " | pages: " + pages


            // html list elements tied to search results
            var liEl = document.createElement('li')
            liEl.textContent = criteria
            ulEl.appendChild(liEl)

            // create object for searched books
            var bookItem = {
              title: title,
              author: author,
              coverId: coverId,
              pages: pages,
              key: trimKey(key)
            }

            bookItems.push(bookItem)
            console.log(bookItems)

            console.log(trimKey(key))

            console.log(title, author, coverId, pages, key)

            // display book cover
            // var bookCover = imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
            // return bookCover;
          })
        })
      }
    })
}

// represents a book that has been selected from search modal
var dummyBook = {
  title: 'Foundation',
  author: 'Isaac Asimov',
  coverId: 6501822,
  pages: 254,
  key: 'OL46125W'
}

// create a function that is tied to the add item on the modal, this function will save the book object that is radio selected to a saved books array
var saveBookToShelf = function(book) {
  // when radio button is set up, parameter book will be fed in from radio
  dummyBook.shelf = "to-read"
  // capture books existing in localStorage with gitItem
  var savedBooks = localStorage.getItem('booksForShelf')
  
  // create if (if booksForShelf is empty, create the array)
  // push selected book into the array
  // add new item to local storage
  localStorage.setItem('booksForShelf', JSON.stringify(dummyBook));

  // parse data to go back to original state that Javascript can understand

  // store new items to array and put it back in local storage

 
  console.log(savedBooks)
}

btnEl.onclick = saveBookToShelf

// function will build html elements and display book on to-read shelf / stored in local storage
// book item object, add key value pair in object for shelf (to-read, reading, read)








//}

// var showSearchResults = function() {
// var searchResults = []
// searchResults.push({})
// }









// Search API to find books - parse data for needed fields (determine what they are)

// Covers API for cover images, link to Search API using cover_i 

// enable draggable/sortable feaure on "book-cover" class
$(".drag-target").sortable({
  connectWith: $(".drag-target")
});