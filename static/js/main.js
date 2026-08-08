document
.getElementById("businessForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch("/submit-business", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        const data = await response.json();

        alert("Business submitted successfully!");
        document.getElementById("businessForm").reset();
        window.location.href = "/thank-you";

        console.log(data);

        } 
    catch (error) {
        console.error(error);
        alert("Failed to submit business.");
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");

    const indicator1 = document.getElementById("indicator1");
    const indicator2 = document.getElementById("indicator2");
    const indicator3 = document.getElementById("indicator3");

    // STEP 1 -> STEP 2
    document.getElementById("nextBtn").addEventListener("click", () => {

        const businessName = document.querySelector('[name="business_name"]').value;
        const category = document.querySelector('[name="category"]').value;
        const category = document.querySelector('[name="subcategory"]').value;
        const description = document.querySelector('[name="description"]').value;

        const subcategories = {
            "Plumbing Services": [
                "Emergency Plumbing",
                "Residential Plumbing",
                "Commercial Plumbing",
                "Leak Detection & Repair",
                "Blocked Drains",
                "Drain Cleaning",
                "Burst Pipe Repairs",
                "Geyser Installation",
                "Geyser Repairs",
                "Toilet Repairs",
                "Bathroom Renovations",
                "Kitchen Plumbing"
            ],

            "Electrical": [
                "House Wiring",
                "Fault Finding",
                "Solar Installation",
                "Generator Installation",
                "DB Board Upgrades",
                "Lighting Installation"
            ],

            "IT Services": [
                "Computer Repair",
                "Network Installation",
                "Web Development",
                "Cyber Security",
                "Cloud Services",
                "Software Development"
            ]
        };

        const categorySelect = document.getElementById("category");
        const subcategorySelect = document.getElementById("subcategory");

        categorySelect.addEventListener("change", function () {

            const selectedCategory = this.value;

            subcategorySelect.innerHTML =
                '<option value="" selected disabled>Select Sub Category</option>';

            if (subcategories[selectedCategory]) {

                subcategories[selectedCategory].forEach(subcategory => {

                    const option = document.createElement("option");
                    option.value = subcategory;
                    option.textContent = subcategory;

                    subcategorySelect.appendChild(option);
                });
            }
        });

        if (!businessName.trim()) {
            alert("Business Name is required");
            return;
        }

        if (!category || category === "Select Category") {
            alert("Please select a category");
            return;
        }

        if (!subcategory || subcategory === "Select Sub Category") {
            alert("Please select a sub category");
            return;
        }

        if (!description.trim()) {
            alert("Business Description is required");
            return;
        }


        step1.classList.remove("active");
        step2.classList.add("active");

        indicator1.classList.remove("active");
        indicator2.classList.add("active");
    });

    // STEP 2 -> STEP 1
    document.getElementById("prevBtn").addEventListener("click", () => {

        step2.classList.remove("active");
        step1.classList.add("active");

        indicator2.classList.remove("active");
        indicator1.classList.add("active");

    });

    // STEP 2 -> STEP 3
    document.getElementById("nextBtn2").addEventListener("click", () => {

        const phone = document.querySelector('[name="phone"]').value.trim();
        const email = document.querySelector('[name="email"]').value.trim();
        const address = document.querySelector('[name="address"]').value.trim();

        if (!phone) {
            alert("Phone Number is required");
            return;
        }

        const phonePattern = /^(\+27|0)[6-8][0-9]{8}$/;

        if (!phonePattern.test(phone)) {
            alert("Enter a valid South African phone number");
            return;
        }

        if (!email) {
            alert("Email Address is required");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid Email Address");
            return;
        }

        if (!address) {
            alert("Business Address is required");
            return;
        }

        step2.classList.remove("active");
        step3.classList.add("active");

        indicator2.classList.remove("active");
        indicator3.classList.add("active");

        // Populate review section
        document.getElementById("reviewData").innerHTML = `
            <p><strong>Business:</strong> ${document.querySelector('[name="business_name"]').value}</p>

            <p><strong>Category:</strong> ${document.querySelector('[name="category"]').value}</p>

            <p><strong>Description:</strong> ${document.querySelector('[name="description"]').value}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Address:</strong> ${address}</p>
        `;
    });

    // STEP 3 -> STEP 2
    document.getElementById("prevBtn2").addEventListener("click", () => {

        step3.classList.remove("active");
        step2.classList.add("active");

        indicator3.classList.remove("active");
        indicator2.classList.add("active");
    
    });

});