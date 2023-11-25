document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  const isLogin = localStorage.getItem("accessToken") !== null;

  const isSignUp = window.location.pathname.includes("signup.html");
  const isProfilePage = window.location.pathname.includes("profile.html");

  if (!isLogin && isProfilePage) {
    goToSignup("You need to log in to access the Profile page.", "error");
  } else if (isLogin && isSignUp) {
    redirectToProfile(
      "You are already logged in. Redirecting to Profile page...",
      "info"
    );
  } else if (isLogin) {
    dispprofile();
  } else {
    goToSignup();
  }

  function goToSignup(message = "", messageType = "") {
    app.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="1980" height="487" viewBox="0 0 1980 487" fill="none">
                <path d="M24 0L1980 351.443V487H-24V0Z" fill="#5BF7DB" />
            </svg>
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="952" height="485" viewBox="0 0 952 385" fill="none" style="z-index: 1;">
                <path d="M0 0L952 190.67V485H0V0Z" fill="white"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="1980" height="485" viewBox="0 0 1980 485" fill="none">
                <path d="M0 0L1980 350V485H0V0Z" fill="white"/>
            </svg>
            <div class="container">
            <p>Welcome back! 👋</p>
                <h4>Sign up to your account</h4>
                <form id="signupForm">
                    <label for="username" class="inputclass">Your name</label><br>

                    <input type="text" id="username" class="inputclass" required><br>

                    <label for="useremail" class="inputclass">Your email</label><br>

                    <input type="email" id="useremail" class="inputclass" required><br>

                    <label for="password" class="inputclass">Password</label><br>

                    <input type="password" id="password" class="inputclass" required><br>

                    <label for="password" class="inputclass">Confirm Password</label><br>

                    <input type="password" id="confirmpassword" class="inputclass" required><br>

                    <button type="submit" class="inputclass" id="signupbutton">Signup</button>
                </form>
                <p id="signupMessage" class="${messageType}">${message}</p>

            </div>
        `;

    const signupForm = document.getElementById("signupForm");
    const signupMessage = document.getElementById("signupMessage");

    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const useremail = document.getElementById("useremail").value;
      const password = document.getElementById("password").value;
      const confirmpassword = document.getElementById("confirmpassword").value;

      const accessToken = generateAccessToken();

      localStorage.setItem("username", username);
      localStorage.setItem("useremail", useremail);
      localStorage.setItem("password", password);
      localStorage.setItem("accessToken", accessToken);

      signupMessage.textContent = "Signup successful!";
      signupMessage.className = "success";
      setTimeout(() => {
        redirectToProfile(
          "Signup successful! Redirecting to Profile page...",
          "success"
        );

        dispprofile();
      }, 1000);
    });
  }

  function dispprofile() {
    const username = localStorage.getItem("username");
    const useremail = localStorage.getItem("useremail");
    const password = localStorage.getItem("password");
    app.innerHTML = `
    <svg class="svg" xmlns="http://www.w3.org/2000/svg" width="1980" height="487" viewBox="0 0 1980 487" fill="none">
                <path d="M24 0L1980 351.443V487H-24V0Z" fill="#5BF7DB" />
            </svg> 
    <div class="container">
    <h2 id="text">Signup Successfull</h2>

                <h2 class="center">Profile</h2>
                <div class="image-container">
                <img src="./asset/Vectorcircle.png" alt="my pic">
                <img src="./asset/Vectorvector.png" alt="my pic">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
                
            </div>
        `;

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      goToSignup();
    });
  }

  function redirectToProfile(message = "", messageType = "") {
    app.innerHTML = `
            <div class="container">
                <h2 id="text">${message}</h2>
                <h2 class="center">Profile</h2>
                <div class="image-container">
                <img src="./asset/Vectorcircle.png" alt="my pic">
                <img src="./asset/Vectorvector.png" alt="my pic">
                </div>
                <p class="center">Full Name: ${username}</p>
                <p class="center">Email:${useremail}</p>
                <p class="center">Password: ${password}</p> 
                <button id="logoutBtn">Logout</button>
            </div>
        `;

    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.addEventListener("click", function () {
      localStorage.clear();
      goToSignup();
    });
  }

  function generateAccessToken() {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let accessToken = "";
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      accessToken += charset[randomIndex];
    }
    return accessToken;
  }
});
