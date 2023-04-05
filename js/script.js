const listGutarsEl = document.querySelector('.js-list');
const filterInputEl = document.querySelector('.filter-input');

const listGuitars = [
  {
    img: 'https://content1.rozetka.com.ua/goods/images/big_tile/257735596.jpg',
    brend: 'Cort',
    cost: 6919,
  },
  {
    img: 'https://content1.rozetka.com.ua/goods/images/big_tile/316680030.jpg"',
    brend: 'Cort',
    cost: 7326,
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
    img: 'https://content.rozetka.com.ua/goods/images/big_tile/316279951.jpg',
    brend: 'Jackson',
    cost: 8170,
  },
];

function createItemsList(img, brend, cost) {
  return `<li class="js-item"><img src="${img}" alt="${brend}"
  height="350" /><p class="brend">${brend}</p><p class="price">${cost} UAH</p></li>`;
}

const createdItems = listGuitars
  .map(({ img, brend, cost }) => {
    return createItemsList(img, brend, cost);
  })
  .join('');

const createdAllItems = listGuitars
  .map(({ img, brend, cost }) => {
    return createItemsList(img, brend, cost);
  })
  .join('');

listGutarsEl.innerHTML = createdAllItems;

filterInputEl.addEventListener(
  'input',
  _.debounce(evt => {
    const inputValue = evt.target.value;
    if (!inputValue && inputValue === '') {
      listGutarsEl.innerHTML = createdAllItems;
    } else {
      const filteredItems = listGuitars
        .reduce((acc, { img, brend, cost }) => {
          if (brend.toLowerCase() === inputValue.toLowerCase()) {
            acc.push(createItemsList(img, brend, cost));
            return acc;
          } else {
            return acc;
          }
        }, [])
        .join('');
      listGutarsEl.innerHTML = filteredItems;
    }
  }, 300)
);
