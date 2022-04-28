const nodemailer = require("nodemailer");

const emailKey = async (email, key, text, user ) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.mailtrap.io",
			port: 2525,
			auth: {
			  user: "6adcb0b3bc15c3",
			  pass: "c170a6da93e22e",
			},
		});

        
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: "Admin clé de decryptage",
			html:`
			<html lang="en">
			<head>
			  <meta charset="UTF-8" />
			  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
			  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
			  <link
				href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
				rel="stylesheet"
			  />
			  <title>Account Activation</title>
			  <style>
				body {
				  background-color: #333333;
				  height: 100vh;
				  font-family: "Roboto", sans-serif;
				  color: #fff;
				  position: relative;
				  text-align: center;
				}
				.container {
				  max-width: 700px;
				  width: 100%;
				  height: 100%;
				  margin: 0 auto;
				}
				.wrapper {
				  padding: 0 15px;
				}
				.card {
				  position: absolute;
				  top: 50%;
				  left: 50%;
				  transform: translate(-50%, -50%);
				  width: 100%;
				}
				span {
				  color: #ec1c23;
				}
				button {
				  padding: 1em 6em;
				  border-radius: 5px;
				  border: 0;
				  background-color: #ec1c23;
				  transition: all 0.3s ease-in;
				  cursor: pointer;
				}
				button:hover {
				  background-color: #c11923;
				  transition: all 0.3s ease-in;
				}
				.spacing {
				  margin-top: 5rem;
				}
				textarea {
					width: 100%;
					height: 200px;
					padding: 12px 20px;
					box-sizing: border-box;
					border: 2px solid #ccc;
					border-radius: 4px;
					background-color: #f8f8f8;
					font-size: 16px;
					resize: none;
				  }
			  </style>
			</head>
			<body>
			  <div class="container">
				<div class="wrapper">
				  <div class="card">
					
					<p>Demande par ${user}</p>
                    <h3>${text}</h3>
                    <textarea disabled>${key}</textarea>
				  </div>
				</div>
			  </div>
			</body>
		  </html>
			`,
		});
		console.log("Key email sent successfully");
	} catch (error) {
		console.log("Key email not sent!");
		console.log(error);
		return error;
	}
};

module.exports = { emailKey };