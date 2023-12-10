const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { Op } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser('QWERTYUIOPLKJHGFDSAZXCVBNM'));

//  RIGISTER API
app.post('/register', (req, res) => {
    const { users } = require('./models');
    var createUser = {}
    try {
        if (req.body.password.length < 8) {
            return res.status(200).send('Password length should be more than 8 characters...');
        }
        createUser = users.create(req.body);
        if (!createUser) {
            return res.status(400).send({ 'error': 'Could not register. Please retry later...' });
        };
        res.status(201).send({ 'success': true });
        console.log(createUser);
    } catch (e) {
        return res.status(200).send(e.message);
    }
    
});

// LOGIN API
app.post('/login', async (req, res) => {
    const { users } = require('./models');
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

        res.cookie('X-Access-Token', token, { maxAge: 7776000000, signed: true, path: '/', httpOnly: true }); // cookies

        return res.status(201).send({ "X-Access-Token": token, });
    } else {
        return res.status(401).send({ 'error': 'username and password is incorrect....' });
    }
});

app.listen(8080, () => console.log('connected...'));