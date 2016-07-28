var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();   //For this example, we'll just chat with the bot from a console window => we use ConsoleConnector class
var bot = new builder.UniversalBot(connector); //universalBot class implements all of logic to manage the bots' conversations with users.
var intents = new builder.IntentDialog(); //for analyzing the user's intents.


//When ready to deploy the bot to real channels, swap out the ConsoleConnector to ChatConnector configured with your bots AppID and Password (from the bot
//framework portal)
// "//****** denotes hiden code for the related version"

//================DIALOG and BotBuilder========

	//now that we have our bot AND connector setup, we need to add a DIALOG to our newly created bot object.
	//Botbuilder breaks conversational applications up into components called DIALOGS
	//As user sends messages to your bot, the framework tracks which DIALOG is currently active and will automatically route the incoming message to the active DIALOG.

//================Version 1.0.0================
	
	//For our HelloBot (Version 1.0.0) we'll just add single root '/' dialog that responses to any message with "Hello World :)"
//***************************	
//bot.dialog('/', function (session) {
//	session.send('Hello World :)');
//});
//***************************
	//We can now run out bot and interact with it from the cmd.
	
// !!!!!SUCCESS!!!!!

//================Version 1.0.1================
	
	//This version will ask for the user's name and then greet them with their name. 
	//We need to introduce a new concept: 
		//WATERFALL: lets you collect input from user using a sequence of steps.
		//PROMPTS: BotBuilder comes with already built-in prompts that can be used to collect from a user:	
			//e.g.: Prompts.text, Prompts.confirm, Prompts.number, Prompts.time, Prompts.choice, Prompts.attachement
			//These Prompts will return the users response through a call to "session.endDialogWithResult()"
			//Prompts return to the caller an IPromptsResult. The users' response will be contained in the results.response field and may be null

//***************************
//bot.dialog('/', [
	//function (session) {
	//	builder.Prompts.text(session, 'Ahla m3allem. Chesmek?');
	//},
	//function (session, results) {
	//	session.send('marhbe marhbe si %s!', results.response);
	//}
	//]);
//***************************

// !!!!!SUCCESS!!!!!

// The problem here: if you say hello multiple times, the bot doesn't remember the name. Let's fix dat shit.

//================Version 1.0.2=================

	//This version is about Adding Dialogs and MEMORY.
	//For HelloBot we're going to add a new /profile dialog: users fills out his information
	//This information needs to be stored somewhere so we can either:
		//1.return it to the caller as the output from our dialog using session.endDialog({response: {name: 'John'}})
		//2.or store it globally using SDK's built-in storage system.
	//we're doing the 2. Option now: 
	
//***************************
//bot.dialog('/', [
//	function (session, args, next) {
//		if (!session.userData.name) {
//			session.beginDialog('/profile');    //conversationData 
//		} else {
//			next();
//		}
//	},
//	function (session, results) {
//		session.send('Hello %s!', session.userData.name);  //conversationData
//	}
//	]);
//bot.dialog('/profile', [
//function (session) {
//	builder.Prompts.text(session, 'Hi what is your name?');
//},
//function (session, results) {
//	session.userData.name = results.response;     //conversationData
//	session.endDialog();
//}
//]);
//***************************
// !!!!!SUCCESS!!!!!

	//SDK includes several ways of persisting data relative to a user or conversation:
		//(i) userData: stores information globally for the user across all conversations.
		//(ii) conversationData: stores information globally for a single conversation. Needs to be enabled using the bots persistConversationData setting
		//(iii) privateConversationData: store information globally for a single conversation but its private data for the current user. this data spans all
	//all dialogs so it's useful for storing temporary state that you want to clean up when conversation ends.
		//(iv) dialogData: persists information for a single dialog instance. This is essentially for storing temporary information in between steps of waterfall

	//Bots build with BotBuilder are designed to be stateless so that they can easily be scaled to run across multiple compute nodes. 
		//THEREFORE: avoid to save state using a global variable or function closure
		//INSTEAD: leverage the data bags above to persist temporary and permanent state.
		//???? : How to leverage data?
		
//================Version 1.1.0=================

	//In this version, we will tackle: INTENTS
	//We added a new var element //var intents = new builder.IntentDialog();
bot.dialog('/', intents);
//******************************
//intents.matches(/^change name/i, [
//	function (session) {
//		session.beginDialog('/profile');
//	},
//	function (session, results) {
//		session.send('Okidoki... Name has been successfully changed to %s', session.userData.name);
//	}
//]);

//intents.onDefault([
//	function (session, args, next) {
//		if (!session.userData.name) {
//			session.beginDialog('/profile');
//		} else {
//			next();
//		}
//	},
//	function (session, results) {
//		session.send('Hello %s!', session.userData.name);
//	}
//]);

//bot.dialog('/profile', [
//	function (session) {
//		builder.Prompts.text(session, 'Hi what is your name?');
//	},
//	function (session, results) {
//		session.userData.name = results.response;
//		session.endDialog();
//	}
//]);	
//*********************************	
// !!!!!SUCCESS!!!!!

//See HelloBot version 2.0.0
