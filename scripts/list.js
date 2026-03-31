let list = [];

document.querySelector("#name").innerText = localStorage.getItem("username");
document.querySelector("#role").innerText = localStorage.getItem("role");

getProjects();

function redirectToCreateProject() {
    window.location.href = 'project-create-edit.html';
}

function getProjects() {
    showLoader();
    fetch('https://localhost:7261/api/projects')
        .then(response => {
            if (!response.ok) {
                Swal.fire({
                    title: 'HTTP Error!',
                    text: `Status: ${response.status}`,
                    icon: 'error',
                    confirmButtonText: 'Continue'
                });
            }
            return response.json();
        })
        .then(response => {
            list = response;
            buildTable();
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: `Internal Server Error: ${error}`,
                icon: 'error',
                confirmButtonText: 'Continue'
            });
            console.log(error);
        })
        .finally(() => {
            hideLoader();
        });
}

function goToEdit(id) {
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id) {
    fetch(`https://localhost:7261/api/projects/${id}`, { // TODO: Change to Local API
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(response => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#004CD8",
                cancelButtonColor: "#FF2222",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your project has been deleted.",
                        icon: "success"
                    });

                    list = list.filter(project => project.id !== String(id));
                    buildTable();
                }
            });
        });
}

function buildTable() {
    document.querySelector('#table-body').innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    list = list.filter(el => el.idClient === idClient);

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

function showLoader() {
    document.querySelector('#loader').style.display = 'flex';
}

function hideLoader() {
    document.querySelector('#loader').style.display = 'none';
}