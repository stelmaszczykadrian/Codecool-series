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
