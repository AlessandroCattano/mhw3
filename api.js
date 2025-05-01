function onJsonSpotify(json) {
    console.log(json);
    const trackElement = document.getElementById('track');
    if (trackElement) {
        trackElement.remove();
    }
    const commentsElement = document.getElementById('comments');
    if (commentsElement) {
        commentsElement.remove();
    }
    const track_url = json.tracks.items[0].external_urls.spotify;
    const inside = document.querySelector('#inside');
    const track = document.createElement("div");
    track.id = "track";
    const trackParagraph = document.createElement("p");
    trackParagraph.id = "trackParagraph";   
    const link = document.createElement("a");
    link.href = track_url;
    console.log(link);
    link.textContent = "qui";
    link.id = "song_url";
    trackParagraph.textContent = "Ascolta la traccia su Spotify ";
    trackParagraph.appendChild(link);
    track.appendChild(trackParagraph);
    inside.appendChild(track);

    const reviews = document.createElement("div");
    reviews.id= "comments";
    const label = document.createElement("p");
    label.textContent ="Recensioni:";
    reviews.appendChild(label);
    inside.appendChild(reviews);
}

function onJson(json) {
    console.log(json);
    const insideLeft = document.querySelector('#inside-left');
    const insideRight = document.querySelector('#inside-right');
    const img = document.querySelector('#left img');
    const titleMovie = document.querySelector('#content-title');
    titleMovie.innerHTML = '';
    insideLeft.innerHTML = '';
    insideRight.innerHTML = '';

    const poster = json.Poster || 'webicon.png';
    const title = json.Title || 'N/A';

    img.src = poster;

    const rating = json.imdbRating || 'N/A';
    const runtime = json.Runtime || 'N/A';
    const languages = json.Language || 'N/A';
    const releaseDate = json.Released || 'N/A';
    const boxOffice = json.BoxOffice || 'N/A';
    const Seasons = json.totalSeasons  || 'N/A';

    const genres = json.Genre || 'N/A';
    const plot = json.Plot || 'N/A';
    const directors = json.Director || 'N/A';
    const actors = json.Actors || 'N/A';

    const titleParagraph = document.createElement("p");
    titleParagraph.textContent = "titolo:";
    titleMovie.appendChild(titleParagraph);

    const titleHeading = document.createElement("h1");
    titleHeading.id = "title-movie";
    titleHeading.textContent = title;
    titleMovie.appendChild(titleHeading);

    const optionsDiv = document.createElement("div");
    optionsDiv.id = "options";

    const addToListParagraph = document.createElement("p");
    addToListParagraph.id = "add-to-list";
    addToListParagraph.textContent = "+";
    optionsDiv.appendChild(addToListParagraph);

    titleMovie.appendChild(optionsDiv);

    const ratingDiv = document.createElement("div");
    ratingDiv.id = "rating";
    ratingDiv.classList.add("ileft");
    const ratingParagraph = document.createElement("p");
    ratingParagraph.textContent = "Rating: " + rating;
    ratingDiv.appendChild(ratingParagraph);
    insideLeft.appendChild(ratingDiv);

    const runtimeDiv = document.createElement("div");
    runtimeDiv.id = "runtime";
    runtimeDiv.classList.add("ileft");
    const runtimeParagraph = document.createElement("p");
    runtimeParagraph.textContent = "Runtime: " + runtime;
    runtimeDiv.appendChild(runtimeParagraph);
    insideLeft.appendChild(runtimeDiv);

    const languagesDiv = document.createElement("div");
    languagesDiv.id = "languages";
    languagesDiv.classList.add("ileft");
    const languagesParagraph = document.createElement("p");
    languagesParagraph.textContent = "Supported languages: " + languages;
    languagesDiv.appendChild(languagesParagraph);
    insideLeft.appendChild(languagesDiv);

    const releaseDateDiv = document.createElement("div");
    releaseDateDiv.id = "releasedate";
    releaseDateDiv.classList.add("ileft");
    const releaseDateParagraph = document.createElement("p");
    releaseDateParagraph.textContent = "Release Date: " + releaseDate;
    releaseDateDiv.appendChild(releaseDateParagraph);
    insideLeft.appendChild(releaseDateDiv);

    const type = json.Type;
    if (type === "series"){
        const SeasonDiv = document.createElement("div");
        SeasonDiv.id = "Seasons";
        SeasonDiv.classList.add("ileft");
        const SeasonParagraph = document.createElement("p");
        SeasonParagraph.textContent = "Seasons: " + Seasons;
        SeasonDiv.appendChild(SeasonParagraph);
        insideLeft.appendChild(SeasonDiv);
    }
    else{
        const boxOfficeDiv = document.createElement("div");
        boxOfficeDiv.id = "boxoffice";
        boxOfficeDiv.classList.add("ileft");
        const boxOfficeParagraph = document.createElement("p");
        boxOfficeParagraph.textContent = "Incassi: " + boxOffice;
        boxOfficeDiv.appendChild(boxOfficeParagraph);
        insideLeft.appendChild(boxOfficeDiv);
    }

    const genresDiv = document.createElement("div");
    genresDiv.id = "genres";
    genresDiv.classList.add("iright");
    const genresParagraph = document.createElement("p");
    genresParagraph.textContent = "Genres: " + genres;
    genresDiv.appendChild(genresParagraph);
    insideRight.appendChild(genresDiv);

    const plotDescriptionDiv = document.createElement("div");
    plotDescriptionDiv.id = "plot-description";
    plotDescriptionDiv.classList.add("iright");
    const plotDescriptionParagraph = document.createElement("p");
    plotDescriptionParagraph.textContent = "Plot: " + plot;
    plotDescriptionDiv.appendChild(plotDescriptionParagraph);
    insideRight.appendChild(plotDescriptionDiv);

    const directorsDiv = document.createElement("div");
    directorsDiv.id = "directors";
    directorsDiv.classList.add("iright");
    const directorsParagraph = document.createElement("p");
    directorsParagraph.textContent = "Directors: " + directors;
    directorsDiv.appendChild(directorsParagraph);
    insideRight.appendChild(directorsDiv);

    const actorsDiv = document.createElement("div");
    actorsDiv.id = "actors";
    actorsDiv.classList.add("iright");
    const actorsParagraph = document.createElement("p");
    actorsParagraph.textContent = "Actors: " + actors;
    actorsDiv.appendChild(actorsParagraph);
    insideRight.appendChild(actorsDiv);

    fetch("https://api.spotify.com/v1/search?type=track&q=" + title, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(onResponse).then(onJsonSpotify);
}

function onResponse(response) {
    return response.json();
}

function getdetails(clickedPoster) {
    const imdbId = clickedPoster.getAttribute('data-imdb');
    fetch(url + "?apikey=" + key + "&i=" + imdbId).then(onResponse).then(onJson);
}

function showdet(event) {
    grid.classList.add('hide');
    details.classList.remove('hide');
    const clickedPoster = event.currentTarget;
    getdetails(clickedPoster);
}

function backtogrid() {
    grid.classList.remove('hide');
    details.classList.add('hide');
}

function onTokenJson(json) {
    console.log(json);
    token = json.access_token;
    console.log(token);
}

function getToken() {
    fetch("https://accounts.spotify.com/api/token",
        {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa(clientId + ":" + clientSecret)
            }
        }
    ).then(onResponse).then(onTokenJson);
}

function addPoster(json, img) {
    const posterUrl = json.Poster || 'webicon.png'; 
    img.src = posterUrl; 
}

function loadPosters(){
    const posters = document.querySelectorAll('.poster');
    for (let i = 0; i < posters.length; i++) {
        const poster = posters[i];
        const imdbId = poster.getAttribute('data-imdb'); const img = poster.querySelector('img');
        const json = fetch(url + "?apikey=" + key + "&i=" + imdbId).then(onResponse).then(function(json) {
            addPoster(json, img);
        });
    }
}

const key = 'secret';
const url = 'https://www.omdbapi.com/';

const backgrid = document.querySelector('#backtogrid');
backgrid.addEventListener('click', backtogrid);
const grid = document.querySelector('#list');
const details = document.querySelector('#details');
const poster = document.querySelectorAll('.poster');
for (let i = 0; i < poster.length; i++) {
    poster[i].addEventListener('click', showdet);
}
loadPosters();

const clientId = 'secret';
const clientSecret = 'secret';
let token = null;
getToken();
