// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
    var quoteInput = document.getElementById('quote-input');
    var authorInput = document.getElementById('author-input');
    var addQuoteBtn = document.getElementById('add-quote-btn');
    var quotesDisplay = document.getElementById('quotes-display');

    // Load existing quotes on page load
    displayQuotes();

    // Event listener for adding quotes
    addQuoteBtn.onclick = function() {
        var quote = quoteInput.value.trim();
        var author = authorInput.value.trim();

        if (quote !== "" && author !== "") {
            var quoteObj = { quote: quote, author: author };
            var quoteString = JSON.stringify(quoteObj);
            localStorage.setItem(quote + "-" + author, quoteString);
            displayQuotes(); // Refresh quotes display
            quoteInput.value = ''; // Clear input fields
            authorInput.value = '';
        } else {
            alert('Please fill out both fields.');
        }
    };

    // Function to display quotes
    function displayQuotes() {
        var keys = Object.keys(localStorage);
        var quotesHTML = "";

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var quoteObjString = localStorage.getItem(key);
            var quoteObj = JSON.parse(quoteObjString);

            quotesHTML += "<div class='quote'><p>" + quoteObj.quote + " - " + quoteObj.author + "</p><button onclick='removeQuote(\"" + key + "\")'>Remove</button></div>";
        }

        quotesDisplay.innerHTML = quotesHTML;
    }

    // Function to remove quotes
    window.removeQuote = function(key) {
        localStorage.removeItem(key);
        displayQuotes(); // Refresh quotes display
    };
});
