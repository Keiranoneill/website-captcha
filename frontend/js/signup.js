async function hashInputValue(value) {
  const msgBuffer = new TextEncoder().encode(value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

async function handleFormSubmission(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;
  const agreeTerms = document.getElementById("agreeTerms").checked;
  const recaptchaToken = grecaptcha.getResponse();

  if (!agreeTerms) {
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

  if (recaptchaToken === "") {
    alert("Please complete the reCAPTCHA.");
    return;
  }

  const hashedPassword = await hashInputValue(password);

  try {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password: hashedPassword,
        recaptchaToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    } else {
      alert("Registration successful");
    }
  } catch (error) {
    console.error("Registration failed:", error.message);
    alert("Registration failed");
  }

  alert("Registration successful!");
  window.location.href = "login.html"; // Redirect to login page after successful registration
}
