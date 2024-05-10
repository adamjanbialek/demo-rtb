// const counter = document.getElementById('counter');
//
// const endCountdownDate = new Date("2024-05-12T23:59:59").getTime();
//
// function countdown() {
//   const dateNow = Date.now();
//
//   if(dateNow < endCountdownDate) {
//     const remainingSeconds = Math.floor((endCountdownDate - dateNow) / 1000);
//     const seconds = remainingSeconds % 60;
//     const minutes = Math.floor(remainingSeconds / (60 )) % 60;
//     const hours = Math.floor(remainingSeconds / (3600 )) % 24;
//     const days = Math.floor(remainingSeconds / (3600 * 24 ));
//     console.log(`${remainingSeconds} seconds until the end`);
//     counter.textContent = `Time remaining: ${days}-${hours}-${minutes}-${seconds}`;
//   } else {
//     counter.textContent = 'Promotion ended.';
//     clearInterval(countdown);
//   }
// }
//
// (Date.now() >= endCountdownDate) ? counter.textContent = 'Promotion ended' : setInterval(countdown, 1000);




