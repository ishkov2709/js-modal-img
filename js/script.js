const listGutarsEl = document.querySelector('.js-list');
const itemGuitarEl = document.querySelector('.js-item');
const filterInputEl = document.querySelector('.filter-input');
const backdropModalEl = document.querySelector('.backdrop');
const modalImgEl = document.querySelector('.modal-img');
const sorterEl = document.querySelector('.sorter');

const listGuitars = [
  {
    img: 'https://content1.rozetka.com.ua/goods/images/big_tile/257735596.jpg',
    brend: 'Cort',
    cost: 6919,
  },

  {
    img: 'https://content2.rozetka.com.ua/goods/images/big_tile/310337543.jpg',
    brend: 'Squier',
    cost: 9120,
  },
  {
    img: 'https://content2.rozetka.com.ua/goods/images/big_tile/308648518.jpg',
    brend: 'Epiphone',
    cost: 10640,
  },
  {
    img: 'https://content.rozetka.com.ua/goods/images/big_tile/313053006.jpg',
    brend: 'Ibanez',
    cost: 12654,
  },
  {
    img: 'https://leomusic.com.ua/upload/userparams/167146935299_yamaha-rgx121z-bk-front.6155b645dce47.jpg',
    brend: 'Yamaha',
    cost: 13593,
  },
  {
    img: 'https://content1.rozetka.com.ua/goods/images/big_tile/316680030.jpg"',
    brend: 'Cort',
    cost: 7326,
  },
  {
    img: 'https://content.rozetka.com.ua/goods/images/big_tile/316279951.jpg',
    brend: 'Jackson',
    cost: 8170,
  },
  {
    img: 'https://guitarhouse.com.ua/content/images/5/202x600l80mc0/epiphone-les-paul-standard-50s-vintage-sunburst-elektrogitara-74988354648726.webp',
    brend: 'Gibson',
    cost: 21100,
  },
  {
    img: 'https://guitarhouse.com.ua/content/images/11/314x1000l80mc0/ibanez-rg370ahmz-bmt-elektrogitara-65003952881649.webp',
    brend: 'Ibanez',
    cost: 21850,
  },
  {
    img: 'https://guitarhouse.com.ua/content/images/7/410x1200l80mc0/63783890562078.webp',
    brend: 'Cort',
    cost: 9565,
  },
  {
    img: 'https://guitarhouse.com.ua/content/images/11/437x1200l80mc0/57279263529378.webp',
    brend: 'LTD',
    cost: 69371,
  },
];

const createdAllItems = listGuitars
  .map(({ img, brend, cost }) => {
    return createItemsList(img, brend, cost);
  })
  .join('');

listGutarsEl.innerHTML = createdAllItems;

filterInputEl.addEventListener(
  'input',
  _.debounce(onInputCheckFilteredItems, 300)
);

listGutarsEl.addEventListener('click', onClickOpenModalBackdrop);

sorterEl.addEventListener('change', evt => {
  const valEvt = evt.target.value;
  if (valEvt != 'brend') {
    return onChangeSortedOfPriceItems(valEvt);
  }
  return onChangeSortedOfBrendItems();
});

function createItemsList(img, brend, cost) {
  return `<li class="js-item"><img src="${img}" alt="${brend}"
  height="350" /><p class="brend">${brend}</p><p class="price">${cost} UAH</p></li>`;
}

function onInputCheckFilteredItems(evt) {
  const inputValue = evt.target.value;
  if (inputValue === '') {
    listGutarsEl.innerHTML = createdAllItems;
    return;
  }

  const filteredItems = listGuitars
    .reduce((acc, { img, brend, cost }) => {
      if (brend.toLowerCase().includes(inputValue.toLowerCase())) {
        acc.push(createItemsList(img, brend, cost));
        return acc;
      } else {
        return acc;
      }
    }, [])
    .join('');
  return (listGutarsEl.innerHTML = filteredItems);
}

function onClickOpenModalBackdrop(evt) {
  const clickedItemList = evt.target.closest('.js-item');
  if (clickedItemList) {
    backdropModalEl.classList.add('active');
    modalImgEl.innerHTML = ` <img
        src="${clickedItemList.firstElementChild.src}"
        alt="${clickedItemList.firstElementChild.alt}"
        height="678"
      />`;
    listGutarsEl.removeEventListener('click', onClickOpenModalBackdrop);
    backdropModalEl.addEventListener('click', onClickCloseModalBackdrop);
  }
}

function onClickCloseModalBackdrop(evt) {
  if (evt.currentTarget === evt.target) {
    backdropModalEl.classList.remove('active');
    listGutarsEl.addEventListener('click', onClickOpenModalBackdrop);
  }
}

function onChangeSortedOfPriceItems(evt) {
  const sortedItems = listGuitars
    .sort((a, b) => {
      if (evt === 'lowest') {
        return b.cost - a.cost;
      }
      return a.cost - b.cost;
    })
    .map(({ img, brend, cost }) => {
      return createItemsList(img, brend, cost);
    })
    .join('');

  return (listGutarsEl.innerHTML = sortedItems);
}

function onChangeSortedOfBrendItems() {
  const sortedItems = listGuitars
    .sort((a, b) => {
      return a.brend.localeCompare(b.brend);
    })
    .map(({ img, brend, cost }) => {
      return createItemsList(img, brend, cost);
    })
    .join('');

  return (listGutarsEl.innerHTML = sortedItems);
}
