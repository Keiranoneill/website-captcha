async function hashInputValue(value) {
  const msgBuffer = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function postgres({ name, email, password }) {
  const recaptchaResponse = grecaptcha.getResponse();
  if (!recaptchaResponse) {
    throw new Error("Invalid reCAPTCHA");
  }

  const requestData = {
    name,
    email,
    password,
  };

  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Recaptcha: recaptchaResponse,
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error(`Signup failed: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData;
}

async function handleFormSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("nameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const repeatPassword = document.getElementById("repeatPasswordInput").value;
  const agreedToTerms = document.getElementById("agreeTermsInput").checked;
  const captchaResponse = grecaptcha.getResponse();

  if (!agreedToTerms) {
    alert("Please agree to the terms of service.");
    return;
  }

  if (password !== repeatPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (name === "" || email === "" || password === "" || repeatPassword === "") {
    alert("Please fill in all fields.");
    return;
  }

  if (captchaResponse === "") {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  const hashedPassword = await hashInputValue(password);

  try {
    const responseData = await postgres({
      name,
      email,
      password: hashedPassword,
    });

    alert("Registration successful!");

    // Redirect to homepage
    window.location.href = "home.html";
  } catch (error) {
    alert(error.message);
  }
}
