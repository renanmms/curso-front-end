const ScreenType = {
    Create: 'create',
    Edit: 'edit'
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const screenType = params.id ? ScreenType.Edit : ScreenType.Create;

window.onload = function () {
    setScreenTypeTexts();
    setFreelancersForSelection();
    fillInputs();
}

function fillInputs() {
    if (screenType === ScreenType.Edit) {
        fetch(`https://localhost:7261/api/projects/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(project => {
                document.querySelector('#title').value = project.title;
                document.querySelector('#total-cost').value = project.totalCost;
                document.querySelector('#description').value = project.description;
            })
    }
}

function setScreenTypeTexts() {
    if (screenType == ScreenType.Create) {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }

    if (screenType == ScreenType.Edit) {
        document.querySelector('#main-title').innerText = "Editar projeto";
        document.querySelector('#action-button').innerText = "Salvar";
    }
}

function setFreelancersForSelection() {
    fetch(`https://localhost:7261/api/users/freelancers`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(freelancers => {
            freelancers.forEach(freelancer => {
                let template = `<option value="${freelancer.id}">${freelancer.fullName}</option>`
                document.querySelector('#freelancers').insertAdjacentHTML('beforeend', template);
            });
        })
}


function createOrEdit() {
    const payload = {
        title: document.querySelector('#title').value.trim(),
        totalCost: Number(document.querySelector('#total-cost').value.trim()),
        description: document.querySelector('#description').value.trim(),
        idClient: localStorage.getItem('idClient')
    };

    let result = validate(payload);

    if (!result.isSuccess) {
        Swal.fire({
            title: 'Validation Error!',
            text: result.errorMessages.join('\n'),
            icon: 'error',
            confirmButtonText: 'Continue'
        });
        return;
    }

    let queryParam = screenType === ScreenType.Edit ? `${params.id}` : '';
    let httpMethod = screenType === ScreenType.Edit ? 'PUT' : 'POST';

    fetch(`https://localhost:7261/api/projects/${queryParam}`, {
        method: httpMethod,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(response => {
            // TODO: Validate response status code
            if (screenType === ScreenType.Edit) {
                showSuccessMessage('Project was edited successfully!');
            } else {
                showSuccessMessage('Project was created successfully!');
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function validate(payload) {

    let validations = {
        titleIsValid: payload.title !== '',
        descriptionIsValid: payload.description !== '',
        totalCostIsValid: numberIsValid(payload.totalCost),
        idClientIsValid: numberIsValid(payload.idClient)
    }

    let result = {
        isSuccess:
            validations.titleIsValid &&
            validations.totalCostIsValid &&
            validations.descriptionIsValid &&
            validations.idClientIsValid,
        errorMessages: checkForErrorMessages(validations)
    }

    return result;
}

function numberIsValid(value) {
    const numberValue = Number(value);

    return (value !== '' && Number.isFinite(numberValue) && numberValue > 0);
}

function checkForErrorMessages(validations) {
    let errorMessages = [];

    if (!validations.titleIsValid) {
        errorMessages = errorMessages.concat('Title is not valid!');
    }

    if (!validations.totalCostIsValid) {
        errorMessages = errorMessages.concat('Total cost is not valid!');
    }

    if (!validations.descriptionIsValid) {
        errorMessages = errorMessages.concat('Description is not valid!');
    }

    if (!validations.idClientIsValid) {
        errorMessages = errorMessages.concat('Id client is not valid!');
    }

    return errorMessages;
}

function showSuccessMessage(message) {
    Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        confirmButtonText: "OK"
    }).then((result) => {
        if(result.isConfirmed) {
            window.location.href = "list.html";
        }
    });
}