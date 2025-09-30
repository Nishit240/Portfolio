const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");


sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Display user message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    userInput.value = "";
    
    // Send message to API
    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: message })
        });
        
        const data = await response.json();
        
        // Display bot response
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.innerHTML = data.answer;  // <-- use innerHTML
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        
    } catch (err) {
        console.error("Error:", err);
    }
});

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

// Suppose 'response' is the API JSON
const answerDiv = document.getElementById("chatbot-answer");
answerDiv.innerHTML = response.answer.replace(/\n/g, "<br>");