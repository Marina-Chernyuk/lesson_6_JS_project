import {cartItem} from "./CartIem.js";

export const Cart = {
    inject: ['API', 'getJson'], 
    components: {
        cartItem
    },
    data() {
        return {
            showCart: false,
            cartItems: [],
            cartUrl: '/getBasket.json',
            imgCart: './img/products.jpg',
        }
    },

    addProduct(product){
        this.getJson(`${this.API}/addToBasket.json`)
            .then(data => {
                if(data.result){
                    let find = this.cartItems.find(el => el.id_product === product.id_product);
                    if(find){
                        find.quantity++
                    } else {
                        let prod = Object.assign({quantity: 1}, product);
                        this.cartItems.push(prod);
                        }
                    }
                })
            },
    remove(product){
        this.getJson(`${this.API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result){
                    if(product.quantity > 1){
                        product.quantity--
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                }
            })
        },
        

    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    
    template: `
    <button class="btn-cart" type="button" @click="showCart =  !showCart">
        <svg width="32px" height="29px" fill="#000000" viewBox="0 0 32.000000 29.000000">
            <g transform="translate(0,29) scale(0.1,-0.1)">
                <path d="M0 281 c0 -6 11 -11 23 -11 22 0 26 -9 48 -92 l25 -93 81 -3 81 -3
                25 55 c47 103 51 96 -52 96 -49 0 -93 -4 -96 -10 -4 -6 23 -10 74 -10 45 0 81
                -2 81 -5 0 -2 -10 -25 -22 -50 l-22 -45 -67 0 -67 0 -23 88 c-24 85 -25 87
                -57 90 -18 2 -32 -1 -32 -7z" />
                <path d="M74 35 c-4 -9 -2 -21 4 -27 15 -15 44 -1 40 19 -4 23 -36 29 -44 8z" />
                <path d="M242 28 c4 -30 43 -33 43 -3 0 13 -8 21 -23 23 -20 3 -23 0 -20 -20z" />
            </g>
        </svg></button>
    <div class="cart-block" v-show="showCart">
        <p v-if="!cartItems.length">Cart is empty</p> 
        <cartItemv-for="item of cartItems" 
        :key="item.id_product"
        :img="imgCart"
        :cartItem="item"
        @remove="remove"
        ></cartItem>       
    </div>`
};