let painters = {
  1400: [
    { img: "./img/catalogue/bindo.jpg", name: "Бенедетто ди Биндо", lifePeriod: 'около 1385 — 19 сентября 1417', info: 'Итальянский живописец сиенской школы итало-византийского и готического искусства. В 1415–1416 годах художник Бенедетто ди Биндо работал в церкви Сан Доменико в Перудже, где написал фрески в капелле святых Екатерины и Петра Мученика. Бенедетто ди Биндо приписывают авторство фрески «Вознесение Марии» в церкви Сан Никколо дель Кармине в Сиене, диптих «Мадонна Умиление» или «Пресвятая Дева Мария с младенцем и святой Иероним, переводящий евангелие от Иоанна» (1400–1405, Филадельфия, Музей изобразительного искусства), а также несколько станковых произведений, хранящихся в разных музеях.' },
    { img: "./img/catalogue/bergonione.jpg", name: "Бергоньоне, Амброджо", lifePeriod: '1453 — 1523', info: 'Прозвище говорит о его тяготении к бургундской школе, по манере ему близок Винченцо Фоппа. Испытал влияние Леонардо да Винчи. Наиболее известен работами 1486—1494 в монастырской обители картезианцев Чертоза ди Павия. Позднее работал в Милане в базилике Сант-Эусторджо и церкви Сан-Сатиро, после 1497 — в Лоди, в 1512 — в Бергамо, незадолго до смерти — снова в Милане, в базилике Сан-Симпличано.Его завещание датировано 4 апреля 1523, в том же году он умер. Одним из его учеников считают Бернардино Луини.Работы Бергоньоне представлены в музеях Бергамо, Милана (пинакотека Брера, музей Польди-Пеццоли), Турина, Парижа, Лондона, Нью-Йорка и др., одно из его полотен (Иаков Зеведеев, ок. 1500) находится в Эрмитаже.' },
    { img: "./img/catalogue/bissolo.jpg", name: "Биссоло, Франческо", lifePeriod: '1470 — 20 апреля 1554', info: 'Ученик Джованни Беллини. С 1490 переехал в мастерскую Беллини. С 1492 по 1530 год работал в Венеции. Помогал учителю в работе над украшением Большого зала Совета Дворца дожей (Венеция). Принимал участие в создании украшений Церкви Иль Реденторе в Венеции. Художник эпохи Возрождения. В своём творчестве подражал Джорджоне.Работы художника хранятся ныне во многих музеях мира. В санкт-петербургском Эрмитаже находится его картина «Богоматерь с Младенцем Христом». В Британской Национальной галерее — «Мадонна с Младенцем со святыми и донатором». Ряд его полотен находится в музеях Варшавы, Лос-Анджелеса (Музей Нортона Саймона и Los Angeles County Museum of Art), Дэйтоновском институте искусств (штат Огайо, США) и др.' },
    { name: "Больтраффио, Джованни", },
    { name: "Бонсиньори, Франческо" },
    { name: "Боттичини, Рафаэлло" },
    { name: "Брамантино" },
    { name: "Бреа, Людовико" },
    { name: "Бьяджо д’Антонио Туччи" },
    { name: "Веккьетта" },
    { name: "Андреа Верроккьо" },
    { img: "./img/catalogue/girlandaio.jpg", name: "Доменико Гирландайо", lifePeriod: '2 июня 1448 — 11 января 1494', info: 'Один из ведущих флорентийских художников Кватроченто, основатель художественной династии, которую продолжили его брат Давид и сын Ридольфо. Глава художественной мастерской, где юный Микеланджело в течение года овладевал профессиональными навыками. Автор фресковых циклов, в которых выпукло, со всевозможными подробностями показана домашняя жизнь библейских персонажей (в их роли выступают знатные граждане Флоренции в костюмах того времени).' },
    { name: "Беноццо Гоццоли" },
    { name: "Граначчи, Франческо" },
    { name: "Грегорио ди Чекко" },
    { name: "Джованни да Удине" },
    { name: "Джованни ди Паоло" },
    { name: "Джорджоне" },
    { name: "Парентино, Бернардо" },
    { name: "Пезеллино" },
    { name: "Пьетро Перуджино" },
    { name: "Перуцци, Бальдассаре" },
    { name: "Пизанелло" },
    { name: "Пинтуриккьо" },
  ],
  1500: [],
  1600: [],
  1700: [],
  1800: [],
  1900: [],
  2000: [],
}

// tagOptions = {
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

// sampleOptions = {
//   name: '',
//   h3: '',
//   descr: '',
// }

function createSample(options) {
  let wrapper = createHtml({
    tagName: 'div',
    classes: [`${options.name}`],
  });
  let imageBlock = createHtml({
    tagName: 'div',
    classes: [`${options.name}__image`],
  });
  let contentBlock = createHtml({
    tagName: 'div',
    classes: [`${options.name}__content`],
  });
  let title = createHtml({
    tagName: "h3",
    classes: [`${options.name}__title`],
    text: options.h3,
  });
  let descr = createHtml({
    tagName: "p",
    classes: [`${options.name}__descr`],
    text: options.descr,
  });
  let link = createHtml({
    tagName: 'a',
    classes: [`${options.name}__link`],
    attributes: { "href": "#galery" },
    text: 'В галерею'
  });
  contentBlock.append(title, descr, link);
  wrapper.append(imageBlock, contentBlock);
  return wrapper
}

function createArtistInfo(block, obj) {
  block.innerHTML = '';
  if (!obj.info) {
    block.append(createSample({
      name: 'info-sample',
      h3: 'Что мы о нём знаем?',
      descr: 'Пока ничего… Зато мы точно знаем, что в галерее есть на что посмотреть!'
    }))
  } else {
    let img = createHtml({ tagName: 'img', classes: ['painter__photo'], attributes: { 'src': obj.img, 'alt': `Картина, автор ${obj.name}` } });
    let title = createHtml({ tagName: 'h3', classes: ['painter__name'], text: obj.name });
    let period = createHtml({ tagName: 'span', classes: ['painter__lifeperiod'], text: obj.lifePeriod });
    let descr = createHtml({ tagName: 'p', classes: ['painter__info', 'text'], text: obj.info })

    block.append(img, title, period, descr);
  }
}

function createArtistList() {
  let artists = Object.entries(painters);
  for (let [key, value] of artists) {
    let target = document.querySelector(`[data-period-from="${key}"]`);

    target.append(createSample({
      name: 'catalogue-sample',
      h3: 'Здесь пока пусто',
      descr: 'А в галерее вы всегда можете найти что-то интересное для себя'
    }));

    if (value !== '') {
      let ul = createHtml({
        tagName: 'ul',
        classes: ['list-reset', 'artists', 'text']
      })
      for (let i = 0; i < value.length; i++) {
        let li = createHtml({
          tagName: 'li',
          classes: ['artists__item'],
        })
        let link = createHtml({
          tagName: 'a',
          classes: ['artists__link'],
          // attributes: { 'href': `#${key}-${i}` },
          attributes: { 'tabindex': '0', 'href': '#!' },
          text: value[i].name,
        })

        if(link.textContent.toLowerCase().includes('гирландайо')) link.classList.add('artists__link--selected')

        li.append(link);
        ul.append(li);
        target.append(ul);

        link.addEventListener('click', function (e) {
          // e.preventDefault();
          let links = document.querySelectorAll('.artists__link');
          links.forEach(el=>{el.classList.remove('artists__link--selected')});
          this.classList.add('artists__link--selected');

          let infoBlock = document.querySelector('.painter');
          infoBlock.setAttribute('id', `${key}-${i}`);


          if (window.matchMedia('(max-width: 576px)').matches) {
            infoBlock.scrollIntoView({
              block: 'start',
              behavior: 'smooth',
            });
          }

          createArtistInfo(infoBlock, value[i]);
        })


      }
      let sample = target.querySelector('.catalogue-sample');
      if (sample.nextElementSibling == ul) sample.remove();
    }
  }
}
createArtistList()


