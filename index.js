const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Op } = require('sequelize');
const cors = require('cors');
const uuid = require('uuid');
const sendMail = require('./untils/mailer');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser('QWERTYUIOPLKJHGFDSAZXCVBNM'));


//  RIGISTER API
app.post('/register', async (req, res) => {
    const { users } = require('./models');

    try {
        // fill username email and password
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).send('Username, Password, and Email are required.');
        }

        // Check password length
        if (req.body.password.length < 8) {
            return res.status(400).send('Password is too short; minimum 8 characters required.');
        }

        // check username length
        if (req.body.username.length < 3 || req.body.username.length > 255) {
            return res.status(400).send('Username must be between 3 to 255 characters.');
        }

        // email validation
        const userEmail = await users.findOne({
            where: {
                email: req.body.email,
            }
        });

        if (userEmail) {
            return res.status(409).send({
                isEmail: false
            });
        }

        const userUsername = await users.findOne({
            where: {
                username: req.body.username,
            }
        });

        if (userUsername) {
            return res.status(409).send('Username is already taken');
        }

        const token = uuid.v1();

        users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            token: token
        });

        const htmlBody = `<b>To verify your account: <a href="http://localhost:3000/verify/token/${token}">Link</a></b>`;
        sendMail(req.body.email, 'Your verify link', htmlBody);

        return res.status(201).send('Please check your email confirmation...');

    } catch (e) {
        console.error(e);
        return res.status(500).send('Lagata hai sever me error hai...');
    }
});

app.get('/verify/token/:token', async (req, res) => {
    const { users } = require('./models');

    try {
        const userV = await users.findOne({
            where: {
                token: req.params.token
            }
        });

        if (userV == null) {
            return res.send({
                isValid: false,
                messege: "Link is Expired..."
            });
        }

        const token = uuid.v1();

        users.update(
            {
                token: token,
                isActive: 1
            },
            {
                where: {
                    id: userV.id
                }
            });
        return res.status(201).send({
            isValid: true,
            messege: "Link is verify..."
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send('Lagata hai sever me error hai...');
    }
});


// LOGIN API
app.post('/login', async (req, res) => {
    const { users } = require('./models');

    if ((typeof (req.body.username) === 'undefined') || (typeof (req.body.password) === 'undefined')) {
        return res.status(400).send('Pls fill the fild...')
    }

    const userL = await users.findOne({
        where: {
            [Op.or]: {
                username: req.body.username,
                email: req.body.username,
            },
            [Op.and]: {
                isActive: 1
            }
        }
    });
    if (!userL) {
        return res.status(401).send({ 'error': 'username and password is incorrect...' });
    }

    const check = bcrypt.compareSync(req.body.password, userL.password);

    if (check) {
        const token = jwt.sign({ uuid: userL.uuid }, 'ASXCVBNMPOJHGCXZWERTYUUHJBLKJHGED'); // jsonwebtoken

        res.cookie('X-Access-Token', token, { maxAge: 7776000000, signed: true, path: '/', secure: true, httpOnly: true }); // cookies

        return res.status(201).send({ "X-Access-Token": token, });
    } else {
        return res.status(401).send({ 'error': 'username and password is incorrect....' });
    }
});

// RESET PASSWORD REQUEST MAIL
app.post('/reset/request', async (req, res) => {
    const { users } = require('./models');

    try {
        // email exists
        const resetlink = await users.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!resetlink) {
            return res.status(404).send('Email not found.');
        }

        const token = uuid.v1();

        await users.update(
            {
                token: token,
            },
            {
                where: {
                    id: resetlink.id
                }
            });

        const resetLink = `http://localhost:3000/reset/password/${token}"`;
        sendMail(resetlink.email, 'Your Reset link', resetLink);

        res.status(200).send('Password reset link sent successfully.');

    } catch (e) {
        console.log(e);
        return res.status(500).send('Lagata hai sever me error hai...');
    }
});

app.get('/resetlink/verify/:token', async (req, res) => {
    const { users } = require('./models');

    try {
        const userF = await users.findOne({
            where: {
                token: req.params.token
            }
        });

        if (!userF) {
            return res.status(404).send({
                isValid: false,
                messege: "Link is Expired"
            });
        }

        return res.status(201).send('Reset link is valid.');

    } catch (error) {
        console.log(e);
        return res.status(500).send('Lagata hai sever me error hai...');
    }
});

// P A S S W O R D - R E S E T
app.post('/reset/password/:token', async (req, res) => {
    const { users } = require('./models');

    try {
        if ((typeof (req.body.password1) === 'undefined') || (typeof (req.body.password2) === 'undefined')) {
            return res.send('Pls fill the password fild...')
        }

        if (req.body.password1.length < 8 || req.body.password2.length < 8) {
            return res.status(400).send('Password is too short; minimum 8 characters required.');
        }

        if (req.body.password1 != req.body.password2) {
            return res.send('Your password do not match...');
        }

        const resetToken = req.params.token;

        const userU = await users.findOne({
            where: {
                token: resetToken
            }
        });

        if (!userU) {
            return res.status(404).send('This link has expired or is invalid.');
        }

        const token = uuid.v1();

        const updatedUser = await users.update(
            {
                password: bcrypt.hashSync(req.body.password2, 10),
                token: token,
                isActive: 1
            },
            {
                where: {
                    token: req.params.token
                },
            }
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.status(201).send('Your password has been updated...');

    } catch (e) {
        console.log(e);
        return res.status(500).send('Lagata hai sever me error hai...');
    }
});



app.listen(8080, () => console.log('connected...'));