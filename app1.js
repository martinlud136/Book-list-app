// Book Class: Represents a Book / cada vez que creamos un libro se hace a travez de este objeto
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn; 
    }
}

// UI Class: Handle UI Tasks / display, agregar, quitar

class UI {
    static displayBooks(){

        // const StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'Jon Doe',
        //         isbn: '323242'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Jane Doe',
        //         isbn: '7836483'
        //     }
        // ];
        
        const books = Store.getBooks();
        
        books.forEach((book)=>{
            UI.addBookToList(book) // es UI  porque sigue llamando a una funcion que pertenece a la clase Book
        })
    }
    static addBookToList(book){
        const list = document.getElementById('book-list')
        
            const row = document.createElement('tr');
        
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href=# class="btn btn-danger btn-sm delete">X</a></td>
            `
            list.appendChild(row)
        
    }

    static deleteBook(target){
        if(target.classList.contains('delete')){
           target.parentElement.parentElement.remove()
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form) //inserto el div antes del formulario

        //desaparece en tres segundos
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000);
    }

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Store Class: Handles Storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books')=== null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        console.log(books)
        books.forEach((book, indexas)=>{
            console.log(indexas)
            if(book.isbn === isbn){
                books.splice(indexas, 1);
            }
        });

        localStorage.setItem('books',JSON.stringify(books));
    }
}
// Event: Display Books / el evento está separado de la fución porque sino no se dispara la funcion
document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Event: Add a Book / en UI y localStorage
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault();

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    //validacion
    if(title === ''|| author === '' || isbn === ''){
        UI.showAlert('Please fill in all fields', 'danger')
    } else{
        //iniciacion de un libro
        const book = new Book(title, author, isbn)
        //añadir libro a UI    
        UI.addBookToList(book);

        //añadir libro a localstorage
        Store.addBook(book);
        //mensaje de exito
        UI.showAlert('libro agregado exitosamente', 'success')
        //limpiar campos
        UI.clearFields();
    }
    

})


// Event: Remove a Book / en UI y localStorage

document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target);

    //remove book from store

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //mensaje de eliminado con exito
    UI.showAlert('libro quitado exitosamente', 'success')
    console.log(e.target.classList.contains('delete'))
})


