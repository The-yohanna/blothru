# Blothru Api
 
This is a backend for a beauty app that brings together professional stylists and customers. Customers can register then book a preffered stylist for a certain service. Stylists register then send an application with supporting documents to offer services within their expertise. The applictions are reviewed by an admin and either approved or declined. On approval the stylist will be enlisted as a service provider and customers can book service from them.

## Technologies Used

The primary technologies used are Node.js and MySQL

### Node Libraries Used

- [express](https://expressjs.com/) a popular Node.js web framework.
- [sequelize](https://sequelize.org/) a Node.js ORM for major SQL databases.
- [mysql2](https://www.npmjs.com/package/mysql2) a MySQL client for Node.js.
- [cors](https://www.npmjs.com/package/cors) used to enable CORS in express.
- [body-parser](https://www.npmjs.com/package/body-parser) parses incoming request bodies.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) provides tokens for authentication and authorization.
- [eslint](https://eslint.org/) for making code more consistent and avoiding bugs.
- [dotenv](https://www.npmjs.com/package/dotenv) loads environment variables.
- [bcrypt](https://www.npmjs.com/package/bcrypt) used to hash passwords.
- [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) for interaction with SendGrid mail endpoint, used in sending mails.
- [express-validator](https://express-validator.github.io/docs/) for validating user input data.

## Endpoints

## Environment Variables

| Name | Description |
| ---- | ----------- |
| DB_NAME | The name of the MySQL database to store the data in. |
| DB_USER | The name of the MySQL user i.e root. |
| DB_PASS | MySQL user password |
| SECRET_KEY | A secret key of choice combined with the header and payload in signing the JSON web token. |
| SENDGRID_API_KEY | The API key for [sendgrid](https://sendgrid.com). Used to send E-Mails. |
| SENDGRID_FROM_ADDRESS | The sender address for E-Mails sent via [sendgrid](https://sendgrid.com). |

