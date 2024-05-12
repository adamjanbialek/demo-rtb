const sliderContainer = document.querySelector('.slider-container');
const prices = document.querySelector('.prices');
const countryCity = document.querySelector('.country-city-container');

fetch('https://rekrutacja.webdeveloper.rtbhouse.net/files/banner_vip.json')
  .then(res => res.json(), err => alert(err))
  .then(data => fillWithContent(Object.values(data)[0]))
  .then(() => prepareSlider())
  .catch(err => console.log(err));

function fillWithContent(content) {
  for (let i = 0; i < content.length; i++) {
    sliderContainer.insertAdjacentHTML('beforeend', `
      <picture class="img-container background-img slider-item ${i === 0 ? 'slider-item--active' : ''}" data-offer="${i}">
        <img src="${content[i]?.imgURL}">
      </picture>
    `);
    prices.insertAdjacentHTML('beforeend', `
      <div class="price-container">
       <p class="from">from</p>
       <p class="price">${content[i]?.price} ${content[i]?.currency}</p>
      </div>
    `);
    countryCity.insertAdjacentHTML('beforeend', `
       <div class="country-city-subcontainer">
        <p class="country"><span class="country-name">${content[i]?.country}</span></p>
        <h1 class="city flybee-bg"><span class="city-name">${content[i]?.city}</span></h1>
       </div>
    `);
  }
}


function prepareSlider() {
  const slides = Array.from(document.querySelectorAll('.slider-container .slider-item'));
  const slidesImages = Array.from(document.querySelectorAll('.slider-container .slider-item img'));
  const priceContainers = Array.from(document.querySelectorAll('.prices .price-container'));
  const countryCity = Array.from(document.querySelectorAll('.city'));
  const cityHeadings = Array.from(document.querySelectorAll('.city-name'));
  const countries = Array.from(document.querySelectorAll('.country'));
  const countryHeadings = Array.from(document.querySelectorAll('.country-name'));
  const squaresContainer = Array.from(document.querySelectorAll('.squares-container'));
  const squares = document.querySelectorAll('.square');
  const foreground = document.querySelector('.foreground-element');
  const revealedEl = document.querySelector('.revealed-element');
  const logo = document.querySelector('.logo');
  const banner = document.querySelector('.banner');

  revealedEl.style.animation = 'slideToViewVertical .3s ease-in forwards';
  foreground.style.animation = 'slideOutOfViewVertical .5s 1.3s linear forwards';
  logo.style.animation = 'logoAnimation 1.0s .3s cubic-bezier(.7,0,0,1) forwards';

  let curSlide = 0, sliderLength = slides.length - 1;

  slides.forEach((s, i) => {
    s.style.transform = `translateX(100%)`;
    i === 0 ? s.style.transform = "translateX(0)": '';
  });

  function slide() {
    slides[curSlide].style.transform = `translateX(0%)`;


    /* extended delay needed for the first slide  */
    const extendedDelay = curSlide === 0 ? 1.5 : 0;

    /* starting animations for every slide */
    slidesImages[curSlide].style.animation = `zoomIn 5s ${extendedDelay + 's'} linear forwards`;
    squaresContainer[0].style.animation = `revealSliderPaginator 0.2s ${extendedDelay + 's'} forwards`;
    countries[curSlide].style.animation = `slideToViewHorizontal 0.25s ${extendedDelay + .5}s ease-out forwards`;
    countryHeadings[curSlide].style.animation = `slideToViewVertical 0.25s ${extendedDelay + .75}s ease-out forwards`;
    countryCity[curSlide].style.animation = `slideToViewHorizontal 0.25s ${extendedDelay + .75}s ease-out forwards`;
    cityHeadings[curSlide].style.animation = `slideToViewVertical 0.25s ${extendedDelay + 1}s ease-out forwards`;
    priceContainers[curSlide].style.animation = `slideToViewVertical .4s ${extendedDelay + 1}s forwards`;

    const activeCardNo = parseInt(document.querySelector('.slider-item--active')?.getAttribute('data-offer'));

    /* last animations for every slide */
    function hideElements() {
      priceContainers[curSlide - 1].style.animation = 'slideOutOfViewVertical 0.2s forwards';
      countries[curSlide - 1].style.animation = 'slideOutOfViewHorizontal 0.25s ease-in forwards';
      countryHeadings[curSlide - 1].style.animation = 'slideOutOfViewVertical 0.15s ease-in forwards';
      countryCity[curSlide - 1].style.animation = 'slideOutOfViewHorizontal 0.5s ease-in forwards';
      cityHeadings[curSlide - 1].style.animation = 'slideOutOfViewVertical 0.1s ease-in forwards';
    }

    if(curSlide > 0) {
      hideElements();
    } else {
      document.querySelector('.btn-cta').style.animation = `slideToViewFromRightHorizontal 0.5s ${extendedDelay + .75}s ease-out forwards`;
      document.querySelector('.line').style.width = '74px';
    }

    squares.forEach((el, index) => {
      index === curSlide ? el.classList.add('square--active') : el.classList.remove('square--active');
    });

    slides[activeCardNo].classList.remove('slider-item--active');
    (activeCardNo + 1) > sliderLength ? clearInterval(myInterval) : slides[activeCardNo + 1].classList.add('slider-item--active');

    curSlide++;

    //when it is the last execution of the function
    curSlide === sliderLength + 1 ? setTimeout(() => {
      hideElements();
      banner.style.animation = 'fadeOut .5s forwards';
    }, 3600) : '';
  }

  slide();

  const myInterval = setInterval(slide, 4500);
}
