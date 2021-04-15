import ScoringSheetEntity from "../model/scoringSheetEntity";

export const saveScores = (scores) => {
    const scoringSheet = new ScoringSheetEntity({})
    const result = scoringSheet.save()

    console.log(result)
}