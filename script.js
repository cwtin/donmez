/* ===== DÖNMEZ İNŞAAT — Script ===== */

// ===== LOADER =====
window.addEventListener('load', function () {
  setTimeout(function () {
    var loader = document.querySelector('.loader');
    if (loader) loader.classList.add('hidden');
  }, 1400);
});

// ===== SCROLL PROGRESS =====
var scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', function () {
  var scrollTop = document.documentElement.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var progress = (scrollTop / scrollHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// ===== NAVBAR SCROLLED STATE =====
var navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function () {
  if (!navbar) return;
  if (navbar.classList.contains('always')) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== REVEAL ON SCROLL (IntersectionObserver) =====
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
  revealObserver.observe(el);
});

// ===== MOBILE MENU =====
var navToggle = document.querySelector('.nav-toggle');
var mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
  // Create overlay
  var overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);

  navToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('visible');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      overlay.classList.remove('visible');
    });
  });
}

// ===== BACK TO TOP =====
var backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== ACTIVE NAV LINK =====
(function () {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// ===== CONTACT FORM - WHATSAPP =====
var contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    var name = contactForm.name.value.trim();
    var phone = contactForm.phone.value.trim();
    var email = contactForm.email.value.trim();
    var service = contactForm.service.value;
    var budget = contactForm.budget.value;
    var message = contactForm.message.value.trim();

    var text =
`🏗️ *DÖNMEZ İNŞAAT*

📩 *Yeni Teklif Talebi*

━━━━━━━━━━━━━━

👤 *Ad Soyad*
${name}

📞 *Telefon*
${phone}

📧 *E-Posta*
${email}`;

    if (service) {
      text += `

🏢 *Hizmet Tipi*
${service}`;
    }

    if (budget) {
      text += `

💰 *Bütçe Aralığı*
${budget}`;
    }

    text += `

━━━━━━━━━━━━━━

📝 *Mesaj*

${message}`;

    window.open(
      "https://wa.me/905078424158?text=" +
      encodeURIComponent(text),
      "_blank"
    );

    contactForm.reset();

  });

}

// ===== GALLERY FILTER =====
(function () {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.dataset.filter;
      items.forEach(function (item) {
        if (filter === 'all' || item.dataset.cat === filter) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
})();

// ===== LIGHTBOX =====
(function () {
  var galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      if (!img) return;

      var lb = document.createElement('div');
      lb.className = 'lightbox';

      var lbImg = document.createElement('img');
      lbImg.src = img.src.replace('w=600', 'w=1200');
      lb.appendChild(lbImg);

      var close = document.createElement('button');
      close.className = 'lightbox-close';
      close.innerHTML = '&times;';
      close.setAttribute('aria-label', 'Close');
      lb.appendChild(close);

      document.body.appendChild(lb);

      function closeLb() {
        lb.remove();
        document.removeEventListener('keydown', escHandler);
      }
      function escHandler(e) {
        if (e.key === 'Escape') closeLb();
      }

      lb.addEventListener('click', closeLb);
      close.addEventListener('click', function (e) { e.stopPropagation(); closeLb(); });
      document.addEventListener('keydown', escHandler);
    });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("projectLightbox");
  const lightboxMedia = document.getElementById("lightboxMedia");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxThumbnails = document.getElementById("lightboxThumbnails");

  const closeButton = document.getElementById("lightboxClose");
  const previousButton = document.getElementById("lightboxPrev");
  const nextButton = document.getElementById("lightboxNext");

  if (
    !lightbox ||
    !lightboxMedia ||
    !lightboxTitle ||
    !lightboxCounter ||
    !lightboxThumbnails ||
    !closeButton ||
    !previousButton ||
    !nextButton
  ) {
    console.warn("Proje galeri HTML elemanları bulunamadı.");
    return;
  }

  let currentGallery = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function getCardGallery(card) {
    const items = card.querySelectorAll(
      ".project-gallery-items .gallery-item"
    );

    const gallery = [];

    items.forEach((item) => {
      const image = item.querySelector("img");
      const video = item.querySelector("video");

      if (image && image.getAttribute("src")) {
        gallery.push({
          type: "image",
          src: image.getAttribute("src"),
          alt: image.getAttribute("alt") || "Proje görseli"
        });
      }

      if (video && video.getAttribute("src")) {
        gallery.push({
          type: "video",
          src: video.getAttribute("src"),
          poster: video.getAttribute("poster") || ""
        });
      }
    });

    return gallery;
  }

  function openGallery(card) {
    currentGallery = getCardGallery(card);

    if (currentGallery.length === 0) {
      console.warn("Bu proje kartının içinde galeri görseli bulunamadı.");
      return;
    }

    const title =
      card.querySelector(".pc-body h3")?.textContent.trim() ||
      "Proje Galerisi";

    lightboxTitle.textContent = title;
    currentIndex = 0;

    createThumbnails();
    showCurrentMedia();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeGallery() {
    stopCurrentVideo();

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    lightboxMedia.innerHTML = "";
    lightboxThumbnails.innerHTML = "";
    currentGallery = [];
    currentIndex = 0;
  }

  function stopCurrentVideo() {
    const currentVideo = lightboxMedia.querySelector("video");

    if (currentVideo) {
      currentVideo.pause();
    }
  }

  function showCurrentMedia() {
    const item = currentGallery[currentIndex];

    if (!item) {
      return;
    }

    stopCurrentVideo();
    lightboxMedia.innerHTML = "";

    if (item.type === "video") {
      const video = document.createElement("video");

      video.src = item.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";

      if (item.poster) {
        video.poster = item.poster;
      }

      lightboxMedia.appendChild(video);
    } else {
      const image = document.createElement("img");

      image.src = item.src;
      image.alt = item.alt || `Proje görseli ${currentIndex + 1}`;
      image.draggable = false;

      lightboxMedia.appendChild(image);
    }

    lightboxCounter.textContent =
      `${currentIndex + 1} / ${currentGallery.length}`;

    updateActiveThumbnail();
    updateArrowVisibility();
  }

  function createThumbnails() {
    lightboxThumbnails.innerHTML = "";

    currentGallery.forEach((item, index) => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "lightbox-thumbnail";
      button.setAttribute(
        "aria-label",
        `${index + 1}. galeri öğesini aç`
      );

      const thumbnailImage = document.createElement("img");

      if (item.type === "video") {
        button.classList.add("video-thumbnail");

        thumbnailImage.src =
          item.poster ||
          "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="300" height="180">
                <rect width="100%" height="100%" fill="#111318"/>
                <polygon points="125,55 125,125 190,90" fill="#ffffff"/>
              </svg>
            `);

        thumbnailImage.alt = "Proje videosu";
      } else {
        thumbnailImage.src = item.src;
        thumbnailImage.alt = item.alt || `${index + 1}. proje görseli`;
      }

      button.appendChild(thumbnailImage);

      button.addEventListener("click", () => {
        currentIndex = index;
        showCurrentMedia();
      });

      lightboxThumbnails.appendChild(button);
    });
  }

  function updateActiveThumbnail() {
    const thumbnails = lightboxThumbnails.querySelectorAll(
      ".lightbox-thumbnail"
    );

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.classList.toggle("active", index === currentIndex);
    });

    const activeThumbnail = thumbnails[currentIndex];

    if (activeThumbnail) {
      activeThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }

  function updateArrowVisibility() {
    const hideArrows = currentGallery.length <= 1;

    previousButton.style.display = hideArrows ? "none" : "flex";
    nextButton.style.display = hideArrows ? "none" : "flex";
  }

  function showPrevious() {
    if (currentGallery.length === 0) {
      return;
    }

    currentIndex =
      (currentIndex - 1 + currentGallery.length) %
      currentGallery.length;

    showCurrentMedia();
  }

  function showNext() {
    if (currentGallery.length === 0) {
      return;
    }

    currentIndex =
      (currentIndex + 1) %
      currentGallery.length;

    showCurrentMedia();
  }

  document.querySelectorAll(".project-card").forEach((card) => {
    const trigger = card.querySelector(".project-gallery-trigger");

    if (!trigger) {
      return;
    }

    trigger.setAttribute("role", "button");
    trigger.setAttribute("tabindex", "0");
    trigger.setAttribute("aria-label", "Proje galerisini aç");

    trigger.addEventListener("click", () => {
      openGallery(card);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGallery(card);
      }
    });
  });

  closeButton.addEventListener("click", closeGallery);
  previousButton.addEventListener("click", showPrevious);
  nextButton.addEventListener("click", showNext);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }
  });

  lightboxMedia.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  lightboxMedia.addEventListener(
    "touchend",
    (event) => {
      touchEndX = event.changedTouches[0].clientX;

      const swipeDistance = touchStartX - touchEndX;

      if (Math.abs(swipeDistance) < 50) {
        return;
      }

      if (swipeDistance > 0) {
        showNext();
      } else {
        showPrevious();
      }
    },
    { passive: true }
  );
});