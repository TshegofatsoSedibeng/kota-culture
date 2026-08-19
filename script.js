/* =========================================================
   KOTA CULTURE — ORDERING SYSTEM
   EBS MARKET DAY 2026
========================================================= */


/* =========================================================
   01. GOOGLE SHEETS CONNECTION
========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbydPcZy1CE_FQUri2A7dWs_IZid6LKSvV8mQyP13mWV3_XIWmLv4Wpp3IS2jnqJImpf/exec";


/* =========================================================
   02. ELEMENTS
========================================================= */

const orderForm = document.getElementById("orderForm");

const quantityDisplay =
    document.getElementById("quantity");

const increaseButton =
    document.getElementById("increaseQuantity");

const decreaseButton =
    document.getElementById("decreaseQuantity");

const summaryEmpty =
    document.getElementById("summaryEmpty");

const summaryContent =
    document.getElementById("summaryContent");

const summaryKota =
    document.getElementById("summaryKota");

const summaryQuantity =
    document.getElementById("summaryQuantity");

const summaryKotaPrice =
    document.getElementById("summaryKotaPrice");

const summaryToast =
    document.getElementById("summaryToast");

const summaryDrinks =
    document.getElementById("summaryDrinks");

const summaryTotal =
    document.getElementById("summaryTotal");

const successModal =
    document.getElementById("successModal");

const closeModal =
    document.getElementById("closeModal");

const orderNumberDisplay =
    document.getElementById("orderNumber");


/* =========================================================
   03. ORDER VARIABLES
========================================================= */

let quantity = 1;

let selectedKota = null;

let selectedKotaPrice = 0;


/* =========================================================
   04. KOTA SELECTION
========================================================= */

const kotaOptions =
    document.querySelectorAll(
        'input[name="kota"]'
    );


kotaOptions.forEach(function(option) {

    option.addEventListener("change", function() {

        selectedKota = this.value;

        selectedKotaPrice =
            Number(this.dataset.price);

        updateSummary();

    });

});


/* =========================================================
   05. QUANTITY
========================================================= */

increaseButton.addEventListener(
    "click",
    function() {

        if (quantity < 10) {

            quantity++;

            updateQuantity();

        }

    }
);


decreaseButton.addEventListener(
    "click",
    function() {

        if (quantity > 1) {

            quantity--;

            updateQuantity();

        }

    }
);


function updateQuantity() {

    quantityDisplay.textContent =
        quantity;

    updateSummary();

}


/* =========================================================
   06. BREAD / TOAST
========================================================= */

const toastSelect =
    document.getElementById("toast");


toastSelect.addEventListener(
    "change",
    function() {

        updateSummary();

    }
);


/* =========================================================
   07. DRINKS
========================================================= */

const drinkCheckboxes =
    document.querySelectorAll(
        'input[name="drink"]'
    );


drinkCheckboxes.forEach(function(drink) {

    drink.addEventListener(
        "change",
        function() {

            updateSummary();

        }
    );

});


/* =========================================================
   08. UPDATE ORDER SUMMARY
========================================================= */

function updateSummary() {

    if (!selectedKota) {

        summaryEmpty.style.display =
            "block";

        summaryContent.style.display =
            "none";

        return;

    }


    summaryEmpty.style.display =
        "none";

    summaryContent.style.display =
        "block";


    /* Kota */

    summaryKota.textContent =
        selectedKota;

    summaryQuantity.textContent =
        "× " + quantity;


    const kotaTotal =
        selectedKotaPrice * quantity;


    summaryKotaPrice.textContent =
        "R" + kotaTotal;


    /* Bread */

    summaryToast.textContent =
        toastSelect.value || "—";


    /* Drinks */

    summaryDrinks.innerHTML = "";

    let drinksTotal = 0;


    drinkCheckboxes.forEach(
        function(drink) {

            if (drink.checked) {

                const drinkPrice =
                    Number(drink.dataset.price);

                drinksTotal +=
                    drinkPrice;


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

        }
    );


    /* Total */

    const total =
        kotaTotal + drinksTotal;


    summaryTotal.textContent =
        "R" + total;

}


/* =========================================================
   09. ORDER NUMBER
========================================================= */

function generateOrderNumber() {

    const randomNumber =
        Math.floor(
            1000 + Math.random() * 9000
        );

    return "KC" + randomNumber;

}


/* =========================================================
   10. GET SELECTED DRINKS
========================================================= */

function getSelectedDrinks() {

    const drinks = [];


    drinkCheckboxes.forEach(
        function(drink) {

            if (drink.checked) {

                drinks.push(
                    drink.value
                );

            }

        }
    );


    return drinks.join(", ");

}


/* =========================================================
   11. CALCULATE TOTAL
========================================================= */

function calculateTotal() {

    let total =
        selectedKotaPrice * quantity;


    drinkCheckboxes.forEach(
        function(drink) {

            if (drink.checked) {

                total +=
                    Number(
                        drink.dataset.price
                    );

            }

        }
    );


    return total;

}


/* =========================================================
   12. SUBMIT ORDER
========================================================= */

orderForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        /* Validate Kota */

        if (!selectedKota) {

            alert(
                "Please select a Kota before placing your preorder."
            );

            return;

        }


        /* Validate bread */

        if (!toastSelect.value) {

            alert(
                "Please choose how you would like your bread prepared."
            );

            toastSelect.focus();

            return;

        }


        /* Get student information */

        const firstName =
            document.getElementById(
                "firstName"
            ).value.trim();


        const surname =
            document.getElementById(
                "surname"
            ).value.trim();


        const className =
            document.getElementById(
                "class"
            ).value.trim();


        const phone =
            document.getElementById(
                "phone"
            ).value.trim();


        const notes =
            document.getElementById(
                "notes"
            ).value.trim();


        /* Generate order number */

        const orderNumber =
            generateOrderNumber();


        /* Calculate total */

        const total =
            calculateTotal();


        /* Get drinks */

        const drinks =
            getSelectedDrinks();


        /* Create order */

        const orderData = {

            orderNumber:
                orderNumber,

            firstName:
                firstName,

            surname:
                surname,

            className:
                className,

            phone:
                phone,

            kota:
                selectedKota,

            quantity:
                quantity,

            toast:
                toastSelect.value,

            drinks:
                drinks,

            notes:
                notes,

            total:
                total

        };


        /* Disable button */

        const submitButton =
            orderForm.querySelector(
                ".submit-order-button"
            );


        const originalButton =
            submitButton.innerHTML;


        submitButton.disabled = true;

        submitButton.innerHTML =
            "<span>Sending order...</span><span>⏳</span>";


        try {

            /*
             * Send order to Google Sheets
             */

            await fetch(
                GOOGLE_SCRIPT_URL,
                {

                    method: "POST",

                    mode: "no-cors",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(
                            orderData
                        )

                }
            );


            /*
             * Show order number
             */

            orderNumberDisplay.textContent =
                orderNumber;


            successModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";


            console.log(
                "Order submitted:",
                orderData
            );


        }

        catch (error) {

            console.error(
                "Order submission error:",
                error
            );


            alert(
                "Something went wrong while submitting your order. Please try again."
            );

        }


        finally {

            submitButton.disabled =
                false;

            submitButton.innerHTML =
                originalButton;

        }

    }
);


/* =========================================================
   13. CLOSE SUCCESS MODAL
========================================================= */

closeModal.addEventListener(
    "click",
    function() {

        successModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }
);


/* =========================================================
   14. CLICK OUTSIDE MODAL
========================================================= */

successModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === successModal
        ) {

            successModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================================
   15. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            successModal.classList.contains(
                "active"
            )
        ) {

            successModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* =========================================================
   16. SMOOTH NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(function(link) {

    link.addEventListener(
        "click",
        function(event) {

            const targetID =
                this.getAttribute(
                    "href"
                );


            const target =
                document.querySelector(
                    targetID
                );


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* =========================================================
   17. INITIALISE
========================================================= */

updateSummary();

console.log(
    "🍔 Kota Culture ordering system ready!"
);
