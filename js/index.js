/******* GLOABL VARIABLES/DATA ********/
// Define all of your variables here, including Object and Array references

const settings = {
  limited: 10
}

const shoppingCart = [
  {courseid: 101, qty: 1}
];

const allCourses = [
  { // 0
    id: 101,
    name: `Tools and Workflow`,
    img: `img/img-02.jpg`,
    code: `WDDM-115`,
    instructor: `Kadeem Best`,
    start: { term: `Fall`, year: 2019 },
    weeks: 15,
    breaks: true,
    duration: 160,
    category: null,
    available: 10
  },{  // 1
    id: 102,
    name: `Applied Web Development`,
    code: `WDDM-113`,
    instructor: `Rocco Panacci`,
    start: { term: `Winter`, year: 2020 },
    weeks: 12,
    breaks: true,
    duration: 160,
    category: `development`,
    available: 6
  },{ // 2
    id: 103,
    name: `Applied Web Design`,
    code: `WDDM-114`,
    instructor: `Rocco Panacci`,
    start: { term: `Fall`, year: 2019 },
    weeks: 8,
    breaks: false,
    duration: 160,
    category: `design`,
    available: 0
  },{ // 3
    id: 104,
    name: `Design Technique`,
    code: `WDDM-116`,
    instructor: `Milorad Eftoski`,
    start: { term: `Fall`, year: 2019 },
    weeks: 15,
    breaks: true,
    duration: 160,
    category: `design`,
    available: 1
  },{ // 4
    id: 105,
    name: `Prototyping`,
    code: `WDDM-117`,
    instructor: `Cory Coletta`,
    start: { term: `Fall`, year: 2019 },
    weeks: 3,
    breaks: true,
    duration: 160,
    category: `development`,
    available: 14
  }
];


/************* FUNCTIONS *************/
// Now store all the functions that will manipulate the data

// UTILITY FUNCTIONS

const getDurationFromMinutes = minutes => {
  
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  // const mins = minutes - hrs * 60; // Could also use this

  return `${hrs} hr, ${mins} min`;
}

const isCourseInTerm = course => {
  // start: { term: `Fall`, year: 2019 },
  if (course.start.term == `Winter` && course.start.year == 2020) {
    return true;
  }
  return false;
}

const addItemToCart = courseid => {
  // {courseid: 101, qty: 1}  // Course looks like this
  
  /*
  if (this id already exist in the Array) {
    Update the quantity of the item
  } else if (it does not exist) {
    Add a new item to the shoppingCart
  }
  */

  // Is it important to return a value here? 
  //    Why would we? Why not?
  // What else might we need/want this function to do? 
  //    If anything, weigh the pros/cons of doing it here vs elsewhere
}

// const doWordsMatch = c => {
//   // "this"
//   return c.name.toLowerCase().includes(this)
// }

// function doWordsMatch (c) {
//   // "this"  
//   return c.name.toLowerCase().includes(this);
// }



// EVENT HANDLERS ///////////////////

const toggleCourseView = event => {
  document.getElementById('courses').classList.toggle('grid-view');
}

const loadCoursesFromTerm = event => {
    
  const justFall2019 = allCourses.filter(isCourseInTerm);
  renderCoursesFromArray(justFall2019);
}

const loadCoursesFromNameSearch = event => {

  const whatToSearch = event.target.value.trim().toLowerCase();

  const resultsFromSearch = allCourses.filter(c => c.name.toLowerCase().includes(whatToSearch));
  
  renderCoursesFromArray(resultsFromSearch)
  // String methods:  trim(), toUpperCase() or toLowerCase(), then includes()
}

const loadCoursesFromSort = event => {

  const sortBy = event.target.value;
  let sortedCourses; // Will hold the array to render

  if (sortBy == 'weeksAsc') { // Smallest to largest
    sortedCourses = allCourses.slice().sort((a, b) => a.weeks - b.weeks);
  } 
  else if (sortBy == 'weeksDesc') { // Largest to smallest
    sortedCourses = allCourses.slice().sort((a, b) => b.weeks - a.weeks);
  } 
  else if (sortBy == 'nameAsc') { // Largest to smallest
    sortedCourses = allCourses.slice().sort((a, b) => a.name.localeCompare(b.name));
  } 
  else if (sortBy == 'nameDesc') { // Largest to smallest
    sortedCourses = allCourses.slice().sort((a, b) => b.name.localeCompare(a.name));
  } 
  else {
    return;
  }

  /*if (sortBy == 'weeksAsc')       sortedCourses = allCourses.slice().sort((a, b) => a.weeks - b.weeks);
  else if (sortBy == 'weeksDesc') sortedCourses = allCourses.slice().sort((a, b) => b.weeks - a.weeks);
  else if (sortBy == 'nameAsc')   sortedCourses = allCourses.slice().sort((a, b) => a.name.localeCompare(b.name));
  else if (sortBy == 'nameDesc')  sortedCourses = allCourses.slice().sort((a, b) => b.name.localeCompare(a.name));
  else                            return; */

  /*switch (sortBy) {
    case 'weeksAsc':
      sortedCourses = allCourses.slice().sort((a, b) => a.weeks - b.weeks);
      break;
    case 'weeksDesc':
      sortedCourses = allCourses.slice().sort((a, b) => a.weeks - b.weeks);
      break;
    case 'nameAsc':
      sortedCourses = allCourses.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'nameDesc':
      sortedCourses = allCourses.slice().sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      return;
  } */

  renderCoursesFromArray(sortedCourses);
}
 
const addListenersToButtons = event => {
  // Event delegation

  if (!event.target.matches('button.course-register')) {
    return; // If it wasn't the button, leave the handler
    // Otherwise, continue...
  }

  const courseId = parseInt(event.target.dataset.courseid);
  addItemToCart(courseId);
}


// DOM UI BUILDERS ///////////////////

// Function: getCourseAsHtmlString
// Parameters: course:Object
// Return: String of HTML (<article>)
const getCourseAsHtmlString = course => {

  let callout = ``;
  let soldout = ``;
  if (course.available <= 0) {
    callout = `<small class="callout">Sold out</small>`;
    soldout = `soldout`;
  } else if (course.available < settings.limited) {
    callout = `<small class="callout urgent">Limited seats available</small>`;
  }

  return `
    <article class="course ${(course.category) ? `cat-${course.category}` : ''} ${soldout}">
      <h3 id="name">${course.name} ${callout}</h3>
      <img src="${course.img}" alt="${course.name}" class="product-img">
      <ul class="course-info">
        <li>Course Code: <strong>${course.code}</strong></li>
        <li>Instructor: <strong>${course.instructor}</strong></li>
        <li>Start: <strong>${course.start.term} ${course.start.year}</strong></li>
        <li>
          Weeks: <strong>${course.weeks}</strong>
          <ul>
            <li>Includes Break: <strong>${(course.breaks) ? 'Yes' : 'No'}</strong></li>
          </ul>
        </li>
        <li>Duration: <strong>${getDurationFromMinutes(course.duration)}</strong></li>
      </ul>
      <button type="button" class="course-register" data-courseid="${course.id}">Register</button>
    </article>`;
}

const renderCoursesFromArray = arr => {

  // Build all the Courses into a string, then add to #courses 
  document.getElementById('courses').innerHTML = arr.map(getCourseAsHtmlString).join('\n');

  // Show the number of results
  let res = 'results';
  if (arr.length == 1) {
    res = 'result'
  }
  document.getElementById('numResults').innerHTML = `(${arr.length} ${res})`;

  /* // Add an EventListener to each button individually with each render
  document.querySelectorAll(`button.course-register`).forEach(btn => {
    btn.addEventListener('click', event => {
      console.log('Click!');
    })
  });
 */
}



/************* EXECUTABLE *************/
window.addEventListener('load', () => {

  // Event listeners
  document.getElementById('courseView').addEventListener('click', toggleCourseView);
  document.getElementById('fallCourses').addEventListener('click', loadCoursesFromTerm);
  document.getElementById('courseName').addEventListener('input', loadCoursesFromNameSearch);
  document.getElementById('sortOrder').addEventListener('change', loadCoursesFromSort);
  document.getElementById('courses').addEventListener('click', addListenersToButtons);

  // Start
  renderCoursesFromArray(allCourses);
});


/* 
? Today:
  * Selecting document elements in other ways
  * Iterating over multiple selections
  * Styling form elements (and states)
  * Events for <form>, <select>, type="radio", type="checkbox"
  * Sorting Arrays by number and string
  * Filtering examples
? Next class:
  * Pagination
    * Or autoload on scroll
    * Describe in words and drawings how this works
  * Touch on: insertAdjacentHTML, createElement, appendChild, insertAdjacentElement
    * Attach listeners easier
  * Talk about:
    * Assigning ids
    * Event delegation
*/


/* const sortByLetter = (a, b) => {
  if (a < b) {
    return -1;
  }
  return 1;
}
const words = ['a', 'd', 'b', 'A']
words.sort((a, b) => a.localeCompare(b));
console.log(words)
const unsorted = [100, 6, 30, 9, 7];
const sorted = unsorted.slice().sort((a, b) => a - b);  // make a copy
console.log(unsorted, sorted) */


const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';  
}
slides.forEach(setSlidePosition);

// Move slide
const moveToSlide = (currentSlide, targetSlide, targetDot, targetIndex) => {
  const currentDot = dotsNav.querySelector('.current-slide');
  track.style.transform = 'translateX(-'+ targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
  
    
  if (targetIndex === 0) {
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex == slides.length - 1) {
    prevButton.classList.remove('hidden');
    nextButton.classList.add('hidden');
  } else {
    prevButton.classList.remove('hidden');
    nextButton.classList.remove('hidden');
  }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;
  const slideIndex = slides.findIndex(slide => slide === prevSlide);
  const targetDot = dots[slideIndex];
  //move to the next slide
  moveToSlide(currentSlide, prevSlide, targetDot, slideIndex);  
  if (prevSlide == currentSlide) {
    prevButton.classlist.add('hidden');
    moveToSlide(currentSlide, prevSlide, targetDot);
  }
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const slideIndex = slides.findIndex(slide => slide === nextSlide);
  const targetDot = dots[slideIndex];
  
  //move to the next slide
  if (slideIndex != -1) 
    moveToSlide(currentSlide, nextSlide, targetDot, slideIndex);
})

// when I click the nav indicators, move to that slide
dotsNav.addEventListener('click', e => {
  
  const targetDot = e.target.closest('button');
  
  if (!targetDot) return;
  
  const currentSlide = track.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  
  moveToSlide(currentSlide, targetSlide, targetDot, targetIndex);
})