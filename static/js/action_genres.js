let actionButton =document.getElementById('action-button')


actionButton.addEventListener('click', item)

function item() {
    fetch("/api/action/shows")
        .then(response => response.json())
        .then(response => noteToModal(response))
}



function noteToModal(response) {
    let ulOnModal = document.getElementById("list_of_action_shows")
    ulOnModal.innerText = ''
    response.forEach(x => {
        let li =document.createElement('li');
        li.innerText = x.title
        ulOnModal.appendChild(li);
    })
    $('#ActionModal').modal('show')
}

// let button_modal = document.getElementById('button_modal')
// button_modal.addEventListener('click', item)
//
// function item() {
//     let id_data_start = document.querySelector('#id_data_start').value
//     let id_data_end = document.querySelector('#id_data_end').value
//     fetch("/api/from-to?" + new URLSearchParams({from:id_data_start,to:id_data_end}))
//     .then(response => response.json())
//     .then(response => noteToModal(response))

