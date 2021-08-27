const express = require('express')
/**
 * @param {express.Application} app
 */
module.exports = (app, route) => {
    app.get(route, async (req, res) => {
        res.send('hola')
    });
}