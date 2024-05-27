import dotenv from 'dotenv';  // Configures dotenv at the top
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';
import process from 'process';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*' // Allow only this origin to access
}));
app.use(express.json());

app.post('/testchat', async (req, res) => {
    const userMessage = req.body.userMessage || ""; // Default prompt if none is provided
    //const userMessage = req.body.userMessage || "who is elvis";

    const postData = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: userMessage
            }
        ],
        //max_tokens: 450  // limit the response to 450 tokens. max_tokens is optional 
        // max_tokens have no max
        
    };

    const headers = {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, { headers });
        console.log(JSON.stringify(response.data, null, 2)); // Log the full response for debugging
        
        // Extract and send the AI-generated response
        if (response.data.choices && response.data.choices.length > 0) {
            const messageContent = response.data.choices[0].message;
            if (messageContent && messageContent.content) {
                res.json({ message: messageContent.content });
            } else {
                res.status(404).json({ error: "No message content available." });
            }
        } else {
            res.status(404).json({ error: "No choices available in the AI response." });
        }
    } catch (error) {
        console.error('Error making the request:', error);
        res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
});



//// old code second, work with thunder client ____  http://localhost:3000/testchat

// import dotenv from 'dotenv';  // Configures dotenv at the top
// dotenv.config();
// //require('dotenv').config();

// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import process from 'process';






// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());

//  app.post('/testchat', (req, res) => {
//   const postData = {
//     model: "gpt-3.5-turbo",
//     messages: [
//         {
//             role: "system",
//             content: "You are a helpful assistant."
//         },
//         {
//             role: "user",
//             content: "who is elvis"
//         }
//     ],
//     max_tokens: 150
//   };
  
//   const headers = {
//     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//     'Content-Type': 'application/json'
//   };
  
//   axios.post('https://api.openai.com/v1/chat/completions', postData, { headers })
//       .then(response => {
//           // Log the full response
//           console.log(JSON.stringify(response.data, null, 2));
          
//           // Specifically log the content of the message
//           if (response.data.choices && response.data.choices.length > 0) {
//               const messageContent = response.data.choices[0].message;
//               if (messageContent) {
//                   console.log("Received message:", messageContent.content);
//               } else {
//                   console.log("No message content available.");
//               }
//           }
//       })
//       .catch(error => {
//           console.error('Error making the request:', error);
//       });
//  });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
//   console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
// });











// old code third

// import express from 'express';
// import axios from 'axios';

// const app = express();
// app.use(express.json());  // Make sure the Express app can parse JSON payloads

// app.post('/get-chat-response', async (req, res) => {
//     // Assuming user sends input as JSON with a property "userMessage"
//     const userMessage = req.body.userMessage;

//     const postData = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "system",
//                 content: "You are a helpful assistant."
//             },
//             {
//                 role: "user",
//                 content: userMessage  // Use the user input from the request
//             }
//         ],
//         max_tokens: 150
//     };

//     const headers = {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//     };

//     try {
//         const response = await axios.post('https://api.openai.com/v1/chat/completions', postData, { headers });
//         console.log(JSON.stringify(response.data, null, 2));  // Log the full response for debugging

//         // Extract the AI-generated response
//         if (response.data.choices && response.data.choices.length > 0) {
//             const messageContent = response.data.choices[0].message;
//             if (messageContent) {
//                 console.log("Received message:", messageContent.content);
//                 res.json({ message: messageContent.content });  // Send the AI response back to the client
//             } else {
//                 console.log("No message content available.");
//                 res.status(404).json({ error: "No message content available." });
//             }
//         } else {
//             res.status(404).json({ error: "No choices available in the AI response." });
//         }
//     } catch (error) {
//         console.error('Error making the request:', error);
//         res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
//     }
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
