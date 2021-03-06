# Brokk And Odin - TS

Latest iteration of the BrokkAndOdin site. Full CI/CD integration.

## Workflow

This project is deployed via github actions. On creation of a PR to main, all tests will be run. Once the PR was been reviewed, add a `deploy` label to begin the deployment.

\*Note: If trying to deploy to an AWS account that has never used CDK, you may need to run `cdk bootstrap` to create the needed CDK CloudFormation stack.

\*Note: Typically this would be done on approval, but since this is
currently only developed by me, this is a fair work around

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
