i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'zh-TW',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json'
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie']
    }
  }, function(err, t) {
    if (err) {
      console.error('翻譯初始化失敗:', err);
      return;
    }
    updateContent(); // 翻譯初始化成功後再執行
  });

// 語言切換函數
function changeLanguage(lng) {
  i18next.changeLanguage(lng, (err, t) => {
    if (err) {
      console.log('語言切換錯誤:', err);
      return;
    }
    updateContent();
  });
}

// 更新頁面內容
function updateContent() {
  // 導航與靜態標籤翻譯
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (translation && translation !== key) {
      element.textContent = translation;
    }
  });

  // 產品區域翻譯
  document.querySelectorAll('.product-card').forEach(card => {
    // 處理價格
    const priceElement = card.querySelector('.price');
    if (priceElement) {
      const rawPrice = priceElement.textContent.trim().replace(/[^\d]/g, '') || '0';
      priceElement.textContent = i18next.t('product.price', { price: rawPrice });
    }

    // 按鈕：加入購物車
    const addToCartBtn = card.querySelector('.btn--add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.textContent = i18next.t('product.addToCart');
    }

    // 按鈕：立即購買
    const buyNowBtn = card.querySelector('.btn--buy-now');
    if (buyNowBtn) {
      buyNowBtn.textContent = i18next.t('product.buyNow');
    }
  });

  // 購物車頁面翻譯（若有使用）
  const cartTitle = document.querySelector('.cart-title');
  if (cartTitle) cartTitle.textContent = i18next.t('cart.title');

  const checkoutBtn = document.querySelector('.btn--checkout');
  if (checkoutBtn) checkoutBtn.textContent = i18next.t('cart.checkout');
}
