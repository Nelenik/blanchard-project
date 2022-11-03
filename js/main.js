
function handlerHeaderElClick(e) {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const searchForm = document.querySelector('.header__search');
  const dropdowns = document.querySelectorAll('.submenu__dropdown');
  const submenuItems = document.querySelectorAll('.submenu__item')
  const subMenuBtns = document.querySelectorAll('.submenu__btn');

  if (e.target.closest('.burger')) {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('menu--open');
    document.body.classList.toggle('stop-scroll');
  }

  if (e.target.closest('.menu__item')) {
    burger.classList.remove('burger--active');
    menu.classList.remove('menu--open');
    document.body.classList.remove('stop-scroll');
  }

  if (e.target.closest('.open-search')) {
    searchForm.classList.add('header__search--open');
  }

  if (e.target.closest('.search__close')) {
    searchForm.classList.remove('header__search--open')
  }

  const targetBtn = e.target.closest('.submenu__item');
  if (targetBtn) {
    openDropdown(targetBtn, dropdowns, subMenuBtns, submenuItems)
  }


  if (!e.target.closest('.header__submenu')) {
    const activeItem = document.querySelector('.submenu__item.is-active');
    if (activeItem) {
      const activeBtn = activeItem.firstElementChild;
      const openedDropdown = activeItem.lastElementChild;
      activeItem.classList.remove('is-active');
      resetDropAria(activeBtn);
      openedDropdown.classList.remove('is-open');
    }

  }
}
// submenu functions
function openDropdown(targetEl, dropLists, ctrlBtns, items) {
  let mark = targetEl.dataset.mark;
  let dropdown = document.querySelector(`[data-path="${mark}"]`)
  dropdown.classList.toggle('is-open');
  targetEl.classList.toggle('is-active');
  setDropAria(targetEl.firstElementChild);
  for (let el of dropLists) {
    if (el.dataset.path === mark) continue;
    el.classList.remove('is-open');
  }
  for (let el of ctrlBtns) {
    if (el == targetEl.firstElementChild) continue;
    resetDropAria(el);
  }
  for (let el of items) {
    if (el == targetEl) continue;
    el.classList.remove('is-active')
  }
}

function setDropAria(el) {
  let ariaExpState = 'true' === el.getAttribute('aria-expanded');
  el.setAttribute('aria-expanded', !ariaExpState);
  ariaExpState ? el.setAttribute('aria-label', 'Открыть подменю') : el.setAttribute('aria-label', 'Закрыть подменю')
}

function resetDropAria(el) {
  el.ariaExpanded = false;
  el.setAttribute('aria-label', 'Открыть подменю')
}

// tooltip functions
function placeTooltip(anchor, block) {
  const popup = document.querySelector(`[id="${anchor.dataset.tool}"`);
  let anchorCoords = anchor.getBoundingClientRect();
  let blockCoords = block.getBoundingClientRect();
  let popupPos = {
    left: anchorCoords.left + window.scrollX - (popup.offsetWidth - anchor.offsetWidth) / 2,
    top: anchorCoords.top + window.scrollY - popup.offsetHeight - 12,
    right: anchorCoords.right + window.scrollX + (popup.offsetWidth - anchor.offsetWidth) / 2,
    bottom: anchorCoords.bottom + window.scrollY + 12
  }

  if (popupPos.right > blockCoords.right) {
    popupPos.left = blockCoords.right - popup.offsetWidth;
  }

  if (popupPos.left < blockCoords.left) {
    popupPos.left = blockCoords.left
  }

  popup.style.left = popupPos.left + 'px';
  popup.style.top = popupPos.top + 'px';
}

function showTooltip(anchor, block) {
  window.addEventListener('load', function (e) {
    placeTooltip(anchor, block);
  })
  window.addEventListener('resize', function (e) {
    placeTooltip(anchor, block);
  })
}

// set tabindex for sliders
  // for slides with interactive firstchild
  function setSlideTabindex(swiper) {
    let slides = swiper.slides;
    slides.forEach(el => { el.firstElementChild.setAttribute('tabindex', '-1') })
    const visible = swiper.el.querySelectorAll('.swiper-slide-visible')
    visible.forEach(el => { el.firstElementChild.removeAttribute('tabindex') })
  }

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  this.addEventListener('click', handlerHeaderElClick);

  {
    const searchInput = document.querySelector('.search__input');
    searchInput.addEventListener('click', function () {
      this.style.borderColor = '#7943A4';
    })
    searchInput.addEventListener('blur', function () {
      this.style.borderColor = '';
    })
  }

  // galery-select
  const select = document.querySelector('.filter__select');
  new Choices(select, {
    searchEnabled: false,
    allowHTML: true,
    shouldSort: false,
    itemSelectText: '',
    position: 'bottom',
    placeholder: true,
  });

  // galery-swiper
  {
    let galerySwiper = new Swiper('.galery-swiper', {
      watchSlidesProgress: true,
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      pagination: {
        el: '.galery-swiper__pagination',
        type: 'fraction',
      },
      navigation: {
        nextEl: '.galery-swiper__next',
        prevEl: '.galery-swiper__prev',
      },
      spaceBetween: 15,
      breakpoints: {
        577: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 38
        },
        769: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 34
        },
        993: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        1400: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        }
      }
    });


    setSlideTabindex(galerySwiper);
    galerySwiper.on('slideChange', function () {
      setSlideTabindex(this)
    })
    galerySwiper.on('resize', function() {
      setSlideTabindex(this);
    })
  }

  // events-slider
  {
    let eventsSlider = new Swiper('.events__swiper', {
      watchSlidesProgress: true,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        prevEl: '.events__swiper-prev',
        nextEl: '.events__swiper-next',
      },
      spaceBetween: 40,
      breakpoints: {
        577: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        993: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 27
        },
        1025: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50,
        },
      }
    });
  }

   // tooltip
   {
    let anchors = document.querySelectorAll('.tooltip');
    let block = document.querySelector('.projects__text');
    anchors.forEach(anchor => {
      showTooltip(anchor, block);
    })
  }
  // partners-slider
  {
    let partnersSlider = new Swiper('.partners__swiper', {
      watchSlidesProgress: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 21,
      navigation: {
        nextEl: '.partners__next',
        prevEl: '.partners__prev'
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      breakpoints: {
        450: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 21
        },
        577: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 34
        },
        769: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 50
        },

        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        },
      }
    });

    setSlideTabindex(partnersSlider);
    partnersSlider.on('slideChange', function () {
      setSlideTabindex(this);
    })
  }

  // catalogue-accordion
  new Accordion('.acc', {
    elementClass: 'acc__item',
    triggerClass: 'acc__btn',
    panelClass: 'acc__panel',
    openOnInit: [0],
    duration: 400,
  });

  // map
  ymaps.ready(init);
  function init() {
    let myMap = new ymaps.Map("map", {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 13,
      controls: ['geolocationControl', 'zoomControl']
    }, {
      zoomControlSize: 'small',
      zoomControlFloat: 'none',
      zoomControlPosition: {
        right: '17px',
        bottom: "370px"
      },
      geolocationControlFloat: 'none',
      geolocationControlPosition: {
        right: '17px',
        bottom: '325px'
      },
      geolocationControlData: {
        image: 'img/map-geo-arrow.svg'
      }

    });
    let myPlacemark = new ymaps.Placemark([55.75846806898367, 37.60108849999989], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/placemark.svg',
      iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('typeSelector');
    myMap.controls.remove('trafficControl');
    myMap.controls.remove('searchControl');
    myMap.controls.remove('fullscreenControl');
    myMap.controls.remove('rulerControl');
    myMap.behaviors.disable('scrollZoom');
  }

})
