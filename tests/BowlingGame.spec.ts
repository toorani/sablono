import { expect } from 'chai'
import BowlingGame from '../src/BowlingGame'
import { IRollInfo, RollInfo } from '../src/RollInfo'
import { ScoreStatus } from '../src/ScoreBoard';

describe('get score', () => {

    let rollingInfos: IRollInfo[] = [];
    const addRolling = (first: number, second: number) => {
        const rolling = new RollInfo();
        rolling.First = first;
        rolling.Second = second;
        rollingInfos.push(rolling);
    }

    it('the score should be 8 when (5,3)', () => {
        rollingInfos = [];
        addRolling(5, 3);

        const bowlingGame = new BowlingGame(rollingInfos);
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(8);

        expect(gameScore.FinalScore).equal(8);
        expect(gameScore.Status).equal(ScoreStatus.Done);
    })

    it('the score should be 34 when (5,3) (6,3) (5,4) (6,2)', () => {
        rollingInfos = [];
        addRolling(5, 3);
        addRolling(6, 3);
        addRolling(5, 4);
        addRolling(6, 2);


        const bowlingGame = new BowlingGame(rollingInfos);
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(8);
        expect(gameScore.RollingScores[1].Score).equal(17);
        expect(gameScore.RollingScores[2].Score).equal(26);
        expect(gameScore.RollingScores[3].Score).equal(34);
        
        expect(gameScore.FinalScore).equal(34);
        expect(gameScore.Status).equal(ScoreStatus.Done);
    })

    it('the score should be 28 when there is a Strike (10,0) & (4,5)', () => {
        rollingInfos = [];
        addRolling(10, 0);
        addRolling(5, 4);

        const bowlingGame = new BowlingGame(rollingInfos);
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(19);
        expect(gameScore.RollingScores[0].IsStrike()).equal(true);

        expect(gameScore.RollingScores[1].Score).equal(28);
        
        expect(gameScore.FinalScore).equal(28);
        expect(gameScore.Status).equal(ScoreStatus.Done);
    })
    
    it('the score should be 38 when there is a Spare (6,4) (5,4) (6,4) (3,6)', () => {
        rollingInfos = [];
        addRolling(6, 4);
        addRolling(5, 4);
        addRolling(6, 4);
        addRolling(3, 6);

        const bowlingGame = new BowlingGame(rollingInfos);
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(15);
        expect(gameScore.RollingScores[0].IsSpare()).equal(true);

        expect(gameScore.RollingScores[1].Score).equal(24);
        expect(gameScore.RollingScores[2].Score).equal(37);
        expect(gameScore.RollingScores[3].Score).equal(46);
        
        expect(gameScore.FinalScore).equal(46);
        expect(gameScore.Status).equal(ScoreStatus.Done);
    })

    it(`the score should be 50 when there are Strike and Spare (10,0) (4,5) (6,4) (3,6) `, () => {
        rollingInfos = [];
        addRolling(10, 0);
        addRolling(4, 5);
        addRolling(6, 4);
        addRolling(3, 6);


        const bowlingGame = new BowlingGame(rollingInfos);
        
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(19);
        expect(gameScore.RollingScores[0].IsStrike()).equal(true);

        expect(gameScore.RollingScores[1].Score).equal(28);
        
        expect(gameScore.RollingScores[2].Score).equal(41);
        expect(gameScore.RollingScores[2].IsSpare()).equal(true);

        expect(gameScore.RollingScores[3].Score).equal(50);
        
        expect(gameScore.FinalScore).equal(50);
        expect(gameScore.Status).equal(ScoreStatus.Done);
    })


    it('the score should be 30 when (10,0)(10,0)(10,0)', () => {
        rollingInfos = [];
        addRolling(10,0);
        addRolling(10,0);
        addRolling(10,0);

        const bowlingGame = new BowlingGame(rollingInfos);
        let gameScore = bowlingGame.GetNewScoreBoard();

        expect(gameScore.RollingScores.length).equal(rollingInfos.length);

        expect(gameScore.RollingScores[0].Score).equal(30);
        
        expect(gameScore.FinalScore).equal(30);
        expect(gameScore.Status).equal(ScoreStatus.Waiting);
    })

})

