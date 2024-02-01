import { HttpClient } from "@angular/common/http";
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export const createTranslateSharedLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/auth/', suffix: '.json' }
    ]);
};

export const createTranslateExploreLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/auth/', suffix: '.json' },
        { prefix: './assets/i18n/explore/', suffix: '.json' }
    ]);
};

export const createTranslateCheckoutLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/checkout/', suffix: '.json' }
    ]);
};

export const createTranslateProductDetailsLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/auth/', suffix: '.json' },
        { prefix: './assets/i18n/product-details/', suffix: '.json' }
    ]);
};

export const createTranslateSellerLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/auth/', suffix: '.json' },
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/seller/', suffix: '.json' }
    ]);
};

export const createTranslateBuyerProfileLoader = (http: HttpClient) => {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/shared/', suffix: '.json' },
        { prefix: './assets/i18n/buyer-profile/', suffix: '.json' }
    ]);
};
