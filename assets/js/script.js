var addBookBtn = document.querySelector('.add-book-btn');

var btnEl = document.getElementById('add-book');
// bookChoices is the container for all book choices
var bookChoices = document.querySelector('.book-choices');
// create unique identifier for each book based on key from api in /works/o235325l format
var trimKey = function (key) {
  var splitKey = key.split('/');
  var trimmedKey = splitKey[2];
  return trimmedKey;
};

var buildBookButtons = function (key, shelf) {
  console.log('am I here', key, shelf )
  var buttonDivEl = document.createElement('div')
  
  var buildToReadButtonEl = document.createElement('button')
  buildToReadButtonEl.innerText = "to Read"
  buildToReadButtonEl.setAttribute('data-bookId', key)
  buildToReadButtonEl.setAttribute('class', 'to-read')

  var buildReadingButtonEl = document.createElement('button')
  buildReadingButtonEl.innerText = "Reading"
  buildReadingButtonEl.setAttribute('data-bookId', key)
  buildReadingButtonEl.setAttribute('class', 'reading')

  var buildReadButtonEl = document.createElement('button')
  buildReadButtonEl.innerText = "Read"
  buildReadButtonEl.setAttribute('data-bookId', key)
  buildReadButtonEl.setAttribute('class', 'read')

  if(shelf !== 'to-read'){
    buttonDivEl.appendChild(buildToReadButtonEl)
  }
  if(shelf !== 'reading'){
    buttonDivEl.appendChild(buildReadingButtonEl)
  }
  if(shelf !== 'read'){
    buttonDivEl.appendChild(buildReadButtonEl)
  }
  return buttonDivEl
}

// when we click read, reading, to read, we need to get the corresponding ID
$(document).click(function (event) {

  var localStorageBooks = JSON.parse(localStorage.getItem("booksForShelf"))

  // console.log(event)
  var clickedBookButtonId = event.target.dataset.bookid
  var clickedButtonClassName = event.target.className
  console.log(clickedBookButtonId, clickedButtonClassName)
  var selectedBook = localStorageBooks.find(function (book) {
    if (clickedBookButtonId === book.key) {
      return book
    }
  })

  var filteredBookArray = localStorageBooks.filter(function (book) {
    if (book.key != selectedBook.key)
      return book
  })
  if (clickedButtonClassName === 'read') {
    selectedBook.shelf = 'read'
  }
  if (clickedButtonClassName === 'to-read') {
    console.log('toRead')
    selectedBook.shelf = 'to-read'
  }
  if (clickedButtonClassName === 'reading') {
    selectedBook.shelf = 'reading'
  }

  filteredBookArray.push(selectedBook)
  localStorage.setItem('booksForShelf', JSON.stringify(filteredBookArray))
  window.location.reload()
})


var definitionBtn = document.querySelector('.definition-btn');


// Build books from local storage to display on the page
var loadBooksFromLocalStorage = function () {
  var localStorageBooks = JSON.parse(localStorage.getItem("booksForShelf"))
  console.log(localStorageBooks)

  // tie existing shelves to javascript
  var bookshelfRow = document.querySelector('.bookshelf-row');
  var bookshelfToRead = document.querySelector('.to-read-col');
  var bookshelfReading = document.querySelector('.reading-col');
  var bookshelfRead = document.querySelector('.read-col');

  // bookshelfRow.classList.add('drag-target');




  for (let i = 0; i < localStorageBooks.length; i++) {
    console.log(localStorageBooks[i])




    var bookCover = localStorageBooks[i].coverId;

    var bookDisplayContainer = document.createElement('div');
    bookDisplayContainer.classList.add('book-display', 'text-center', 'p-2');
    bookDisplayContainer.setAttribute('data-bookId', localStorageBooks[i].key)
    var imageAnchor = document.createElement('a');
    imageAnchor.setAttribute('href', '');
    imageAnchor.classList.add('book-cover');
    var imgEl = document.createElement('img');
    imgEl.setAttribute(
      'src',
      `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`
    );

    var bookTitle = document.createElement('h6');
    bookTitle.innerText = localStorageBooks[i].title;
    bookTitle.classList.add('book-item');

    bookshelfRow.appendChild(bookDisplayContainer);
    bookDisplayContainer.appendChild(imageAnchor);
    imageAnchor.appendChild(imgEl);
    bookDisplayContainer.appendChild(bookTitle);
    bookDisplayContainer.appendChild(buildBookButtons(localStorageBooks[i].key, localStorageBooks[i].shelf))

    if (localStorageBooks[i].shelf === 'read') {
      bookshelfRead.appendChild(bookDisplayContainer)
    }
    if (localStorageBooks[i].shelf === 'to-read') {
      bookshelfToRead.appendChild(bookDisplayContainer)
    }
    if (localStorageBooks[i].shelf === 'reading') {
      bookshelfReading.appendChild(bookDisplayContainer)
    }

  }
}
//);
// var addBookToShelf = function (key) {
// bookItems.find(function (book) {
//   if (book.key === selectedBookId) {
//     var bookCover = book.coverId;
//     // push items to array (on local storage)
//     var bookshelfRow = document.querySelector('.bookshelf-row');
//     bookshelfRow.classList.add('drag-target');
//     var bookDisplayContainer = document.createElement('div');
//     bookDisplayContainer.classList.add('book-display', 'text-center', 'p-2');
//     var imageAnchor = document.createElement('a');
//     imageAnchor.setAttribute('href', '');
//     imageAnchor.classList.add('book-cover');
//     var imgEl = document.createElement('img');
//     imgEl.setAttribute(
//       'src',
//       `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`
//     );
//  }
// })
// }}
// }
// on page load, communicate with the local storage to determine if there are any books
// if there are books they need to be pulled in to the page
// run a for loop to go through the array of "booksForShelf" build the html elements for each book
// and place each on the shelf they belong 
// this should require conditional statements  (if shelf === read, build on read)
// see if shelves are changing as items are dragged and dropped, if not, update jquery to make sure they update so they pull in to the correct shelf.


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
  checkbox.setAttribute('id', trimKey(key));
  checkbox.setAttribute('class', 'checkbox');
  checkbox.setAttribute('data-book-id', trimKey(key));
  checkbox.classList.add('mr-3', 'my-auto');
  return checkbox;
};
var buildCheckBoxLabel = function (key, criteria) {
  // label
  var checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', trimKey(key));
  checkboxLabel.setAttribute('id', 'search-results');
  checkboxLabel.classList.add('book-info');
  checkboxLabel.textContent = criteria;
  checkboxLabel.setAttribute('data-book-id', trimKey(key));
  return checkboxLabel;
};

// array for book items
var bookItems = [];
var toReadBooks = [];
// array for dictionary
var dictionary = [];

// Book Search functionality
formEl = document.querySelector('#search-box');

// store input value as a variable
var getInputValue = function () {
  bookItems = [];
  var inputVal = document.getElementById('book-title').value;
  // remove spaces from inputVal
  var urlReadyValue = encodeURIComponent(inputVal);
  // console.log(urlReadyValue);

  // Add searched term variable into url to pull up results
  var apiSearchUrl =
    'http://openlibrary.org/search.json?q=' +
    urlReadyValue +
    '&fields=title,author_name,key,cover_i,number_of_pages_median,&limit=10';

  fetch(apiSearchUrl).then(function (response) {
    if (response.ok) {
      // I don't see the line of code below doing anything, can we remove?
      bookChoices.innerHTML = '';
      response.json().then(function (data) {
        var pageCoverId = data.docs[0].cover_i;
        // console.log('pageCoverId', pageCoverId);
        // imgEl.innerHTML = 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg'

        var searchResults = data.docs;

        searchResults.forEach(function (result) {
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
          console.log(bookItems);

          // Covers API for cover images, link to Search API using cover_i
          // display book cover
          // var bookCover = imgEl.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + pageCoverId + '-M.jpg')
          // return bookCover;
        });
      });
    }
  });
};

// create a function that is tied to the add item on the modal, this function will save the book object that is radio selected to a saved books array
var saveBookToLocalStorage = function (book) {
  // when radio button is set up, parameter book will be fed in from radio
  book.shelf = "to-read"
  // capture books existing in localStorage with gitItem
  // JSON.parse is usually used with getItem to make the information readable by JS
  var existingBooksOnLocalStorage = JSON.parse(localStorage.getItem('booksForShelf'))
  // create if (if booksForShelf is empty, create the array)
  if (Array.isArray(existingBooksOnLocalStorage) === false) {
    console.log('there are no books in the array')
    var newArrayForBooksOnLocalStorage = []
    // push selected book into the array
    newArrayForBooksOnLocalStorage.push(book)
    localStorage.setItem('booksForShelf', JSON.stringify(newArrayForBooksOnLocalStorage))
    console.log('new array result', JSON.stringify(newArrayForBooksOnLocalStorage))
  } else {
    existingBooksOnLocalStorage.push(book)
    localStorage.setItem('booksForShelf', JSON.stringify(existingBooksOnLocalStorage))
    console.log('existing array result', JSON.stringify(existingBooksOnLocalStorage))
  }


  console.log(existingBooksOnLocalStorage)
}



// btnEl.onclick = saveBookToShelf

// function will build html elements and display book on to-read shelf / stored in local storage
// book item object, add key value pair in object for shelf (to-read, reading, read)
//}

// var showSearchResults = function() {
// var searchResults = []
// searchResults.push({})
// }

var addBookToShelf = function (selectedBookId) {
  bookItems.find(function (book) {
    if (book.key === selectedBookId) {
      var bookCover = book.coverId;
      book.shelf = 'to-read'
      saveBookToLocalStorage(book)
      // push items to array (on local storage)
      var bookshelfRow = document.querySelector('.bookshelf-row');
      // bookshelfRow.classList.add('drag-target');
      var bookDisplayContainer = document.createElement('div');
<<<<<<< HEAD
      bookDisplayContainer.classList.add('book-display', 'text-center', 'p-2');
      bookDisplayContainer.setAttribute('data-bookId', book.key)
=======
      bookDisplayContainer.classList.add('book-display', 'col', 'text-center');
>>>>>>> develop
      var imageAnchor = document.createElement('a');
      imageAnchor.setAttribute('href', '');
      imageAnchor.classList.add('book-cover');
      var imgEl = document.createElement('img');
      imgEl.setAttribute(
        'src',
        `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`
      );
      // book-cover ui-sortable-handle

      // imgEl.innerHTML = `https://covers.openlibrary.org/b/id/${bookCover}-M.jpg`;
      var bookTitle = document.createElement('h6');
      bookTitle.innerText = book.title;
      bookTitle.classList.add('book-item');

      bookshelfRow.appendChild(bookDisplayContainer);
      bookDisplayContainer.appendChild(imageAnchor);
      imageAnchor.appendChild(imgEl);
      bookDisplayContainer.appendChild(bookTitle);

      bookDisplayContainer.appendChild(buildBookButtons(book.key, book.shelf));
      window.location.reload()
    }
  });
};

function getWordDefinitionInput() {
  return document.getElementById('definition').value;
}

var dictionaryDefinition = function (userWordInput) {
  // dictionary.push(userWordInput);

  // Add searched term variable into url to pull up results
  var apiWordUrl = `https://api.datamuse.com/words?sp=${userWordInput}&md=d&max=4`;

  if (!userWordInput) {
    alert('Please enter a valid word');
  }
  try {
    fetch(apiWordUrl)
      .then((response) => response.json())
      .then((data) => {
        populateWordDefinition(data);
      });
  } catch (error) { }
};

function populateWordDefinition(word) {
  var i = 0;
  var definitions = word[i].defs;
  // header for word to be inserted in
  var wordToDefine = document.querySelector('.word-definition ');
  wordToDefine.innerText = word[i].word;
  // container for the definition
  var definitionContainer = document.querySelector('.definition-text');
  var definitionList = document.createElement('ol');

  for (i = 0; i < definitions.length; i++) {
    var definitionEl = document.createElement('li');
    definitionEl.classList.add('word-definitions');
    definitionEl.innerHTML = definitions[i];
    definitionList.appendChild(definitionEl);
    definitionContainer.appendChild(definitionList);
  }
}
//   fetch(apiWordUrl).then(function (response) {
//     if (response.ok) {
//       // bookChoices.innerHTML = '';
//       response.json().then(function (data) {
//         console.log(data);
//         // returning the word in the API
//         var wordSearched = data[0].word;
//         console.log('word searched: ', wordSearched);
//         // returning the definition of the word
//         var wordDefinition = data[0].defs;
//         console.log('definition', wordDefinition);
//       });
//     }
//   });
// };

addBookBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var uncheckedBoxes = 0;
  console.log(uncheckedBoxes);
  var bookCheckboxes = document.getElementsByClassName('checkbox');

  for (let i = 0; i < bookCheckboxes.length; i++) {
    console.log(bookCheckboxes[i].checked);
    if (bookCheckboxes[i].checked) {
      var selectedBookId = bookCheckboxes[i].getAttribute('data-book-id');
      addBookToShelf(selectedBookId);
    } else {
      uncheckedBoxes++;
    }
  }
  if (uncheckedBoxes === bookCheckboxes.length) {
    alert('Please select a book, or close the window.');
    uncheckedBoxes = 0;
  }
});

// Why does submit not work for me here?
definitionBtn.addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.definition-text').innerHTML = '';
  dictionaryDefinition(getWordDefinitionInput());
});
// dictionaryDefinition();

// enable draggable/sortable feature on "book-cover" class

// $('.drag-target').sortable({
//   revert: true,
//   connectWith: $('.drag-target'),
//   scroll: false,
//   tolerance: 'pointer',
//   helper: 'clone',
//   activate: function (event) {
//     console.log('activate', event)
//     $(this).addClass('dropover');
//   },
//   deactivate: function (event) {
//     console.log(event.target.firstChild.getAttribute('data-bookId'))
//     $(event.target).removeClass('dropover');
//   },
//   over: function (event) {
//     console.log('over', event)
//     $(event.target).addClass('dropover-active');
//   },
//   out: function (event) {
//     console.log()
//     $(event.target).removeClass('dropover-active');
//   },
// });

window.onload = loadBooksFromLocalStorage