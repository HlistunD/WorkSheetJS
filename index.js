const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = '';

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == 'clear') {
            input = '';
            displayInput.innerHTML = '';
            displayOutput.innerHTML = '';
        }else if (value == 'backspace') {
            input.slice(0, -1);
            displayInput.innerHTML = input;
        }else if (value == '=') {
            let result = eval(input);

            displayOutput.innerHTML = result;
        }else if (value == 'brackets') {
            if (
                input.indexOf("(") == -1 || 
                input.indexOf('(') != -1 && 
                input.indexOf(")") != -1 && 
                input.lastIndexOf('(') < 
                input.lastIndexOf(')')
            ) {
                input+= '(';
            } else if (
                input.indexOf('(') != -1 && 
                input.indexOf(')') == -1) {
                input -= ')';
            }
        }
    })
}






window.addEventListener('load', () => {
    const form = document.querySelector('#newTasksForm');
    const input = document.querySelector('#newTaskInput');
    const listEl = document.querySelector('#tasks')

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if(!task) {
            alert('Please fill out the task');
            return;
        }
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');

        const taskContentEl = document.createElement('div');
        taskContentEl.classList.add('content');

        taskEl.appendChild(taskContentEl);

        const taskInputEl = document.createElement('input');
        taskInputEl.classList.add('text');
        taskInputEl.type = 'text';
        taskInputEl.value = task;
        taskInputEl.setAttribute('readonly','readonly');

        taskContentEl.appendChild(taskInputEl);

        const taskActionsEl = document.createElement('div');
        taskActionsEl.classList.add('actions');

        const taskEditEl = document.createElement('button');
        taskEditEl.classList.add('edit');
        taskEditEl.innerHTML = "Edit";

        const taskDeleteEl = document.createElement('button');
        taskDeleteEl.classList.add('delete');
        taskDeleteEl.innerHTML = "Delete";

        taskActionsEl.appendChild(taskEditEl);
        taskActionsEl.appendChild(taskDeleteEl);
        taskEl.appendChild(taskActionsEl);
        listEl.appendChild(taskEl);

        input.value = '';
        
        taskEditEl.addEventListener('click', () => {
            if(taskEditEl.innerText.toLowerCase()== 'edit') {
            taskInputEl.removeAttribute('readonly');
            taskInputEl.focus();
            taskEditEl.innerText = 'Save';
            } else {
                taskEditEl.setAttribute('readonly', 'readonly');
                taskEditEl.innerText = 'Edit';
            }
        });
        taskDeleteEl.addEventListener('click', () => {
            listEl.removeChild(taskEl)
        });
    });
});












