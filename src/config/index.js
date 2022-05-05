let API_HOST_NAME = "http://localhost:5000";
if (process.env.NODE_ENV === "production") {
  API_HOST_NAME = "";
}
export default API_HOST_NAME;
