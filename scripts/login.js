function login() {
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    let payload = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }

    fetch('https://localhost:7261/api/users/login', {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    .then(response => response.json())
    .then(response => {         
        Swal.fire({
            title: "Success!",
            text: "Login successfully!",
            icon: "success",
            confirmButtonText: "OK"
            }).then((result) => {
                if(result.isConfirmed) {
                    localStorage.setItem('username', response.fullName);
                    localStorage.setItem('role', response.role);
                    localStorage.setItem('idClient', response.idClient);
                    localStorage.setItem('token', response.token);

                    window.location.href = "list.html";
                }
            });
    })
    .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'Internal Server Error',
            icon: 'error',
            confirmButtonText: 'Continue'
        });
        console.log(error);
    });
}