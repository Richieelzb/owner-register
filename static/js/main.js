document
.getElementById("businessForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch(
        "/submit-business",
        {
            method:"POST",
            body:formData
        }
    );

    const data = await response.json();

    alert(
        "Business submitted successfully!"
    );

    console.log(data);
});

document.addEventListener("DOMContentLoaded", function () {

    const indicator1 = document.getElementById("indicator1");
    const indicator2 = document.getElementById("indicator2");
    const indicator3 = document.getElementById("indicator3");

    // Step 1 -> Step 2
    document.getElementById("nextBtn")
        .addEventListener("click", function () {

        indicator1.classList.remove("active");
        indicator2.classList.add("active");

    });

    // Step 2 -> Step 1
    document.getElementById("prevBtn")
        .addEventListener("click", function () {

        indicator2.classList.remove("active");
        indicator3.classList.add("active");

    });

    // Step 2 -> Step 3
    document.getElementById("nextBtn2")
        .addEventListener("click", function () {

        step2.classList.remove("active");
        step3.classList.add("active");

        // Populate review section
        document.getElementById("reviewData").innerHTML = `
            <p><strong>Business:</strong>
                ${document.querySelector('[name="business_name"]').value}
            </p>

            <p><strong>Phone:</strong>
                ${document.querySelector('[name="phone"]').value}
            </p>

            <p><strong>Email:</strong>
                ${document.querySelector('[name="email"]').value}
            </p>

            <p><strong>Address:</strong>
                ${document.querySelector('[name="address"]').value}
            </p>
        `;

    });

    // Step 3 -> Step 2
    document.getElementById("prevBtn2")
        .addEventListener("click", function () {

        step3.classList.remove("active");
        step2.classList.add("active");

    });

});