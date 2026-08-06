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