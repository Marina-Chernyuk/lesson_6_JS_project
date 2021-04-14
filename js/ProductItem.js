export const ProductItem = {
    props: ['img', 'product'],
    template: 
    `<div class="product-item">
        <img :src="img" :alt="product.product_name" class="product-img">
        <div class="desc">
            <h3 class="title">{{product.product_name}}</h3>
            <p class="price">{{product.price}}</p>
            <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
        </div>
    </div>`
};