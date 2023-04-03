let shows = Array.from(document.getElementsByClassName('shows'))

shows.forEach(show => {
    show.addEventListener('click', item => {
        let id = item.target.dataset.id
        fetch_genres(id)
    })
})


function fetch_genres(id) {
    fetch(`api/genre/shows${id}`)
    .then(response => response.json())
        .then(data => LetsTest(data))

}
function LetsTest(data) {
    let dataGenres = data['genres_show']
    let dataTitles = data['season_titles']
    let dataActors = data['actors_to_shows']
    let genres = document.getElementById('genres')
    let TbodyTitles =document.getElementById('TbodyTitles')
    let actors = document.getElementById('actors')
    genres.innerHTML = ''
    TbodyTitles.innerHTML = ''
    dataGenres.forEach(genre => {
        genres.innerHTML += `<li>${genre['name']}</li>`
    })
    dataTitles.forEach(title => {
        TbodyTitles.innerHTML += `<tr>
                                    <td>${title['title']}</td>
                                 </tr>`
    })

    dataActors.forEach(actor => {
        actors.innerHTML += `<li>${actor['name']}</li>`
    })
    $('#ModalWithInfo').modal('show')
}


function GenresToModal(data) {
    let genres = document.getElementById('genres')
    genres.innerHTML = ''
    data.forEach(genre => {
        genres.innerHTML += `<div>${genre['name']}</div>`
    })
    $('#ModalWithInfo').modal('show')
}

function TitlesToModal(seasonTitles) {
    let TbodyTitles =document.getElementById('TbodyTitles')
    TbodyTitles.innerHTML = ''
    seasonTitles.forEach(title => {
        TbodyTitles.innerHTML += `<tr>
                                    <td>${title['title']}</td>
                                 </tr>`
    })

}