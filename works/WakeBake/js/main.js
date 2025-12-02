
(function () {
  // Бургер меню
  document.addEventListener('click', burgerInin)
  function burgerInin(e) {
    const target = e.target
    const burgerIcon = target.closest(".burger-icon")
    const burgerNavLink = target.closest(".nav__link")
    const width = document.documentElement.clientWidth

    if (width <= 900 && (burgerIcon || burgerNavLink)) {
      document.body.classList.toggle("body--opened-menu")
    }
  }
  const about__img = document.querySelector(".about__img-button")
  const modal = document.querySelector(".modal")
  // --------------------------------------------------

  // Модалка 
  about__img.addEventListener('click', modaOpen)
  modal.addEventListener("click", modalClose)
  function modaOpen(e) {
    e.preventDefault()
    document.body.classList.add("body--opened-modal")
  }

  function modalClose(e) {
    e.preventDefault()
    const target = e.target
    if (target.closest('.modal__canel') || target.classList.contains('modal')) {
      document.body.classList.remove("body--opened-modal")
    }

  }
  // ---------------------------------------------------

  // Таб
  const tabControls = document.querySelector(".tab-controls")

  tabControls.addEventListener("click", toggleTab)

  function toggleTab(e) {
    const target = e.target
    const tabControl = target.closest(".tab-controls__link")

    if (!tabControl) return
    e.preventDefault()
    if (tabControl.classList.contains("tab-controls--active")) return


    const tabContentID = tabControl.getAttribute("href")
    const tabContent = document.querySelector(tabContentID)
    const tabContentShow = document.querySelector(".tab-content--show")
    const tabControlsActive = document.querySelector(".tab-controls--active")

    tabContentShow.classList.remove("tab-content--show")
    tabControlsActive.classList.remove("tab-controls--active")

    tabContent.classList.add("tab-content--show")
    tabControl.classList.add('tab-controls--active')
  }
  //------------------------------------------------------


  //  Акардион 

  const accordionLists = document.querySelectorAll(".accordion-list")
  accordionLists.forEach(el => {
    el.addEventListener("click", e => {
      const accordionList = e.currentTarget
      const accordionOpen = accordionList.querySelector(".accordion-list__item--opened")
      const accordionControl = e.target.closest(".accordion-list__control")

      if (!accordionControl) return
      e.preventDefault()
      const accordionItem = accordionControl.parentElement;
      if (accordionOpen && accordionItem != accordionOpen) {
        accordionOpen.classList.remove("accordion-list__item--opened")
      }

      accordionItem.classList.toggle("accordion-list__item--opened")


    })
  })

  // Слайдер-галерия 


  const swiperGallery = new Swiper('.gallery__slider', {

    spaceBetween: 15,
    slidesPerView: 1.5,

    pagination: {
      el: '.gallery__pagination',
      type: 'fraction',
    },

    navigation: {
      nextEl: '.gallery__next',
      prevEl: '.gallery__prev',
    },
    breakpoints: {

      601: {
        slidesPerView: 3,
      },
      801: {
        spaceBetween: 32
      },
      1101: {
        slidesPerView: 4,
        spaceBetween: 32
      }
    }
  });

  // Слайдер-отзывы
  const swiperReviews = new Swiper('.reviews__slider', {

    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    // centeredSlidesBounds: true,

    navigation: {
      nextEl: '.reviews__next',
      prevEl: '.reviews__prev',
    },

    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
    },

    breakpoints: {

      901: {
        slidesPerView: 1.5,
      },
      1201: {
        slidesPerView: 2.1,
      }
    }
  });


  // Маска для телефона 
  const telInputs = document.querySelectorAll("input[type='tel']")
  const im = new Inputmask('+7 (999) 999-99-99')
  im.mask(telInputs)
})()