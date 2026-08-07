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

    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");

    document.getElementById("nextBtn").addEventListener("click", function () {
        step1.classList.remove("active");
        step2.classList.add("active");
    });

    document.getElementById("prevBtn").addEventListener("click", function () {
        step2.classList.remove("active");
        step1.classList.add("active");
    });

});