


// ========================================
// ハンバーガーメニュー
// ========================================
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const spNav = document.querySelector('.sp_nav');

  if (!hamburger || !spNav) return;


  // ----------------------------------------
  // ハンバーガー開閉
  // ----------------------------------------

  hamburger.addEventListener('click', () => {

    hamburger.classList.toggle('active');
    spNav.classList.toggle('active');

    const isOpen = hamburger.classList.contains('active');

    hamburger.setAttribute('aria-expanded', isOpen);

    document.body.classList.toggle('menu-open', isOpen);

  });


  // ----------------------------------------
  // SPアコーディオン
  // ----------------------------------------

  const spNavItems = document.querySelectorAll('.sp_nav_item');

  spNavItems.forEach(item => {

    const toggle = item.querySelector('.sp_nav_toggle');

    if (!toggle) return;

    toggle.addEventListener('click', () => {

      item.classList.toggle('active');

    });

  });


  // ----------------------------------------
  // SPメニュー内のリンクをクリックしたら閉じる
  // ----------------------------------------

  const spLinks = document.querySelectorAll(
    '.sp_nav_link, .sp_nav_sub a'
  );

  spLinks.forEach(link => {

    link.addEventListener('click', () => {

      hamburger.classList.remove('active');
      spNav.classList.remove('active');

      hamburger.setAttribute('aria-expanded', 'false');

      document.body.classList.remove('menu-open');

    });

  });

});

// ========================================
// スマホ ドロップダウン
// ========================================

// ========================================
// グローバルナビ（PC）
// ========================================

//固定
document.addEventListener('DOMContentLoaded', () => {
  const globalNav = document.querySelector('.global_nav');
  const mv = document.querySelector('.mv');
  if (!globalNav || !mv) return;
  const navTop = globalNav.offsetTop;
  window.addEventListener('scroll', () => {
    if (window.scrollY >= navTop) {
      globalNav.classList.add('is_fixed');
    } else {
      globalNav.classList.remove('is_fixed');
    }
  });
});

// 診療案内アコーディオン
document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.global_nav_item');
  navItems.forEach((navItem) => {
    navItem.addEventListener('mouseenter', () => {
      navItem.classList.add('active');
    });
    navItem.addEventListener('mouseleave', () => {
      navItem.classList.remove('active');
    });
  });
});

// ========================================
// MV
// ========================================

// スライダー
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.mv_slide');
  const dots = document.querySelectorAll('.mv_dot');
  const images = document.querySelectorAll('.mv_slide img');
  let currentIndex = 0;
  const slideDuration = 7000;
  let timer;

  // スライド切り替え
  function showSlide(index) {
    if (index >= slides.length) {
      index = 0;
    }

    if (index < 0) {
      index = slides.length - 1;
    }

    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  // 自動再生
  function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideDuration);
  }

  // タイマーリセット
  function resetTimer() {
    startTimer();
  }

  // ドット
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      resetTimer();
    });
  });

  // 画像をすべて事前読み込み
  const preloadImages = [...images].map(img => {
    if (img.complete) {
      return Promise.resolve();
    }

    return new Promise(resolve => {
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  });

  // すべて読み込んでからスライダー開始
  Promise.all(preloadImages).then(() => {
    showSlide(0);
    startTimer();
  });
});

// ========================================
// スクロールアニメーション
// ========================================
const targets = document.querySelectorAll('.fade-up');

if (targets.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  targets.forEach(target => observer.observe(target));
}

// ========================================
// トップへ戻るボタン
// ========================================
const pageTop = document.querySelector('.page-top');

if (pageTop) {
  window.addEventListener('scroll', () => {
    pageTop.classList.toggle('is-show', window.scrollY > 300);
  });

  pageTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

