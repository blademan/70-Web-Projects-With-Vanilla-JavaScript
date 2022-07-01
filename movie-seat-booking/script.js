const movieTicketEl = document.getElementById('movie');
const containerEl = document.querySelector('.container');
const countEl = document.getElementById('count');
const totalEl = document.getElementById('total');

let movieTicketPrice = movieTicketEl.value;

// Update total and count
const updateSelectionCount = () => {
  const seat = document.querySelectorAll('.row .seat.selected');

  countEl.innerHTML = seat.length;
  totalEl.innerHTML = movieTicketPrice * seat.length;
};

// Movie select price event
movieTicketEl.addEventListener('change', () => {
  movieTicketPrice = +movieTicketEl.value;
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
