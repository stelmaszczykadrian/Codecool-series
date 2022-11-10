let button_modal = document.getElementById('button_modal')
button_modal.addEventListener('click', item)

function item() {
    let id_data_start = document.querySelector('#id_data_start').value
    let id_data_end = document.querySelector('#id_data_end').value
    fetch("/api/from-to?" + new URLSearchParams({from:id_data_start,to:id_data_end}))
    .then(response => response.json())
    .then(response => noteToModal(response))

}

function noteToModal(response) {
    let modal = document.getElementById("list_of_shows_modal")
    modal.innerText = ''
    response.forEach(x => {
        let li =document.createElement('li');
        li.innerText = x.title
        modal.appendChild(li);
    })
    $('#exampleModal').modal('show')
}