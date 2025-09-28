const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Submit Button Was Clicked!");
    return false;
});

$(
    "#clear".click(function (e) {
        e.preventDefault(); 
        document.getElementById("data-form").reset();
        return false;
    })
);
