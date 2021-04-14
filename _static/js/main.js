(() => {
  const app = {
    initialize () {
      console.log('1. Application started!');
      this.cacheElements();
      this.buildUI();
      this.registerListeners();
      this.URLSearchParams();
    },
    cacheElements () {
      console.log('2. cache all existing DOM elements!');
      this.$hamburger = document.querySelector('.hamburger-menu');
      this.$header__nav = document.querySelector('.header__nav');
      this.$webshopList = document.querySelector('.webshop__list');
      this.$productDetail = document.querySelector('.product-detail');
      this.$shoppingCart = document.querySelector('.shopping-cart');
      this.$shoppingCartMenu = document.querySelector('.shoppingcart-menu');
      this.$closeButton = document.querySelector('.close__button');
      this.$addressCheck = document.querySelector('.address-check');
      this.$sectionOrderHidden = document.querySelector('.section-order--hidden');
      this.$addressField = document.querySelector('.address-field');
      this.$deliveryOptions = document.querySelector('.delivery-options');
      this.$toTopButton = document.getElementById('to-top-button');
    },
    buildUI () {
      // This function will build the user interface
      console.log('3. Build the user interface!');
      // this.$webshopList.innerHTML = this.generateHTMLForWebshopList();
      if (document.querySelector('.webshop__list') !== null) {
        this.$webshopList.innerHTML = this.generateHTMLForWebshopList();
      }
      // this.$productDetail.innerHTML = this.generateHTMLForProductDetail();
    },
    registerListeners () {
      // This function will register the different event listeners
      // Event listener 1: listens if the hamburger menu is clicked
      this.$hamburger.addEventListener('click', (event) => {
        this.showNavigation();
      });
      // Event listener 2: listens if the shopping cart is clicked
      this.$shoppingCart.addEventListener('click', (event) => {
        this.showShoppingCart();
      });
      // Event listener 3: listens if the close button is clicked
      if (document.querySelector('.close__button') !== null) {
        this.$closeButton.addEventListener('click', (event) => {
          document.querySelector('.shoppingcart-overlay').style.display = 'none';
          this.$shoppingCartMenu.classList.toggle('open');
        });
      }
      // Event listener 4: listens if the address checkbox is clicked
      if (document.querySelector('.address-check') !== null) {
        this.$addressCheck.addEventListener('change', (event) => {
          this.$sectionOrderHidden.classList.toggle('open');
        });
      }
      // Event listener 5: listens if something is typed into the address field
      if (document.querySelector('.address-field') !== null) {
        this.$addressField.addEventListener('change', (event) => {
          this.showDeliveryMenu();
        });
      }
      // Event listener 6: listens if the page up button is clicked
      this.$toTopButton.addEventListener('click', (event) => {
        const rootElement = document.documentElement;
        rootElement.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    },
    showNavigation () {
      this.$header__nav.classList.toggle('showNavig');
    },
    generateHTMLForWebshopList () {
      let tempStr = '';
      webshop.map((item) => {
        tempStr += `<div class="webshop-list__item">
        <a class="webshop-list__link" href="${item.link}">
            <span class="webshop-list__color webshop-list__color--${item.type}">
                <img class="webshop-list__img" src="${item.img}" alt="${item.name}"></img>
            </span>
        </a>
        <a href="${item.link}" class="webshop-list__ficaption">${item.name}</a><span class="figcaption__price">${item.price}</span>
    </div>`;
      }).join('');
      return tempStr;
    },
    showDeliveryMenu () {
      this.$deliveryOptions.innerHTML = `<div class="radio-container">
      <input class="order__input order__input--radio" type="radio" id="Beernem" name="delivery" value="Beernem"
              checked>
      <label class="order__label order__label--radio" for="Beernem"><span>Thuislevering in Beernem <span class="label--grey">We brengen jouw bestelling tot jou thuis in Beernem</span></span><span class="order__price">€ 0</span></label>
  </div>
  <div class="radio-container">
      <input class="order__input order__input--radio" type="radio" id="vicinity" name="delivery" value="vicinity">
      <label class="order__label order__label--radio" for="vicinity"><span>Thuislevering in Knesselare, Aalter, Oostkamp of Sijsele</span><span class="order__price">€ 10</span></label>
  </div>
  <div class="radio-container">
      <input class="order__input order__input--radio" type="radio" id="saturday" name="delivery" value="saterday">
      <label class="order__label order__label--radio" for="saterday"><span>Afhalen op zaterdag (tussen 11u en 18u)</span><span class="order__price">€ 0</span></label>
  </div>
  <div class="radio-container">
      <input class="order__input order__input--radio" type="radio" id="sunday" name="delivery" value="sunday">
      <label class="order__label order__label--radio" for="sunday"><span>Afhalen op zondag (tussen 8u en 12u)</span><span class="order__price">€ 0</span></label>
  </div>
  <div class="radio-container">
      <input class="order__input order__input--radio" type="radio" id="distant" name="delivery" value="distant">
      <label class="order__label order__label--radio" for="distant"><span>Levering buiten Beernem, Knesselare, Aalter, Oostkamp of Sijsele<span class="label--grey">Gelieve contact op te nemen via het contactformulier</span></span><span class="order__price">€ 0</span></label>
  </div>`;
    },
    URLSearchParams () {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const urlType = params.get('type');
      if (urlType !== null) {
        const item = webshop.find(item => item.type === urlType);
        if (item) {
          const tempStr = `<img class="product__img" src="${item.img}" alt="${item.name}"></img>
          <h1 class="product__title">${item.name}</h1>
          <span class="product__price">${item.price}</span>`;
          this.$productDetail.innerHTML = tempStr;
        }
      } else if (document.querySelector('.product-detail') !== null) {
        this.$productDetail.innerHTML = '<h2>Product niet gevonden</h2>';
      }
    },
    showShoppingCart () {
      document.querySelector('.shoppingcart-overlay').style.display = 'block';
      this.$shoppingCartMenu.classList.toggle('open');
    },
  };
  app.initialize();
})();
