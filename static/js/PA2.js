let button_for_shows = document.getElementById('button_for_shows')

button_for_shows.addEventListener('click', item)

function item() {
    let id_data_start = document.querySelector('#id_data_start').value
    let id_data_end = document.querySelector('#id_data_end').value
    fetch("/api/series/date?" + new URLSearchParams({from:id_data_start,to:id_data_end}))
    .then(response => response.json())
    .then(response => noteToTable(response))

}


function noteToTable (series) {
    let countedSeries = document.getElementById('counted-series')
    series.forEach(serie => {
        countedSeries.innerHTML += `<tr>
                                    <td>${serie['title']}</td>
                                    <td>${serie['year']}</td>
                                    <td>${serie['counted_seasons']}</td>
                                    </tr>
        `
    }
    )
}