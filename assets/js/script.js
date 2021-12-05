var addBookBtn = document.querySelector('.add-book-btn');
var inputVal = document.getElementById('book-title').value;
var imgEl = document.createElement('img');

// bookChoices is the container for all book choices
var bookChoices = document.querySelector('.book-choices');

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
var buildCheckBox = function () {
  // checkbox
  var checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('name', 'select-book');
  checkbox.setAttribute('id', 'checkbox');
  return checkbox;
};
var buildCheckBoxLabel = function () {
  // label
  var checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.setAttribute('id', 'search-results');
  checkboxLabel.classList.add('book-info');
  return checkboxLabel;
};

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
          var checkbox = buildCheckBox();
          var checkboxLabel = buildCheckBoxLabel();

          // variables created above these are to add HTML elements for book criteria to go into
          bookChoices.appendChild(bookChoice);
          bookChoice.appendChild(checkboxWrapper);
          checkboxWrapper.appendChild(checkbox);
          checkboxWrapper.appendChild(checkboxLabel);
          // checkboxWrapper.appendChild(bookInfoEl);
          checkboxLabel.textContent = criteria;
          checkboxLabel.setAttribute('data-book-id', coverId);

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

var addBookToList = function () {};

addBookBtn.addEventListener('click', function (e) {
  console.log('Add Book was clicked', e);
  var bookSelected = document.querySelector(
    "input[name='select-book']"
  ).checked;
  // check if input values are empty
  if (bookSelected) {
    console.log('checkbox checked when add btn clicked');
    // addBookToList();
  } else {
    alert('Please select a book to add or close window');
  }
});
