const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const dataFolderPath = path.join(__dirname, 'textFiles');

if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
}

app.use(bodyParser.json());


app.get('/createTextFile', (req, res) => {
    const currentTimestamp = new Date().toISOString();
    const fileName = `${currentTimestamp.replace(/:/g, '-')}.txt`;
    const filePath = path.join(dataFolderPath, fileName);
    console.log(filePath)
    fs.writeFile(filePath, currentTimestamp, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to create text file.' });
        }

        res.status(200).json({ message: 'Text file created successfully.' });
    });
});

app.get('/getTextFiles', (req, res) => {
    fs.readdir(dataFolderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read text files.' });
        }

        const textFiles = files.filter(file => file.endsWith('.txt'));

        res.status(200).json({ files: textFiles });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
