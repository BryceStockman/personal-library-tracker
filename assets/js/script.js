var addBookBtn = document.querySelector('.add-book-btn');
var inputVal = document.getElementById('book-title').value;
var imgEl = document.createElement('img');
var btnEl = document.getElementById('add-book')

// bookChoices is the container for all book choices
var bookChoices = document.querySelector('.book-choices');

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
var bookItems = [];
var toReadBooks = [];

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
        // WHERE IS THIS ELEMENT BEING CREATED?
        var imgEl = document.getElementById('bookImg');
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

          bookItems.push(bookItem);
        
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

var addBookToShelf = function (selectedBookId) {
  bookItems.find(function(book){ 
    if(book.key === selectedBookId){
      console.log(book)
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