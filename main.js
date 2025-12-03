// Мобильное меню
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      menuToggle.innerHTML = navLink.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Закрытие меню при клике на ссылку
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', function () {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Анимация счетчиков статистики
  const statNumbers = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target;
        const target = parseInt(statNumber.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            clearInterval(timer);
            current = target;
          }
          statNumber.textContent = Math.floor(current);
        }, 16);

        observer.unobserve(statNumber);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });

  // Анимация навыков
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillLevel = entry.target;
        const level = skillLevel.getAttribute('data-level');
        skillLevel.style.width = level + '%';

        // Добавляем значение процента
        const skillName = skillLevel.closest('.skill-item').querySelector('.skill-name');
        const percentSpan = document.createElement('span');
        percentSpan.className = 'skill-percent';
        percentSpan.textContent = level + '%';
        skillName.appendChild(percentSpan);

        skillsObserver.unobserve(skillLevel);
      }
    });
  }, { threshold: 0.5 });

  skillLevels.forEach(skill => {
    skillsObserver.observe(skill);
  });

  // Фильтрация работ
  const filterButtons = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      workCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Обработка формы
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Получаем данные формы
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;

      // Визуальная обратная связь
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
      submitBtn.disabled = true;

      // Имитация отправки (в реальном проекте здесь был бы fetch/axios)
      setTimeout(() => {
        console.log('Форма отправлена:', {
          name: name,
          email: email,
          subject: contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
          message: contactForm.querySelector('textarea').value
        });

        // Успешная отправка
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
        submitBtn.style.backgroundColor = 'var(--success)';

        // Показываем уведомление
        showNotification('Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.', 'success');

        // Сброс формы через 2 секунды
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }

  // Функция показа уведомлений
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
          <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
          <span>${message}</span>
          <button class="notification-close"><i class="fas fa-times"></i></button>
      `;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Закрытие по кнопке
    notification.querySelector('.notification-close').addEventListener('click', function () {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });

    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
      if (notification.parentNode) {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
  }

  // Добавляем стили для уведомлений
  const notificationStyles = document.createElement('style');
  notificationStyles.textContent = `
      .notification {
          position: fixed;
          top: 100px;
          right: 20px;
          background-color: var(--bg-card);
          border-left: 4px solid var(--accent);
          padding: 20px;
          border-radius: 8px;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          gap: 15px;
          min-width: 300px;
          max-width: 400px;
          transform: translateX(400px);
          transition: transform 0.3s ease;
          z-index: 10000;
          border: 1px solid var(--border-color);
      }
      
      .notification.show {
          transform: translateX(0);
      }
      
      .notification-success {
          border-left-color: var(--success);
      }
      
      .notification i {
          font-size: 1.2rem;
          color: var(--accent);
      }
      
      .notification-success i {
          color: var(--success);
      }
      
      .notification span {
          flex: 1;
          color: var(--text-primary);
      }
      
      .notification-close {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 5px;
          transition: var(--transition);
      }
      
      .notification-close:hover {
          color: var(--accent);
      }
  `;
  document.head.appendChild(notificationStyles);

  // Плавная прокрутка
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        window.scrollTo({
          top: targetElement.offsetTop - navbarHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // Анимация при скролле
  const fadeElements = document.querySelectorAll('.section, .hero-content, .work-card, .skill-category');
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(element => {
    fadeObserver.observe(element);
  });

  // Обновление года в футере
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = currentYear;
  }

  // Эффект glitch для заголовка
  const glitchElement = document.querySelector('.glitch');
  if (glitchElement) {
    setInterval(() => {
      glitchElement.style.textShadow = `
              ${Math.random() * 2}px ${Math.random() * 2}px 0 #ff00ff,
              ${Math.random() * -2}px ${Math.random() * -2}px 0 #00ffff
          `;
    }, 100);

    setTimeout(() => {
      glitchElement.style.textShadow = 'none';
    }, 300);
  }

  // Активация навигации при скролле
  const sections = document.querySelectorAll('section[id]');
  const navLink = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLink.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// Добавляем стили для скролла и выделения
document.addEventListener('DOMContentLoaded', function () {
  // Стили для выделения текста
  const selectionStyle = document.createElement('style');
  selectionStyle.textContent = `
      ::selection {
          background-color: var(--accent);
          color: white;
      }
      
      ::-moz-selection {
          background-color: var(--accent);
          color: white;
      }
  `;
  document.head.appendChild(selectionStyle);
});