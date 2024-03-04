## Accessing the oauth2.0 service
#### Include the following code in the server code for checking if the user is authenticated
// Send the authorization code to localhost:3000/getToken to receive a token
const verificationResponse = await axios.post('http://localhost:3000/verify', {
// If verification is successful, handle authentication or registration logic
const decoded = verificationResponse.data;

## Chat Application service
The team members can communicate with each other via the real time chat application.

## QNA service
This provides the employees of the organisation a platform to ask and answer questions
that commonly occur in an organisation. This helps the employees in the better understanding 
the working of the organisations.

## Team Management
This helps the owners of the organisation to add members or employees to the organisation
and assign them to projects, create sprints in the projects, set goals and raise issues.

## Project Analysis
This helps in analysing the project sprints and the issues raised on the project.
