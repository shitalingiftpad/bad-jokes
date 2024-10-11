export default class UI {
    constructor() {
        this.jokeDisplay = document.getElementById('jokeDisplay');
        this.jokeList = document.getElementById('jokeList');
        this.addJokeButton = document.getElementById('addJokeButton');
        this.messageDisplay = document.getElementById('messageDisplay');
        this.editModal = document.getElementById('editModal');
        this.editJokeInput = document.getElementById('editJokeInput');
        this.saveEditButton = document.getElementById('saveEditButton');
        this.closeModalButton = document.getElementById('closeModalButton');

        this.closeModalButton.addEventListener('click', () => this.closeEditModal());
    }

    showMessage(message, type = 'success') {
        this.messageDisplay.textContent = message;
        this.messageDisplay.className = type === 'success' ? 'message-success' : 'message-error';
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

            jokeItem.append(jokeText, editIcon, deleteIcon);
            this.jokeList.appendChild(jokeItem);
        });
    }

    showEditModal(jokeText) {
        this.editJokeInput.value = jokeText;
        this.editModal.style.display = 'flex';
    }

    closeEditModal() {
        this.editModal.style.display = 'none';
    }

    getNewJokeInput() {
        return document.getElementById('newJoke').value.trim();
    }

    clearNewJokeInput() {
        document.getElementById('newJoke').value = '';
    }

    getEditJokeInput() {
        return this.editJokeInput.value.trim();
    }

    onEditSave(callback) {
        this.saveEditButton.addEventListener('click', callback);
    }
}
