function cadastrar()
{
    if(!checkIfAnyRoleIsChecked())
    {
        alert("Please select a role!");
    }

    let payload = {
        fullName: document.querySelector('#fullName').value,
        birthDate: document.querySelector('#birthDate').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        role: ''
    }    
}


function checkIfAnyRoleIsChecked() 
{
    let counter = 0;
    let list = document.getElementsByName("role");

    for(let radioButton of list) {
        if(radioButton.checked === false) {
            counter++;
        }   
    }

    let result = counter !== list.length;

    return result;
}