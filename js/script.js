const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteError = document.getElementById('error');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

// Get Quotes From API
async function getQuotes() {
    showSpinner(true);

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        quoteError.textContent = "There was an error loading the quote: please try again";
    }
}

// Spinner
function showSpinner(loading) {
    loader.hidden = !loading;
    quoteContainer.hidden = loading;
}

// Show New Quote
function newQuote() {
    showSpinner(true);

    // Pick a random quote from array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if (quote.author) {
        authorText.textContent = quote.author;
    } else {
        authorText.textContent = 'Unknown';
    }

    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    showSpinner(false);
}

// Add listener to button
newQuoteBtn.addEventListener('click', newQuote);

// Get quotes from API
getQuotes();
