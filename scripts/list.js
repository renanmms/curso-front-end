let list = [];

document.querySelector("#name").innerText = localStorage.getItem("userName");
document.querySelector("#role").innerText = localStorage.getItem("role");

getProjects();

function redirectToCreateProject() {
    window.location.href = 'project-create-edit.html';
}

function getProjects() {
    fetch('https://69adb822b50a169ec88017c7.mockapi.io/api/projects')
    .then(response => response.json())
    .then(response => {
        list = response;
        buildTable();
    });
}

function goToEdit(id) {
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id) {
    fetch(`https://69adb822b50a169ec88017c7.mockapi.io/api/projects/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        list = list.filter(project => project.id !== String(id));

        buildTable();
    });
}

function buildTable() {
    console.log('cleaning table body...');
    document.querySelector('#table-body').innerHTML = '';


    console.log('building table...');
    list.forEach(element => {
        let template = 
                    `<div class="row">
                        <div class="title-description">
                            <h6 class="title">${element.title}</h6>
                            <p class="description">${element.description}</p>
                            </div>
                            <div class="total-cost">R$ ${element.totalCost}</div>
                            <div class="actions">
                            <span class="material-icons edit" onclick="goToEdit(${element.id})">
                                edit
                            </span> 
                            <span class="material-icons delete" onclick="deleteProject(${element.id})">
                                delete
                            </span>
                        </div>
                    </div>`

        document.querySelector('#table-body').insertAdjacentHTML('beforeend', template);
    });
}