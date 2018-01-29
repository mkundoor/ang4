export interface geopointers
{
    ip?: string;
    country_code?: string;
    country_name?: string;
    region_code?: string;
    region_name?: string;
    city?: string;
    zip_code?: string;
    time_zone?: string;
    //  public float Latitude { get; set; }
    latitude?: any;
    // public float Longitude { get; set; }
    longitude?: any;
    metro_code?: number;
}