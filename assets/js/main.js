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