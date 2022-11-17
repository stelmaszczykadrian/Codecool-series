const showStarsButton = document.getElementById('show-starsbutton')
console.log(showStarsButton)
showStarsButton.addEventListener('click', ()=> {
    getActors()
})

function getActors() {
    fetch('/api/actor-shows/')
        .then(response => response.json())
        .then(data => getTable(data))
}


function getTable(actors) {
    let tBody =document.querySelector('table tbody')
    actors.forEach(actor => {
        let tr = document.createElement('tr')
        const headers =['name','birthday','number_of_shows']
        for (let header of headers) {
            let td = document.createElement('td')
            td.dataset.id = actor['id']
            td.innerText = actor[header]
            td.addEventListener('click',getTitles)
            tr.appendChild(td)
        }
        tBody.appendChild(tr)
    } )
}

function getTitles(e) {
    let id = e.target.dataset.id
    fetch(`/api/actor-shows/${id}`)
            .then(response => response.json())
            .then(data => getModal(data))

}

function getModal(shows) {
    let ul =document.getElementById('list_of_actors')
    ul.innerText = ''
    shows.forEach(show => {
        let li = document.createElement('li')
        li.innerText = show.title
        ul.appendChild(li)
    })
    $('#ModalofActor').modal('show')
}