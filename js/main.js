
function handlerHeaderElClick(e) {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const searchForm = document.querySelector('.header__search');
  const dropdowns = document.querySelectorAll('.submenu__dropdown');
  const subMenuBtns = document.querySelectorAll('.submenu__btn');
  const openSearchBtn = document.querySelector('.open-search');

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
    openSearchBtn.setAttribute('aria-expanded', 'true');
  }

  if (e.target.closest('.search__close')) {
    searchForm.classList.remove('header__search--open');
    openSearchBtn.setAttribute('aria-expanded', 'false');
    openSearchBtn.focus();
  }

  const targetBtn = e.target.closest('.submenu__btn');
  if (targetBtn) {
    openDropdown(targetBtn, dropdowns, subMenuBtns)
  }

  if (!e.target.closest('.header__submenu')) {
    const activeBtn = document.querySelector('.submenu__btn.is-active');
    if (activeBtn) {
      const openedDropdown = activeBtn.nextElementSibling;
      activeBtn.classList.remove('is-active');
      resetDropAria(activeBtn);
      openedDropdown.classList.remove('is-open');
    }

  }
}
// submenu functions
function openDropdown(targetEl, dropLists, ctrlBtns) {
  let mark = targetEl.dataset.mark;
  let dropdown = document.querySelector(`[data-path="${mark}"]`)
  dropdown.classList.toggle('is-open');
  targetEl.classList.toggle('is-active');
  setDropAria(targetEl);
  for (let el of dropLists) {
    if (el.dataset.path === mark) continue;
    el.classList.remove('is-open');
  }
  for (let el of ctrlBtns) {
    if (el == targetEl) continue;
    resetDropAria(el);
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

  // tooltips
  tippy('.tooltip', {
    content(reference) {
      let id = reference.getAttribute('data-tool');
      let tool = document.getElementById(id);
      return tool.innerHTML;

    },
    allowHTML: true,
    trigger: 'click focus',
    theme: 'purple',
    onShow(tippyObj) {
      tippyObj.reference.classList.add('shown')
    },
    onHide(tippyObj) {
      tippyObj.reference.classList.remove('shown');
    }
  })

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
