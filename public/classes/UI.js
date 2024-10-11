export default class UI {
    constructor() {
        this.jokeDisplay = document.getElementById('jokeDisplay');
        this.jokeList = document.getElementById('jokeList');
        this.messageDisplay = document.getElementById('messageDisplay');
    }

    showMessage(message) {
        this.messageDisplay.textContent = message;
        this.messageDisplay.style.display = 'block';
        setTimeout(() => {
            this.messageDisplay.style.display = 'none';
        }, 3000); 
    }

    displayRandomJoke(jokes) {
        if (jokes.length === 0) {
            this.jokeDisplay.textContent = "No jokes available! Add some bad jokes!";
            return;
        }

        const randomIndex = Math.floor(Math.random() * jokes.length);
        this.jokeDisplay.textContent = jokes[randomIndex];
        this.jokeDisplay.classList.add('show');
        setTimeout(() => this.jokeDisplay.classList.remove('show'), 1000);
    }

    displayJokeList(jokes, deleteCallback, editCallback) {
        this.jokeList.innerHTML = '';
        jokes.forEach((joke, index) => {
            const jokeItem = document.createElement('div');
            jokeItem.classList.add('joke-item');

            const jokeText = document.createElement('span');
            jokeText.textContent = joke;

            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit', 'edit-icon');
            editIcon.title = 'Edit';
            editIcon.addEventListener('click', () => editCallback(index));

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon');
            deleteIcon.title = 'Delete';
            deleteIcon.addEventListener('click', () => deleteCallback(index));

            jokeItem.appendChild(jokeText);
            jokeItem.appendChild(editIcon);
            jokeItem.appendChild(deleteIcon);
            this.jokeList.appendChild(jokeItem);
        });
    }
}
