const express = require('express');
const sha1 = require("sha1");
const utils = require('../utils/index');
const router = express.Router();

router.post('/', async (req, res) => {
    const {image} = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const imageHash = sha1(base64Data);

    await utils.downloadImage(base64Data, imageHash);
    const predict = await utils.runPython(`${imageHash}.png`);
    await res.json({result: predict});
});

module.exports = router;
