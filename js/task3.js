const counter = document.getElementById('counter');

let endCountdownDate;

const daysRemaining = 7 - new Date().getDay();
const thisSunday = new Date().getDate() + daysRemaining;

function countdown() {
  const dateNow = Date.now();
  const countdownDate = new Date(`${new Date().getFullYear()}-${(new Date().getUTCMonth()+1).toString().length > 1 ? new Date().getUTCMonth()+1 : '0' + (new Date().getUTCMonth()+1).toString()}-${thisSunday}T23:59:59`);
  endCountdownDate = countdownDate.getTime();

  if(dateNow < endCountdownDate) {
    const remainingSeconds = Math.floor((endCountdownDate - dateNow) / 1000);
    const seconds = remainingSeconds % 60;
    const minutes = Math.floor(remainingSeconds / (60 )) % 60;
    const hours = Math.floor(remainingSeconds / (3600 )) % 24;
    const days = Math.floor(remainingSeconds / (3600 * 24 ));
    counter.textContent = `Time remaining:
    ${days.toString().length > 1 ? days : 0 + days.toString()
    }-${hours.toString().length > 1 ? hours : 0 + hours.toString()
    }-${minutes.toString().length > 1 ? minutes : 0 + minutes.toString()
    }-${seconds.toString().length > 1 ? seconds : 0 + seconds.toString()}`;
  } else {
    counter.textContent = 'Promotion ended.';
    clearInterval(countdown);
  }
}

(Date.now() >= endCountdownDate) ? counter.textContent = 'Promotion ended' : setInterval(countdown, 1000);

