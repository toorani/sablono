import { ErrorMessages } from "./ApplicationMessages";

export interface IValidationResult
{
    IsValid:boolean,
    ErrorMessage :ErrorMessages
}

export class ValidationResult implements IValidationResult{
    private _isValid = true;
    get IsValid() {
        this._isValid = this.ErrorMessage == ErrorMessages.None ? true:false
        return this._isValid;
    }
    ErrorMessage: ErrorMessages ;

    constructor() {
        this.ErrorMessage = ErrorMessages.None;
    }

}