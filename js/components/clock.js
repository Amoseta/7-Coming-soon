function clock(selector) {
    const DOM = document.querySelector(selector);
    let allValuesDOM = null;
    const deadLine = '01-04 14:00:00';;
    let numbers = calcTime(deadLine);
    const labels = ['days', 'hours', 'minutes', 'seconds'];
    let HTML = '';

    for (let i = 0; i < 4; i++) {
        HTML += `<div class="time">
                    <div class="value">${numberFormat(numbers[i])}</div>
                    <div class="label">${labels[i]}</div>
                </div>`;
        
    }

    DOM.innerHTML = HTML;
    allValuesDOM = document.querySelectorAll(`${selector} .value`);
    console.log(allValuesDOM);


    setInterval(function () {
        numbers = calcTime(deadLine);
        for (let i= 0; i < 4; i++) {
            allValuesDOM[i].innerText = numberFormat(numbers[i]);
        }

    }, 1000); 
}

function numberFormat(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function calcTime(deadLine) {
    const date = new Date();
    const now = Date.now();
    let year = date.getFullYear();
    let fullDeadline = `${year}-${deadLine}`;
    let fullDeadlineInMiliseconds = (new Date(fullDeadline)).getTime();

     
    if (fullDeadlineInMiliseconds < now) {
        year++;
        fullDeadline = `${year}-${deadLine}`; 
        fullDeadlineInMiliseconds = (new Date(fullDeadline)).getTime();
    }

    const diff = fullDeadlineInMiliseconds - now;
    const seconds = Math.round(diff / 1000);

    const days = Math.floor(seconds / 60 / 60 / 24);
    let unusedSeconds = seconds - days * 60 * 60 *24;

    const hours = Math.floor(unusedSeconds / 60 / 60);
    unusedSeconds -= hours * 60 * 60;

    const minutes = Math.floor(unusedSeconds / 60);
    unusedSeconds -= minutes * 60;
    
    return [days, hours, minutes, unusedSeconds];
}

export { clock }