const express = require('express');
const app = express();
const port = 3000;
// const mysql = require('mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('miniapp3', 'root', 'student', {host: 'localhost', dialect: 'mysql'});

const Purchase = sequelize.define('purchase', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    line1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    line2: {
        type: Sequelize.STRING,
        allowNull: false
      },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
      },
    zipCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
    creditCard: {
        type: Sequelize.STRING,
        allowNull: false
    },
    exp: {
        type: Sequelize.STRING,
        allowNull: false
      },
    cvv: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bzipCode: {
        type: Sequelize.STRING,
        allowNull: false
    }   
});

Purchase.sync();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(express.json());

app.post('/', (req, res) => {
    var purchase = req.body;
    Purchase.create(purchase);
    res.send('Purchase Completed!');
})

app.listen(port, () => console.log(`Listening on port ${port}`));
