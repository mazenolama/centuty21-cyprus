const loadingIcon = '<i class="fas fa-spinner fa-spin"></i>'; 
let validationErrors = [];

$(document).ready(function() {
    const form = $("#contact-form");

    // submit the form
    form.submit(function(event) {
        event.preventDefault(); 

        validationErrors = []; // reset validation errors

        const name = $("#name").val().trim();
        const from = $("#email").val().trim();
        const phone_number = $('#phone_number').val().trim();
        const message = $('#message').val().trim();
        

        validateInput(name, "a name");
        validateInput(from, "an email");
        validateEmail(from)
        validateInput(phone_number, "a phone number");
        validateInput(message, "a message");

        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => toastr.error(error));
            return;
        }

        $("#send-email").html(loadingIcon);

        const data = {  
            name,
            from,
            phone_number,
            message
        }

        fetch("http://localhost:3000/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((res) => {
            if(res.result == "success"){ 
                toastr.success('Email sent successfully!');
                flushInput()
                $("#contact-form").css("display", "none")
                $(".form-success-msg").css("display", "block")
            }
            else{
                toastr.error(`Failed to send the email!, Error: ${res.message}`);
            }
        })
        .catch((error) => {
            console.log(error);
            toastr.error(`Failed to send the email!, Can Not Find The Server`);
            
        }).finally(() => {
            $("#send-email").html("Send Message");//remove loading icon
        });
    });

    // Toggle the branch tabs
    $(".branch-tab").click(function() {
        $(".branch-tab").removeClass("active-tab");
        $(".branch-box").hide();
        const id = $(this).data("id");
        $(this).addClass("active-tab");
        // Show the corresponding branch box based on the clicked tab's data-id
        $(`.branch-box-${id}`).show();
    });

    // Toggle menu sidebar
    $(".menu-toggle").click(function() {
        $(".menu-sidebar").toggleClass("menu-open");
    });

    // Humburger menu
    const nav = $(".nav-container");
    if (nav.length) {
        const toggle = $(".nav-toggle");
        if (toggle.length) {
            toggle.click(function() {
                nav.toggleClass("is-active");
            });
        }
    }
});

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailRegex.test(email)) validationErrors.push(`Invalied email format`);
}

const validateInput = (input, fieldName) => {
    if (input === "") {
        validationErrors.push(`Please enter ${fieldName}.`);
    }
}

const flushInput = () => {
    $("#name").val("");
    $("#email").val("");
    $("#phone_number").val("");
    $("#message").val("");
}

