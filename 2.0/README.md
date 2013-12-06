App42_SamsungTV_SDK
===================

App42 Client SDK for SamsungTV.

1. <a href="https://apphq.shephertz.com/register" target="blank">Register</a> with App42 platform
2. Create an app once you are on Quickstart page after registration.
3. Download the App42-all-XXX.min.js from this repo and add to your project library(index.html) in [Eclipse]Samsung Smart TV Apps Editor.
4. Open init.js in your project and add initialize code here.

```javascript
//APIKey and SecretKey recieved in step #2 above
App42.initialize("your APIKey"," your SecretKey");
```

- Instantiate the service that one wants to use in the App, e.g. using ScoreBoard service one has to do the following

```javascript
var scoreBoard = new App42ScoreBoard();
```
- Login with AppHQ Management Console from https://apphq.shephertz.com/register/app42Login
- Go to Business Service Manager from left tab, click on Game Service and select Game.
- Create game with App42 by clicking on Add Game button from right tab in AppHQ.
- Now one can call associated method of that service e.g. save user score can be done with the following snippet

```javascript
var gameName = "your game name",
userName = "your user name",
score = 10;
scoreBoard.saveUserScore(gameName, userName, score,{
success: function(object) {
// Callback for Success },
error: function(error) {
    // Callback for error }
});
```

- Executing above method will save user score for your game in App42 cloud.
- You can login to AppHQ console and can see the saved score there.
- Similarly one can use other App42 services like File Upload, Gaming, NoSQL Storage to make user engaging social Apps for HTML5.
