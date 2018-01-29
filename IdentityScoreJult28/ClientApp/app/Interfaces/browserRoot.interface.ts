export interface Browser
{
    major?: string;
    name?: string; 
    version?: string;
}

export interface Os
{
    name?: string;
    version?: string; 
}

export interface RootObject
{
    browser?: Browser;
    os?: Os;
}