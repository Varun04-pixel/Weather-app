import express from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('public')
})

app.post('/api/response', async(req, res) => {
    let loc = req.body.loc;
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_Key}&q=${loc}&aqi=no`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loc)
    });
    let data = await response.json();
    res.json(data);
})

app.listen(port, () => {
    console.log('app listenening on http://localhost:3000')
}) 