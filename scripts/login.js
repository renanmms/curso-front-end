const Role = {
    Dev: 'Dev',
    Client: 'Client'
};

function cadastrar() {

    if(!checkIfAnyRoleIsChecked()) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a role!',
            icon: 'error',
            confirmButtonText: 'Continue'
        });
        return;
    }
    
    let payload = {
        fullName: document.querySelector('#fullName').value,
        birthDate: document.querySelector('#birthDate').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        role: getSelectedRole()
    };

    fetch('https://69adb822b50a169ec88017c7.mockapi.io/api/users', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    .then(response => response.json())
    .then(response => {         
        Swal.fire({
            title: "Success!",
            text: "User was created successfully!",
            icon: "success",
            confirmButtonText: "OK"
            }).then((result) => {
                if(result.isConfirmed) {
                    localStorage.setItem('username', response.fullName);
                    localStorage.setItem('role', getRole(payload));
                    localStorage.setItem('idClient', response.id);

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


function checkIfAnyRoleIsChecked() {
    let counter = 0;
    let list = document.getElementsByName('role');

    for(let radioButton of list) {
        if(radioButton.checked === false) {
            counter++;
        }   
    }

    let result = counter !== list.length;

    return result;
}

function getSelectedRole() {
    return document.getElementsByName('role')[0].checked === true ? Role.Dev : Role.Client;
}

function getRole(payload){
    return payload.role === Role.Dev ? 'Desenvolvedor' : 'Cliente';
}