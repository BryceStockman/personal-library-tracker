var addBookBtn = document.querySelector('.add-book-btn');
var inputVal = document.getElementById('book-title').value;
var imgEl = document.createElement('img');
var btnEl = document.getElementById('add-book')

// bookChoices is the container for all book choices
var bookChoices = document.querySelector('.book-choices');


// on window loading, generate items from local storage
// window.onload = function() {JSON.parse(localStorage.getItem("booksForShelf"))}


// create unique identifier for each book based on key from api in /works/o235325l format
var trimKey = function (key) {
  var splitKey = key.split('/');
  var trimmedKey = splitKey[2];
  return trimmedKey;
};

// build checkbox and labels for modal for all 5 book options
var buildBookPEl = function () {
  // book choice is a p tag container for one book choice, this is what should be iterated in the loop
  var bookChoice = document.createElement('p');
  bookChoice.classList.add('book-choice');
  return bookChoice;
};
var buildCheckboxWrapper = function () {
  // wrapper for the checkbox and book info
  var checkboxWrapper = document.createElement('span');
  checkboxWrapper.classList.add('checkbox-wrapper', 'd-flex');
  return checkboxWrapper;
};
var buildCheckBox = function (key) {
  // checkbox
  var checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'select-book');
  checkbox.setAttribute('id', 'checkbox');
  checkbox.setAttribute('class', 'checkbox')
  checkbox.setAttribute('data-book-id', trimKey(key))
  return checkbox;
};
var buildCheckBoxLabel = function (key, criteria) {
  // label
  var checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.setAttribute('id', 'search-results');
  checkboxLabel.classList.add('book-info');
  checkboxLabel.textContent = criteria;
  checkboxLabel.setAttribute('data-book-id', trimKey(key));
  return checkboxLabel;
};


// array for book items
var searchedBookResults = [];

// Free Dictionary API
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/chameleon')
  .then(response => response.json())
  .then(data => console.log(data));

// Book Search functionality
formEl = document.querySelector('#search-box');

// store input value as a variable
var getInputValue = function () {
  var inputVal = document.getElementById('book-title').value;
  // remove spaces from inputVal
  var urlReadyValue = encodeURIComponent(inputVal);

  // console.log(urlReadyValue);

  // Add searched term variable into url to pull up results
  var apiSearchUrl =
    'http://openlibrary.org/search.json?q=' +
    urlReadyValue +
    '&fields=title,author_name,key,cover_i,number_of_pages_median,&limit=5';

  fetch(apiSearchUrl).then(function (response) {
    if (response.ok) {
      bookChoices.innerHTML = '';
      response.json().then(function (data) {
        var pageCoverId = data.docs[0].cover_i;
        // console.log('pageCoverId', pageCoverId);

        // var imgEl = document.getElementById('bookImg');
        // imgEl.innerHTML = 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg'

        var searchResults = data.docs;
        // console.log('SEARCH RESULTS', searchResults);

        searchResults.forEach(function (result) {
          // console.log('RESULT', result);
          var title = result?.title;
          var author = result?.author_name?.[0];
          var coverId = result?.cover_i;
          var pages = result?.number_of_pages_median;
          var key = result?.key;
          var criteria =
            'title: ' + title + ' | author: ' + author + ' | pages: ' + pages;

          // bookInfoEl = criteria;
          var bookChoice = buildBookPEl();
          var checkboxWrapper = buildCheckboxWrapper();
          var checkbox = buildCheckBox(key);
          var checkboxLabel = buildCheckBoxLabel(key, criteria);

          // variables created above these are to add HTML elements for book criteria to go into
          bookChoices.appendChild(bookChoice);
          bookChoice.appendChild(checkboxWrapper);
          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(checkboxLabel);

          // html list elements tied to search results
          var bookItem = {
            title: title,
            author: author,
            coverId: coverId,
            pages: pages,
            key: trimKey(key),
          };

          searchedBookResults.push(bookItem);
        
          // Covers API for cover images, link to Search API using cover_i

          // display book cover
          // var bookCover = imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
          // return bookCover;
        });
      });
    }
  });
};


// display book cover
// var bookCover = imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
// return bookCover;


// create a function that is tied to the add item on the modal, this function will save the book object that is radio selected to a saved books array
var saveBookToLocalStorage = function(book) {
  // when radio button is set up, parameter book will be fed in from radio
  book.shelf = "to-read"
  // capture books existing in localStorage with gitItem
  // JSON.parse is usually used with getItem to make the information readable by JS
  var existingBooksOnLocalStorage =  JSON.parse(localStorage.getItem('booksForShelf'))
  // create if (if booksForShelf is empty, create the array)
  if(Array.isArray(existingBooksOnLocalStorage) === false) {
    console.log('there are no books in the array')
    var newArrayForBooksOnLocalStorage = []
    // push selected book into the array
    newArrayForBooksOnLocalStorage.push(book)
    localStorage.setItem('booksForShelf', JSON.stringify(newArrayForBooksOnLocalStorage))
    console.log('new array result',JSON.stringify(newArrayForBooksOnLocalStorage) )
  } else {
    existingBooksOnLocalStorage.push(book)
    localStorage.setItem('booksForShelf', JSON.stringify(existingBooksOnLocalStorage))
    console.log('existing array result', JSON.stringify(existingBooksOnLocalStorage))
  }


  console.log(existingBooksOnLocalStorage)
}



// function will build html elements and display book on to-read shelf / stored in local storage
// book item object, add key value pair in object for shelf (to-read, reading, read)


var addBookToShelf = function (selectedBookId) {
  searchedBookResults.find(function(book){ 
    console.log('Add Book to Shelf is running')
    if(book.key === selectedBookId){
      saveBookToLocalStorage(book);
      // push items to array (on local storage)
    }
  })
}

addBookBtn.addEventListener('click', function (e) {
  console.log('Add Book was clicked', e);

  var uncheckedBoxes = 0;
  var bookCheckboxes = document.getElementsByClassName('checkbox');
  for (let i = 0; i < bookCheckboxes.length; i++) {
    if (bookCheckboxes[i].checked) {
      var selectedBookId = bookCheckboxes[i].getAttribute('data-book-id')
      addBookToShelf(selectedBookId);

    } else {
      uncheckedBoxes++
    }
  }
  if (uncheckedBoxes === bookCheckboxes.length) {
    alert('Please select a book, or close the window.')
    uncheckedBoxes = 0;
  }
});





// enable draggable/sortable feaure on "book-cover" class

$('.drag-target').sortable({
  connectWith: $('.drag-target'),
});