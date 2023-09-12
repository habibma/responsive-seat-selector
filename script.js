// general scope variables
const selectedMovie = document.getElementById("movie");
const seatBox = document.querySelector(".seat-box");
const seats = document.querySelectorAll(".row .seat:not(.taken)");
const selectedSeats = document.getElementsByClassName("selected");

// get data from localstarage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add("taken");
        }
      });
    }
}
populateUI()

// update numbers of selected seats and total price
const updateCount = () => {
    const selectedCounter = (selectedSeats.length - 1);

    document.getElementById("count").innerText = selectedCounter;

    // update total price
    let ticketPrice = movies[selectedMovie.value].price;

    document.getElementById("totalPrice").innerText = selectedCounter * ticketPrice;

}

// Seat click event
seatBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("taken") && selectedMovie.value) {
      e.target.classList.toggle("selected");
      selectedMovie.style.border = "initial" //make the select menu default
    } else {
        selectedMovie.style.border = "1px dashed red" //error for selecting a movir before selecting the seat
    }
    updateCount();
  });

// Movie List
const movies = [
    {
        name: "The Shawshank Redemption",
        director: "Frank Darabont",
        summary: "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
        image: "assets/imgs/the-shawshank-redemption.jpg",
        price: 10,
    },
    {
        name: "Forrest Gump",
        director: "Robert Zemeckis",
        summary: "Forrest, a man with low IQ, recounts the early years of his life when he found himself in the middle of key historical events. All he wants now is to be reunited with his childhood sweetheart, Jenny.",
        image:"assets/imgs/forrest-gump.jpg",
        price: 9,
    },
    {
        name: "Good Bye Lenin",
        director: "Wolfgang Becker",
        summary: "In October 1989, right before the fall of the Berlin Wall, Alex Kerner (Daniel Brühl) is living with his mom, Christiane (Kathrin Sass), and sister, Ariane (Maria Simon). But when the mother, a loyal party member, sees Alex participating in an anti-communist rally, she falls into a coma and misses the revolution. After she wakes, doctors say any jarring event could make her have a heart attack, meaning the family must go to great lengths to pretend communism still reigns in Berlin.",
        image: "assets/imgs/good-bye-lenin.jpg",
        price: 8,
    },
];

const movieSelection = document.getElementById("movie");
movieSelection.innerHTML = `<option value="" selected disabled>Select...</option>` + movies.map((movie, index) => `<option value="${index}">${movie.name}</option>`);


//Movie click event

const movieSelecChangetHandler = () => {
    const movieName = movies[selectedMovie.value].name;
    const movieDirector = movies[selectedMovie.value].director;
    const movieSummary = movies[selectedMovie.value].summary;
    const imageAddress = movies[selectedMovie.value].image;
    const moviePrice = movies[selectedMovie.value].price;

    document.querySelector(".sidebar .banner .movieImg").setAttribute("src", imageAddress);
    document.querySelector(".sidebar .banner .movieSummary").innerText = "Summary: " + movieSummary;
    document.querySelector(".sidebar .banner .price").innerText = "Price: " + moviePrice + "$";
    document.querySelector(".sidebar .banner .director").innerText = "Director: " + movieDirector;
    document.querySelector(".sidebar .banner .movieImg").setAttribute("src", imageAddress);
}

selectedMovie.addEventListener("change", movieSelecChangetHandler);



//Save selected movie index and price by clicking on the button
function purchse() {

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
    document.querySelectorAll(".row .selected").forEach(s => {s.classList.remove('selected'); s.classList.toggle ('taken')})
};

// reset the page
function clearStorage() {
    localStorage.clear()
    console.log(localStorage)
    location.reload()
}

