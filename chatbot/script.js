// Function to simulate fetching a response from an API
async function fetchResponse(userMessage) {
    const response = await fetch("responses.json");
    const data = await response.json();

    // Normalize the user input by trimming and replacing extra spaces
    const normalizedMessage = userMessage
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' '); // Replace multiple spaces with a single space

    // Check for an exact match
    if (data[normalizedMessage]) {
        return data[normalizedMessage];
    }

    // Fuzzy match for a close response
    const possibleKeys = Object.keys(data);
    const foundKey = possibleKeys.find(key => normalizedMessage.includes(key));

    if (foundKey) {
        return data[foundKey];
    }

    // Default fallback response
    return "Maaf kijiye, main samajh nahi paaya. Kya aap kuch aur poochhna chahenge?";
}

// Function to send user message and display bot response
async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message === "") return;

    // Display user's message
    displayMessage(message, "user-message");
    userInput.value = "";

    // Display a loading message
    const loadingMessageElement = displayMessage("Loading...", "bot-message loading");

    // Simulate delay for bot's response
    setTimeout(async () => {
        // Remove the loading message
        loadingMessageElement.remove();

        // Fetch and display bot's response
        const botResponse = await fetchResponse(message);
        displayMessage(botResponse, "bot-message");
    }, 2000); // 2 seconds delay
}

// Function to display message in chat
function displayMessage(message, className) {
    const chatBox = document.getElementById("chat-box");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Auto-scroll to the bottom of chat
    chatBox.scrollTop = chatBox.scrollHeight;

    return messageElement; // Return the message element (useful for removing)
}

// Event listener for Enter key in input field
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents newline in input
        sendMessage();
    }
});
