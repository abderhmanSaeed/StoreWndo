export const environment = {
  production: false,
  otpExpiredIn: 180, // 180 seconds eq 3 minutes
  mainRippleColor: '#ff00001c',
  mobileAppIosUrl: 'https://apps.apple.com/eg/app/wndo/id1588238250',
  mobileAppGooglePlayUrl: 'https://play.google.com/store/apps/details?id=com.window.wndo',
  facebookClientId: '2306263352855724',
  googleClientId: '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',
  defaultLanguage: 'ar',
  // APIsBaseURL: 'https://wndo.net:8001/api',
  APIsBaseURL: 'https://backend.wndo.com/api',
  // APIsBaseURL: 'https://wndo.net:5001/api',
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
    productDetails: 'http://store.wndo.com/product/',
    sellerProfile: 'http://store.wndo.com/seller/'
  },
  awsS3Config: {
    accessKeyId: 'AKIAQZNMRRW7J665GD4S',
    secretAccessKey:'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',
    region:'eu-west-3',
    // region:'EUWest3',
    bucket: 'wndoprobucket'
  }
};
