let pictureSummary = [
  { id: 1, image: "./img/galery/768/1-torso.jpg", author: 'Казимир Малевич', pictureName: '«Торс»', period: '1929', summary: 'Эти странные безликие "полуобразы" (так называл подобные работы сам художник), зашифрованные в женских фигурах и торсах, существуют по мысли К.Малевича, в параллельном мире, в пределах вымышленного художником Космоса, в пространстве без времени. Произведение вызывает ассоциации и с пластикой архаической скульптуры, и с деревянной игрушкой, и с модернистским манекеном. Присутствие в фигуре белого цвета, дающего реальное представление о бесконечности, говорит о том, что в данном случае бесконечность заключена в самом человеке, который и становится для Малевича средоточием некоего абсолюта.' },
  { id: 2, image: "./img/galery/768/2-woman.jpg", author: 'Казимир Малевич', pictureName: '«Женщина с граблями»', period: '1931-1932', summary: 'Картина из второй серии крестьянского цикла работ Казимира Малевича. Художник принялся за её создание в 1930–1931 годах, после того, как первый цикл был утерян после Берлинской и Варшавской выставок в 1927 году.' },
  { id: 3, image: "./img/galery/768/3-rye.jpg", author: 'Казимир Малевич', pictureName: '«Уборка ржи»', period: '1911-1912', summary: 'Работа выполнена маслом на холсте. Произведение находится в Стеделик музеум, Амстердам. Образы крестьянской жизни, образы сельского труда, воплощенные художником отличаются пронзительной нотой драматизма, о котором Малевичу и в голову не приходило помышлять ранее. Одной из наиболее заметных черт его постсупрематической живописи стала безликость людей; вместо лиц и голов их корпуса увенчаны красными, черными, белыми овалами.' },
  { id: 4, image: "./img/galery/768/4-supermat1.jpg", author: 'И.В.Клюн', pictureName: '«Суперматизм»', period: '1915', summary: 'Впервые Клюн показал свою супрематическую живопись на выставке «Бубнового валета» в ноябре 1916 года в Москве, среди экспонатов была картина «Супрематизм». Художник разрабатывает в ней соотношение цвета и формы, их взаимное тяготение, движение цвета, различные приемы цветовой композиции. Для Клюна характерно исключительное внимание к проблеме цвета, супрематизм воспринимается им прежде всего с точки зрения цветовых задач.' },
  { id: 5, image: "./img/galery/768/5-woman2.jpg", author: 'Казимир Малевич', pictureName: '«Женщина с ведрами»', period: '1912', summary: 'Женщина с вёдрами" Казимира Малевича – яркое произведение авангардного искусства, написанное в 1912 году. Ныне картина хранится в коллекции нью-йоркского Музея современного искусства.При тщательном рассмотрении, на картине "Женщина с вёдрами" фигура женщины смутно идентифицируется, также как и вёдра, которые она несет. Общая палитра состоит из прохладных цветов, в которых преобладают синие и серые оттенки, хотя акценты красного, желтого и легкой охры добавляют визуальной динамики композиции.' },
  { id: 6, image: "./img/galery/768/6-supermat2.jpg", author: 'Казимир Малевич', pictureName: '«Супрематизм»', period: '1916', summary: '' },
]

function createModalText(obj) {
  let descr = document.createElement('div');
  descr.classList.add('modal__descr');
  descr.setAttribute('data-simplebar', '');

  let title = document.createElement('h3');
  title.classList.add('modal__title');
  title.setAttribute('id', 'modalTitle')
  title.textContent = obj.author;
  let subtitle = document.createElement('h4');
  subtitle.classList.add('modal__subtitle');
  subtitle.textContent = obj.pictureName;
  let years = document.createElement('span');
  years.classList.add('modal__period');
  years.textContent = obj.period;
  let text = document.createElement('p');
  text.classList.add('modal__text');
  text.setAttribute('id', 'modalDescr');
  text.textContent = obj.summary;

  descr.append(title, subtitle, years, text);
  return descr;
}

function setModalImg(obj) {
  let img = document.querySelector('.modal__img');
  if (isOpen) {
    img.setAttribute('src', obj.image);
    img.setAttribute('alt', obj.pictureName);
  } else {
    img.setAttribute('src', '#');
  }
}

function openModal(modal) {
  lastFocusedOutOfModal = document.activeElement;
  modal.classList.add('modal--open');
  setTimeout(() => {
    setFocus(modal);
    catchFocus(modal);
  }, 300)
  removeJumping()
  document.body.classList.add('stop-scroll')
}

function closeModal(modal) {
  modal.classList.remove('modal--open');
  setFocus(modal);
  removeJumping()
  document.body.classList.remove('stop-scroll')
}

function setFocus(modal) {
  let focusable = modal.querySelectorAll(focusableElementsString);
  if (isOpen) {
    if (focusable) {
      focusable[0].focus()
    }
  } else lastFocusedOutOfModal.focus();
}

function catchFocus(modal) {
  let focusable = modal.querySelectorAll(focusableElementsString);
  let firstFocused = focusable[0];
  let lastFocused = focusable[focusable.length - 1];

  modal.addEventListener('keydown', function (e) {
    if (e.code == 'Tab' && e.shiftKey && document.activeElement == firstFocused) {
      e.preventDefault();
      lastFocused.focus()
    }
    if (e.code == 'Tab' && document.activeElement == lastFocused) {
      e.preventDefault();
      firstFocused.focus()
    }
    if (e.code == "Escape") {
      closeModal(modal);
    }
  })
}

function removeJumping() {
  let scrollWidth = window.innerWidth - document.body.offsetWidth + 'px';
  let fixedEl = document.querySelectorAll('.fixed-el');
  if (isOpen) {
    document.body.style.paddingRight = scrollWidth;
    fixedEl.forEach(el => { el.style.paddingRight = scrollWidth });
  } else {
    document.body.style.paddingRight = '';
    fixedEl.forEach(el => { el.style.paddingRight = '' })
  }
}

let isOpen = false;
let lastFocusedOutOfModal;
let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

function showModalContent() {
  let summaries = JSON.parse(JSON.stringify(pictureSummary));
  let modalEl = document.querySelector('.modal');
  let contentWrapper = modalEl.querySelector('.modal__bar-wrapper');

  document.addEventListener('click', function (e) {
    if (e.target.closest('button.galery-swiper__content')) {
      isOpen = true;
      contentWrapper.innerHTML = '';
      let targetObj = summaries.find(item => item.id == e.target.dataset.modal);
      setModalImg(targetObj);
      contentWrapper.append(createModalText(targetObj));
      openModal(modalEl);

    }
    if (e.target.closest('.modal__close') || (isOpen && !e.target.closest('.modal__content') && e.target.matches('.modal'))) {
      isOpen = false;
      contentWrapper.innerHTML = '';
      setModalImg();
      closeModal(modalEl);
    }
  })

}

document.addEventListener('DOMContentLoaded', showModalContent)
