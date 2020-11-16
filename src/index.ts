import express from 'express'
import bodyParser from 'body-parser'
import { IRollInfo, RollInfo } from './RollInfo';
import BowlingGame from './BowlingGame';

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.send(`Node and express server is running on port ${PORT}`);
});

app.post('/', (req, res) => {
    /**
     * {
     *  "gameBoard":[
             {"First":2,"Second":6},
             {"First":0,"Second":5},
             {"First":0}
        ]}
     * 
    */
    const json_rollInfos: IRollInfo[] = req.body.gameBoard;

    const rollInfos = json_rollInfos.map(jRoll => {
        const roll: IRollInfo = new RollInfo();
        roll.First = jRoll.First;
        if (jRoll.Second)
            roll.Second = jRoll.First;
        return roll;
    })
    const bowlingGame = new BowlingGame(rollInfos);

    const validation = bowlingGame.Validate()
    if (validation.IsValid == false)
        res.send(validation.ErrorMessage);
    else
        res.send(JSON.stringify(bowlingGame.GetNewScoreBoard()));
});


app.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})
