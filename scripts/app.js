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
        // Dummy data
        // const StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'Author One',
        //         isbn: '3434434',
        //     },
        //     {
        //         title: 'Book Second',
        //         author: 'Author Second',
        //         isbn: '45545',
        //     },
        // ];
      const books = Store.getBooks();
      // We passing each book from local stored to method added book to list
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book){
      // Grab element with id = book-list
      const list = document.querySelector('#book-list');
  
      // Create a <tr> element in document 
      const row = document.createElement('tr');
  
      // Change the HTML content of <tr>
      row.innerHTML = `
        <td><img src='${book.link}'></td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td>${book.published}</td>
        <td>${book.rating}</td>
        <td>${book.price}</td>
        <td>${book.description}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
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
      
      // Sort each row
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

  
    static showAlert(msg, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(msg));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
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
  
    static removeBook(pages){
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.pages === pages){
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
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(title, author, pages, published, rating, price, desc, link);
  
      // Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e);
    // Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
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
