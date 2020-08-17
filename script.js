function searchSong() {
    document.getElementById('result-box').style.display = 'none'
    for (let index = 1; index <= 10; index++) {
        document.getElementById('lyrics' + index.toString()).style.display = 'none'
    }
    let searchItem = document.getElementById("search-item").value;
    if (searchItem) {
        fetch(`https://api.lyrics.ovh/suggest/${searchItem}`)
            .then(res => res.json())
            .then(data => {

                displayResult(data);
            })
    }
}

function displayResult(data) {
    document.getElementById("result-box").style.display = 'block';
    for (let index = 1; index <= 10; index++) {
        getElements("title" + index.toString()).innerText = data.data[index - 1].title;
        getElements("album-name" + index.toString()).innerText = data.data[index - 1].album.title;
        getElements("artist" + index.toString()).innerText = data.data[index - 1].artist.name;
    }
}
if (!document.getElementById("search-item").value) {
    document.getElementById("result-box").style.display = 'none';
}
function getElements(id) {
    let element = document.getElementById(id);
    return element;
}
function getLyrics(artist, title, lyrics) {
    let artistText = document.getElementById(artist).innerText;
    let titleText = document.getElementById(title).innerText;
    fetch(`https://api.lyrics.ovh/v1/${artistText}/${titleText}`)
        .then(res => res.json())
        .then(data => {
            displaylyrics(data, lyrics)
        })
}
function displaylyrics(data, lyrics) {
    getElements(lyrics).innerText = data.lyrics;
    document.getElementById(lyrics).style.display = 'block'
}