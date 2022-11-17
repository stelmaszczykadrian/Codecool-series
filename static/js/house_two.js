let ButtonHouseCharacters = document.getElementById('house-characters')
console.log(ButtonHouseCharacters)
ButtonHouseCharacters.addEventListener('click', () => {
    CharactersFromHouse()
})


function CharactersFromHouse() {
    fetch('/api/house-characters/')
    .then(response => response.json())
        .then(response => CharactersToUL(response))
        .then(response => getActors())
}


function CharactersToUL(characters) {
    let ul = document.getElementById('list-of-chars')
    characters.forEach(character => {
        ul.innerHTML += `
        <li class="characters" data-id="${character['actor_id']}">${character['character_name']}</li>
        `
    })

}


function getActors() {
    let getCharactersId = Array.from(document.getElementsByClassName('characters'))
    getCharactersId.forEach(character => {
        character.addEventListener('click', () => {
            let id = character.dataset.id
            fetch(`/api/house-characters/${id}`)
            .then(response => response.json())
                .then(data => getModalForTitles(data))
        })
    })
}

function getModalForTitles(data) {
    let TBodyActors = document.getElementById('actors')
    TBodyActors.innerHTML=''
    TBodyActors.innerHTML += `
    <tr>
    <td>${data['name']}</td>
    <td>${data['birthday']}</td>
    </tr>
`
    $('#ModalofHouse').modal('show')
}

