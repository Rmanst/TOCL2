let cart = [];

document.addEventListener('DOMContentLoaded', function() {
    // 加入購物車按鈕點擊事件
    document.querySelectorAll('.btn--add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantity = this.closest('.product-actions')
                               .querySelector('.quantity-input').value;
            
            addToCart(productId, parseInt(quantity));
        });
    });

    // 立即購買按鈕點擊事件  
    document.querySelectorAll('.btn--buy-now').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantity = this.closest('.product-actions')
                               .querySelector('.quantity-input').value;
            
            buyNow(productId, parseInt(quantity));
        });
    });
});

function addToCart(productId, quantity) {
    // 檢查購物車是否已有此商品
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            quantity: quantity
        });
    }

    updateCartUI();
    alert(`已加入購物車 ${quantity} 件商品`);
}

function buyNow(productId, quantity) {
    if(confirm(`確定要購買 ${quantity} 件商品嗎？`)) {
        // 這裡可以實作導向結帳頁面的邏輯
        alert(`已選擇購買 ${quantity} 件商品！`);
        window.location.href = 'purchase.html';
    }
}

function updateCartUI() {
    // 更新購物車圖標數量顯示
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}