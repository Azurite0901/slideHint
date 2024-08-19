/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
   // ビューポート要素を取得
   const viewportMeta = document.querySelector('meta[name="viewport"]');

   // 条件に基づいて適用するビューポートの設定を決定
   let viewportContent;
   if (window.outerWidth > 380) {
      viewportContent = "width=device-width, initial-scale=1";
   } else {
      viewportContent = "width=380";
   }

   // ビューポート要素が存在しない場合はreturn
   if (!viewportMeta) return;

   // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
   if (viewportMeta.getAttribute("content") !== viewportContent) {
      viewportMeta.setAttribute("content", viewportContent);
   }
};
switchViewport();
window.addEventListener("resize", switchViewport);

// splide
const target = ".splide";
const options = {
   gap: 24,
   pagination: true,
   classes: {
      pagination: "splide__pagination my_class_pagination",
      page: "splide__pagination__page my_class_page",
   },
};
const mySplide = new Splide(target, options);

mySplide.mount();

// スクロールヒント
const scrollHintAction = () => {
   const scrollHint = document.querySelector(".js_slideHint");
   let isShow = false;
   let isActive = false;
   const fadeinObs = () => {
      const fadein = ([entry], obs) => {
         if (entry.isIntersecting) {
            scrollHint.animate({ opacity: [0, 1] }, { duration: 300 }).onfinish = () => {
               isShow = true;
            };
            obs.unobserve(entry.target);
            scrollHint.style.opacity = 1;
         }
      };
      const fadeinObserver = new IntersectionObserver(fadein);
      fadeinObserver.observe(scrollHint);
   };
   const switchActiveObs = () => {
      const switchActive = ([entry]) => {
         if (entry.isIntersecting) {
            isActive = true;
         }
      };
      const options = {
         threshold: 1,
      };
      const scrollHintObserver = new IntersectionObserver(switchActive, options);

      scrollHintObserver.observe(scrollHint);
   };

   if (!scrollHint) {
      return;
   }

   fadeinObs();
   switchActiveObs();

   window.addEventListener("touchmove", (e) => {
      if (isActive && isShow && e.target.closest(".js_introduction_portfolio_splide")) {
         scrollHint.classList.add("hide_scrollHint");
      }
   });
};
scrollHintAction();
