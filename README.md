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
You added -1, the value now is 6, Next turn: playerOne
[Info] playerOne sent you the value 2, choose one in [-1,0,1] to send back
ADD 1
[Info] You added 1 the value now is 1, you win. Game closed.
```
### - Approach
* I thought about socket.io at first. It requires frontend setup, however, which is not really neccessary for current application.
* Afterwards I decided to write a simple server using `net` module in Node.js and then I use Telnet as a client to connect to the server.
* Finally, I thought that the client should able to command to interact with application, therefore I built a simple Javascript with `readline` module in Node.js and consider it as client.

### - Implementation
* I started by developing the based client-server connection and handle disconnection from clients. Then I added some validations to make sure it suits the requirements.
* Next, I created some objects for this application. I used a `Game` object to manage the state of the game, a `Player` object to save information of client. Besides, we need a `Game Logic` library to manage rules of a game. 
  * The `Game` object will let us know whether game was start or not, what is the initiate input, what is the current value, who is the next Turn.
  * The `Player` object provides name, player's opponent,  playing options (manual, automatic)
  * The `Game Logic` library manages rules of the Game. It is in charge of generating Random number, supplying numbers that players can add and some validations
* Afterwards, I built a simple scenario when `both clients are manual` to understand the flow of events
* Then I continued working with the scenario when `both clients are automatic` and when `one of clients plays automatically`.
* When the application is worked. It's time to do some code refactor
# 2. Setup
### - Install NodeJS environment
### - Run Server
### - Run Client
# 3. Game and Rules

# 4. How to run the Game

# 5. Limitations and Improvements
### Limitations
### Improvements

# 6. References
- [JavaScript Socket Programming Examples]
- [Game of Three in Java] by Cristian Dugacicu
- [Node Up an Running] by Tom Hughes-Croucher, Mike Wilson - Released April 2012, Publisher(s): O'Reilly Media, Inc.

[JavaScript Socket Programming Examples]: <https://cs.lmu.edu/~ray/notes/jsnetexamples/>
[Node Up an Running]: <https://www.oreilly.com/library/view/node-up-and/9781449332235/>
[Game of Three in Java]: <https://github.com/razorcd/Game-of-Three>