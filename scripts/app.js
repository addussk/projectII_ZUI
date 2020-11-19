// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
}

// UI Class: Handle UI Taska
class UI {
    // Method resposible for display list of books
    static displayBooks(){
        const StoredBooks = [
            {
                title: 'Book One',
                author: 'Author One',
                isbn: '3434434',
            },
            {
                title: 'Book Second',
                author: 'Author Second',
                isbn: '45545',
            },
        ];
        const books = StoredBooks;
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
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
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
        document.querySelector('#isbn').value = '';
    }
}
// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actial submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // Validate
    if(title === '' || author === '' || isbn === '')
    {
        UI.showAlert("Please fill in all fields", 'danger');
    }else{
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add book to list
        UI.addBookToList(book);

        // Show success message
        UI.showAlert('Book Added', 'success');

        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target)
    
    UI.deleteBook(e.target);

    // Show success message
    UI.showAlert('Book Removed', 'success');
});
