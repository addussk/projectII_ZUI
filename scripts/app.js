var msg_location = { msg_loc_add_form:0, msg_loc_sort:1 };

// Book Class: Represents a Book
class Book {
  constructor(title, author, pages, published, rating, price, desc, link) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.published = published;
    this.rating = rating;
    this.price = price;
    this.description = desc;
    this.link = link;
  }
}

// UI Class: Handle UI Tasks
class UI {
  // Method resposible for display list of books
  static displayBooks(){
    // predefined list
    const PredefinedList = [
      {
        title: 'Book One',
        author: 'Author One',
        pages: '100',
        published: '1990',
        rating: '5',
        price: '30',
        description: 'None',
        link: 'https://www.gravatar.com/avatar/69cf2e00c81bc89731652db2b9ca1dbf?s=32&d=identicon&r=PG&f=1',
      },
      {
        title: 'Book Two',
        author: 'Author Two',
        pages: '300',
        published: '1992',
        rating: '6',
        price: '32',
        description: 'None',
        link: 'https://www.gravatar.com/avatar/69cf2e00c81bc89731652db2b9ca1dbf?s=32&d=identicon&r=PG&f=1',
      },
      {
        title: 'Book Three',
        author: 'Author Three',
        pages: '400',
        published: '1995',
        rating: '1',
        price: '111',
        description: 'None',
        link: 'https://www.gravatar.com/avatar/69cf2e00c81bc89731652db2b9ca1dbf?s=32&d=identicon&r=PG&f=1',
      },
      {
        title: 'Book Four',
        author: 'Author Four',
        pages: '660',
        published: '2020',
        rating: '4',
        price: '32',
        description: 'None',
        link: 'https://www.gravatar.com/avatar/69cf2e00c81bc89731652db2b9ca1dbf?s=32&d=identicon&r=PG&f=1',
      },

    ];

    const books = Store.getBooks();
    const suma = PredefinedList.concat(books);

    // We passing each book from local stored to method added book to list
    suma.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book){
    // Grab element with id = book-list
    const list = document.querySelector('#book-list');

    // Create a <tr> element in document 
    const row = document.createElement('tr');

    // Change the HTML content of <tr>
    row.innerHTML = `
      <td><img src='${book.link}'></td>
      <td class="text-center">${book.title}</td>
      <td class="text-center">${book.author}</td>
      <td class="text-center">${book.pages}</td>
      <td class="text-center">${book.published}</td>
      <td class="text-center">${book.rating}</td>
      <td class="text-center">${book.price}</td>
      <td class="text-center">${book.description}</td>
      <td class="text-center"><span class="table-remove"><button type="button"
      class="btn btn-danger btn-rounded btn-sm my-0 remove">Remove</button></span></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('remove')) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  /**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort 
 * @param {number} column The index of the column to sort 
 * @param {boolean} asc  Determines if the sorting will be in ascending
*/
  static sortTableByColumn(table, column, asc = true){
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));
    // console.log(rows);
    
    /** Sort each row
     * The trim() method removes whitespace from both ends of a string. 
     * 
     */
    const sortedRows = rows.sort((a,b) => {
      const aColText = a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
      const bColText = b.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();

      return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier)
    });

    // console.log(sortedRows)
    // Remove all existing TRs from the table
    while(tBody.firstChild){
      tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly 
  tBody.append(...sortedRows);

  // Remember how the column is currently sorted
  table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
  table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

  static filtrTableByColumn(column, lborder, hborder) {
    var  filterLow, filterHigh, table, tBody, tr, td, i, tdValue;

    filterLow = lborder;
    filterHigh = hborder;
    table = document.querySelector("table");
    tBody = table.tBodies[0];
    tr = tBody.querySelectorAll("tr");
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[column];

      if (td) {
        tdValue = td.textContent;
        console.log(tdValue);
        if (tdValue >= filterLow && tdValue <= filterHigh ) {
          tr[i].style.display = "";

        } else {
          console.log('else');
          tr[i].style.display = "none";
        }
      }       
    }
  }

  static showAlert(msg, className, place) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.style.width = "350px";
    div.style.height = "60px";
    div.style.marginLeft = "auto";
    div.style.marginRight = "auto";
    div.style.fontSize = '20px';
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    
    if(place === msg_location['msg_loc_add_form']){
      const form = document.querySelector('#formLay');
      container.insertBefore(div, form);

    } else if (place === msg_location['msg_loc_sort']){
      const form = document.querySelector('.table');
      container.insertBefore(div, form);
    } else {
      // Invalid location
    }

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 4000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#published').value = '';
    document.querySelector('#rating').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('#description').value = '';
    document.querySelector('#link').value = '';
  }
}

// Store Class: Handles Storage
class Store{
    // Class methods
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        // if no books in storage
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title, author){
    const books = Store.getBooks();
    
    books.forEach((book, index) => {
      if( book.title === title && book.author === author ){
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const published = document.querySelector('#published').value;
  const rating = document.querySelector('#rating').value;
  const price = document.querySelector('#price').value;
  const desc = document.querySelector('#description').value;
  const link = document.querySelector('#link').value;

  // Validate
  if(title === '' || author === '' || pages === '' || published === '' || rating === '' || price === '' || desc === '' || link === ''){
    UI.showAlert('Please fill in all fields', 'danger', msg_location['msg_loc_add_form']);
  } else {
    // Instatiate book
    const book = new Book(title, author, pages, published, rating, price, desc, link);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success', msg_location['msg_loc_add_form']);

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {

  if( e.target.textContent === 'Remove'){
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    var temp_title = e.target.parentElement.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.textContent;
    var temp_author = e.target.parentElement.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
    Store.removeBook( temp_title, temp_author );

    // Show success message
    UI.showAlert('Book Removed', 'success', msg_location['msg_loc_sort']);
  }
});

// Event: Sort a List
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
  headerCell.addEventListener("click", () => {
      const tableElement = headerCell.parentElement.parentElement.parentElement;
      const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
      const currentIsAscending = headerCell.classList.contains("th-sort-asc");

      UI.sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

// Event: Filter a List
document.querySelector('.dropdown').addEventListener('click', (e) => {

  if( null != e.target.id && 'dropdownMenu' != e.target.id){
    // console.log(e.target.id);
    const lowerBorder = document.querySelector('#lowerBorder').value;
    const upBorder = document.querySelector('#upBorder').value;
    
    if(lowerBorder && upBorder ){
      // Both fields are filled up
      
      // Clear fields
      UI.clearFields();
      
      if( lowerBorder < upBorder){
        
        switch(e.target.id){
          case 'filtrPages':
            UI.filtrTableByColumn(3, lowerBorder, upBorder);
            break;
          case 'filtrPublished':
            UI.filtrTableByColumn(4, lowerBorder, upBorder);
            break;
          case 'filtrPrice':
            UI.filtrTableByColumn(6, lowerBorder, upBorder);
            break;
          case 'filtrRating':
            UI.filtrTableByColumn(5, lowerBorder, upBorder);
            break;
        }
        
      } else{
        //  Upper border has to be bigger than lower
        UI.showAlert('Upper border has to be bigger than lower', 'danger');
      }
    } else {
      // Form cannot be empty!
      UI.showAlert('Please fill boths border', 'danger');
    }
  } else {
    // Invalid parameter
  }
});

