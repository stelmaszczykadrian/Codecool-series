let showStarsButton = document.querySelector('#show-stars-button')

showStarsButton.addEventListener('click', () => {
    get20Actors()
})


function get20Actors() {
    fetch('/api/actor-shows/')
        .then(response => response.json())
        .then(response => htmlFactoryforActors(response))
        .then(response => getTitleFromSeries(response))
}



function htmlFactoryforActors(response) {
    let Tbody = document.querySelector('table tbody')
    let tHead = document.querySelector('table thead')

    tHead.innerHTML += `
    <th>Name</th>
    <th>Birthday</th>
    <th>Count of Shows</th>
    `
    Tbody.innerHTML = ''
    response.forEach(actor => {

         let tableOfActors = `<div>
            <td class="actors" data-id="${actor['id']}">${actor['name']}</td>
            <td>${actor['birthday']}</td>
            <td>${actor['number_of_shows']}</td>
            </div>
`

        Tbody.innerHTML +=tableOfActors
    })
}

function getTitleFromSeries() {
    let actors = document.getElementsByClassName('actors')
    let arrayActors = [...actors]
    arrayActors.forEach(actor => {
        actor.addEventListener('click', () => {
            let get_id = actor.dataset.id
            console.log(get_id)
            fetch(`/api/actor-shows/${get_id}`)
            .then(response => response.json())
            .then(response => getModal(response))
        })
    })
}


function getModal(titles) {
    let ul = document.getElementById('list_of_actors')
    ul.innerHTML = ''
    titles.forEach(title => {
        ul.innerHTML += `
        <li>${title['title']}</li>
        `

        $('#ModalofActor').modal('show')
    }
    )


}