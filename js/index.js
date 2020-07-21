const booksURL = 'http://localhost:3000/books';

document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});

function getBooks(){
    fetch(booksURL)
    .then(response => response.json())
    .then(json => {
        for(const book of json){
            createBook(book)
        }
    })
};

function createBook(book){
    const list = document.getElementById('list');
    const li = document.createElement('li');

    li.innerText = book.title;

    li.addEventListener('click', () => {
        fillShowPanel(book);
    });

    list.appendChild(li)
};

function fillShowPanel(book){
    const showPanel = document.getElementById('show-panel');

    showPanel.innerHTML = `
        <img src="${book['img_url']}" alt="${book.title}" width="150" height="200">
        <h1>${book.title}</h1>
        <h2>${book.subtitle}</h2>
        <h3>${book.author}</h3>
        </br>
        <p>${book.description}</p>
        <ul id="${book.id}"></ul>
        <button name="like">Like</button>
    `

    const button = showPanel.getElementsByTagName('button')[0];

    button.addEventListener('click', () => {
        patchBook(book)
    });

    createList(book.id, book)
};

function createList(listId, book){
    const ul = document.getElementById(listId);
    for (const user of book["users"]){
        const li = document.createElement('li');
        li.innerText = user.username;
        ul.appendChild(li);
    };
};

function patchBook(book){
    const user = {"id":1, "username":"pouros"};
    book.users.push(user);
    
    console.log(book.users)

    fetch(`${booksURL}/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(json => getBook(json))
};

function getBook(book){
    fetch(`${booksURL}/${book.id}`)
    .then(response => response.json())
    .then(json => fillShowPanel(json))
};
