const ScreenType = {
    Create: 'create',
    Edit: 'edit'
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

let screenType = params.id ? ScreenType.Edit : ScreenType.Create;

window.onload = function () {
    setScreenTypeTexts();
    fillInputs();
}

function fillInputs() {
    if (screenType === ScreenType.Edit) {
        fetch(`https://69adb822b50a169ec88017c7.mockapi.io/api/projects/${params.id}`, {
            method: 'GET'
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


function createOrEdit() {
    const payload = {
        title: document.querySelector('#title').value.trim(),
        totalCost: Number(document.querySelector('#total-cost').value.trim()),
        description: document.querySelector('#description').value.trim(),
        idClient: localStorage.getItem('idClient')
    };

    let result = validate(payload);

    if (!result.isSuccess) {
        alert(result.errorMessages.join('\n'));
        return;
    }

    let queryParam = screenType === ScreenType.Edit ? `${params.id}` : '';
    let httpMethod = screenType === ScreenType.Edit ? 'PUT' : 'POST';

    fetch(`https://69adb822b50a169ec88017c7.mockapi.io/api/projects/${queryParam}`, {
        method: httpMethod,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (screenType === ScreenType.Edit) {
                alert('Project edited successfully!');
            } else {
                alert('Project created successfully!');
                window.location.href = "//localhost:5500/list.html"
            }
        })
        .catch(error => {
            alert('Internal Server Error');
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