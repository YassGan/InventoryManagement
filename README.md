
# Inventory Program

This is an inventory program built using the MEVN (MongoDB, Express.js, Vue.js, Node.js) technology stack. The program allows users to manage product data and perform accounting tasks based on CSV files. Users can visualize the content of a CSV file, perform accounting verification, fix incorrect data, and create new inventory elements. The program also supports user authentication using JSON Web Tokens (JWT).

## Features

- **CSV File Visualization:** Users can view the content of a CSV file, which primarily contains product data and related information.

- **Accounting Task:** The most important feature of the program is the accounting task. It allows users to import a CSV file and perform accounting verification. The program compares the imported data with existing values and highlights discrepancies. Incorrect products are displayed in red, correct products remain in green, and correct values are locked. This verification process ensures accurate accounting.

- **Data Fixing:** After the accounting verification, users can fix the incorrect lines. This task is necessary to ensure data accuracy and consistency.

- **Inventory Creation:** Once the accounting verification and data fixing are complete, a new inventory element is created and added to the database. This allows users to track and manage their inventory over time.

- **Previous Inventories:** Users can view their previous inventories, providing a historical record of inventory data. However, users cannot access inventories created by other users.

- **Inventory Details Export:** Users can click on a specific inventory to view its details. They also have the ability to download the inventory details in either PDF or CSV format, providing flexibility for further analysis or sharing.

- **User Authentication:** To access the application, users must be authenticated using JSON Web Tokens (JWT). This ensures secure access to their designated space within the application.

## Technologies Used

- MongoDB: A NoSQL database used to store inventory data.

- Express.js: A web application framework for building the server-side application and API.

- Vue.js: A progressive JavaScript framework used to build the client-side user interface.

- Node.js: A JavaScript runtime environment used to execute server-side JavaScript code.

- JSON Web Tokens (JWT): A standard for securely transmitting authentication data as a JSON object.

## Live Demo
To showcase the application's features, a video demonstration is included below. Hosting a website can be costly, but this video offers an efficient and cost-effective way to explore its functionalities.

