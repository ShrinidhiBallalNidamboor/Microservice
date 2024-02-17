// Send the authorization code to localhost:4000/getToken to receive a token
const response = await axios.post('http://localhost:4000/getToken', { code: authorizationCode });
const jsonToken = response.data;

// Send the token to localhost:4000/verify for verification
const verificationResponse = await axios.post('http://localhost:4000/verify', { token: jsonToken });

// If verification is successful, handle authentication or registration logic
const decoded = verificationResponse.data;
