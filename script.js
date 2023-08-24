let bookCounter = 0;
const booksContainer = document.querySelector('.books-container');
const addBook = document.getElementById('add-book');
const addBookDialog = document.querySelector('.add-book');
const cancel = document.getElementById('cancel');
const addForm = document.querySelector('.add-book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pageCount = document.getElementById('page-count');
const pageCompleted = document.getElementById('page-complete');
const myLibrary = [];

class Book{
    constructor(name, author, pages, read=0){
        this.id = bookCounter++;
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    getPercentageRead(){
        return Math.round(this.read*100/this.pages);
    }
}

function findBookById(library, id){
    return library.findIndex(book => book.id === parseInt(id));
}

function addBookToLibrary(book){
    myLibrary.push(book);
}


function submitEvent(e){
    e.preventDefault();
    if(addForm.checkValidity()){
        let myBook = new Book(title.value, author.value, pageCount.value, pageCompleted.value);
        addBookToLibrary(myBook);
        updateDisplay(myLibrary)
        addForm.reset();
        addBookDialog.close()
    }
}

function closeEvent(e){
    addForm.reset(); 
    addBookDialog.close();
}


function deleteEvent(e){
    const indexToDelete = findBookById(myLibrary,Array.from(e.target.classList)[1] );
    myLibrary.splice(indexToDelete, 1);
    updateDisplay(myLibrary);
}

function readEvent(e){
    const indexToRead = findBookById(myLibrary,Array.from(e.target.classList)[1] );
    myLibrary[indexToRead].read= myLibrary[indexToRead].pages;
    updateDisplay(myLibrary);
}

function placeDialog(){
    addBookDialog.showModal()
    const dialogWidth = addBookDialog.offsetWidth;
    const dialogHeight = addBookDialog.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const leftPosition = viewportWidth / 2 - dialogWidth / 2;
    const topPosition = viewportHeight / 2 - dialogHeight / 2;
    addBookDialog.style.left = `${leftPosition}px`;
    addBookDialog.style.top = `${topPosition}px`;
}

addBook.addEventListener('click', placeDialog);
cancel.addEventListener('click', closeEvent);
addForm.addEventListener('submit', submitEvent);

let editDelete=0;
let editRead=0;

function updateDisplay(myLibrary){
    booksContainer.textContent='';
    for(let book of myLibrary){
        const card = document.createElement('card');
        const name = document.createElement('p');
        const author = document.createElement('p');
        const read = document.createElement('p');
        const edit = document.createElement('p');
        const deleteButton = document.createElement('img');
        const readButton = document.createElement('img');
        deleteButton.src='./images/delete.svg';
        deleteButton.classList.add('edit-delete');
        readButton.classList.add('edit-read');
        readButton.classList.add(book.id);
        deleteButton.classList.add(book.id);
        readButton.src='./images/done.svg';
        edit.appendChild(deleteButton);
        edit.appendChild(readButton);
        edit.classList.add('card-edit');
        name.textContent = book.name;
        name.classList.add('title');
        author.textContent = book.author;
        author.classList.add('author');
        read.classList.add('read');
        author.textContent = book.author;
        if(book.getPercentageRead()>=100){
            read.textContent = 'Finished';
        }else{
            read.textContent = `${Math.round(book.read*100/book.pages)}% Finished`;
        }
        card.appendChild(name);
        card.appendChild(author);
        card.appendChild(read);
        card.appendChild(edit);
        card.classList.add('book');
        booksContainer.appendChild(card);
    }
    editDelete = Array.from(document.querySelectorAll('.edit-delete'));
    editRead = Array.from(document.querySelectorAll('.edit-read'));
    editDelete.forEach((edit) => {edit.addEventListener('click', deleteEvent)});
    editRead.forEach((edit) => {edit.addEventListener('click', readEvent)});
}


