export const BannerVideoFunctions = () => {
  const slickBanner = {
    init() {
      const prev = `<button
        type="button"
        class="banner-video__slider--arrow banner-video__slider--arrow--prev"
      >
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="white"></path>
        </svg>
      </button>`;
      const next = `<button
        type="button"
        class="banner-video__slider--arrow banner-video__slider--arrow--next"
      >
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.999999 17L11 9L0.999999 0.999999" stroke="white"></path>
        </svg>
      </button>`;
      $(document).ready(function () {
        $(".banner-video__slider").slick({
          infinite: true,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 8000,
          arrows: true,
          prevArrow: prev,
          nextArrow: next,
        });
      });
    },
  };

  slickBanner.init();
};
