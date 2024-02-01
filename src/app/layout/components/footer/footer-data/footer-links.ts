import { faTwitter, faYoutube, faFacebookSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';

export const linksList1 = [
    {
        url: 'https://wndo.com/about-us/',
        title: 'about-us'
    },
    // {
    //     url: '.........',
    //     title: 'help-support'
    // },
    // {
    //     url: '.........',
    //     title: 'careers'
    // },
    // {
    //     url: '.........',
    //     title: 'refund-cancellation'
    // },
]


export const linksList2 = [
    {
        url: 'https://wndo.com/terms-and-conditions/',
        title: 'terms-conditions'
    },
    {
        url: 'https://wndo.com/privacy-policy/',
        title: 'privacy-policy'
    },
    // {
    //     url: '.........',
    //     title: 'cookie-policy'
    // },
    // {
    //     url: '.........',
    //     title: 'offer-terms'
    // },
    // {
    //     url: '.........',
    //     title: 'sell-with-us'
    // },
    // {
    //     url: '.........',
    //     title: 'infringement'
    // },
    // {
    //     url: '.........',
    //     title: 'security'
    // },
]

export const appsList = [
    {
        url: environment.mobileAppGooglePlayUrl,
        imagePath: 'assets/media/layout/footer/google-play.svg',
        imageAlt: 'Google Play'
    },
    {
        url: environment.mobileAppIosUrl,
        imagePath: 'assets/media/layout/footer/appstore.svg',
        imageAlt: 'App Store'
    }
]


export const paymentsList = [
    {
        imagePath: 'assets/media/layout/footer/pay-1.svg',
        imageAlt: 'Google Play'
    },
    {
        imagePath: 'assets/media/layout/footer/pay-2.svg',
        imageAlt: 'Google Play'
    },
    {
        imagePath: 'assets/media/layout/footer/pay-3.svg',
        imageAlt: 'Google Play'
    },
]


export const  socilList: any[] = [
    {
      icon: faYoutube,
      url: 'https://youtube.com/@WndoApp'
    },
    {
      icon: faFacebookSquare,
      url: 'https://m.facebook.com/WndoApp/?mibextid=LQQJ4d'
    },
    {
      icon: faTwitter,
      url: 'https://twitter.com/wndo_app?s=11&t=cqO0zK5aEhf5wR4R4c-1mQ'
    },
    {
      icon: faInstagram,
      url: 'https://instagram.com/wndo.app?igshid=MWI4MTIyMDE='
    },
]