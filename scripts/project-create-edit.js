window.onload = function() {
    const screenType = 'create';

    if(screenType == 'create')
    {
        document.querySelector('#main-title').innerText = "Vamos cadastrar seu novo projeto!";
        document.querySelector('#action-button').innerText = "Cadastrar";
    }
    
    // if(screenType == 'edit')
    // {
    //     document.querySelector('#main-title').innerText = "Editar projeto";
    //     document.querySelector('#action-button').innerText = "Salvar";
    // }
}


function cadastrar()
{

    let payload = {
        title: document.querySelector('#title').value,
        totalCost: Number(document.querySelector('#total-cost').value),
        description: document.querySelector('#description').value
    };

    fetch('https://69adb822b50a169ec88017c7.mockapi.io/api/projects', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        alert('Project created successfully!');
    })
    .catch(error => {
        alert('Internal Server Error');
        console.log(error);
    });
}