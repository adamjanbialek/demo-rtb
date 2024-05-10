const sliderContainer = document.querySelector('.slider-container');

fetch('https://rekrutacja.webdeveloper.rtbhouse.net/files/banner.json')
  .then(res => res.json(), err => alert(err))
  .then(data => fillWithContent(Object.values(data)[0]))
  .then(() => prepareSlider())
  .catch(err => console.log(err));

function fillWithContent(content) {
  for (let i = 0; i < 3; i++) {
    sliderContainer.insertAdjacentHTML('beforeend', `
        <div class="slider-item slide-${i+1}">
          <picture class="img-container">
            <img src="${content[i]?.imgURL}">
          </picture>
          <h1 class="name">${content[i].name}</h1>
          <div>
           <p class="price">${content[i]?.price} ${content[i].currency}</p>
           <a>
             <button class="btn-cta">Check</button>
           </a>
          </div>
        </div>
    `);
  }
}

function prepareSlider() {
  const slides = document.querySelectorAll('.slider-container .slider-item');

  let curSlide = 0, sliderLength = slides.length - 1, directionRight = true;

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${i * 100}%)`;
  });

  function slide() {
    directionRight ? --curSlide : ++curSlide;

    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(curSlide + i) * 100}%)`;
    });

    (curSlide === -1 * (sliderLength) || curSlide === 0) ? directionRight = !directionRight : '';
  }

  setInterval(slide, 2000);
}
