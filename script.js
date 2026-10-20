

// BURGER FMX - DEMO

const cart = [];
const orderBtn = document.querySelector(".btn-order");
const cards = document.querySelectorAll(".card");

// AGREGAR PRODUCTOS
cards.forEach(card => {
    const btn = card.querySelector(".btn-card");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const name = card.querySelector(".title-tarjeta").textContent.trim();
        const price = parseFloat(card.querySelector(".price").textContent.replace("$", ""));
        const product = cart.find(p => p.name === name);

        if (product) {
            product.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        btn.innerHTML = "✓ Added!";

        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Order';
        }, 1000);

        updateCounter();
    });
});


// CONTADOR
function updateCounter() {
    const total = cart.reduce((sum, p) => sum + p.quantity, 0);

    orderBtn.innerHTML =
        `ORDER NOW <i class="fa-solid fa-cart-shopping"></i> ${total}`;
}


// CREAR CARRITO
const cartPanel = document.createElement("div");
cartPanel.className = "cart-panel";

cartPanel.innerHTML = `
    <div class="cart-content">

        <button class="cart-close">
            <i class="fa-solid fa-xmark"></i>
        </button>

        <h2 class="title-seccion">
            YOUR <span class="text-neon">ORDER</span>
        </h2>

        <div class="cart-items"></div>

        <div class="cart-footer">

            <div class="cart-total">
                <span>TOTAL</span>
                <strong>$0.00</strong>
            </div>

            <button class="checkout-btn glow-btn">
                CHECKOUT
                <i class="fa-solid fa-arrow-right"></i>
            </button>

        </div>

    </div>
`;

document.body.appendChild(cartPanel);


// ABRIR / CERRAR
orderBtn.addEventListener("click", e => {
    e.preventDefault();
    renderCart();
    cartPanel.classList.add("active");
});

cartPanel.addEventListener("click", e => {

    if (
        e.target.classList.contains("cart-panel") ||
        e.target.closest(".cart-close")
    ) {
        cartPanel.classList.remove("active");
    }

});


// MOSTRAR CARRITO
function renderCart() {

    const items = cartPanel.querySelector(".cart-items");
    const totalBox = cartPanel.querySelector(".cart-total strong");

    items.innerHTML = "";

    if (!cart.length) {
        items.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-burger"></i>
                <p>Your order is empty.</p>
                <span>Add something delicious.</span>
            </div>
        `;

        totalBox.textContent = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price * product.quantity;

        const item = document.createElement("div");
        item.className = "cart-item";

        item.innerHTML = `
            <div class="cart-item-info">
                <h3>${product.name}</h3>
                <span>$${product.price.toFixed(2)}</span>
            </div>

            <div class="cart-item-actions">
                <button class="quantity-btn decrease">−</button>
                <span>${product.quantity}</span>
                <button class="quantity-btn increase">+</button>

                <button class="remove-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        item.querySelector(".decrease").onclick = () => {
            product.quantity > 1
                ? product.quantity--
                : cart.splice(index, 1);

            renderCart();
            updateCounter();
        };

        item.querySelector(".increase").onclick = () => {
            product.quantity++;
            renderCart();
            updateCounter();
        };

        item.querySelector(".remove-btn").onclick = () => {
            cart.splice(index, 1);
            renderCart();
            updateCounter();
        };

        items.appendChild(item);
    });

    totalBox.textContent = `$${total.toFixed(2)}`;
}


// CHECKOUT DEMO
cartPanel.addEventListener("click", e => {

    if (!e.target.closest(".checkout-btn")) return;

    if (!cart.length) {
        alert("Your order is empty.");
        return;
    }

    showDemo();
});


// MODAL DEMO
function showDemo() {

    const modal = document.createElement("div");
    modal.className = "demo-modal";

    modal.innerHTML = `
        <div class="demo-modal-content">

            <button class="demo-close">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="demo-icon">
                <i class="fa-solid fa-code"></i>
            </div>

            <h2>
                DEMO <span class="text-neon">PROJECT</span>
            </h2>

            <p>
                Burger FMX is a fictional restaurant website
                created as a web development portfolio project.
            </p>

            <p class="demo-small">
                This checkout is for demonstration purposes only.
                No real order or payment will be processed.
            </p>

            <button class="demo-understood glow-btn">
                GOT IT
            </button>

        </div>
    `;

    document.body.appendChild(modal);

    const close = () => modal.remove();

    modal.querySelector(".demo-close").onclick = close;
    modal.querySelector(".demo-understood").onclick = close;

    modal.onclick = e => {
        if (e.target === modal) close();
    };
}


// HERO: MENU
const menuBtn = document.querySelector(".hero .btn-primary");

if (menuBtn) {
    menuBtn.onclick = e => {
        e.preventDefault();
        document.querySelector("#menu")
            ?.scrollIntoView({ behavior: "smooth" });
    };
}


// HERO: COMBOS
const comboBtn = document.querySelector(".hero .btn-secondary");

if (comboBtn) {
    comboBtn.onclick = e => {
        e.preventDefault();
        document.querySelector("#combos")
            ?.scrollIntoView({ behavior: "smooth" });
    };
}
