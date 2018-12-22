const Discord = require('discord.js');
const ApiAI = require('apiai');
const firebase = require('firebase');
const Axios = require('axios');

const Client = new Discord.Client();
const App = ApiAI(process.env.DF_CLIENT_ACCESS_TOKEN);

// Bot Modules
const botFun = require('./features/bot-fun');
const botElection = require('./features/bot-election');
const botReputation = require('./features/bot-reputation');
const botTopic = require('./features/bot-topic');
const botPost = require('./features/bot-post');
const botDF = require('./features/bot-df');

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
    databaseURL: 'https://' + process.env.FIREBASE_DATABASE_NAME + '.firebaseio.com',
    storageBucket: process.env.FIREBASE_BUCKET + '.appspot.com',
};
firebase.initializeApp(firebaseConfig);

// App Title
const appTitle = 'Kuru Anime';

// Symbol Command of Fun
const symbolCommand = '~';

// Bot Ready Message
Client.on('ready', () => {
    console.log('Bot is ready.');
});

// New User
Client.on('guildMemberAdd', member => {
    member.send('Hello! Thanks for joining ' + appTitle + '! Feel free to talk to me here or if you prefer, talk to me on the #kuru-anime channel. Don\'t forget to read our rules, okay? Have a nice stay!')
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);
});

// Main Code
Client.on('message', message => {
    const firebaseEmail = message.author.id + process.env.FIREBASE_ACCOUNT_PASSWORD;
    const firebasePassword = message.author.id + "-" + process.env.FIREBASE_ACCOUNT_PASSWORD;
    firebase.auth().createUserWithEmailAndPassword(firebaseEmail, firebasePassword).catch(function (error) {
        // Error for Registering
        console.log("Register Error Code: ", error.code);
        console.log("Register Error Message: ", error.message);
        if (error.code === "auth/email-already-in-use") {
            firebase.auth().signInWithEmailAndPassword(firebaseEmail, firebasePassword).catch(function (error) {
                // Error for Loggin In
                console.log("Login Error Code: ", error.code);
                console.log("Login Error Message: ", error.message);
            });
        };
    });
    // ============================================================ Code Start
    botFun.botFun(message, symbolCommand, Discord, Client, firebase);
    botElection.botElection(message, Client, firebase, symbolCommand);
    botReputation.botReputation(message, Client, firebase, symbolCommand);
    botTopic.botTopic(message, Client, symbolCommand);
    botPost.botPost(message, Client, Axios);
    botDF.botDF(message, Client, App);
    // ============================================================ Code End
    firebase.auth().signOut().catch(function (error) {
        // Error Signing Out
        console.log("Sign Out Error Code: ", error.code);
        console.log("Sign Out Error Message: ", error.message);
    });
});

// Discord Login
Client.login(process.env.BOT_TOKEN);