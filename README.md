# BookingApp
Build a cinema theatre ticket booking app

This is NextJs app developed with create-next-app and Chakra UI and written with React hooks.
The Chakra theme was set up in styles folder of the app

I have wrapped the _app.js in a couple of context providers - One for the Theming and another for handling the reducer state.

components is a folder with the custom components used and resused in various components of the app.

This app doesnt connect to any APIs. Whatever data is stored is managed through storing in the state of the app. The state was shared among different components using the above mentioned Context provider set up and the reducer functions being called using actions. An initial state is hardcoded in the reducer for you to start working with it. Also unit testing / integration testing is not implemented.

API integrations and authentications are not set up in this app due to time constraints. For now, to test the functionalities, imagine as the admin. So you will have access to the Theatre setup as well as booking Panel. (User would be seeing only the booking panel).

In the settings panel, you will be able to make any seat disabled before anyone selects or occupies it (this is a one time setting that the theatre does before opening). You can adjust the price of each row and also update the dimensions of your theatre - number of rows and columns of seats.

In the Booking panel, you will be able to see the seats with the price against it. You will only be able to choose the unoccupied and enabled seats. When you select your seats, you can see the number of seats selected and the total cost. The cost has been set in the dollar currency.

Once you select your seats, click Book to take you to the checkout page where you need to confirm your seats. You have a 300 second timer to confirm or go back and update the seats. If you don't do anything, once the timer runs out, your selected seats will be reset.

If you confirm, you will be taken to the home page. If you go to booking again, you will be able to see the occupied seats that you have already checked out. Now you will be able to select one or more of the remaining seats only.

To run this app,
1. Clone this repository. Also make sure npm is installed in your system.
2. Go into the ticket-booking-app
3. Type 'npm install'. Wait till your dependencies get installed.
4. Then type 'npm run dev' in your terminal.
5. In your browser type in localhost:3000 as url and the app is ready to use.

'_document.js' was writtent to connect the app to Google Fonts

