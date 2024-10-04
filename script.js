const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const userHeading = document.getElementById('user-heading');

// Simulate user identification (for demonstration purposes)
const userId = prompt("Enter User ID (1 or 2):");

if (userId === '1') {
    userHeading.textContent = 'User 1';
} else if (userId === '2') {
    userHeading.textContent = 'User 2';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value) {
        const messageData = {
            userId: userId,
            message: input.value
        };
        socket.emit('chat message', messageData);
        input.value = '';
    }
});

socket.on('chat message', function(data) {
    const item = document.createElement('li');

    // Create user icon
    const userIcon = document.createElement('div');
    userIcon.classList.add('user-icon');
    if (data.userId === '1') {
        userIcon.classList.add('user1-icon');
    } else if (data.userId === '2') {
        userIcon.classList.add('user2-icon');
    }

    // Create message content
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = data.message;

    // Append user icon and message content to the list item
    item.appendChild(userIcon);
    item.appendChild(messageContent);

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});