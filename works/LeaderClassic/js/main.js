(function () {

  // переключалка языка
  languageFlag = document.querySelector(".language-flag")
  languageSelect = document.querySelector(".language__select")

  function updateFlag() {
    selectValue = languageSelect.value
    console.log(selectValue)
    languageFlag.className = 'language-flag language-flag--' + selectValue
  }
  updateFlag()
  languageSelect.addEventListener('change', updateFlag);



  // ====================================

  // Таймер 

  document.addEventListener('DOMContentLoaded', () => {

    const deadline = new Date('2025-12-29T23:35:00');


    const elDays = document.querySelector('.timer__days');
    const elHours = document.querySelector('.timer__hours');
    const elMinutes = document.querySelector('.timer__minutes');
    const elSeconds = document.querySelector('.timer__seconds');

    elDays.dataset.title = "д";
    elHours.dataset.title = "ч";
    elMinutes.dataset.title = "м";
    elSeconds.dataset.title = "с";


    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, deadline - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      elDays.textContent = String(days).padStart(2, '0');
      elHours.textContent = String(hours).padStart(2, '0');
      elMinutes.textContent = String(minutes).padStart(2, '0');
      elSeconds.textContent = String(seconds).padStart(2, '0');

      if (diff === 0) {
        clearInterval(timerId);
      }
    };

    // Запустите таймер
    updateTimer();
    const timerId = setInterval(updateTimer, 1000);



    // ================================
    // Бургер - меню

    document.addEventListener("click", burgerInit)
    function burgerInit(e) {
      const body = document.body
      const target = e.target
      const burgerIcon = target.closest(".burger-icon")
      const navLink = target.closest(".nav__link")
      const width = document.documentElement.clientWidth
      if (width <= 1200 && (burgerIcon || navLink)) {
        body.classList.toggle("body--opened-menu")
      }
    }
  });


  // свайпер-мобилка

  const swiper = new Swiper('.swiper', {
    spaceBetween: 5,
    slidesPerView: 2,
    centeredSlides: true,
    initialSlide: 3,
    loop: true,

    breakpoints: {

      401: {
        slidesPerView: 2.4,
      },
      601: {
        slidesPerView: 3.7,
      },
      801: {
        slidesPerView: 5,
      }

    }

  });

  // риск 
  const range = document.querySelector(".briefcase__range");
  const progress = document.querySelector(".briefcase__progress");
  const procent = document.querySelector(".briefcase__percent")
  const risk = document.querySelector(".briefcase__risk")

  range.oninput = function () {
    const val = this.value;
    const max = range.max;
    const progressVal = (val / max) * 100;
    range.style.setProperty('--progress', progressVal + '%');

    progress.classList.remove("briefcase__progress--low", "briefcase__progress--medium", "briefcase__progress--high");

    if (val > 10 && val < 20) {
      progress.classList.add("briefcase__progress--medium");
      procent.textContent = "до 15%";
      risk.textContent = "Средний риск"
      risk.className = "briefcase__risk briefcase__risk--medium"
    } else if (val >= 20) {
      progress.classList.add("briefcase__progress--high");
      procent.textContent = "до 30%";
      risk.textContent = "Высокий риск"
      risk.className = "briefcase__risk briefcase__risk--high"
    } else {
      progress.classList.add("briefcase__progress--low");
      procent.textContent = "до 5%";
      risk.textContent = "Низкий риск"
      risk.className = "briefcase__risk briefcase__risk--low"
    }
  }

  // аакордион 

  const accordionList = document.querySelector(".accordion-list")

  accordionList.addEventListener("click", e => {
    target = e.target
    accordionOpen = accordionList.querySelector(".accordion-list__item--opened")
    accordionControl = target.closest(".accordion-list__control")

    if (!accordionControl) return;

    const accordionListItem = accordionControl.parentElement;

    if (accordionOpen && accordionListItem != accordionOpen) {
      accordionOpen.classList.remove("accordion-list__item--opened");
    }
    accordionListItem.classList.toggle("accordion-list__item--opened")

  })


  // Маска для телефона 
  const telInputs = document.querySelectorAll("input[type='tel']")
  const im = new Inputmask('+7 (999) 999-99-99')
  im.mask(telInputs)


})();