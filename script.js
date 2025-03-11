// Define commandInput and terminalOutput first
const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');

// Initialize terminal with a welcome message
terminalOutput.innerHTML = '<p>Type "help" for commands list</p>';

// Focus on the input field when the page loads
commandInput.focus();

// Commands terminal with actual commands (ikik im so cool)
const bootCyberOS = () => {
    terminalOutput.innerHTML += "<p>Loading system files...</p>";
    setTimeout(() => {
        terminalOutput.innerHTML += "<p>Initializing modules...</p>";
    }, 1000);
    setTimeout(() => {
        terminalOutput.innerHTML += "<p>System Ready!</p>";
    }, 2000);

    setTimeout(() => {
        console.log("redirect started");
    window.location.href = "https://justzaixz.github.io/Cyber_Terminal_3-main-terminal-/"; // i'll change this to the next website soon
    }, 3000);
};

const commands = {
    help: () => {
        terminalOutput.innerHTML += '<p>Available commands: help, hello, date, clear, start </p>';
    },
    hello: () => {
        terminalOutput.innerHTML += '<p>Hello, world!</p>';
    },
    date: () => {
        terminalOutput.innerHTML += `<p>${new Date()}</p>`;
    },
    clear: () => {
        terminalOutput.innerHTML = "";
    },
    start: () => {
        terminalOutput.innerHTML += `<p>Are you sure you want to get started? <br> Type "yes" or "no".</p>`;
    },
    yes: () => {
        terminalOutput.innerHTML = "<p><b> Booting Cyber-OS... </b></p>";
        bootCyberOS(); // Call the function here
    },
    no: () => {
        terminalOutput.innerHTML = "<p>Available commands: help, hello, date, clear, start, yes</p>";
    },
};


// Keydown event to highlight keys on the virtual keyboard
document.addEventListener('keydown', (event) => {
    const keyElement = document.getElementById(event.code);
    if (keyElement) {
        keyElement.classList.add('lit');
    }

    // Prevent default behavior for Backspace if not focused on an input field
    if (event.key === 'Backspace' && document.activeElement !== commandInput) {
        event.preventDefault();
    }
});

// Keyup event to remove highlighting from keys
document.addEventListener('keyup', (event) => {
    const keyElement = document.getElementById(event.code);
    if (keyElement) {
        keyElement.classList.remove('lit');
    }
});

// Handle Enter key and execute commands
commandInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission behavior

        const commandText = commandInput.value.trim();
        terminalOutput.innerHTML += `<p>$ ${commandText}</p>`;

        const parts = commandText.split(' ');
        const commandName = parts[0];
        const args = parts.slice(1);

        if (commands[commandName]) {
            commands[commandName](args);
        } else {
            terminalOutput.innerHTML += `<p>Command not found: ${commandName}</p>`;
        }

        // Clear input and scroll to bottom of terminal
        commandInput.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});

// Function to update time and date
function updateDateTime() {
    var currentdate = new Date();
    var dateString = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    var timeString = currentdate.getHours().toString().padStart(2, '0') + ":" +
                     currentdate.getMinutes().toString().padStart(2, '0') + ":" +
                     currentdate.getSeconds().toString().padStart(2, '0');

    // Select the elements AFTER DOM has loaded
    const startupLines = document.querySelectorAll('.startup-line');

    if (startupLines.length > 0) {
        startupLines[0].textContent = "System Time: " + timeString;
        if (startupLines.length > 1) {
            startupLines[1].textContent = "System Date: " + dateString;
        }
    }
}

// Ensure the function runs after the DOM has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});
