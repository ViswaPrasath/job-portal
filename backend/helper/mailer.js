const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// credentials from the google cloud
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Z9kSB7YUuLYCgYIARAAGAQSNwF-L9IrQBo4SfJBEBarC4DvStN4uayInk0olvyeX2aRhN6Jo7CoT6GO4mxtP5WXqg4c-ykL3as';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// node mailer function  
const sendMail = async(to, sender, message) => {
    try {
        const access_token = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'viswathedev@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: access_token,

            }
        });

        const mailOptions = {
            from: `VISWA PRASATH ${sender}`,
            to: to,
            subject: 'Job Request',
            text: 'Message testing',
            html: message
        };

        const result = await transport.sendMail(mailOptions);
        console.dir(result);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}

exports.sendMail = sendMail;