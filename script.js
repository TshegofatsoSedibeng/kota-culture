/* =========================================================
   KOTA CULTURE — ORDERING SYSTEM
   EBS MARKET DAY 2026
========================================================= */


/* =========================================================
   01. ELEMENTS
========================================================= */

const orderForm = document.getElementById("orderForm");

const quantityDisplay = document.getElementById("quantity");

const increaseButton = document.getElementById("increaseQuantity");

const decreaseButton = document.getElementById("decreaseQuantity");

const summaryEmpty = document.getElementById("summaryEmpty");

const summaryContent = document.getElementById("summaryContent");

const summaryKota = document.getElementById("summaryKota");

const summaryQuantity = document.getElementById("summaryQuantity");

const summaryKotaPrice = document.getElementById("summaryKotaPrice");

const summaryToast = document.getElementById("summaryToast");

const summaryDrinks = document.getElementById("summaryDrinks");

const summaryTotal = document.getElementById("summaryTotal");

const successModal = document.getElementById("successModal");

const closeModal = document.getElementById("closeModal");

const orderNumberDisplay = document.getElementById("orderNumber");


/* =========================================================
   02. ORDER DATA
========================================================= */

let quantity = 1;

let selectedKota = null;

let selectedKotaPrice = 0;


/* =========================================================
   03. KOTA SELECTION
========================================================= */

const kotaOptions = document.querySelectorAll(
    'input[name="kota"]'
);


kotaOptions.forEach(function(option) {

    option.addEventListener("change", function() {

        selectedKota = this.value;

        selectedKotaPrice = Number(
            this.dataset.price
        );

        updateSummary();

    });

});


/* =========================================================
   04. QUANTITY
========================================================= */

increaseButton.addEventListener("click", function() {

    if (quantity < 10) {

        quantity++;

        updateQuantity();

    }

});


decreaseButton.addEventListener("click", function() {

    if (quantity > 1) {

        quantity--;

        updateQuantity();

    }

});


function updateQuantity() {

    quantityDisplay.textContent = quantity;

    updateSummary();

}


/* =========================================================
   05. TOAST / BREAD SELECTION
========================================================= */

const toastSelect = document.getElementById("toast");


toastSelect.addEventListener("change", function() {

    updateSummary();

});


/* =========================================================
   06. DRINK SELECTION
========================================================= */

const drinkCheckboxes = document.querySelectorAll(
    'input[name="drink"]'
);


drinkCheckboxes.forEach(function(drink) {

    drink.addEventListener("change", function() {

        updateSummary();

    });

});


/* =========================================================
   07. UPDATE ORDER SUMMARY
========================================================= */

function updateSummary() {

    if (!selectedKota) {

        summaryEmpty.style.display = "block";

        summaryContent.style.display = "none";

        return;

    }


    summaryEmpty.style.display = "none";

    summaryContent.style.display = "block";


    /* Kota */

    summaryKota.textContent = selectedKota;

    summaryQuantity.textContent = "× " + quantity;


    const kotaTotal =
        selectedKotaPrice * quantity;


    summaryKotaPrice.textContent =
        "R" + kotaTotal;


    /* Toast */

    const toastValue =
        toastSelect.value;


    summaryToast.textContent =
        toastValue || "—";


    /* Drinks */

    summaryDrinks.innerHTML = "";


    let drinksTotal = 0;


    drinkCheckboxes.forEach(function(drink) {

        if (drink.checked) {

            const drinkPrice =
                Number(drink.dataset.price);

            drinksTotal += drinkPrice;


            const drinkRow =
                document.createElement("div");

            drinkRow.className =
                "summary-detail";


            drinkRow.innerHTML = `
                <span>${drink.value}</span>
                <span>R${drinkPrice}</span>
            `;


            summaryDrinks.appendChild(
                drinkRow
            );

        }

    });


    /* Total */

    const total =
        kotaTotal + drinksTotal;


    summaryTotal.textContent =
        "R" + total;

}


/* =========================================================
   08. GENERATE ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const randomNumber =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return "KC" + randomNumber;

}


/* =========================================================
   09. FORM SUBMISSION
========================================================= */

orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    /* Make sure a Kota is selected */

    if (!selectedKota) {

        alert(
            "Please select a Kota before placing your preorder."
        );

        return;

    }


    /* Make sure bread preparation is selected */

    if (!toastSelect.value) {

        alert(
            "Please choose how you would like your bread prepared."
        );

        toastSelect.focus();

        return;

    }


    /* Generate order number */

    const orderNumber =
        generateOrderNumber();


    orderNumberDisplay.textContent =
        orderNumber;


    /* Show success popup */

    successModal.classList.add("active");


    /* Scroll to top of popup */

    document.body.style.overflow =
        "hidden";


    console.log(
        "Preorder submitted:",
        orderNumber
    );

});


/* =========================================================
   10. CLOSE SUCCESS MODAL
========================================================= */

closeModal.addEventListener("click", function() {

    successModal.classList.remove("active");

    document.body.style.overflow = "";

});


/* =========================================================
   11. CLOSE MODAL WHEN CLICKING OUTSIDE
========================================================= */

successModal.addEventListener("click", function(event) {

    if (event.target === successModal) {

        successModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   12. ESCAPE KEY CLOSES MODAL
========================================================= */

document.addEventListener("keydown", function(event) {

    if (
        event.key === "Escape" &&
        successModal.classList.contains("active")
    ) {

        successModal.classList.remove("active");

        document.body.style.overflow = "";

    }

});


/* =========================================================
   13. SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetID =
            this.getAttribute("href");

        const target =
            document.querySelector(targetID);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================================
   14. INITIAL STATE
========================================================= */

updateSummary();

console.log(
    "🍔 Kota Culture ordering system loaded successfully!"
);
