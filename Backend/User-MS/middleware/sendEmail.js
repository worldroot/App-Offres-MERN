const nodemailer = require("nodemailer");


const emailSender = async (email, url, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: "appoffres.ooredoo@gmail.com",
				pass: "pfe2022ooredoo",
			},
		});

        
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: "Activate your account",
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
				  color: #ffc107;
				}
				button {
				  padding: 1em 6em;
				  border-radius: 5px;
				  border: 0;
				  background-color: hsl(45, 100%, 51%);
				  transition: all 0.3s ease-in;
				  cursor: pointer;
				}
				button:hover {
				  background-color: hsl(45, 70%, 51%);
				  transition: all 0.3s ease-in;
				}
				.spacing {
				  margin-top: 5rem;
				}
			  </style>
			</head>
			<body>
			  <div class="container">
				<div class="wrapper">
				  <div class="card">
					<h1><span>Bienvenue !</span>Et merci pour votre inscription !</h1>
					<p>Merci de valider votre email en cliquant sur le bouton ci-dessous 🙂</p>
					<a href=${url}><button>${text}</button></a>
					<p class="spacing">
						Si le bouton ci-dessus ne fonctionne pas, veuillez naviguer vers le lien fourni ci-dessous 👇🏻
					</p>
					<div><a href=${url}>Link</a></div>
				  </div>
				</div>
			  </div>
			</body>
		  </html>
			`,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};

const emailReset = async (email, url, text, nom) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: "appoffres.ooredoo@gmail.com",
				pass: "pfe2022ooredoo",
			},
		});

        
		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: "Réinitialiser le mot de passe",
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
				  color: #ffc107;
				}
				button {
				  padding: 1em 6em;
				  border-radius: 5px;
				  border: 0;
				  background-color: hsl(45, 100%, 51%);
				  transition: all 0.3s ease-in;
				  cursor: pointer;
				}
				button:hover {
				  background-color: hsl(45, 70%, 51%);
				  transition: all 0.3s ease-in;
				}
				.spacing {
				  margin-top: 5rem;
				}
			  </style>
			</head>
			<body>
			  <div class="container">
				<div class="wrapper">
				  <div class="card">
					<h1><span>Bienvenue </span>${nom}</h1>
					<p>Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe 🙂</p>
					<a href=${url}><button>${text}</button></a>
					<p class="spacing">
						Si le bouton ci-dessus ne fonctionne pas, veuillez naviguer vers le lien fourni ci-dessous 👇🏻
					</p>
					<div><a href=${url}>Link</a></div>
				  </div>
				</div>
			  </div>
			</body>
		  </html>
			`,
		});
		console.log("reset email sent successfully");
	} catch (error) {
		console.log("reset email not sent!");
		console.log(error);
		return error;
	}
};

module.exports = { emailSender, emailReset };