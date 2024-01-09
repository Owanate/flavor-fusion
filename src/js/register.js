import * as $ from "jquery";
import jqueryValidate from "jquery-validation";
import Swal from "sweetalert2";

let showSignInForm = () => {
    if ($("#signin").hasClass("d-none")) {
      $("#signin").removeClass("d-none");
      $("#signup").addClass("d-none");
      window.location.href = "../pages/register.html#signup";
    } else {
      $("#signin").addClass("d-none");
    } 
}

$("#showSignUpForm").click(() => {
    if ($("#signup").hasClass("d-none")) {
      $("#signup").removeClass("d-none");
      $("#signin").addClass("d-none");
      window.location.href = "../pages/register.html#signup";
    } else {
      $("#signup").addClass("d-none");
    }
});

function navigateTo(formId) {
  if ($(formId)) {$(formId).removeClass("d-none");}
}

$.validator.addMethod(
  "alphanumeric",
  function (value, element) {
    return (
      this.optional(element) ||
      (value.match(/[a-zA-Z]/) && value.match(/[0-9]/))
    );
  },
  "Password must contain at least one number."
);

$("#signup-form").validate({
  rules: {
    name: "required",
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minlength: 8,
      alphanumeric: true,
    },
    diet_preference: {
      required: true,
    },
  },
  messages: {
    name: "Please enter your full name.",
    password: {
      required: "Please enter a password.",
      minlength: "Your password must be consist of at least 8 characters.",
    },
    email: {
      required: "We need your email address to contact you.",
      email: "Your email address must be in the format of name@domain.com.",
    },
    diet_preference: {
      required: "Please select your preferred diet plan.",
    },
  },
  submitHandler: () => {
    // Retrieve name and email from the form data
    const signUpForm = document.querySelector("#signup-form");
    const formData = new FormData(signUpForm);
    const name = formData.get("name");
    const email = formData.get("email");
    // Check if the user already exists
    let user = JSON.parse(localStorage.getItem("user")) || [];
    let exist =
      user.length &&
      JSON.parse(localStorage.getItem("user")).some(
        (data) =>
          data.name.toLowerCase() === name.toLowerCase() &&
          data.email.toLowerCase() === email.toLowerCase()
      );
    if (!exist) {
      // If the user doesn't exist, add them to the local storage
      user.push(Object.fromEntries(formData));
      localStorage.setItem("user", JSON.stringify(user));
      signUpForm.reset();
      // Show success message and navigate to sign-in form
      Swal.fire({
        title: "Account created!",
        text: "You created your account! Please sign in.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          showSignInForm();
          window.location.href = "../pages/register.html#signin";
        }
      });
    } else {
      // If the user already exists, show info message and navigate to sign-in form
      Swal.fire({
        title: "Apologies",
        text: "You've already signed up",
        icon: "info",
      }).then((result) => {
        if (result.isConfirmed) {
          showSignInForm();
          window.location.href = "../pages/register.html#signin";
        }
      });
    }
  },
});

function login(event) {
  event.preventDefault();
  // Retrieve email and password from the form data using jQuery
  const email = $("#signin-email").val();
  const pwd = $("#signin-password").val();
  // Check if the user exists
  let user = JSON.parse(localStorage.getItem("user")) || [];
  let exist = user.some((data) =>data.email.toLowerCase() === email.toLowerCase() && data.password.toLowerCase() === pwd.toLowerCase());
  if (!exist) {
    // If the user doesn't exist, show error message
    Swal.fire({
      title: "Try again",
      text: "Incorrect login details!",
      icon: "error",
    });
  } else {
    // If the user exists, show success message and navigate to the dashboard
    Swal.fire({
      title: "Good job!",
      text: "You just logged in!",
      icon: "success",
    }).then(() => {
      window.location.href = "../pages/dashboard.html";
    });
  }
}

// Check if there's a fragment identifier in the URL and navigate accordingly
window.onload = () => {
  if (window.location.hash) {
    navigateTo(window.location.hash);
  }
};

$("#showSignInForm").click(showSignInForm);
$("#signin-form").submit(login);