# 1. Requirements, Approach and Implementation
### - Requirements
* The Goal is to implement a game with two independent units – the players –
communicating with each other using an API.
* When a player starts, it incepts a random (whole) number and sends it to the second
player as an approach of starting the game. The receiving player can now always choose between adding one of {1, 0, 1} to get to a number that is divisible by 3 . Divide it by three. The resulting whole number is then sent back to the original sender.The same rules are applied until one player reaches the number 1 (after the division).
* For each "move", a sufficient output should get generated (mandatory: the added, and
the resulting number).
* Both players should be able to play automatically without user input. One of the players
should optionally be adjustable by a user.

*Example*
* Player 1 console
```sh
[Info] Player 2 connected to the game
[Info] Game started by playerTwo, input number is 56, Next turn: you
ADD 1
[Info] You added 1, the value now is 19, Next turn: playerTwo
[Info] playerTwo sent you the value 6, choose one in [-1,0,1] to send back
ADD 0
[Info] You added 0, the value now is 2, Next turn: playerTwo
[Info] playerTwo reached 1 first, so you lose. Game closed.
```
* Player 2 console
```sh
START
[Info] Game started by playerTwo, input number is 56, Next turn: playerOne
[Info] playerOne sent you the value 19, choose one in [-1,0,1] to send back
ADD -1
[Info] You added -1, the value now is 6, Next turn: playerOne
[Info] playerOne sent you the value 2, choose one in [-1,0,1] to send back
ADD 1
[Info] You added 1 the value now is 1, you win. Game closed.
```
### - Approach
* I thought about socket.io at first. It requires frontend setup, however, which is not really necessary for current application.
* Afterwards I decided to write a simple server using `net` module in Node.js and then I use Telnet as a client to connect to the server.
* Finally, I thought that the client should able to command to interact with application, therefore I built a simple Javascript with `readline` module in Node.js and consider it as client.

### - Implementation
* I started by developing the based client-server connection and handle disconnection from clients. Then I added some validations to make sure it suits the requirements.
* Next, I created some objects for this application. I used a `Game` object to manage the state of the game, a `Player` object to save information of client. Besides, we need a `Game Logic` library to manage rules of a game. 
  * The `Game` object will let us know whether game was start or not, what is the initiate input, what is the current value, who is the next Turn.
  * The `Player` object provides name, player's opponent,  playing options (manual, automatic).
  * The `Game Logic` library manages rules of the Game. It is in charge of generating Random number, supplying numbers that players can add and some validations.
* Afterwards, I built a simple scenario when `both clients are manual` to understand the flow of events.
* Then I continued working with the scenario when `both clients are automatic` and when `one of clients plays automatically`.
* When the application is worked. It's time to do some code refactor.
# 2. Setup
### - Install NodeJS environment
* For mac OS: Download the [macOS Installer] directly from the nodejs.org web site.
* For Windows: Download the [Windows Installer] directly from the nodejs.org web site.
* Open Terminal, command `node -v` and get response version of installed Node.js.
### - Run Server/Clients
* Download this repository from github
* Decompress the file
* Open Terminal and navigate to directory location, then run `node server.js` for starting server
* Open other Terminal and run `node client.js` for starting client connection

# 3. Game and Rules
* Player is able to run some commands in Terminal:
    * `START`: start the game
    * `ADD X`: add number X to get a valid number
    * `AUTO`: player plays automatically. He then is not able to command unless disconnection
    * `QUIT`: quit the game
    * `STATUS`: current Game information
    * `CMD`: Check list commands
    * Other command considering as an Invalid Command
- Game is only start when one of connected client command `START`. If one of clients plays automatically, the right to start the game belongs to the opponent.
- Game will be closed if one of clients disconnect from the server.

# 4. How to run the Game
* For Manual Mode
  * Open terminal for server
  * Open terminal for client 1
  * Open terminal for client 2
  * Client commands `START` to play the game
* For Automatic Mode
  * Open terminal for server
  * Open terminal for client 1 then command `AUTO`
  * Open terminal for client 2 then command `AUTO`
  * Game then will be start automatically
* For Half-Manual Mode
  * Open terminal for server
  * Open terminal for client 1 then command `AUTO`
  * Open terminal for client 2 then command `START` to play the game
# 5. Limitations and Future improvements
### Limitations
* This application currently works on console using command line. I have no idea about transforming to web-based application.
* In my opinion, if the application opens for more than two players, turn-based management is also an obstacle although we can custom Game Logic, Game Rules.
* I cannot find a good approach for writing unit test, integration test.
* This application only works for local environment. I tried deploy server in heroku and run client script but cannot get response from server due to PORT configuration. 
### Future improvements
* Implement Log system for server to track all activities.
* Writing Test
* Use Websocket module and refactor code in order to work on production environment

# 6. References
- [JavaScript Socket Programming Examples]
- [Game of Three in Java] by Cristian Dugacicu
- [Node Up an Running] by Tom Hughes-Croucher, Mike Wilson - Released April 2012, Publisher(s): O'Reilly Media, Inc

[JavaScript Socket Programming Examples]: <https://cs.lmu.edu/~ray/notes/jsnetexamples/>
[Node Up an Running]: <https://www.oreilly.com/library/view/node-up-and/9781449332235/>
[Game of Three in Java]: <https://github.com/razorcd/Game-of-Three>
[Windows Installer]: <https://nodejs.org/en/#home-downloadhead>
[macOS Installer]:<https://nodejs.org/en/#home-downloadhead>