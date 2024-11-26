const twilio = require('twilio');
const accountSid = 'AC96d18f32591f5c3cb68639fa087ed621';
const authToken = 'f1ff2413606e6ea480957b11e5267aa4';
const client = twilio(accountSid, authToken);

const verificationCache = {}; // In-memory cache for verification codes

exports.verifyPhoneNumber = async (req, res, next) => {
  const { phoneNumber } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000);
  const expirationTime = Date.now() + 5 * 60 * 1000; // Code expires in 5 minutes
  verificationCache[phone] = { code, expirationTime };

  try {
    await client.messages.create({
      body: `Your verification code is ${code}`,
      from: '+15075015204',
      to: phone,
    });
    res.status(200).send('Verification code sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending verification code');
  }
};

exports.verificationCache = verificationCache;