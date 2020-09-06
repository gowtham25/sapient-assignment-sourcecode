This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run deploy`

Deploy the build of the latest code in the github
Can access that page through this (https://gowtham25.github.io/sapient-assignment) url

### `Followed Approch`

Initially make an API call with the limit and render in the page.
Make API call on every filter (launch_year, launch_success, land_success) and update the data with the latst data and rerender the page
Change the URL with the filter the filtered details as querystring without rerender the page
Refresh the page with the filtered details, Read the querystring in the URL make the API call to render the page with filtered details and update the state(highlight the selected buttons).

### `Responsive UI`
    Support three types of devices
    1) Mobile View (700px)
    2) Tablet View (700px - 1024px)
    3) Desktop View (>1024px)
