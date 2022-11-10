const actor= Array.from(document.getElementsByClassName('actors'))

actor.forEach(x => x.addEventListener('click', item))

// e.target = musze miec przekazany event i wtedy target to jest to co klikne
function item(e) {
    console.log(e.target.dataset.id)
    fetch(`/api/actor-shows/${e.target.dataset.id}`)
        .then(response => response.json())
        .then(response => noteToModal(response, e.target.innerText))

}

function noteToModal(response, title) {
    let modal = document.getElementById("list_of_shows")
    let titleHeader = document.getElementById('exampleModalLabel')
    titleHeader.innerText = title
    modal.innerText = ''
    response.forEach(x => {
        let li =document.createElement('li');
        li.innerText = x.title
        modal.appendChild(li);
    })
    // wyciąga mi element z identyfikatorem #exampleModal i wywołuje na nim funkcję modal z parametrem 'show'
    $('#exampleModal').modal('show')
}