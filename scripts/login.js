const Role = {
    Dev: 'Dev',
    Client: 'Client'
};

function cadastrar() {
    if(!checkIfAnyRoleIsChecked()) {
        alert('Please select a role!');
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
        alert('Created successfully!');
    })
    .catch(error => {
        alert('Internal Server Error');
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