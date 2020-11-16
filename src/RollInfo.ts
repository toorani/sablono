import { ErrorMessages } from "./ApplicationMessages";
import { IValidationResult, ValidationResult } from "./IValidationResult";
import { ScoreStatus } from "./ScoreBoard";

export interface IRollInfo {
    First: number
    Second: number;
    Score: number;
    IsSpare(): boolean;
    IsStrike(): boolean;
    Validate(): IValidationResult
    Status: ScoreStatus;
}

export class RollInfo implements IRollInfo {
    private _status: ScoreStatus = ScoreStatus.None;
    private _score: number = 0;
    First: number = 0;
    Second: number = 0;

    get Status() {
        if (this._status == ScoreStatus.None && (this.IsSpare() || this.IsStrike()))
            this._status = ScoreStatus.Waiting;
        return this._status;
    }
    set Status(status: ScoreStatus) {
        this._status = status;
    }
    get Score() {
        if (this._score == 0)
            this._score = this.First + this.Second;
        return this._score;
    }
    set Score(score: number) {
        this._score = score;
    }
    IsSpare = () => this.First !== 10 && this.First + this.Second == 10;
    IsStrike = (): boolean => this.First === 10;

    Validate(): IValidationResult {
        let result = new ValidationResult();
        if (this.First < 0 || (this.Second !== undefined && this.Second < 0)) {
            result.ErrorMessage = ErrorMessages.SmallerThanZero;
            return result;
        }

        if (this.First + (this.Second !== undefined ? this.Second : 0) > 10) {
            result.ErrorMessage = ErrorMessages.TotalBiggerThanTen;
            return result;
        }

        return result;
    }

}

