/// <reference types="grecaptcha" />
import { OpaqueToken } from '@angular/core';
export declare const RECAPTCHA_SETTINGS: OpaqueToken;
export interface RecaptchaSettings {
    siteKey?: string;
    theme?: ReCaptchaV2.Theme;
    type?: ReCaptchaV2.Type;
    size?: ReCaptchaV2.Size;
    badge?: ReCaptchaV2.Badge;
}
