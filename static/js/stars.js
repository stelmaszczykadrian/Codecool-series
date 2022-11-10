const button = Array.from(document.querySelectorAll('.shows-stars-button'))

console.log(button)

button.forEach(x => x.addEventListener('click', item))

function item(e) {
    fetch('/api/actor-shows/')
        .then(response => response.json())
        .then(response => notetoTable(response))
        .then(x => {
            console.log(x)
        })

}

function notetoTable(response) {
    let tBody = document.querySelector('table#list_of_twenty_actors tbody')
    response.forEach(x => {
        let tr= document.createElement('tr')
        const headers = ['name', 'birthday', 'number_of_shows']
        for (let header of headers) {
            let td= document.createElement('td')
            td.innerText = x[header]
            tr.appendChild(td)

        }
        tBody.appendChild(tr)

    })
        }
