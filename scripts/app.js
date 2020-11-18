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
}
// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book

// Event: Remove a Book