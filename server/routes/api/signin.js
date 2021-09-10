module.exports = (app, path) => {
    app.get(path, (req, res) => {
        res.send("Users works");    
    })
};