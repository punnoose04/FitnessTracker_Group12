function accountCreation() { 
    // Used for sign up
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    const missingFields = document.getElementById('missingFields');
    const passwordMismatch = document.getElementById('passwordMismatch');
    const success = document.getElementById('successfulSignup');

    passwordMismatch.style.display = 'none';
    missingFields.style.display = 'none';
    success.style.display = 'none';

    if (!password || !confirmPass || !email) {
        missingFields.style.display = 'inline';
        return;
    }

    if (password != confirmPass) {
        passwordMismatch.style.display = 'inline';
        return;
    } else {
        success.style.display = 'inline';
    }
    // alert('email is' + email + '\n' + 'password is' + password + '\n' + "pass confirm is " + confirmPass);


}

async function accountSignin() {
    // Used for sign in
    const email1 = document.getElementById('signInEmail').value;
    const password1 = document.getElementById('signInPassword').value;
    const missingFields1 = document.getElementById('missingFields1');
    const success1 = document.getElementById('successfulSignup1');
    
    missingFields1.style.display = 'none';
    success1.style.display = 'none';
    // alert('email is' + email1 + '\n' + 'password is' + password1);

    if (!email1 || !password1) {
        missingFields1.style.display = 'inline';
        return;
    }

    try {
        console.log("in accountsignin");
        const response = await fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email1, password: password1 }),
        });
        const data = await response.json();

        if (response.ok) {
            success1.textContent = 'Successful Sign In!';
            success1.style.color = 'lightgreen';
            success1.style.display = 'inline';
            // alert(data.message);
        } else {
            success1.textContent = 'Either Username or Password is invalid';
            success1.style.color = 'red';
            success1.style.display = 'inline';
            // alert(data.message);
        }
    } catch (error) {
        console.error('Error signing in:', error);
        alert('Error signing in. Please try again later.');
    }

}