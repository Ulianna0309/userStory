function LangSwitcher() {
    // VARS
    const switchers = document.querySelectorAll('[data-switcher]');
    if (!switchers.length) return;
    const activeClass = 'lang-switcher-v1__list--open';
  
    // LISTENERS
    document.addEventListener('click', handleOnClickDocument, false);
  
    document.addEventListener('keydown', handleOnKeyDown);
  
  
    // HANDLERS
    function handleOnClickDocument(e) {
        if(!e.target.closest('[data-switcher]')) {
          closeAll();
        }
    }
  
    function handleOnKeyDown(e) {
      if (e.key === "Escape") {
        closeAll();
      }
  
      if (e.key === "Tab") {
        setTimeout(() => {
          toggleLangSwitcherOnTab();
        }, 0);
      }
    }
  
  
    // FUNCTIONS & METHODS
    const closeAll = () => {
      switchers.forEach(switcher => {
        switcher.querySelector('[data-switcher-list]').classList.remove(activeClass);
      })
    }
  
    const toggleLangSwitcherOnTab = () => {
      const activeElement = document.activeElement;
      const activeElementContainer = activeElement.closest('[data-switcher-list]');
  
      activeElementContainer ? activeElementContainer.classList.add(activeClass) : 
      closeAll();
    }
  }
  LangSwitcher();



function AnimateTickerV1() {
    const tickers = document.querySelectorAll('[data-ticker]');
    if (!tickers.length) return;
  
    tickers.forEach((ticker) => {
      const innerEl = ticker.querySelector('[data-ticker-inner]');
      const speed = +ticker.dataset.tickerSpeed;
      const direction = ticker.dataset.tickerDirection;
      const innerWidth = innerEl.offsetWidth;
      const cloneEl = innerEl.cloneNode(true);
  
      direction === 'to_left'
        ? ticker.prepend(cloneEl)
        : ticker.appendChild(cloneEl);
  
      let start = performance.now();
      let progress;
      let translateX;
  
      requestAnimationFrame(function step(now) {
        progress = (now - start) / speed;
  
        if (progress > 1) {
          progress %= 1;
          start = now;
        }
  
        if (direction === 'to_left') {
          translateX = innerWidth * progress;
          innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
          cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
        } else {
          translateX = innerWidth * progress - innerWidth;
          innerEl.style.transform = `translate3d(${translateX}px, 0 , 0)`;
          cloneEl.style.transform = `translate3d(${translateX}px, 0 , 0)`;
        }
  
        requestAnimationFrame(step);
      });
    })
  }

  AnimateTickerV1()


function Hamburger() {
    // VARS
    const hamburger = document.querySelector('[data-hamburger]');
    const activeClass = 'hamburger-v1--active';
  
    // LISTENERS
    hamburger?.addEventListener('click', handleOnClickHamburger, false)
  
    // HANDLERS
    function handleOnClickHamburger() {
      toggle();
    }
  
    // FUNCTIONS & METHODS
    const toggle = () => {
      hamburger.classList.toggle(activeClass);
    }
  }

  Hamburger()


  function phoneMask() {
    // VARS
    const phoneInputs = document.querySelectorAll('[data-phone-mask]');
    if (!phoneInputs.length) return false;

    // LISTENERS
    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener("input", initMask, false);
        phoneInput.addEventListener("focus", initMask, false);
        phoneInput.addEventListener("blur", function() {
            const mask = this.dataset.phoneMask;
            const currentDefaultMask = mask.substring(0, mask.indexOf("_"));
            if (this.value.length === currentDefaultMask.length) {
                this.value = '';
            }
        }, false);
    });

    // FUNCTIONS & METHODS
    function initMask(event) {
        const mask = this.dataset.phoneMask;
        const currentDefaultMask = mask.substring(0, mask.indexOf("_"));

        // insert default mask if user try delete him
        const pos = this.selectionStart;
        if (pos < currentDefaultMask.length && event.inputType === 'deleteContentBackward') {
            event.preventDefault();
            this.value = currentDefaultMask;
            this.selectionStart = currentDefaultMask.length;
        }

        let i = 0;
        const def = mask.replace(/\D/g, "");

        const val = this.value.replace(/\D/g, "");
        let new_value = mask.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });

        i = new_value.indexOf("_");

        if (i !== -1) {
            new_value = new_value.slice(0, i);
        }

        let reg = mask.substr(0, this.value.length).replace(/_+/g, function (a) {
            return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");

        reg = new RegExp("^" + reg + "$");

        if (!reg.test(this.value) || this.value.length < currentDefaultMask.length) {
            this.value = new_value;
        }
    }
}

phoneMask()


// import intlTelInput from 'intl-tel-input';
// import 'intl-tel-input/build/js/utils.js';

// function initIntlTel(selector) {
//   const input = document.querySelector(selector);
//   if (!input) return;
//   let iti;

//   if (!input.hasAttribute('data-intl-tel-input-id')) {
//     iti = intlTelInput(input, {
//       separateDialCode: true,
//       nationalMode: false,
//       autoPlaceholder: 'polite',
//     });

//     setAttributeForMask(input);
//     phoneMask();

//     input.addEventListener('countrychange', function () {
//       this.value = '';
//       this.blur();
//       setAttributeForMask(this);
//     });
//   }

//   function setAttributeForMask(input) {
//     const placeholder = input.getAttribute('placeholder');
//     input.dataset.phoneMask = placeholder.replace(/[0-9]/gi, '_');
//   }

//   return iti;
// }

// initIntlTel()






const Hamburger2 = () => {
  // VARS
  const hamburger = document.querySelector('[data-hamburger2]');
  const activeClass = 'hamburger-v1--active';

  // LISTENERS
  hamburger?.addEventListener('click', handleOnClickHamburger, false)

  // HANDLERS
  function handleOnClickHamburger() {
    toggle();
  }

  // FUNCTIONS & METHODS
  const toggle = () => {
    hamburger.classList.toggle(activeClass);
  }
}
Hamburger2()


// import { anime } from 'animejs';

const DropDownLinks = () => {
  // VARS
  const dropdownLinksButtons = document.querySelectorAll('[data-header-dropdown-link]');
  const submenus = document.querySelectorAll('[data-header-dropdown-list]');
  const activeClassArrow = 'header-v1__link-dropdown-arrow--open';
  const activeClass = 'header-v1__sublist--visible-on-focus';

  // LISTENERS
  dropdownLinksButtons.forEach(button => {
    button.addEventListener('click', handleOnClickDropdownButton, false);
  });

  document.addEventListener('keydown', handleOnKeydown);

  document.addEventListener('click', handleOnClickDocument, false);

  document.addEventListener('scroll', handleOnScroll, false);

  // HANDLERS
  function handleOnClickDropdownButton(event) {
    if (window.innerWidth < 1024) {
      event.preventDefault();
      toggleDropdown(this);
    }
  }

  function handleOnKeydown(event) {
    if (event.key === "Tab") {
      setTimeout(() => {
        toggleSubmenuOnTab();
      }, 0);
    }

    if (event.key === "Escape") {
      closeAll();
    }
  }

  function handleOnClickDocument(e) {
    if(!e.target.closest('[data-header-dropdown-list-wrapper]')) {
      closeAll();
    }
  }

  function handleOnScroll() {
    closeAll();
  }

  // FUNCTIONS & METHODS
  const toggleDropdown = (button) => {
    const dropdownList = button.closest('[data-header-dropdown-list-wrapper]').querySelector('[data-header-dropdown-list]');
    const stateDropdownList = dropdownList.dataset.headerDropdownList;
    button.classList.toggle(activeClassArrow);

    if (stateDropdownList === 'close') {
      openDropdown(dropdownList);
    } else {
      closeDropdown(dropdownList);
    }
  }

  const openDropdown = (dropdownList) => {
    anime({
      targets: dropdownList,
      height: [0, dropdownList.scrollHeight],
      duration: 300,
      easing: 'easeOutExpo',
      complete: function() {
        dropdownList.style.height = 'auto';
        dropdownList.dataset.headerDropdownList = 'open';
      }
    })
  }

  const closeDropdown = (dropdownList) => {
    dropdownList.style.height = dropdownList.scrollHeight + 'px';

    anime({
      targets: dropdownList,
      height: [dropdownList.scrollHeight, 0],
      duration: 500,
      easing: 'easeOutExpo',
      complete: function() {
        dropdownList.style.height = '';
        dropdownList.dataset.headerDropdownList = 'close';
      }
    })
  }

  const toggleSubmenuOnTab = () => {
    const activeElement = document.activeElement;
    const activeElementContainer = activeElement.closest('[data-header-dropdown-list]');

    if (activeElementContainer) {
      activeElementContainer.classList.add(activeClass)
    } else {
      closeAll();
    }
  }

  const closeAll = () => {
    submenus.forEach(submenu => {
      submenu.classList.remove(activeClass);
    })
  }
}

const MobileMenu = () => {
  // INITS
  // new DropDownLinks();
  // new LangSwitcher();
  // initStopAnimationOnResize();
  // new Hamburger();

  // VARS
  const header = document.querySelector('[data-header]');
  const hamburger = document.querySelector('[data-hamburger]');
  const activeClass = 'header-v1--open';

  // LISTENERS
  hamburger?.addEventListener('click', handleOnClickHamburger, false);

  // HANDLERS
  function handleOnClickHamburger() {
    toggle();
    // header?.classList.contains(activeClass) ? disableScroll() : enableScroll();
  }

  // FUNCTIONS & METHODS
  const toggle = () => {
    header?.classList.toggle(activeClass);
  }
}

MobileMenu()



const InitMessenger = () => {
  // VARS
  const $this = this;
  const chat = document.querySelector('[data-messenger-v1]');
  const activeClass = 'messenger-v1--is-open';
  if (!chat) return;

  // LISTENERS
  chat.addEventListener('click', handleOnClick, false);

  document.addEventListener('keydown', handleOnKeydown);

  document.addEventListener('click', handleOnClickDocument, false);

  // HANDLERS
  function handleOnClick() {
    toggle();
  }

  function handleOnKeydown(event) {
    if (event.key === "Escape") {
      close();
    }

    if (event.key === "Tab") {
      setTimeout(() => {
        toggleOnTab();
      }, 0);
    }
  }

  function handleOnClickDocument(event) {
    if(!event.target.closest('[data-messenger-v1]')) {
      close();
    }
  }

  // METHODS & FUNCTIONS
  const toggle = () => {
    chat.classList.contains(activeClass) ? close() : open();
  }

  const open = () => {
    chat.classList.add(activeClass);
  }

  const close = () => {
    chat.classList.remove(activeClass);
  }

  const toggleOnTab = () => {
    const activeElement = document.activeElement;
    const activeElementContainer = activeElement.closest('[data-messenger-v1]');

    activeElementContainer ? open() : close();
  }
}

InitMessenger()

const initScrollDownButton = (distance = window.innerHeight) => {
  const button = document.querySelector('[data-scroll-down-button]');

  button?.addEventListener('click', function () {
    window.scrollTo({
      top: distance,
      behavior: 'smooth',
    })
  })
}

initScrollDownButton();


const initScrollToTop = () => {
  // VARS
  const button = document.querySelector('[data-scroll-to-top-button]');
  if (!button) return;

  // LISTENERS
  button.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })

  window.addEventListener('scroll', function () {
    toggleButton();
  })

  // INITS
  toggleButton();


  // FUNCTION
  function toggleButton() {
    window.pageYOffset > 400
      ? button.classList.add('scroll-to-top-button-v1--visible')
      : button.classList.remove('scroll-to-top-button-v1--visible');
  }
};

initScrollToTop()


// import anime from 'animejs/lib/anime.es.js';

const initAccordion = () => {
  // VARS
  const toggles = document.querySelectorAll('[data-accordion-toggle]');
  if (!toggles.length) return;
  let duration = 300;
  const activeClass = 'accordion-v1--is-open';

  // EVENTS
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', handleOnClick, false);
  });

  // HANDLERS
  function handleOnClick() {
    const accordion = this.closest('[data-accordion]');
    const accordionWrapper = accordion.closest('[data-accordions]');
    const isNeedClosePrevious = accordionWrapper.dataset.accordions;

    if (isNeedClosePrevious === 'close-previous') {
      const previousAccordion = accordionWrapper.querySelector(`.${activeClass}`);

      if (previousAccordion) {
        if (previousAccordion === accordion) {
          toggleAccordion(accordion);
        } else {
          closeAccordion(previousAccordion);
          openAccordion(accordion);
        }
      } else {
        toggleAccordion(accordion);
      }
    } else {
      toggleAccordion(accordion);
    }
  }

  // FUNCTIONS
  function openAccordion(accordion) {
    const body = accordion.querySelector('[data-accordion-body]');
    const height = body.scrollHeight;
    accordion.classList.add(activeClass);

    anime({
      targets: body,
      height: [0, height],
      easing: 'linear',
      duration: duration,
      complete: function () {
        body.style.height = 'auto';
      },
    });
  }

  function closeAccordion(accordion) {
    const body = accordion.querySelector('[data-accordion-body]');
    const height = body.scrollHeight;
    body.style.height = `${height}px`;
    accordion.classList.remove(activeClass);

    anime({
      targets: body,
      height: 0,
      easing: 'linear',
      duration: duration,
    });
  }

  function toggleAccordion(accordion) {
    accordion.classList.contains(activeClass) ? closeAccordion(accordion) : openAccordion(accordion);
  }
};
initAccordion();