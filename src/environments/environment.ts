// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  otpExpiredIn: 180, // 180 seconds eq 3 minutes
  mainRippleColor: '#ff00001c',
  mobileAppIosUrl: 'https://apps.apple.com/eg/app/wndo/id1588238250',
  mobileAppGooglePlayUrl: 'https://play.google.com/store/apps/details?id=com.window.wndo',
  facebookClientId: '2306263352855724',
  googleClientId: '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',
  defaultLanguage: 'ar',
  APIsBaseURL: 'https://wndo.net:5001/api',
  
  // APIsBaseURL: 'https://wndo.net:8001/api',
  firebaseConfig: {
    apiKey: "AIzaSyCVp9ozLoPSUXwclvy7vgqwRRo03jRa6t4",
    authDomain: "wndo-338112.firebaseapp.com",
    projectId: "wndo-338112",
    storageBucket: "wndo-338112.appspot.com",
    messagingSenderId: "105860487212",
    appId: "1:105860487212:web:08eb2a5a3ff06490f0d989",
    measurementId: "G-C2BD0ZEG2S"
  },
  routes: {
    productDetails: 'http://localhost:4200/product/',
    sellerProfile: 'http://localhost:4200/seller/'
  },
  awsS3Config: {
    accessKeyId: 'AKIAQZNMRRW7J665GD4S',
    secretAccessKey:'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',
    region:'eu-west-3',
    // region:'EUWest3',
    bucket: 'wndobucket'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * 
 */

// basener131@klblogs.com P@ssw0rd20
// lobiyo5540@kixotic.com
// P@ssw0rd

//* 37697508-50fd-41cf-b02b-b6978d714902 (Products id with comments)
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
