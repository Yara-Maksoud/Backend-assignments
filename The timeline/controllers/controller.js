const data = require("../model/data");

const homePage = (req, res) => {
    res.render('index', data);
};

module.exports = {homePage};