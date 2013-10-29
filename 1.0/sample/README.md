App42-SampleGame
================

App42 Client SDK sample for SamsungTV apps.

1. Download the SamsungTVGame-App42 from this repo and import to your Samsung Smart TV Apps Project in [Eclipse]Samsung Smart TV Apps Editor.
2. Go to app folder in this project and open init.js .
3. Put your APIKey and your SecretKey in App42.initialize("your APIKey"," your SecretKey") method in line number 7 of init.js .and do App42.setBaseUrl("YOUR API SERVER URL");
4. Login with BPaaS AppHQ Management Console.
5. Go to Business Service Manager from left tab, click on Game Service and select Game.
6. Create game with App42 BPaaS by clicking on Add Game button from right tab in BPaaS AppHQ.
7. Go to js folder in this project and open Main.js.
8. Change gameName variable with your game name created from step #4-6
9. Build and Run.
