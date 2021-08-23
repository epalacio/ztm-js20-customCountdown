const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown')
const countdownElTitle = document.getElementById('countdown-title')
const countdownBtn = document.getElementById('countdown-button')
const timeElements = document.querySelectorAll('span')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

// Set Date Input Min with today's date
const today = new Date().toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now
        console.log('distance:', distance);

        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour)
        const minutes = Math.floor((distance % hour ) / minute)
        const seconds = Math.floor((distance % minute ) / second)
        console.log(days, hours, minutes, seconds);

        // Populate countdown
        countdownElTitle.textContent = `${countdownTitle}`
        timeElements[0].textContent = `${days}`
        timeElements[1].textContent = `${hours}`
        timeElements[2].textContent = `${minutes}`
        timeElements[3].textContent = `${seconds}`

        // Hide Input
        inputContainer.hidden = true
        // Show countdown
        countdownEl.hidden = false
    }, second)
}

// Take values from Form Input
const updateCountdown = (e) => {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    console.log(countdownTitle, countdownDate);
    // Check for valid date
    if (countdownDate === '') {
        alert('Please elect a date for the countdown')
    } else {
        // Get number version of current Date, then update DOM
        countdownValue = new Date(countdownDate).getTime()
        console.log('countdown value is:', countdownValue);
        updateDOM()
    }
}

// Reset All Values
const reset = () => {
    // Hide countdowns, show input
    countdownEl.hidden = true
    inputContainer.hidden = false
    // Stop the countdown
    clearInterval(countdownActive)
    // Reset values
    countdownTitle = ''
    countdownDate = ''
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset)