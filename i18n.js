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
  });

// 語言切換函數
function changeLanguage(lng) {
  i18next.changeLanguage(lng, (err, t) => {
    if (err) return console.log('Something went wrong loading', err);
    updateContent();
  });
}

// 更新頁面內容
function updateContent() {
  // 更新導航選單
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });
  
  // 更新產品價格和按鈕
  document.querySelectorAll('.product-card').forEach(card => {
    const priceElement = card.querySelector('.price');
    if (priceElement) {
      const price = priceElement.textContent.trim().replace(/[^\d]/g, '') || '0';
priceElement.textContent = i18next.t('product.price', { price });

    }
    
    const addToCartBtn = card.querySelector('.btn--add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.textContent = i18next.t('product.addToCart');
    }
    
    const buyNowBtn = card.querySelector('.btn--buy-now');
    if (buyNowBtn) {
      buyNowBtn.textContent = i18next.t('product.buyNow');
    }
  });
}
