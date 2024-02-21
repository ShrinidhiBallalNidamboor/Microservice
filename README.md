## Accessing the oauth2.0 services
## Accessing the oauth2.0 service
#### Include the following code in the server code for checking if the user is authenticated
// Send the authorization code to localhost:4000/getToken to receive a token
const response = await axios.post('http://localhost:4000/getToken', { code: authorizationCode });
@@ -10,6 +10,6 @@ const verificationResponse = await axios.post('http://localhost:4000/verify', {
// If verification is successful, handle authentication or registration logic
const decoded = verificationResponse.data;

## Chat Application
## Chat Application service
The team members can communicate with each other via the real time chat application.
