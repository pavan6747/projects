// public/app.js
document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const titleInput = document.getElementById('title-input');
    const completedInput = document.getElementById('completed-input');
    const todoList = document.getElementById('todo-list');

    const createTodoElement = (todo) => {
        const li = document.createElement('li');

        const form = document.createElement('form');

        const titleField = document.createElement('input');
        titleField.type = 'text';
        titleField.value = todo.title;
        titleField.setAttribute('data-id', todo._id);

        const completedField = document.createElement('input');
        completedField.type = 'checkbox';
        completedField.checked = todo.completed;
        completedField.setAttribute('data-id', todo._id);

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.type = 'submit';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTodo(todo._id));

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';

        form.appendChild(titleField);
        form.appendChild(completedField);
        form.appendChild(updateButton);
        form.appendChild(deleteButton);
        form.appendChild(cancelButton);

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const updatedTitle = titleField.value;
            const updatedCompleted = completedField.checked;
            updateTodo(todo._id, updatedTitle, updatedCompleted);
        });

        cancelButton.addEventListener('click', () => {
            renderTodos(); // Simply re-render todos to revert to the previous state
        });

        li.appendChild(form);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => showEditForm(form));

        

        return li;
    };

    const showEditForm = (form) => {
        // Hide all other edit forms before showing the selected one
        const allForms = document.querySelectorAll('form');
        allForms.forEach(f => {
            if (f !== form) {
                f.style.display = 'none';
            }
        });

        // Toggle the display of the selected form
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    };

    const deleteTodo = (todoId) => {
        // Implement the logic to delete the todo on the server
        fetch(`/todos/${todoId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                // Update the UI
                renderTodos();
            } else {
                console.error('Error deleting todo:', response.statusText);
            }
        })
        .catch(error => console.error('Error deleting todo:', error));
    };

    const updateTodo = (todoId, updatedTitle, updatedCompleted) => {
        // Implement the logic to update the todo on the server
        fetch(`/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updatedTitle,
                completed: updatedCompleted,
            }),
        })
        .then(response => response.json())
        .then(updatedTodo => {
            // Update the UI
            renderTodos();
        })
        .catch(error => console.error('Error updating todo:', error));
    };
    

    const renderTodos = () => {
        fetch('/todos')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => {
                    const todoElement = createTodoElement(todo);
                    todoList.appendChild(todoElement);
                });
            });
    };

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = titleInput.value;
        const completed = completedInput.checked;

        fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                completed: completed,
            }),
        })
        .then(response => response.json())
        .then(todo => {
            renderTodos();
            titleInput.value = '';
            completedInput.checked = false;
        });
    });

    renderTodos();
});
