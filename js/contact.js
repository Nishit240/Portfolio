const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const menuIcon = document.querySelector('.menu-icon'); 
const navLinks = document.querySelector('.nav-links'); 
menuIcon.addEventListener('click', () => { navLinks.classList.toggle('active'); });

sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // -----------------------------
    // 1️⃣ Append User Message
    // -----------------------------
    const userMessage = document.createElement("div");
    userMessage.classList.add("message-row", "user-row");
    userMessage.innerHTML = `
        <div class="message user">${message}</div>
        <span class="avatar user-avatar">
            <img src="image/programmer.png" alt="User" />
        </span>
    `;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    userInput.value = "";

    // -----------------------------
    // 2️⃣ Send message to API
    // -----------------------------
    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: message })
        });

        const data = await response.json();

        // -----------------------------
        // 3️⃣ Append Bot Message
        // -----------------------------
        const botMessage = document.createElement("div");
        botMessage.classList.add("message-row", "bot-row");
        botMessage.innerHTML = `
            <span class="avatar bot-avatar">
                <img src="image/technical-support.png" alt="Bot" />
            </span>
            <div class="message bot">${data.answer}</div>
        `;
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (err) {
        console.error("Error:", err);
    }
});

// Allow sending message with Enter key
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});
