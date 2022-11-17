const button = document.querySelector('.shows-stars-button')
const tbodyActors = document.querySelector(".tbody-actors")

button.addEventListener('click', () => {
    item()

})

function item() {
    fetch('/api/actor-shows/')
        .then(response => response.json())
        .then(data => ActorsTable(data))
        .then(data => getMoviesFromActors())
}

function ModalBuilder (titles) {
    let ul = document.getElementById('list_of_action_shows')
    ul.innerHTML = ''
    titles.forEach(title => {
        ul.innerHTML += `
        <li>${title['title']}</li>
        
        `
        $('#ActorsModal').modal('show')
    })
}

function ActorsTable(data) {
    tbodyActors.innerHTML = ''
    let arrayData = [...data]
    arrayData.forEach(actor => {
        let tableData = `
        <tr>    
        <td class="actors" data-id="${actor['id']}">${actor['name']}</td>
        <td>${actor['birthday']}</td>
        <td>${actor['number_of_shows']}</td>
        </tr>`
        tbodyActors.innerHTML += tableData
    })

}

function getMoviesFromActors() {
    let actors = Array.from(document.getElementsByClassName('actors'))
    actors.forEach(actor=> {
        actor.addEventListener('click', () => {
            let id = actor.dataset.id
            fetch(`/api/actor-shows/${id}`)
            .then(response => response.json())
                .then(data => ModalBuilder(data))
        })
    })
}