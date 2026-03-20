getProjects();

document.querySelector('#name').innerText = localStorage.getItem('username');
document.querySelector('#role').innerText = localStorage.getItem('role');
document.querySelector('#new-project').addEventListener('click', () => {
    window.location.href = 'project-create-edit.html';
});

function getProjects() {
    fetch('https://69adb822b50a169ec88017c7.mockapi.io/api/projects')
    .then(response => response.json())
    .then(response => {

//         [
//     {
//         "title": "Task Manager API",
//         "description": "Project for .net mid level test",
//         "totalCost": 90000,
//         "idClient": "idClient 1",
//         "id": "1"
//     },
//     {
//         "title": "DevFreela API",
//         "description": "Test",
//         "totalCost": 25000,
//         "idClient": "idClient 2",
//         "id": "2"
//     },
//     {
//         "title": "Testes Editado 2",
//         "description": "Testes",
//         "totalCost": 2000,
//         "idClient": 1,
//         "id": "3"
//     },
//     {
//         "title": "Testes 4",
//         "description": "Testes 4",
//         "totalCost": 70000,
//         "idClient": 1,
//         "id": "4"
//     },
//     {
//         "title": "Projeto 4",
//         "description": "Testes projeto 4",
//         "totalCost": 90000,
//         "idClient": 1,
//         "id": "5"
//     }
// ]
        let template = ''
        response.forEach(element => {
            template = `<div class="row">
                                    <div class="title-description">
                                        <h6 class="title">${element.title}</h6>
                                        <p class="description">${element.description}</p>
                                        </div>
                                        <div class="total-cost">R$ ${element.totalCost}</div>
                                        <div class="actions">
                                        <span class="material-icons edit">
                                            edit
                                        </span> 
                                        <span class="material-icons delete">
                                            delete
                                        </span>
                                    </div>
                                </div>`

                                document.querySelector('#table-body').insertAdjacentHTML('beforeend', template);
        });
        console.log(response);
    });
}