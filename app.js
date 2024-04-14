const container = document.querySelector('.container');
const seats = document.querySelectorAll('.rows .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //+ WILL CONVERT THE STRING TO NUM VALUE AS WE WROTE THE PRICE IN P TEXT (IN FORM OF STRING)

//SAVING MOVIE SELECT INDEX AND PRICE
function setMovieData(movieIndex, moviePrice)
{
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//UPDATES TOTAL NO OF SEATS AND COUNT OF IT FOR PRICE CALCULATION
function updateSelectedCount() 
{
  const selectedSeats = document.querySelectorAll('.rows .seat.selected'); //STORING ALL THE SEATS IN THE FORM OF NODE-LIST

  //COPY SELECTED SEATS INTO ARRAY
  //MAP THROUGH ARRAY
  //RETURN AN ARRAY OF INDEXES

  const seatIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat)); //STORING IT IN A LOCAL STORAGE
 //CREATING A COPY OF NODE-LIST. SO THAT WHEN THE PAGE IS REFRESHED THE INFORMATION STAYS THE SAME

 localStorage.setItem('selectedSeats', JSON.stringify(seatIndexes)); //CONVERTING THE DATA STORED TO STRING

  const selectedSeatsCount = selectedSeats.length; //CONVERTING THE NODE-LIST OF SEATS INTO ARRAY

  count.innerText = selectedSeatsCount; //UPDATING THE VALUE OF COUNT IN HTML
  total.innerText = selectedSeatsCount * ticketPrice; //UPDATING THE PRICE ACCORDING TO THE NUMBER OF SEATS SELECTED
}

//GET DATA FROM LOCAL STORAGE AND POPULATE UI
function populateUI()
{
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats!=null && selectedSeats.length>0)
  {
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1)
      {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null)
  {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//MOVIE SELECT EVENT
movieSelect.addEventListener('change' , e=>{ //CLICKING ON TO THE MOVIE THE PRICE OF SEATS GET UPDATED 
  ticketPrice = +e.target.value; //E IS THE PRICE VALUE OF TICKET FOR MOVIE
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount(); //USING IT TO UPDATING THE NO. OF SEATS SO AS TO UPDATE THE TICKET PRICE
});


//SEAT SELECT EVENT
container.addEventListener('click', (e)=>{ //USING THE FUNCTION TO SELECTING THE SEATS ACC TO THE MOVIE
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) //CLASSLIST CONTAINS ALL THE SEATS, AVOIDING THE SELECTION OF OCCUPIED SEATS
  {
    e.target.classList.toggle('selected'); //SELECTING THE UNOCCUPIED SEATS CHANGES THE COLOR, IT WON'T ALLOW TO SELECT ANYTHING ELSE EXCEPT FOR SEATS ONLY
    updateSelectedCount();
  }
});

//INITIAL COUNT AND TOTAL SET
updateSelectedCount();