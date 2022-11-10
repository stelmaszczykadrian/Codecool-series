const house_actors = Array.from(document.getElementsByClassName('house_actors'))

console.log(house_actors)

house_actors.forEach(x => x.addEventListener('click', item))


function item(e) {
    fetch(`/api/house-show/${e.target.dataset.id}`)
    .then(response => response.json())
    .then(response => notetoModal(response, e.target.innerText))
}


function notetoModal(response, title) {
    let tr = document.createElement('tr');
    const headers = ['name','birthday']
    let titleHeader = document.getElementById('modal_house_title')
    titleHeader.innerText = title
    for (let header of headers) {
        let td=document.createElement('td')
        td.innerText = header.title
        td.innerText = response[header]
        tr.appendChild(td)
    }
    let tBodyModal = document.querySelector('table#modal-table tbody')
    // ZANIM DODA KOLEJNY REKORD MUSI WYCZYŚCIĆ MODAL
    tBodyModal.innerText = ''
    tBodyModal.appendChild(tr)
    $('#modal_house').modal('show')
}