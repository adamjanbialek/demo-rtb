const cardsContainer = document.querySelector('.cards-container');

fetch('https://rekrutacja.webdeveloper.rtbhouse.net/files/banner.json')
  .then(res => res.json(), err => alert(err))
  .then(data => fillWithContent(Object.values(data)[0]))
  .then(() => jumpAnimation())
  .catch(err => console.log(err));

function fillWithContent(content) {
  for (let i = 0; i < 4; i++) {
    cardsContainer.insertAdjacentHTML('beforeend', `
        <a href="" class="card card-${i+1}" data-card="${i+1}">
          <picture class="img-container">
            <img src="${content[i]?.imgURL}">
          </picture>
          <p class="price">${content[i]?.price} ${content[i].currency}</p>
        </a>
    `);
    if(i === 0) {
      document.querySelector('.card').classList.add('card--active');
    }
  }
}

let realActiveCardNo = null;

function jumpAnimation() {
  const cards = document.querySelectorAll('.card');

  let animationInterval = setInterval(slide, 2000);

  cardsContainer.addEventListener('mouseover', function (e) {
    clearInterval(animationInterval);
    realActiveCardNo = realActiveCardNo ? realActiveCardNo : parseInt(document.querySelector('.card--active').getAttribute('data-card'));
    console.log('el'+ realActiveCardNo);
    const cardHover = e.target.closest('.card');
    if(!cardHover) return;
    const activeCardNo = parseInt(document.querySelector('.card--active').getAttribute('data-card'));
    document.querySelector(`.card[data-card="${activeCardNo}"]`).classList.remove('card--active');
    cardHover.classList.add('card--active');
  });

  cardsContainer.addEventListener('mouseleave', () => {
    if(realActiveCardNo) {
      const activeCardNo = realActiveCardNo;
      document.querySelectorAll(`.card`).forEach(el => el.classList.remove('card--active'));
      document.querySelector(`.card[data-card="${activeCardNo}"]`).classList.add('card--active');
    }
    realActiveCardNo = null;
    animationInterval = setInterval(slide, 2000);
  });

  function slide() {
    const activeCardNo = parseInt(document.querySelector('.card--active').getAttribute('data-card'));
    document.querySelector(`.card[data-card="${activeCardNo}"]`).classList.remove('card--active');
    document.querySelector(`.card[data-card="${cards.length > activeCardNo ? activeCardNo + 1 : 1}"]`).classList.add('card--active');
  }
}
