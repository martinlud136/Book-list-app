// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}
// UI Class: Handle UI Tasks
class UI{
    static displayBooks(){

        const books = Store.getBooks()
        console.log(books)
        books.forEach((book) => addBooksToList(book));
        
    }

    static addBooksToList(book){
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row);
    }
    static showAlert(message, className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}` // clasName = !!!!!!!
        div.appendChild(document.createTextNode(message))
        
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form); // insert befooooooreeeee befooooreee

        setTimeout(() => {
            document.querySelector('.alert').remove() // no te olvides de removeeeeer para que catzo haces la funcion!!!!
        }, 1000);

    }
    static clearFields(){

        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }
    static deleteBook(target){
        if(target.classList.contains('delete')){     // contains!!!!!!!contains!!!!!!!contains!!!!!!!
            target.parentElement.parentElement.remove();
        }
    }
}
// Store Class: Handles Storage
class Store {
    static getBooks(){
       let books; // inicio la variable book
       if(localStorage.getItem('books') === null){// verifico si no hay libros
        books = []; // luego se inicia un array vacio
       } else {
           console.log('paso')
           books = JSON.parse(localStorage.getItem('books')) // si hay libros so los asigna a la variable books
           
       }
       console.log(books)
      return books // devuelvo el array con books
      
    }
    static addBook(book){    // lleva el parametro book no te olvides
       let books = Store.getBooks();
        books.push(JSON.stringify(book))
        localStorage.setItem('books',books)
    }
    static removeBook(isbn){ // lleva la identificacion del libro no te olvides
        books = Store.getBooks()

        books.forEach((book, index))  //se busca adentro!! se loopea!!! sino como se va a encontrar
           if(book.isbn === isbn){      //no se como pero esta disponible el index en el segundo parametro
            books.splice(index, 1)     //tenemos disponible el index, y le decimos que solo saque uno.
           } 
        localStorage.setItem('books', JSON.stringify(books))                            
    }
}
// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks())
// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault()
    //Get form values
    const  title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
    //validacion
    if(title === ''|| author === '' || isbn === ''){
        UI.showAlert('please fill all the fields', 'danger')
    }else{
        //create a book
        const book = new Book(title,author,isbn)
        // add book to UI
        UI.addBooksToList(book)
        //se agrego exitosamente
        UI.showAlert('se agrego exitosamente', 'success')

        //agregar libros al localStorage
        Store.addBook(book)
        // Clear fields
        UI.clearFields()

    }
    
    
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e)=>{
    UI.deleteBook(e.target)
    // remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    //se elimino exitosamente
    UI.showAlert('se eliminó exitosamente', 'success')
})




//1 Crear la clase Book
//2 Crear la clase UI
    // Crear el metodo displayBooks()
    // harcodear listado de books
    // displayBooks() llama a addBookToList()
// Se continua con el evento Add a book
    // se crea el metodo clearFields
// Se continua con remove a book
    //se llama en el evento a UI.deleteBook()
// Se realiza la validación de que los campos esten completos
// se realiza el alert en la UI.swowAlert
    //se realiza setTimeout para evitar que este todo el tiempo el alert
// se crea el mensaje de que se agrego un libro exitosamente
// se crea el mensaje de que se elimino un libro exitosamente

                //hasta aca se hizo todo lo que se hace un UI
// se crea la clase Store
