var addBookBtn = document.querySelector('.add-book-btn');
var inputVal = document.getElementById('book-title').value;
var imgEl = document.createElement('img');

// bookChoices is the container for all book choices
var bookChoices = document.querySelector('.book-choices');
// book choice is a p tag container for one book choice, this is what should be iterated in the loop
var bookChoice = document.createElement('p');
bookChoice.classList.add('book-choice');
// wrapper for the checkbox and book info
var checkboxWrapper = document.createElement('span');
checkboxWrapper.classList.add('checkbox-wrapper', 'd-flex');
// checkbox
var checkbox = document.createElement('input');
checkbox.setAttribute('type', 'checkbox');
checkbox.setAttribute('name', 'select-book');
checkbox.setAttribute('id', 'checkbox');
// label
var checkboxLabel = document.createElement('label');
checkboxLabel.setAttribute('for', 'checkbox');
checkboxLabel.setAttribute('id', 'search-results');
checkboxLabel.classList.add('book-info');

var bookIdCounter = 0;

// create unique identifier based on key from api in /works/o235325l format
var trimKey = function (key) {
  var splitKey = key.split('/');
  var trimmedKey = splitKey[2];
  return trimmedKey;
};

// array for book items
var bookItems = [];

trimKey('/works/o235325l');

// Free Dictionary API
fetch('https://api.dictionaryapi.dev/api/v2/entries/en/chameleon')
  .then((response) => response.json())
  .then((data) => console.log(data));

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

          bookInfoEl = criteria;
          checkboxLabel.innerText = bookInfoEl;
          // variables created above these are to add HTML elements for liEl to go into
          bookChoices.appendChild(bookChoice);
          bookChoice.appendChild(checkboxWrapper);
          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(checkboxLabel);
          checkboxLabel.innerHTML = bookInfoEl;

          // html list elements tied to search results

          var bookItem = {
            title: title,
            author: author,
            coverId: coverId,
            pages: pages,
            key: trimKey(key),
          };

          bookItems.push(bookItem);
          // console.log(bookItems);

          // console.log(trimKey(key));

          // console.log(title, author, coverId, pages, key);

          // display book cover
          // var bookCover = imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
          // return bookCover;
        });
      });
    }
  });
};
//}

// var showSearchResults = function() {
// var searchResults = []
// searchResults.push({})
// }

// Search API to find books - parse data for needed fields (determine what they are)

// Covers API for cover images, link to Search API using cover_i

// enable draggable/sortable feaure on "book-cover" class
$('.drag-target').sortable({
  connectWith: $('.drag-target'),
});

var bookSelectionHandler = function (e) {
  e.preventDefault();
  var bookSelected = document.querySelector("input[name='select-book']").checked;
  // check if input values are empty
  if(!bookSelected) {
    alert('checkbox is not selected');
    return false;
  }


}

bookChoices.addEventListener('change', function (e) {
  console.log('checkbox was changed', e);
  bookSelectionHandler();
});

var addBookToList = function () {
  var bookSelected = document.querySelector('name', 'select-book').value;
  if (bookSelected) {
    console.log('book selected');
  }
};

// addBookBtn.addEventListener('click', function (e) {
//   console.log('Add Book was clicked', e);
// });
