const apiData = {
    keyNews: "QC1r1NhEoX89ZIN29Aq6s471Xkq36Cvd",
}

const changeNews = document.querySelector(".changeNews");

async function dataInfo() {
    const firstData = await fetch (`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${apiData.keyNews}`);
    const finallyData = await firstData.json();
    showNews(finallyData.results);
    changeNews.addEventListener('click', () => {
        showNews(finallyData.results)
    });
    }
    let i = 0;

    function showNews(finallyData) {
    i++;
    if(i > finallyData.length - 1) {
        i = 0
    }

    let title = document.querySelector('.title');
    title.innerHTML = `${finallyData[i].source}`;

    let secondTitle = document.querySelector('.secondTitle');
    secondTitle.innerHTML = `${finallyData[i].title}`

    let article = document.querySelector('.article')
    article.innerHTML = `${finallyData[i].abstract}`
    
    let publishDate = document.querySelector('.publishDate')
    publishDate.innerHTML = `${finallyData[i].published_date}`
    }

    dataInfo();