const buttony = document.querySelectorAll('.buttons-penguins')
let listbuttony = Array.from(buttony)

listbuttony.forEach(e => {
    e.addEventListener('click', loadPingwiny)
})

function loadPingwiny(e) {
    let nameOfButton = e.target.name
    fetch("/api/pingwiny?" + new URLSearchParams({name:nameOfButton}))
    .then(response => response.json())
    .then(response => notetoModal(response))
}

function notetoModal(response) {
    let tBodyModal = document.querySelector('table#penguins tbody')
    tBodyModal.innerText = ''
    response.forEach(episode => {
        let tr= document.createElement('tr')
        const headers = ['seasonstitle', 'episodestitle', 'overview']
        for (let header of headers) {
            let td= document.createElement('td')
            td.innerText = episode[header]
            tr.appendChild(td)

        }
        tBodyModal.appendChild(tr)

    })
        $('#PenguinModal').modal('show')
        }




