const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve static files from the public directory
app.use(express.static('public'));

// Serve files from the intents directory
app.use('/intents', express.static(path.join(__dirname, 'intents')));

// Set up a route to serve the mainchat.json file
app.get('/mainchat.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'intents', 'mainchat.json'));
});


const intentsPath = path.join(__dirname, 'intents');

app.post('/chat', (req, res) => {
    const { message } = req.body;
    const response = generateResponse(message);
    res.json({ message: response });
    
});




function generateResponse(message) {
    const files = fs.readdirSync(intentsPath);
    let response = 'I am not sure what you mean. Can you please be more specific?';
    files.forEach(file => {
        const data = JSON.parse(fs.readFileSync(path.join(intentsPath, file), 'utf-8'));
        if (data && data.intents) {
            const intent = data.intents.find(item => {
                return item.patterns.some(pattern => {
                    const regex = new RegExp(pattern, 'i');
                    return message.match(regex);
                });
            });
            if (intent) {
                const responses = intent.responses;
                response = responses[Math.floor(Math.random() * responses.length)];
            }
        }
    });

    const mainChatPath = path.join(intentsPath, 'mainchat.json');
    const mainChatData = JSON.parse(fs.readFileSync(mainChatPath, 'utf-8'));
    const mainChatIntents = mainChatData.intents;
    mainChatIntents.forEach(intent => {
        if (intent.patterns.includes(message)) {
            response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        }
    });

    return response;
}


const filePath = path.join(__dirname, 'mainchat.json');

// Read data from mainchat.json
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const mainchatData = JSON.parse(data);

    // Assuming the first button has been removed
    const deletedButtonId = 1;

    // Finding the last button's ID
    const lastButton = mainchatData.buttons[mainchatData.buttons.length - 1];
    const lastButtonId = lastButton.id;

    // Extracting the integer from the last button's ID
    const lastButtonIdInteger = parseInt(lastButtonId);

    // Checking if the last button ID is greater than the deleted button ID
    if (lastButtonIdInteger > deletedButtonId) {
        // Fetching the greater ID + 1 from the mainchat.json
        const newButtonId = lastButtonIdInteger + 1;

        // Creating a new button object
        const newButton = { id: newButtonId, text: 'New Button' };

        // Adding the new button object to the mainchat.json
        mainchatData.buttons.push(newButton);

        // Updating the mainchat.json file with the new button
        fs.writeFile(filePath, JSON.stringify(mainchatData, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log(`The new button ID is ${newButtonId}`);
        });
    } else {
        console.log('Last button ID is not greater than the deleted button ID.');
    }
} catch (error) {
    console.error('Error parsing JSON:', error);
}
});










const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
