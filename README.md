# Operation App Frontend

**IMPORTANT**: The live version is hosted on a free server, which may have some limitations. After a few minutes of inactivity, the services may enter a sleep state. The **first request** after this can take up to **5 minutes** to respond. Since the app is built with microservices, the login request, fetching records, and executing operations are handled by different servers, and the first request for each may take a few minutes.

You can access the live version using the link below:
[Live Version](https://operationapp.onrender.com)

This frontend project was built with React and JavaScript. Tailwind CSS was also used for styling.

## Available Users

The app contains a login page. The available users are:

- **User**: guigui | **Password**: 123
- **User**: testuser | **Password**: 123

You can also register new users by clicking on the signup link.

## After Login

After logging in, you will be redirected to the records page, where you can see your balance and the last operations performed. You can also filter and sort these records.

There is a button with a `+` icon that will redirect you to a form that allows you to perform an operation. After completing the operation, you will be redirected back to the records page.

## Running the Application Locally

To run the application locally, follow these steps:

1. Clone this repository.
2. Navigate to the root directory.
3. Run the following commands:

   ```bash
   npm install
   npm start
