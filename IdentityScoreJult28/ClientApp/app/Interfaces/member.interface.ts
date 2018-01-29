
export interface Imember {
    particpantId ?: number;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    password?: string;
    phoneNumber?: string;
    city?: string;
    state?: string;
    zip?: string;
    genderIdentity?: string;
    sexualOrientation?: string;
    otherGenderType?: string;
    otherSexualOrientation?: string;
    otherRace?: string;
    race?: string;
    hispanic?: string;
    age?: string;
    date_of_Birth?: Date;
    yearofBirth?: number;
    monthofBirth?: string;
    captcha?: string;
    ageValid: boolean,
    stateValid: boolean,
    cityValid: boolean,
    firstName_Match: boolean,
    lastName_Match: boolean,
    gender_Match: boolean,
    verified: boolean,
    geo_IP: string,
    geo_CountryName: string,
    geo_RegionName: string,
    geo_City: string,
    geo_ZipCode: string,
    geo_lattude: number,
    geo_longitude: number,
    browser: string,
    os: string,
    addrLatitude: number,
    addrLongitude: number,
    latlangMatch: number,
    //Individual Score values
    addressScore: number,
    socialScore: number,
    ageScore: number,
    twoFactorScore: number,
    finalScaoreVal: number,
    registerDate:string
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}
    