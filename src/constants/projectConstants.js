// constants/projectConstants.js

const apiUrl = "http://localhost:8080/";

const authToken = localStorage.getItem("Authorization");
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${authToken}`);

export { apiUrl, myHeaders };

// Corrected export statement
export default apiUrl;
