/* ===================================================================
 * Lounge 1.0.0 - Main JS
 *
 *
 * ------------------------------------------------------------------- */

(function (html) {
  'use strict';

  const cfg = {
    // MailChimp URL
    mailChimpURL:
      'https://gmail.us8.list-manage.com/subscribe/post?u=0372f416821b8680ad7ce7df2&amp;id=d94694ee65&amp;f_id=001f16e1f0',
  };

  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {
    const siteBody = document.querySelector('body');
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;

    html.classList.add('ss-preload');

    window.addEventListener('load', function () {
      html.classList.remove('ss-preload');
      html.classList.add('ss-loaded');

      preloader.addEventListener('transitionend', function afterTransition(e) {
        if (e.target.matches('#preloader')) {
          siteBody.classList.add('ss-show');
          e.target.style.display = 'none';
          preloader.removeEventListener(e.type, afterTransition);
        }
      });
    });
  }; // end ssPreloader

  /* move header
   * -------------------------------------------------- */
  const ssMoveHeader = function () {
    const hdr = document.querySelector('.s-header');
    const hero = document.querySelector('#intro');
    let triggerHeight;

    if (!(hdr && hero)) return;

    setTimeout(function () {
      triggerHeight = hero.offsetHeight - 240;
    }, 120);

    window.addEventListener('scroll', function () {
      let loc = window.scrollY;

      if (loc > triggerHeight) {
        hdr.classList.add('sticky');
      } else {
        hdr.classList.remove('sticky');
      }

      if (loc > triggerHeight + 20) {
        hdr.classList.add('offset');
      } else {
        hdr.classList.remove('offset');
      }

      if (loc > triggerHeight + 150) {
        hdr.classList.add('scrolling');
      } else {
        hdr.classList.remove('scrolling');
      }
    });
  }; // end ssMoveHeader

  /* mobile menu
   * ---------------------------------------------------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector('.header-menu-toggle');
    const mainNavWrap = document.querySelector('.header-nav');
    const siteBody = document.querySelector('body');

    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener('click', function (e) {
      e.preventDefault();
      toggleButton.classList.toggle('is-clicked');
      siteBody.classList.toggle('menu-is-open');
    });

    mainNavWrap.querySelectorAll('.header-nav a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        // at 900px and below
        if (window.matchMedia('(max-width: 900px)').matches) {
          toggleButton.classList.toggle('is-clicked');
          siteBody.classList.toggle('menu-is-open');
        }
      });
    });

    window.addEventListener('resize', function () {
      // above 900px
      if (window.matchMedia('(min-width: 901px)').matches) {
        if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
        if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
      }
    });
  }; // end ssMobileMenu

  /* highlight active menu link on pagescroll
   * ------------------------------------------------------ */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll('.target-section');
    if (!sections) return;

    // Add an event listener listening for scroll
    window.addEventListener('scroll', navHighlight);

    function navHighlight() {
      // Get current scroll position
      let scrollY = window.pageYOffset;

      // Loop through sections to get height(including padding and border),
      // top and ID values for each
      sections.forEach(function (current) {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        /* If our current scroll position enters the space where current section
         * on screen is, add .current class to parent element(li) of the thecorresponding
         * navigation link, else remove it. To know which link is active, we use
         * sectionId variable we are getting while looping through sections as
         * an selector
         */
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector('.header-nav a[href*=' + sectionId + ']').parentNode.classList.add('current');
        } else {
          document.querySelector('.header-nav a[href*=' + sectionId + ']').parentNode.classList.remove('current');
        }
      });
    }
  }; // end ssScrollSpy

  /* glightbox
   * ------------------------------------------------------ */
  const ssGLightbox = function () {
    const lightbox = GLightbox({
      selector: '.glightbox',
      zoomable: false,
      touchNavigation: true,
      loop: false,
      autoplayVideos: true,
      svg: {
        close:
          '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>',
        prev: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z" fill-rule="nonzero"/></svg>',
        next: '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z" fill-rule="nonzero"/></svg>',
      },
    });
  }; // end ssGLightbox

  /* swiper
   * ------------------------------------------------------ */
  const ssSwiper = function () {
    const testimonialSlider = function () {
      const tSlider = document.querySelector('.testimonials-slider');
      if (!tSlider) return;

      const slider = new Swiper(tSlider, {
        slidesPerView: 1,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          // when window width is > 400px
          401: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is > 800px
          801: {
            slidesPerView: 2,
            spaceBetween: 44,
          },
          // when window width is > 1200px
          1201: {
            slidesPerView: 3,
            spaceBetween: 44,
          },
        },
      });
    }; // end testimonialSlider

    testimonialSlider();
  }; // end ssSwiper

  /* tabs
   * ---------------------------------------------------- */
  const sstabs = function (nextTab = false) {
    const tabList = document.querySelector('.tab-nav__list');
    const tabPanels = document.querySelectorAll('.tab-content__item');
    const tabItems = document.querySelectorAll('.tab-nav__list li');
    const tabLinks = [];

    if (!(tabList && tabPanels)) return;

    const tabClickEvent = function (tabLink, tabLinks, tabPanels, linkIndex, e) {
      // Reset all the tablinks
      tabLinks.forEach(function (link) {
        link.setAttribute('tabindex', '-1');
        link.setAttribute('aria-selected', 'false');
        link.parentNode.removeAttribute('data-tab-active');
        link.removeAttribute('data-tab-active');
      });

      // set the active link attributes
      tabLink.setAttribute('tabindex', '0');
      tabLink.setAttribute('aria-selected', 'true');
      tabLink.parentNode.setAttribute('data-tab-active', '');
      tabLink.setAttribute('data-tab-active', '');

      // Change tab panel visibility
      tabPanels.forEach(function (panel, index) {
        if (index != linkIndex) {
          panel.setAttribute('aria-hidden', 'true');
          panel.removeAttribute('data-tab-active');
        } else {
          panel.setAttribute('aria-hidden', 'false');
          panel.setAttribute('data-tab-active', '');
        }
      });

      window.dispatchEvent(new Event('resize'));
    };

    const keyboardEvent = function (tabLink, tabLinks, tabPanels, tabItems, index, e) {
      let keyCode = e.keyCode;
      let currentTab = tabLinks[index];
      let previousTab = tabLinks[index - 1];
      let nextTab = tabLinks[index + 1];
      let firstTab = tabLinks[0];
      let lastTab = tabLinks[tabLinks.length - 1];

      // ArrowRight and ArrowLeft are the values when event.key is supported
      switch (keyCode) {
        case 'ArrowLeft':
        case 37:
          e.preventDefault();

          if (!previousTab) {
            lastTab.focus();
          } else {
            previousTab.focus();
          }
          break;

        case 'ArrowRight':
        case 39:
          e.preventDefault();

          if (!nextTab) {
            firstTab.focus();
          } else {
            nextTab.focus();
          }
          break;
      }
    };

    // Add accessibility roles and labels
    tabList.setAttribute('role', 'tablist');
    tabItems.forEach(function (item, index) {
      let link = item.querySelector('a');

      // collect tab links
      tabLinks.push(link);
      item.setAttribute('role', 'presentation');

      if (index == 0) {
        item.setAttribute('data-tab-active', '');
      }
    });

    // Set up tab links
    tabLinks.forEach(function (link, i) {
      let anchor = link.getAttribute('href').split('#')[1];
      let attributes = {
        id: 'tab-link-' + i,
        role: 'tab',
        tabIndex: '-1',
        'aria-selected': 'false',
        'aria-controls': anchor,
      };

      // if it's the first element update the attributes
      if (i == 0) {
        attributes['aria-selected'] = 'true';
        attributes.tabIndex = '0';
        link.setAttribute('data-tab-active', '');
      }

      // Add the various accessibility roles and labels to the links
      for (var key in attributes) {
        link.setAttribute(key, attributes[key]);
      }

      // Click Event Listener
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });

      // Click Event Listener
      link.addEventListener('focus', function (e) {
        tabClickEvent(this, tabLinks, tabPanels, i, e);
      });

      // Keyboard event listener
      link.addEventListener('keydown', function (e) {
        keyboardEvent(link, tabLinks, tabPanels, tabItems, i, e);
      });
    });

    // Set up tab panels
    tabPanels.forEach(function (panel, i) {
      let attributes = {
        role: 'tabpanel',
        'aria-hidden': 'true',
        'aria-labelledby': 'tab-link-' + i,
      };

      if (nextTab) {
        let nextTabLink = document.createElement('a');
        let nextTabLinkIndex = i < tabPanels.length - 1 ? i + 1 : 0;

        // set up next tab link
        nextTabLink.setAttribute('href', '#tab-link-' + nextTabLinkIndex);
        nextTabLink.textContent = 'Next Tab';
        panel.appendChild(nextTabLink);
      }

      if (i == 0) {
        attributes['aria-hidden'] = 'false';
        panel.setAttribute('data-tab-active', '');
      }

      for (let key in attributes) {
        panel.setAttribute(key, attributes[key]);
      }
    });
  };

  /* mailchimp form
   * ---------------------------------------------------- */
  const ssMailChimpForm = function () {
    const mcForm = document.querySelector('#mc-form');

    if (!mcForm) return;

    // Add novalidate attribute
    mcForm.setAttribute('novalidate', true);

    // Field validation
    function hasError(field) {
      // Don't validate submits, buttons, file and reset inputs, and disabled fields
      if (
        field.disabled ||
        field.type === 'file' ||
        field.type === 'reset' ||
        field.type === 'submit' ||
        field.type === 'button'
      )
        return;

      // Get validity
      let validity = field.validity;

      // If valid, return null
      if (validity.valid) return;

      // If field is required and empty
      if (validity.valueMissing) return 'Please enter an email address.';

      // If not the right type
      if (validity.typeMismatch) {
        if (field.type === 'email') return 'Please enter a valid email address.';
      }

      // If pattern doesn't match
      if (validity.patternMismatch) {
        // If pattern info is included, return custom error
        if (field.hasAttribute('title')) return field.getAttribute('title');

        // Otherwise, generic error
        return 'Please match the requested format.';
      }

      // If all else fails, return a generic catchall error
      return 'The value you entered for this field is invalid.';
    }

    // Show error message
    function showError(field, error) {
      // Get field id or name
      let id = field.id || field.name;
      if (!id) return;

      let errorMessage = field.form.querySelector('.mc-status');

      // Update error message
      errorMessage.classList.remove('success-message');
      errorMessage.classList.add('error-message');
      errorMessage.innerHTML = error;
    }

    // Display form status (callback function for JSONP)
    window.displayMailChimpStatus = function (data) {
      // Make sure the data is in the right format and that there's a status container
      if (!data.result || !data.msg || !mcStatus) return;

      // Update our status message
      mcStatus.innerHTML = data.msg;

      // If error, add error class
      if (data.result === 'error') {
        mcStatus.classList.remove('success-message');
        mcStatus.classList.add('error-message');
        return;
      }

      // Otherwise, add success class
      mcStatus.classList.remove('error-message');
      mcStatus.classList.add('success-message');
    };

    // Submit the form
    function submitMailChimpForm(form) {
      let url = cfg.mailChimpURL;
      let emailField = form.querySelector('#mce-EMAIL');
      let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);

      if (url == '') return;

      url = url.replace('/post?u=', '/post-json?u=');
      url += serialize + '&c=displayMailChimpStatus';

      // Create script with url and callback (if specified)
      var ref = window.document.getElementsByTagName('script')[0];
      var script = window.document.createElement('script');
      script.src = url;

      // Create global variable for the status container
      window.mcStatus = form.querySelector('.mc-status');
      window.mcStatus.classList.remove('error-message', 'success-message');
      window.mcStatus.innerText = 'Submitting...';

      // Insert script tag into the DOM
      ref.parentNode.insertBefore(script, ref);

      // After the script is loaded (and executed), remove it
      script.onload = function () {
        this.remove();
      };
    }

    // Check email field on submit
    mcForm.addEventListener(
      'submit',
      function (event) {
        event.preventDefault();

        let emailField = event.target.querySelector('#mce-EMAIL');
        let error = hasError(emailField);

        if (error) {
          showError(emailField, error);
          emailField.focus();
          return;
        }

        submitMailChimpForm(this);
      },
      false
    );
  }; // end ssMailChimpForm

  /* alert boxes
   * ------------------------------------------------------ */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll('.alert-box');

    boxes.forEach(function (box) {
      box.addEventListener('click', function (e) {
        if (e.target.matches('.alert-box__close')) {
          e.stopPropagation();
          e.target.parentElement.classList.add('hideit');

          setTimeout(function () {
            box.style.display = 'none';
          }, 500);
        }
      });
    });
  }; // end ssAlertBoxes

  /* smoothscroll
   * ---------------------------------------------------- */
  const ssSmoothScroll = function () {
    // Easing functions for smooth scroll animation
    const easeFunctions = {
      easeInQuad: function (t, b, c, d) {
        t /= d;
        return c * t * t + b;
      },
      easeOutQuad: function (t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
      },
      easeInOutQuad: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
      easeSmoothInOut: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t * t * t + 2) + b;
      },
    };

    // Scroll configuration options
    const config = {
      // onStart: function() { console.log('Scroll started'); },
      // onComplete: function() { console.log('Scroll completed'); },
      tolerance: 0,
      duration: 1800,
      easing: 'easeSmoothInOut',
      container: window,
    };

    // Track animation state
    let animationFrameId = null;
    let isScrolling = false;

    // Smooth scroll to target element
    function smoothScrollTo(target, options) {
      // Cancel ongoing animation if active
      if (isScrolling && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      isScrolling = true;

      // Destructure options and set initial values
      const { duration, easing, tolerance, container, onStart, onComplete } = options;
      const startY = container === window ? window.pageYOffset : container.scrollTop;
      const startTime = performance.now();

      // Trigger start callback
      if (typeof onStart === 'function') onStart();

      // Animation loop
      function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate target position
        const targetRect = target.getBoundingClientRect();
        const targetY = (container === window ? targetRect.top + window.pageYOffset : targetRect.top) - tolerance;
        const change = targetY - startY;

        // Apply easing to scroll position
        const easedProgress = easeFunctions[easing](progress, startY, change, 1);

        // Update scroll position
        if (container === window) {
          window.scrollTo(0, easedProgress);
        } else {
          container.scrollTop = easedProgress;
        }

        // Continue or complete animation
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateScroll);
        } else {
          isScrolling = false;
          animationFrameId = null;

          // Ensure target is focusable
          if (target && target.focus && !target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
          }
          if (target && target.focus) {
            target.focus({ preventScroll: true });
          }

          // Trigger complete callback
          if (typeof onComplete === 'function') onComplete();
        }
      }

      // Start animation
      animationFrameId = requestAnimationFrame(animateScroll);
    }

    // Find smooth scroll triggers
    const triggers = document.querySelectorAll('.smoothscroll');

    // Add click event listeners to triggers
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const href = trigger.getAttribute('href');
        const target =
          href === '#'
            ? {
                getBoundingClientRect: function () {
                  return { top: 0 };
                },
              }
            : document.querySelector(href);

        // Scroll to target or warn if not found
        if (target) {
          smoothScrollTo(target, config);
        } else {
          console.warn(`Target "${href}" not found`);
        }
      });
    });
  }; // end ssSmoothScroll

  /* project modals
   * ------------------------------------------------------ */
  const ssProjectModals = function () {
    const projectCards = document.querySelectorAll('.project-card-clickable');
    const modals = document.querySelectorAll('.project-modal');
    const body = document.body;

    if (!projectCards.length) return;

    // Open modal function
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal) return;

      modal.style.display = 'flex';
      setTimeout(() => {
        modal.classList.add('active');
        body.style.overflow = 'hidden';
      }, 10);
    }

    // Close modal function
    function closeModal(modal) {
      if (!modal) return;

      modal.classList.remove('active');
      setTimeout(() => {
        modal.style.display = 'none';
        body.style.overflow = '';
      }, 300);
    }

    // Add click event to project cards
    projectCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        const modalId = card.getAttribute('data-modal-id');
        if (modalId) {
          // Prevent default link behavior
          if (e.target.closest('.project-card__link')) {
            e.preventDefault();
          }
          openModal(modalId);
        }
      });
    });

    // Close modal when clicking close button
    modals.forEach(function (modal) {
      const closeBtn = modal.querySelector('.project-modal__close');
      const overlay = modal.querySelector('.project-modal__overlay');
      const content = modal.querySelector('.project-modal__content');

      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          closeModal(modal);
        });
      }

      if (overlay) {
        overlay.addEventListener('click', function (e) {
          e.preventDefault();
          closeModal(modal);
        });
      }

      // Prevent closing when clicking inside content
      if (content) {
        content.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        modals.forEach(function (modal) {
          if (modal.classList.contains('active')) {
            closeModal(modal);
          }
        });
      }
    });
  }; // end ssProjectModals

  /* theme toggle
   * ------------------------------------------------------ */
  const ssThemeToggle = function () {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const body = document.body;

    if (!themeToggle) return;

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      html.classList.add('dark-mode');
      themeToggle.checked = true;
    }

    // Toggle theme
    themeToggle.addEventListener('change', function () {
      if (this.checked) {
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  }; // end ssThemeToggle

  /* language toggle
   * ------------------------------------------------------ */
  const ssLanguageToggle = function () {
    const langToggle = document.getElementById('lang-toggle');
    const html = document.documentElement;

    if (!langToggle) return;

    // Translations object
    const translations = {
      vi: {
        'nav.intro': 'Mở đầu',
        'nav.about': 'Sứ mệnh',
        'nav.projects': 'Dự án',
        'nav.team': 'Đội ngũ',
        'intro.welcome': 'Chào mừng bạn đến với!',
        'intro.quote':
          'Khoa học không chỉ là khám phá, mà còn là trách nhiệm kiến tạo một tương lai tốt đẹp hơn cho cộng đồng.',
        'intro.scroll': 'Cuộn xuống',
        'about.title': 'The First Mover',
        'about.vision.title': 'Tầm nhìn',
        'about.vision.text':
          'Chúng tôi hướng tới trở thành đơn vị tiên phong trong lĩnh vực Khoa học Cảm quan và Nghiên cứu Người tiêu dùng tại Việt Nam, dẫn dắt bằng năng lực ứng dụng dữ liệu, công nghệ và các mô hình đánh giá tiên tiến.',
        'about.mission.title': 'Sứ mệnh',
        'about.mission.text':
          'Chuẩn hóa và nâng tầm các phương pháp nghiên cứu cảm quan – từ thiết kế thí nghiệm, thu thập dữ liệu đến phân tích – nhằm đảm bảo độ chính xác, tính lặp lại và khả năng ứng dụng thực tiễn. Chúng tôi hỗ trợ doanh nghiệp ra quyết định R&D nhanh, hiệu quả và có cơ sở khoa học vững chắc.',
        'about.direction.title': 'Định hướng chuyên môn',
        'about.direction.text':
          'Dựa trên nền tảng khoa học cảm quan hiện đại kết hợp phân tích dữ liệu và công nghệ số, chúng tôi phát triển các giải pháp giúp doanh nghiệp hiểu sâu về trải nghiệm người tiêu dùng, tối ưu thử nghiệm sản phẩm và nâng cao độ tin cậy của mọi kết luận nghiên cứu.',
        'about.pillars.title': 'Ba trụ cột phát triển',
        'about.pillars.item1': 'Tư vấn chiến lược R&D và cảm quan theo chuẩn quốc tế.',
        'about.pillars.item2': 'Số hóa toàn diện quy trình đánh giá cảm quan, tối ưu tốc độ và độ chính xác dữ liệu.',
        'about.pillars.item3':
          'Nghiên cứu người tiêu dùng thế hệ mới dựa trên AI, Big Data và công nghệ đo lường hành vi (EEG, Eye-tracking, Biometrics).',
        'about.commitment.title': 'Cam kết',
        'about.commitment.text':
          'Chúng tôi xây dựng hệ sinh thái nghiên cứu tích hợp – khoa học, minh bạch và có khả năng dự báo – trở thành đối tác tin cậy đồng hành cùng doanh nghiệp trong đổi mới sản phẩm và phát triển bền vững ngành thực phẩm – đồ uống tại Việt Nam.',
        'projects.title': 'Dự án',
        'projects.view': 'Xem dự án →',
        'projects.group': 'Nhóm:',
        'projects.card.asr.category': 'ASR',
        'projects.card.asr.title': 'Ứng dụng AI trong ASR cảm quan',
        'projects.card.asr.desc': 'Huấn luyện mô hình nhận dạng giọng nói tiếng Việt tối ưu cho đánh giá cảm quan thực địa.',
        'projects.card.llm.category': 'LLM',
        'projects.card.llm.title': 'LLMs trích xuất thuật ngữ cảm quan',
        'projects.card.llm.desc': 'Fine-tune mô hình ngôn ngữ để nhận dạng và chuẩn hóa từ vựng cảm quan đa lĩnh vực.',
        'projects.card.consumer.category': 'Người tiêu dùng',
        'projects.card.consumer.title': 'LLMs nghiên cứu người tiêu dùng',
        'projects.card.consumer.desc': 'Ứng dụng mô hình hội thoại để phân tích insight cảm nhận và hành vi trải nghiệm sản phẩm.',
        'projects.card.nutri.category': 'AI',
        'projects.card.nutri.title': 'Nutrition - Cá nhân hóa dinh dưỡng',
        'projects.card.nutri.desc': 'Phát triển nền tảng web giúp chuẩn hóa đánh giá dinh dưỡng và trải nghiệm vị giác.',
        'projects.card.quality.category': 'Chất lượng',
        'projects.card.quality.title': 'Hệ thống thị giác máy tính',
        'projects.card.quality.desc':
          'Tự động hóa, phân tích hình ảnh và dashboard cho các ứng dụng kiểm soát sản phẩm trên dây chuyền công nghiệp.',
        'projects.card.qms.category': 'AI',
        'projects.card.qms.title': 'QMS - QLCL và truy xuất nguồn gốc',
        'projects.card.qms.desc':
          'Hỗ trợ lưu trữ và quản lý toàn bộ thông tin trong quá trình sản xuất thực phẩm, đảm bảo tính minh bạch và dễ dàng truy xuất.',
        'projects.card.chatbot.category': 'Phân tích',
        'projects.card.chatbot.title': 'Chatbot - Trợ lý ảo cảm quan',
        'projects.card.chatbot.desc':
          'Phát triển nền tảng chatbot giúp người dùng đánh giá cảm quan sản phẩm thông qua việc hỏi đáp tự động.',
        'projects.card.sensbft.category': 'Dữ liệu',
        'projects.card.sensbft.title': 'SenSBFT - Webapp đánh giá cảm quan',
        'projects.card.sensbft.desc':
          'Phát triển nền tảng quản lý và lưu trữ dữ liệu cảm quan tập trung, hỗ trợ truy vấn, phân tích và chia sẻ dữ liệu một cách hiệu quả.',
        'projects.modal.groupLabel': 'Nhóm:',
        'projects.modal.detailLabel': 'Mô tả chi tiết:',
        'projects.modal.asr.detail':
          'Dự án này tập trung vào việc phát triển và tối ưu hóa mô hình nhận dạng giọng nói tự động chuyên biệt cho tiếng Việt để hỗ trợ các nghiên cứu cảm quan thực địa.',
        'projects.modal.llm.detail':
          'Dự án sử dụng các mô hình ngôn ngữ lớn để tự động trích xuất và chuẩn hóa các thuật ngữ cảm quan từ nhiều lĩnh vực, giúp nâng cao chất lượng dữ liệu nghiên cứu.',
        'projects.modal.consumer.detail':
          'Ứng dụng mô hình hội thoại để phân tích sâu insight cảm nhận và hành vi trải nghiệm sản phẩm, tăng độ sâu cho các nghiên cứu người tiêu dùng.',
        'projects.modal.nutri.detail':
          'Nền tảng web cá nhân hóa dinh dưỡng dựa trên đánh giá cảm quan, kết hợp tiêu chuẩn hóa quy trình với đề xuất phù hợp cho từng người dùng.',
        'projects.modal.quality.detail':
          'Hệ thống thị giác máy tính tự động hóa quy trình kiểm soát chất lượng, phân tích hình ảnh thời gian thực và hiển thị dashboard trực quan cho dây chuyền công nghiệp.',
        'projects.modal.qms.detail':
          'QMS lưu trữ toàn bộ dữ liệu sản xuất thực phẩm, quản lý truy xuất nguồn gốc từ nguyên liệu đến thành phẩm để đảm bảo minh bạch và tuân thủ.',
        'projects.modal.chatbot.detail':
          'Chatbot trợ lý ảo cảm quan tương tác hỏi đáp tự động, hỗ trợ thu thập và phân tích dữ liệu cảm quan nhanh chóng hơn.',
        'projects.modal.sensbft.detail':
          'SenSBFT quản lý và lưu trữ dữ liệu cảm quan tập trung, hỗ trợ truy vấn, phân tích và chia sẻ thông tin một cách hệ thống.',
        'gallery.title': 'Hình ảnh hoạt động',
        'team.title': 'Đội ngũ',
        'footer.newsletter.heading': 'Đăng ký nhận bản tin để <br /> cập nhật tin tức và ưu đãi độc quyền.',
        'footer.newsletter.placeholder': 'Email của bạn',
        'footer.newsletter.cta': 'Đăng ký',
        'footer.location.title': 'Địa điểm',
        'footer.location.address': '456 Elm Street, Los Angeles <br /> CA 90001',
        'footer.contacts.title': 'Liên hệ',
        'footer.opening.title': 'Giờ hoạt động',
        'footer.opening.weekdays': 'Ngày thường',
        'footer.opening.weekends': 'Cuối tuần',
        'footer.backToTop': 'Lên đầu trang',
      },
      en: {
        'nav.intro': 'Introduction',
        'nav.about': 'Mission',
        'nav.projects': 'Projects',
        'nav.team': 'Team',
        'intro.welcome': 'Welcome to!',
        'intro.quote':
          'Science is not only about discovery - it is the responsibility to build a better future for the community.',
        'intro.scroll': 'Scroll Down',
        'about.title': 'The First Mover',
        'about.vision.title': 'Vision',
        'about.vision.text':
          'We aim to become a pioneer in the field of Sensory Science and Consumer Research in Vietnam, leading through the application of data, technology, and advanced evaluation models.',
        'about.mission.title': 'Mission',
        'about.mission.text':
          'Standardize and elevate sensory research methods – from experimental design, data collection to analysis – to ensure accuracy, repeatability, and practical applicability. We support businesses in making fast, effective, and scientifically sound R&D decisions.',
        'about.direction.title': 'Professional Direction',
        'about.direction.text':
          'Based on modern sensory science combined with data analysis and digital technology, we develop solutions to help businesses deeply understand consumer experiences, optimize product testing, and enhance the reliability of all research conclusions.',
        'about.pillars.title': 'Three Development Pillars',
        'about.pillars.item1': 'Strategic R&D and sensory consulting according to international standards.',
        'about.pillars.item2':
          'Comprehensive digitalization of sensory evaluation processes, optimizing speed and data accuracy.',
        'about.pillars.item3':
          'Next-generation consumer research based on AI, Big Data, and behavioral measurement technologies (EEG, Eye-tracking, Biometrics).',
        'about.commitment.title': 'Commitment',
        'about.commitment.text':
          'We build an integrated research ecosystem – scientific, transparent, and predictive – becoming a trusted partner accompanying businesses in product innovation and sustainable development of the food and beverage industry in Vietnam.',
        'projects.title': 'Projects',
        'projects.view': 'View Project →',
        'projects.group': 'Group:',
        'projects.card.asr.category': 'ASR',
        'projects.card.asr.title': 'AI-Powered Sensory ASR',
        'projects.card.asr.desc': 'Train Vietnamese speech recognition models optimized for on-site sensory assessments.',
        'projects.card.llm.category': 'LLM',
        'projects.card.llm.title': 'LLMs for Sensory Terminology',
        'projects.card.llm.desc': 'Fine-tune language models to identify and standardize multi-domain sensory vocabularies.',
        'projects.card.consumer.category': 'Consumer',
        'projects.card.consumer.title': 'LLMs for Consumer Research',
        'projects.card.consumer.desc': 'Apply conversational models to analyze perceived insights and product experience behaviors.',
        'projects.card.nutri.category': 'AI',
        'projects.card.nutri.title': 'Nutrition - Personalized Nutrition',
        'projects.card.nutri.desc': 'Build a web platform that standardizes nutrition evaluation and taste experiences.',
        'projects.card.quality.category': 'Quality',
        'projects.card.quality.title': 'Computer Vision Quality System',
        'projects.card.quality.desc': 'Automate image analysis and dashboards for industrial quality control scenarios.',
        'projects.card.qms.category': 'AI',
        'projects.card.qms.title': 'QMS - Quality & Traceability',
        'projects.card.qms.desc': 'Store and manage production data to ensure transparency and easy traceability.',
        'projects.card.chatbot.category': 'Analytics',
        'projects.card.chatbot.title': 'Chatbot - Sensory Virtual Assistant',
        'projects.card.chatbot.desc': 'Develop a chatbot platform that guides users through automated sensory evaluations.',
        'projects.card.sensbft.category': 'Data',
        'projects.card.sensbft.title': 'SenSBFT - Sensory Assessment Webapp',
        'projects.card.sensbft.desc': 'Develop a centralized sensory data platform for querying, analysis, and sharing.',
        'projects.modal.groupLabel': 'Group:',
        'projects.modal.detailLabel': 'Project Details:',
        'projects.modal.asr.detail':
          'This project develops and optimizes a Vietnamese-specific Automatic Speech Recognition model for field sensory research, turning spoken feedback into accurate transcripts.',
        'projects.modal.llm.detail':
          'Large language models automatically extract and standardize sensory terminology across domains, improving data consistency and research quality.',
        'projects.modal.consumer.detail':
          'Conversational models dive deep into consumer perception and product experience behaviors, interpreting interviews and surveys with higher fidelity.',
        'projects.modal.nutri.detail':
          'The web platform personalizes nutrition based on sensory assessments, combining standardized evaluation flows with tailored recommendations.',
        'projects.modal.quality.detail':
          'The computer vision system automates quality control, analyzes imagery in real time, and surfaces intuitive dashboards for production lines.',
        'projects.modal.qms.detail':
          'The QMS stores every production data point—from ingredients to final goods—to guarantee transparency and fast traceability.',
        'projects.modal.chatbot.detail':
          'The sensory virtual assistant interacts through automated Q&A to capture and analyze sensory data more efficiently.',
        'projects.modal.sensbft.detail':
          'SenSBFT centralizes sensory datasets, enabling structured querying, analytics, and collaboration for researchers and businesses.',
        'gallery.title': 'Activity Highlights',
        'team.title': 'Our Team',
        'footer.newsletter.heading': 'Subscribe to our mailing list for <br /> updates, news, and exclusive offers.',
        'footer.newsletter.placeholder': 'Your Email Address',
        'footer.newsletter.cta': 'Subscribe',
        'footer.location.title': 'Location',
        'footer.location.address': '456 Elm Street, Los Angeles <br /> CA 90001',
        'footer.contacts.title': 'Contacts',
        'footer.opening.title': 'Opening Hours',
        'footer.opening.weekdays': 'Weekdays',
        'footer.opening.weekends': 'Weekends',
        'footer.backToTop': 'Back To Top',
      },
    };

    // Load saved language preference
    let currentLang = localStorage.getItem('language') || 'vi';
    html.setAttribute('lang', currentLang);

    // Function to update language
    function updateLanguage(lang) {
      currentLang = lang;
      html.setAttribute('lang', lang);
      localStorage.setItem('language', lang);

      // Update all elements with data-i18n attribute
      document.querySelectorAll('[data-i18n]').forEach(function (element) {
        const key = element.getAttribute('data-i18n');
        const translation = translations[lang] && translations[lang][key];
        if (!translation) return;

        if (element.hasAttribute('data-i18n-html')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
          element.setAttribute('placeholder', translation);
        }
      });

      document.querySelectorAll('[data-i18n-value]').forEach(function (element) {
        const key = element.getAttribute('data-i18n-value');
        const translation = translations[lang] && translations[lang][key];
        if (translation) {
          element.setAttribute('value', translation);
        }
      });

      // Update language button text
      const langTexts = langToggle.querySelectorAll('.lang-btn__text');
      langTexts.forEach(function (text) {
        if (text.getAttribute('data-lang') === lang) {
          text.style.display = 'inline';
        } else {
          text.style.display = 'none';
        }
      });
    }

    // Toggle language
    langToggle.addEventListener('click', function () {
      const newLang = currentLang === 'vi' ? 'en' : 'vi';
      updateLanguage(newLang);
    });

    // Initialize language on page load
    updateLanguage(currentLang);
  }; // end ssLanguageToggle

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMoveHeader();
    ssMobileMenu();
    ssScrollSpy();
    ssGLightbox();
    ssSwiper();
    sstabs();
    ssMailChimpForm();
    ssAlertBoxes();
    ssSmoothScroll();
    ssProjectModals();
    ssThemeToggle();
    ssLanguageToggle();
  })();
})(document.documentElement);
