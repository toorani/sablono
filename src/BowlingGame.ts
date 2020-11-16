import { IValidationResult, ValidationResult } from './IValidationResult';
import { IRollInfo, RollInfo } from './RollInfo'
import { ScoreBoard, ScoreStatus } from './ScoreBoard';

class ElementQueue {
    Value: IRollInfo = new RollInfo();
    Index: number = -1;
}

export default class BowlingGame {
    private _rollInfos: IRollInfo[];
    constructor(rollInfos: IRollInfo[]) {
        this._rollInfos = rollInfos;
    }

    Validate = (): IValidationResult => {
        let result = new ValidationResult();
        this._rollInfos.forEach(x => {
            result = x.Validate() as ValidationResult;
            if (result.IsValid == false) { 
                return result;
            }
        })
        return result ;
    }

    GetNewScoreBoard = (): ScoreBoard => {
        let scoreBoard: ScoreBoard = new ScoreBoard();
        let len = this._rollInfos.length;
        if (len == 1) {
            scoreBoard.FinalScore = this._rollInfos[0].Score;
            scoreBoard.Status = ScoreStatus.Done;
            scoreBoard.RollingScores = this._rollInfos;
            return scoreBoard;
        }
        let strike_rollings_queue = [];
        for (let index = 0; index < len; index++) {
            const rolling = this._rollInfos[index];

            if (rolling.IsStrike()) {
                strike_rollings_queue.push(index)

                if (strike_rollings_queue.length == 3) {
                    const elementQueue = this.pop(strike_rollings_queue);
                    const strike_rolling = elementQueue.Value;

                    strike_rolling.Score = strike_rolling.First;

                    this.calculateScore(strike_rollings_queue, strike_rolling);
                }
            }
            else {
                if (strike_rollings_queue.length != 0) {
                    let strike_len = strike_rollings_queue.length;
                    for (let idx = 0; idx < strike_len - 1; idx++) {

                        const elementQueue = this.pop(strike_rollings_queue);
                        const strike_rolling = elementQueue.Value;

                        strike_rolling.Score = strike_rolling.First + rolling.First + this._rollInfos[elementQueue.Index - 1].Score;

                        this.calculateScore(strike_rollings_queue, strike_rolling);

                    }
                    const elementQueue = this.pop(strike_rollings_queue);


                    const strike_rolling = elementQueue.Value;
                    const previous_rolling = this._rollInfos[elementQueue.Index - 1];

                    strike_rolling.Score = strike_rolling.First + rolling.Score + (previous_rolling != null ? previous_rolling.Score : 0);
                    strike_rolling.Status = ScoreStatus.Done;
                }

                const previous_rolling = this._rollInfos[index - 1];
                if (previous_rolling) {
                    if (previous_rolling.IsSpare()) {
                        previous_rolling.Score += rolling.First;
                        previous_rolling.Status = ScoreStatus.Done;
                    }
                    rolling.Score += previous_rolling.Score;
                    rolling.Status = ScoreStatus.Done;
                }
            }
        }

        let reverse = [...this._rollInfos].reverse();
        let rolling_with_score = reverse.find(x => x.Status == ScoreStatus.Done);
        if (rolling_with_score) {
            scoreBoard.FinalScore = rolling_with_score.Score;
        }

        scoreBoard.RollingScores = this._rollInfos;
        scoreBoard.Status = reverse[0].Status;

        return scoreBoard;
    }

    private pop(strike_rollings_queue: number[]): ElementQueue {
        let result = new ElementQueue();
        result.Index = strike_rollings_queue.shift() as number;
        result.Value = this._rollInfos[result.Index]
        return result;
    }

    private calculateScore(strike_rollings_queue: number[], strike_rolling: IRollInfo) {
        strike_rollings_queue.forEach(ix => strike_rolling.Score += this._rollInfos[ix].First);
        strike_rolling.Status = ScoreStatus.Done;
    }

} 