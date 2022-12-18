//Calculator

const keys = document.querySelectorAll('.key');
const displayInput = document.querySelector('.display .input');
const displayOutput = document.querySelector('.display .output');

let input = '';

for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value === 'clear') {
            input = '';
            displayInput.innerHTML = '';
            displayOutput.innerHTML = '';
        } else if (value === 'backspace') {
            input = input.slice(0, -1);
            displayInput.innerHTML = cleanInput(input);
        } else if (value === "=") {
            let result = eval(prepareInput(input));

            displayOutput.innerHTML = cleanOutput(result);
        } else if (value === 'brackets') {
            if (
                input.indexOf("(") === -1 || 
                input.indexOf('(') !== -1 && 
                input.indexOf(")") !== -1 && 
                input.lastIndexOf('(') < input.lastIndexOf(')')
            ) {
                input += '(';
            } else if (
                input.indexOf('(') !== -1 && 
                input.indexOf(')') === -1 || 
                input.indexOf('(') !== -1 &&
                input.indexOf(')') !== -1 &&
                input.lastIndexOf('(') > input.lastIndexOf(')')
                ) {
                input += ')';
            }
            displayInput.innerHTML = cleanInput(input);
        } else {
            if (validateInput(value)) {
                input += value;
                displayInput.innerHTML = cleanInput(input);
            }
        }
    })
}

        function cleanInput(input) {
            let inputArray = input.split('');
            let inputArrayLenght = inputArray.length;

            for (let i = 0; i < inputArrayLenght; i++) {
                if (inputArray[i] === "*") {
                    inputArray[i] = `<span class="operator">×</span>`;
                } else if (inputArray[i] === '/') {
                    inputArray[i] = `<span class="operator">÷</span>`;
                } else if (inputArray[i] === '+') {
                    inputArray[i] = `<span class="operator">+</span>`;
                } else if (inputArray[i] === '-') {
                    inputArray[i] = `<span class="operator">-</span>`;
                } else if (inputArray[i] === '(') {
                    inputArray[i] = `<span class="brackets">(</span>`;
                } else if (inputArray[i] === ')') {
                    inputArray[i] = `<span class="brackets">)</span>`;
                } else if (inputArray[i] === '%') {
                    inputArray[i] = `<span class="percent">%</span>`;
                } 
            }
            return inputArray.join("");
        }

        function cleanOutput (output) {
            let outputString = output.toString();
            let decimal = outputString.split(".")[1];
            outputString = outputString.split(".")[0];
            let outputArray = outputString.split("");
            if (outputArray.length > 3) {
                for (let i = outputArray.length - 3; i > 0; i -= 3) {
                    outputArray.splice(i, 0, ",");
                }
            }
            if (decimal) {
                outputArray.push(".");
                outputArray.push(decimal);
            }
            return outputArray.join("");
        }

        function validateInput (value) {
            let lastInput = input.slice(-1);
            let operators = ["+", "-", "*", "/"];

            if (value === "." && lastInput === ".") {
                return false;
            }
            if (operators.includes(value)) {
                if (operators.includes(lastInput)) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        }

        function prepareInput (input) {
            let inputArray = input.split("");

            for (let i = 0; i < inputArray.length; i++) {
                if (inputArray[i] === "%") {
                    inputArray[i] = "/100" ;
                }
            }
            return inputArray.join("");
        }

//API WEATHER

        const api = {
            key: "a55b1163ed97c26eb450f23d0752a200",
            endpoint: "https://api.openweathermap.org/data/2.5/"
        }

        const searchBox = document.querySelector('.searchBox')
        searchBox.addEventListener('keypress', enter)

        function enter(e) {
            if (e.keyCode === 13) {
                getInfo(searchBox.value);
            }
        }

        async function getInfo(data) {
            const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
            const result = await res.json();
            displayResult(result);
        }
        function displayResult(result) {
            let city = document.querySelector(".city");
            city.textContent = `${result.name}, ${result.sys.country}`;

            getOurDate();

            let temp = document.querySelector(".temp");
            temp.innerHTML = `${Math.round(result.main.temp)}<span>°C</span>`;
            let weather = document.querySelector(".weather");
            weather.textContent = `${result.weather[0].main}`;
            let hiLow = document.querySelector('.hiLow');
            hiLow.innerHTML = `${Math.round(result.main.temp_min)}<span>°C</span> / ${Math.round(result.main.temp_max)}<span>°C</span>`
        }
        function getOurDate() {
            const now = new Date();
            const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let day = weekday[now.getDay()];
            let nowDay = now.getDate();
            let nowMonth = months[now.getMonth()];
            
            let showDate = document.querySelector(".date");
            showDate.textContent = `${day}` + " " + `${nowDay}` + " " + `${nowMonth}`;
        }


        //TIMER
        const timer = 0.5;
        let amountTime = timer * 60;

        const btnStart = document.querySelector('#btnStart');

        btnStart.addEventListener('click', () => {
            let timerId = setInterval(calculateTime, 1000);
        })

        function calculateTime(timerId) {
            const numbers = document.querySelector('.numbers')
            let minutes = Math.floor(amountTime/60);
            let seconds = amountTime%60;

            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            
            numbers.textContent = `${minutes} : ${seconds}`;
            amountTime --;

            if (amountTime < 0) {
                stopTimer();
                amountTime = 0;
            }
            function stopTimer() {
                clearInterval(timerId);
            }
        }

        //New YorkTimes

        const apiData = {
            key: "QC1r1NhEoX89ZIN29Aq6s471Xkq36Cvd",
        }

        const article = document.querySelector(".article");
        const changeNews = document.querySelector(".changeNews")

        changeNews.addEventListener('click', changeInfo);

        async function changeInfo() {
            const res = await fetch (`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiData.key}`);
            const result = await res.json();
            showNews(result);
        }
        function showNews(result) {
            let title = document.querySelector('.title');
            console.log(result)
            title.innerHTML = `${result.results[0].source}`

            let secondTitle = document.querySelector('.secondTitle');
            secondTitle.innerHTML = `${result.results[0].title}`

            let article = document.querySelector('.article')
            article.innerHTML = `${result.results[0].abstract}`

            let location = document.querySelector('.location')
            location.innerHTML = `${result.results[0].geo_facet[0]}`
            
            let publishDate = document.querySelector('.publishDate')
            publishDate.innerHTML = `${result.results[0].published_date}`

        }

        changeInfo()




        //ToDoList

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












