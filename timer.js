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