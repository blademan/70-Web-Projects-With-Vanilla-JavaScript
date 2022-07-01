const movieTicketEl = document.getElementById('movie');
const containerEl = document.querySelector('.container');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');

populateUI();
let movieTicketPrice = +movieTicketEl.value;

// Save selected movie index and price
function setMovieData(movieIndex) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
}

// Update total and count
const updateSelectionCount = () => {
  const seat = document.querySelectorAll('.row .seat.selected');

  const seatIndex = [...seat].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem('reservedSeats', JSON.stringify(seatIndex));

  countEl.innerHTML = seat.length;
  totalEl.innerHTML = movieTicketPrice * seat.length;
};

function populateUI() {
  let getFromLocalStorage = JSON.parse(localStorage.getItem('reservedSeats'));

  if (getFromLocalStorage != null && getFromLocalStorage.length > 0) {
    seats.forEach(function (seat, i) {
      if (getFromLocalStorage.indexOf(i) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieTicketEl.selectedIndex = selectedMovieIndex;
  }
}
// Movie select price event
movieTicketEl.addEventListener('change', (e) => {
  movieTicketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex);
  updateSelectionCount();
});

// Seat click event
containerEl.addEventListener('click', (e) => {
  let target = e.target;

  if (target.classList.contains('seat') && !target.classList.contains('occupied')) {
    target.classList.toggle('selected');
    updateSelectionCount();
  }
});

updateSelectionCount();
