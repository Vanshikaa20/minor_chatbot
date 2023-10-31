
// let chatbotOpen = true;  //use to state that chatbot will not open when page load
const chatIcon = document.getElementById('chat-icon'); //get the element with id chat-icon



    function extractDigitFromString(inputString) {
        // Use a regular expression to match and extract the digit
        var digit = inputString.match(/\d+/);
      
        // Check if a digit was found
        if (digit) {
          // Convert the matched value to a number
          var extractedDigit = parseInt(digit[0], 10);
          return extractedDigit;
        } else {
          // Return null if no digit is found in the input string
          return null;
        }
      }
    
    
      function sendMessage(btnVal = '', event) {
        var prompt = document.getElementById('prompt');
        prompt.style.display = 'none';
        var messageInput = '';
        if (btnVal == ''){
                messageInput = document.getElementById('message-input').value;
            } else {
                messageInput = btnVal;
        }
        const chatContainer = document.getElementById('chat-container');
        const userMessage = '<div class="user-message">' + messageInput + '</div>';
        chatContainer.innerHTML += userMessage;
        
        // Send the message to the server
        fetch('/chat', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: messageInput })
                }
                )
        .then(response => response.json())
        .then(data => {
            const botMessage = '<div class="bot-message">' + data.message + '</div>';
            chatContainer.innerHTML += botMessage;
            
            var buttonToRemoveId = event.target.id;
            var buttonToRemove = document.getElementById(buttonToRemoveId);
            var buttonDiv = buttonToRemove.parentNode;
            // console.log('buttonToRemove',buttonToRemove)
            // console.log('buttonDIV',buttonDiv);
            buttonDiv.removeChild(buttonToRemove);
            // console.log('buttonDIV',buttonDiv);
            
            var deletedButton = extractDigitFromString(buttonToRemoveId);
            
            // Fetching questions from mainchat.json and updating the question buttons
            fetch('../../intents/mainchat.json')
            // Adjust the path to mainchat.json inside the intents folder
            .then(response => response.json())
            .then(data => {
                const chatContainerQuestions = document.getElementById('chatbot');
                console.log('chatContainerQuestions', chatContainerQuestions);

                var children = chatContainerQuestions.children; // Access children directly
                console.log(chatContainerQuestions);
                console.log(children.length);
                if (children.length > 0) {
                    var lastChild = children[children.length - 1];
                    var lastChildId = lastChild.id;
                    var lastButtonIdNo = extractDigitFromString(lastChildId);
                    console.log(lastButtonIdNo);
                }else {
                    var lastButtonIdNo = deletedButton;
                }
                if (lastButtonIdNo > deletedButton) {
                    var indexToFetch = lastButtonIdNo;
                }else {
                    var indexToFetch = deletedButton;
                }

                var intentData = data.intents[indexToFetch];

                const newButton = document.createElement("button");
                newButton.className = "question-button";
                newButton.id = "btn-" + (indexToFetch + 1);
                newButton.textContent = intentData.patterns[0];

                // Create the `onclick` attribute dynamically
                newButton.setAttribute("onclick", `sendMessage('${intentData.patterns[0]}', event)`);
                
                console.log(newButton);
                chatContainerQuestions.appendChild(newButton);

            })
            .catch(error => console.error('Error fetching data from mainchat.json:', error));
                
            
            });
            
            document.getElementById('message-input').value = '';
        }
    
    
    

            
            
            
            
            
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