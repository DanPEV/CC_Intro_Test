// Menu items
const menu = [
    { id: 1, description: 'Coke', price: 12.50 },
    { id: 2, description: 'Sparkling Water', price: 10.00 },
    { id: 3, description: 'Switch Energy', price: 12.00 },
    { id: 4, description: 'Orange Juice', price: 15.00 }
];

let cart = [];

// Select add add to cart button & add event listener
const addToCartButtons = document.querySelectorAll('.add');
addToCartButtons.forEach(el => el.addEventListener('click', addToCart));

// Select shopping cart button & add event listener
const showShoppingCart = document.querySelector('.viewCart');
showShoppingCart.addEventListener('click', viewCart)

function addToCart(event) {
    // Find the item in menu array & Add quantity and total price values
    let itemId = this.id[3];
    const result = menu.find(({ id }) => id == itemId);
    result.quantity = quantity(itemId);
    result.price = parseFloat(result.price).toFixed(2);
    result.total = (parseFloat(result.price) * result.quantity).toFixed(2);
    // Push new object to cart array
    cart.push(result);
    this.disabled = true;
    // Update shopping cart elements 
    addToShoppingCart(result);
    updateCartTotal();
    updateCartBadge(event.target.innerText);
};

function quantity(id) {
    // Select & return the value from the input element for an item 
    let qty = document.querySelector(`#qtyValue${id}`);
    // Disable input element
    qty.disabled = true;
    return qty.valueAsNumber;
};

// Crate new cart row element and append to shopping cart
function addToShoppingCart(object) {
    let rowContent = `<div>${object.id}</div>
                    <div>${object.description}</div>
                    <div>${object.price}</div>
                    <div>${object.quantity}</div>
                    <div>${object.total}</div> 
                    <div>
                    <button type="button" class="btn btn-sm btn-danger remove">Remove</button>
                    </div>`;
    let newCartRow = document.createElement('div');
    newCartRow.classList.add('cartRow');
    newCartRow.innerHTML = rowContent;
    newCartRow.children[5].firstElementChild.style.float = "right";
    let cartContent = document.querySelector('#cartContent');
    cartContent.append(newCartRow);
};

// Calculate & update the shopping cart total 
function updateCartTotal() {
    let cartTotal = document.querySelector('#cartTotal');
    let total = 0;
    cart.forEach(el => {
        total += parseFloat(el.total);
    })
    cartTotal.innerHTML = "R" + total.toFixed(2);
};

// Update and display shopping cart badge
function updateCartBadge(e) {
    let badge = document.querySelector("#badge");
    let badgeCount = document.querySelector('#badgeCount');

    badge.classList.remove('visually-hidden');
    badgeCount.classList.remove('visually-hidden');

    let badgeValue = parseInt(badgeCount.innerHTML);
    if (e === "Add To Cart") {
        badgeValue += 1;
        badgeCount.innerHTML = badgeValue;
    }
    else {
        badgeValue -= 1;
        badgeCount.innerHTML = badgeValue;
        if (badgeValue === 0) {
            badge.classList.add('visually-hidden');
            badgeCount.classList.add('visually-hidden');
        }
    }
}

// Add event listener to shopping cart button and display cart
function viewCart() {
    removeFromCartButtons = document.querySelectorAll('.remove');
    removeFromCartButtons.forEach(el => el.addEventListener('click', removeFromCart));
    let shoppingCart = document.querySelector('#shoppingCart');
    shoppingCart.style.display = 'block';
};

// Remove item from shopping cart
function removeFromCart(event) {
    // Remove item HTML element 
    let cartRow = event.path[2];
    cartRow.remove();
    // Update the cart array
    let productId = event.path[2].children[0].textContent;
    let updateCart = cart.filter(({ id }) => id != productId);
    cart = updateCart;
    updateCartTotal();
    updateCartBadge(event.toElement.innerText);
    // Enable the menu buttons and inputs
    let addButton = document.querySelector(`#add${productId}`);
    let input = document.querySelector(`#qtyValue${productId}`);
    input.disabled = false;
    addButton.disabled = false;
};


let closeBtn = document.querySelector('.closeCart');
// Close shopping cart popup
closeBtn.addEventListener('click', function () {
    shoppingCart.style.display = "none";
});

window.onclick = function (event) {
    if (event.target == shoppingCart) {
        shoppingCart.style.display = "none";
    }
};
