// ======================================


// ======================================

export class Survey {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
    constructor(surveyId?: number, survey_Name?: string, survey_Active?: boolean, calAddressScore?: boolean, calSocialScore?: boolean, calAgeScore?: boolean, calTwoFactorScore?: boolean, redirectingUrl?: string) {

        this.surveyId = surveyId;
        this.survey_Name = survey_Name;
        this.survey_Active = survey_Active;
        this.calAddressScore = calAddressScore;
        this.calSocialScore = calSocialScore;
        this.calAgeScore = calAgeScore;
        this.calTwoFactorScore = calTwoFactorScore;
        this.redirectingUrl = redirectingUrl;
    }


    public surveyId?: number;
    public survey_Name?: string;
    public survey_Active?: boolean;
    public calAddressScore?: boolean;
    public calSocialScore?: boolean;
    public calAgeScore?: boolean;
    public calTwoFactorScore?: boolean;
    public redirectingUrl?: string;
}