const input = document.querySelector('#favchap');
const button = document.querySelector('button'); 
const list = document.querySelector('#list');

button.addEventListener('click', function() { 
    if (input.value !== '') {
        const listItem = document.createElement('li');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        listItem.textContent = input.value;
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
        deleteButton.addEventListener('click', function() {
            list.removeChild(listItem);
        });
        input.focus();
        input.value = '';
    } else {
        alert('Please enter a book and chapter.');
        input.focus();
    }
});
