const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'stephania.boyle58@ethereal.email',
        pass: 'Wa1dPnr6yRMZTwM7C3'
    }
});

module.exports = async (senderAd , link) => {
    let error = false
    try {

        await transporter.sendMail({
            from: '"Testing Mailing" <stephania.boyle58@ethereal.email>',
            to: senderAd,
            subject: "Verify Email",
            html: `Please Verify Your Email by clicking <a href= "${link}"> here </a>
            <br/> This email will be valid for only 7 days !`,
        });
    
    } catch (error) {
        console.log(error)
        error = true 
    }

    return error;
    
}