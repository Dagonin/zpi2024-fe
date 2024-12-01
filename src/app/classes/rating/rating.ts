export class Rating {
    ratingID: number;
    ratingValue: number;
    ratingOpinion: string;
    employeeID: number;
    visitID: number;

    constructor(
        ratingID: number,
        ratingValue: number,
        ratingOpinion: string,
        employeeID: number,
        visitID: number
    ) {
        this.ratingID = ratingID;
        this.ratingValue = ratingValue;
        this.ratingOpinion = ratingOpinion;
        this.employeeID = employeeID;
        this.visitID = visitID;
    }
}
