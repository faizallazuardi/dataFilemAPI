// >>>>>>>>>>>>>>>>>>         pake JQuery       <<<<<<<<<<<<<<<<<<<<<<<
// $(".tombol-cari").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=bd3dda4e&s=" + $(".input-kata").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += showFilm(m);
//       });
//       $(".film").html(cards);

//       // ketika tombol detail di klik
//       $(".modalDetailButton").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=bd3dda4e&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetail = detailMovie(m);
//             $(".modal-body").html(movieDetail);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

// >>>>>>>>>>>>>>>>>     Vanila JS --->   FETCH       <<<<<<<<<<<<<<<<<<<<<

const tombolCari = document.querySelector(".tombol-cari");
tombolCari.addEventListener("click", async function () {
  const input = document.querySelector(".input-kata");
  const movies = await getMovies(input.value);
  updateUI(movies);
});

// ketika tombol detail di klik
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modalDetailButton")) {
    const imdb = e.target.dataset.imdbid;
    const movieDetails = await getMovieDetail(imdb);
    updateUIDetail(movieDetails);
  }
});

function getMovieDetail(imdb) {
  return fetch("http://www.omdbapi.com/?apikey=bd3dda4e&i=" + imdb)
    .then((respons) => respons.json())
    .then((m) => m);
}

function updateUIDetail(m) {
  const movieDetail = detailMovie(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(k) {
  return fetch("http://www.omdbapi.com/?apikey=bd3dda4e&s=" + k)
    .then((respons) => respons.json())
    .then((respons) => respons.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => {
    cards += showFilm(m);
    const filmContainer = document.querySelector(".film");
    filmContainer.innerHTML = cards;
  });
}

function showFilm(m) {
  return `
          <div class="col-lg-4 my-2">
            <div class="card">
              <img src="${m.Poster}" class="card-img-top img-fluid" />
              <div class="card-body">
                <h4 class="card-title">${m.Title}</h4>
                <p class="card-title text-muted">${m.Year}</p>
                <a href="#" class="btn btn-primary modalDetailButton" data-bs-toggle="modal" data-bs-target="#Moviemodal" data-imdbid="${m.imdbID}">Lihat Detail</a>
              </div>
            </div>
          </div>
          `;
}

function detailMovie(m) {
  return `
       <div class="container-fluid">
       <div class="row">
         <div class="col-lg-4">
           <img src="${m.Poster}" class="img-fluid" alt="" />
         </div>
         <div class="col">
           <ul class="list-group">
             <li class="list-group-item"><h4 class="text-center">${m.Title}</h4></li>
             <li class="list-group-item"><strong>Durasi : </strong> ${m.Runtime}</li>
             <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
             <li class="list-group-item"><strong>Penulis :</strong> g${m.Writer}</li>
             <li class="list-group-item"><strong>Aktor :</strong> ${m.Actors}</li>
             <li class="list-group-item">
               <strong>Sinopsis :<br /> </strong> ${m.Plot}
             </li>
           </ul>
         </div>
       </div>
      </div>`;
}
