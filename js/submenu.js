// options = {
//   tagName: 'elem-name',
//   classes: ['class1', 'class2'],
//   attributes: {type: 'text', 'data-set': 'value'},
//   text: 'some text',
// }

function createHtml(options) {
  const tag = document.createElement(options.tagName);
  if (options.classes) tag.classList.add(...options.classes);
  if (options.attributes) {
    for (let key in options.attributes) {
      tag.setAttribute(key, options.attributes[key]);
    }
  }
  if (options.text) tag.textContent = options.text;
  return tag;
}

let artDirBtns = ['Реализм', 'Импрессионизм', 'Постимпрессионизм', 'Авангард', 'Футуризм'];

let submenuLinks = {
  realism: ['Тинторетто', 'Фридрих', 'Леонардо', 'Верроккьо', 'Тинторетто', 'Фридрих', 'Леонардо', 'Верроккьо'],
  impression: ['Моне', 'Сислей', 'Мане', 'Ренуар', 'Моне', 'Сислей', 'Мане', 'Ренуар'],
  postimpr: ['Ван Гог', 'Сезанн', 'Гоген', 'Сёра', 'Ван Гог', 'Сезанн', 'Гоген', 'Сёра'],
  avangard: ['Кандинский', 'Маринетти', 'Малевич', 'Пикассо', 'Кандинский', 'Маринетти', 'Малевич', 'Пикассо'],
  futurism: ['Карра', 'Прателла', 'Северини', 'Балла', 'Карра', 'Прателла', 'Северини', 'Балла'],
}

function createLink(arr, list, bgName) {
  for (i=0; i<arr.length; i++) {
    let linkItem = createHtml({
      tagName: 'li',
      classes: ['dropdown__item']
    })
    let link = createHtml({
      tagName: 'a',
      classes: ['dropdown__link', `${bgName}-${i%4}`],
      attributes: {href:'#'},
      text: arr[i],
    })
    linkItem.append(link);
    list.append(linkItem);
  }
}


function createSubMenu(artArr, linksObj) {
  const container = createHtml({
    tagName: 'div',
    classes: ['container', 'submenu-container'],
  });
  const navEl = createHtml({tagName: 'nav', classes: ['header__submenu', 'submenu'] })
  const listEl = createHtml({tagName: 'ul', classes: ['list-reset','submenu__list'] })

  for (let i=0; i<artArr.length; i++) {
    let listItem = createHtml({
      tagName: 'li',
      classes: ['submenu__item'],
      attributes: {'data-mark': `${i}`,}
    })
    let button = createHtml({
      tagName: 'button',
      classes: ['btn-reset', 'submenu__btn'],
      text: `${artArr[i]}`,
    })
    let dropdowWrap = createHtml({
      tagName: 'div',
      classes: ['submenu__dropdown', 'dropdown'],
      attributes: {'data-path': `${i}`,}
    })
    let linkList = createHtml({
      tagName: 'ul',
      classes: ['list-reset', 'dropdown__list'],
      attributes: {'data-simplebar': '',}
    })

    switch (artArr[i]) {
      case 'Реализм':
        createLink(linksObj.realism,linkList, 'real');
        break;
      case 'Импрессионизм':
        createLink(linksObj.impression, linkList, 'impr');
        break;
      case 'Постимпрессионизм':
        createLink(linksObj.postimpr, linkList, 'postimpr');
        break;
      case 'Авангард':
        createLink(linksObj.avangard, linkList, 'avang');
        break;
      case 'Футуризм':
        createLink(linksObj.futurism, linkList, 'futur');
        break;
    }
    dropdowWrap.append(linkList)
    listItem.append(button, dropdowWrap);
    // listItem.append(linkList);
    listEl.append(listItem);

  }
  navEl.append(listEl);
  container.append(navEl);
  return container;

}

function renderSubMenu(isDeskSize, targetEl, form) {
  let container = createSubMenu(artDirBtns, submenuLinks);
  if(isDeskSize) {
    targetEl.append(container);
    container.append(form);
  } else {
    let submenu = document.querySelector('.submenu-container');
    document.querySelector('.menu-container').append(form);
    if(submenu) submenu.remove();

  }
}

function showOnDesck() {
  let deskMedia = window.matchMedia('(min-width: 1025px)');
  let search = document.querySelector('.search');
  let header = document.querySelector('.header');
  renderSubMenu(deskMedia.matches, header, search);
  deskMedia.addEventListener('change', function(e) {
    renderSubMenu(e.matches, header, search);
  })
}

showOnDesck()

