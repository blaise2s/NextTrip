# NextTrip

### Build & Run Locally

1. `git clone git@github.com:blaise2s/NextTrip.git`
2. `cd NextTrip`
3. `yarn install`
4. `yarn build`
5. `yarn start` or `yarn dev` for dev mode

You can also view it here: https://next-trip-msp.herokuapp.com/

### Test

1. Run either `yarn dev` or `yarn start`. If running yarn start, `yarn build` will need to be ran first.
2. `yarn selenium-test`, which is currently **not** running headless so you should be able to see it run through the suite.

I choose to test the app as a whole with Selenium rather than in smaller pieces as this is small scale project. Given the small nature of the web app it was easy to set up steps to walk through expected functionality of the UI. By driving with Selenium and being able to click on elements, enter values, and select options it's simple to compare expected content to what is displayed at the end of the automated steps. This verifies the ability to handle errors, give messages when a wrong route is entered, etc.

### Assumptions

- I want to refresh the data periodically, but not forever -- I choose to refresh ever 15 seconds for 5 minutes after selecting or entering a new stop.
- It would be nice if this also looked okay on a mobile device.
- API calls would be made upon selecting a new route and direction in order to get updated information.
- A new value selected for an input would clear inputs coming after it.
- Inputs will be disabled unless the input above it has a selected value.
- Only numbers can be entered when searching by stop.
- I want to be able to navigate directly to _by route_ or _by stop_, _by route_ being the preferred choice or the home page.
- Use Material UI to piece something together quickly that still looks pleasing.
