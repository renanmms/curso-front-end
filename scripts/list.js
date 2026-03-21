getProjects();

document.querySelector('#name').innerText = localStorage.getItem('username');
document.querySelector('#role').innerText = localStorage.getItem('role');

function redirectToCreateProject() {
    window.location.href = 'project-create-edit.html';
}

function getProjects() {
    fetch('https://69adb822b50a169ec88017c7.mockapi.io/api/projects')
    .then(response => response.json())
    .then(response => {
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