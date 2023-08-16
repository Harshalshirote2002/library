const booksContainer = document.querySelector('.books-container');


const myLibrary = [];

function Book(name, author, pages, read=0){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const listOfBooks = [
new Book("The Merchant of Venice", "Shakespeare", 173, 173),
new Book("The Da Vinci Code", "Dan Brown", 689, 689),
new Book("Ice Station", "Matthew Reilly", 541, 541),
new Book("Angels and Demons", "Dan Brown", 768, 768),
new Book("The Stranger", "Albert Camus", 103, 103),
new Book("Crime and Punishment", "Fyodor Dostoyevsky", 703, 65),
new Book("The doomsday conspiracy", "Sidney Sheldon", 448, 448),
new Book("Gora", "Rabindranath Tagore", 469, 469)
];

function addBookToLibrary(book){
    myLibrary.push(book);
}

for(let book of listOfBooks){
    addBookToLibrary(book);
}

for(let book of myLibrary){
    const card = document.createElement('card');
    const name = document.createElement('p');
    const author = document.createElement('p');
    const read = document.createElement('p');
    name.textContent = book.name;
    name.classList.add('title');
    author.textContent = book.author;
    author.classList.add('author');
    read.classList.add('read');
    author.textContent = book.author;
    if((book.read/book.pages)==1){
        read.textContent = 'Finished';
    }else{
        read.textContent = `${Math.round(book.read*100/book.pages)}% finished`;
    }
    card.appendChild(name);
    card.appendChild(author);
    card.appendChild(read);
    card.classList.add('book');
    booksContainer.appendChild(card);
}
