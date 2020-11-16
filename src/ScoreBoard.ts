import { IRollInfo } from "./RollInfo";
export enum ScoreStatus {
  None = 1,
  Waiting = 2,
  Done = 3,
  
}
export class ScoreBoard {
  RollingScores: IRollInfo[] = [];
  FinalScore: number = 0;
  Status : ScoreStatus = ScoreStatus.None;
}