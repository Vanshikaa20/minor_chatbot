
let chatbotOpen = false;  //use to state that chatbot will not open when page load
const chatIcon = document.getElementById('chat-icon'); //get the element with id chat-icon


// The openChat function is responsible for displaying the chatbot element and hiding the chat icon. 
// If the element with the ID 'chatbot' is found, it sets its CSS display property to 'block', and it sets the chatbotOpen variable to true. If the element is not found, it logs an error.
// Similarly, if the chatIcon is found, it sets its CSS display property to 'none' to hide it. If the chatIcon is not found, it logs an error.

function openChat() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.style.display = 'block';
        chatbotOpen = true;
    } else {
        console.error('Chatbot element not found');
    }

    const chatIcon = document.getElementById('chat-icon');
    if (chatIcon) {
        chatIcon.style.display = 'none';
    } else {
        console.error('Chat icon element not found');
    }
}

function closeChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = 'none';
    chatbotOpen = false;
    
    const chatIcon = document.getElementById('chat-icon');
    if (chatIcon) {
        chatIcon.style.display = 'block';
    } else {
        console.error('Chat icon element not found');
    }
}


function sendMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const userSelectedMessage = '<div class="user-message">' + message + '</div>';
    chatContainer.innerHTML += userSelectedMessage;

    
    // Send the message to the server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        const botMessage = '<div class="bot-message">' + data.message + '</div>';
        chatContainer.innerHTML += botMessage;
        
        var buttons = document.getElementsByClassName('question-button');
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].innerHTML === message) {
                buttons[i].parentNode.removeChild(buttons[i]);
                    break;
                }
            }
            
            // Fetching questions from mainchat.json and updating the question buttons
            fetch('../../intents/mainchat.json')
 // Adjust the path to mainchat.json inside the intents folder
            .then(response => response.json())
            .then(data => {
                const chatContainerQuestions = document.getElementById('chat-container-questions');
                chatContainerQuestions.innerHTML = '';
                data.questions.forEach(question => {
                    const questionButton = document.createElement('button');
                    questionButton.className = 'question-button';
                    questionButton.innerHTML = question;
                    questionButton.onclick = function() {
                        sendMessage(question);
                    };
                    chatContainerQuestions.appendChild(questionButton);
                    console.log(data);
                });
            })
            .catch(error => console.error('Error fetching data from mainchat.json:', error));
            
            
        });
        
        document.getElementById('message-input').value = '';
    }






























// function sendMessage(btnVal='') {
    //     var messageInput = '';
    //     if (btnVal == ''){
        //         messageInput = document.getElementById('message-input').value;
        //     } else {
            //         messageInput = btnVal;
            //     }
            //     const chatContainer = document.getElementById('chat-container');
            //     const userMessage = '<div class="user-message">' + messageInput + '</div>';
            //     chatContainer.innerHTML += userMessage;
            
            //     // Send the message to the server
            //     fetch('/chat', {
                //         method: 'POST',
                //         headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify({ message: messageInput })
                    //     })
//         .then(response => response.json())
//         .then(data => {
//             const botMessage = '<div class="bot-message">' + data.message + '</div>';
//             chatContainer.innerHTML += botMessage;

//             var buttonToRemoveId = event.target.id;
//             var buttonToRemove = document.getElementById(buttonToRemoveId);
//             buttonToRemove.parentNode.removeChild(buttonToRemove);



//         });






//     document.getElementById('message-input').value = '';
// }





// TODO: write a logic which will read the mainchat.json file and bring the question which should be added
// this can be achieved by following manner:
// we already know there 3 buttons by default
// and we know the first among those 3 are removed
// take the id (buttonToRemoveId) in first caser the id will be btn-1
// now take the last integer from the button id string 
// var number = parseInt(buttonToRemoveId.split("-")[1]);
// now get the number+2 element from the mainchat.json
// get the buttonToRemove parrent node and add the button directly into it
// const toAddButton = '<button class ="question-button" id="btn-'number+2+1'" onclick="sendMessage('message?')">message?</button>'
// get the div with chat-container-questions class name and add toAddButton in the innerhtml 

// or

// run a loop in following way:
// var buttonElements = document.getElementsByClassName("question-button");
// var buttonArray = Array.from(buttonElements);
// now get the existing last button get its ID and extract the integer using var number = parseInt(buttonToRemoveId.split("-")[1]);
// now check if the last button id is greater than the deleted button id
// and fetch the greater id + 1 from the mainchat.json intenet array and add it to inner html.


// example 1:
//  lets suppose we have 3 buttons : btn-1, btn-2, btn-3
//  called from btn-1
//  the btn-1 is now deleted
//  get all the buttons
//  get the last button id -> btn-3
//  now compare btn-1 and btn-3
//  here btn-3 is begger (1<3)

// example 2:
//  lets suppose we have 3 buttons : btn-1, btn-2, btn-3
//  called from btn-3
//  the btn-3 is now deleted
//  get all the buttons
//  get the last button id -> btn-2
//  now compare btn-3 and btn-2 (here we are comparing the deleted button id no.(deleted button will be the one from where the function is called) and the last button id no.)
//  here btn-3 is begger (3>2)




    
    // function openChat() {
    //     const chatbot = document.getElementById('chatbot');
    //     chatbot.style.display = 'block';
    //     chatbotOpen = true;
    //     chatIcon.style.display = 'none';
    // }