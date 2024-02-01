import { environment } from "src/environments/environment";

export class APIs {

    // Base URL
    public static APIsBaseURL = environment.APIsBaseURL;



    // lookups 
    public static getCountriesCode = '/app/general/country-phone-codes';

    // Auth APIs 
    public static register = '/app/register';
    public static login = '/app/register/login';
    public static logout = '/app/register/logout';
    public static guestLogin = '/app/register/guest-login';
    public static verifyCode = '/app/register/verify-code';
    public static refreshToken = '/app/register/refresh-token';
    public static externalLogin = '/app/register/external-login';
    public static resetPassword = '/app/register/reset-password';
    public static forgetPassword = '/app/register/forget-password';
    public static reSendNewCode = '/app/register/re-send-new-code';
    public static verifyCodeForForgetPassword = '/app/register/verify-code-for-forget-password';


    
    // Sections APIs 
    public static getSections = '/app/section/sections-for-web';
    public static getSectionsWithCategories = '/app/section/sections-with-categories';



    // Buyer APIs 
    public static getGridPreview = '/app/buyer/grid-preview';
    public static getRecentSearch = '/app/buyer/recent-search';
    public static getSameProducts = '/app/buyer/same-products';
    public static buyerFollowers = '/app/buyer/buyer-followers';
    public static reportForUser = '/app/buyer/report-for-user';
    public static buyerFollowees = '/app/buyer/buyer-followees';
    public static getSellerProfile = '/app/buyer/seller-profile';
    public static getProductDetails = '/app/buyer/product-details';
    public static getMyWishList = '/app/buyer/my-wish-list-for-web';
    public static getRecentlyViewed = '/app/buyer/recently-viewed';
    public static addUpdateLike = '/app/buyer/p-add-or-update-like';
    public static productPage = '/app/buyer/product-details-for-web';
    public static recentSearchText = '/app/buyer/recent-search-text';
    public static clearRecentSearch = '/app/buyer/clear-recent-search';
    public static getSuggestedSellers = '/app/buyer/suggested-sellers';
    public static addUpdateFollow = '/app/buyer/u-add-or-update-follow';
    public static filteredDataForWeb = '/app/buyer/filtered-data-for-web';
    public static searchAutoComplete = '/app/buyer/auto-complete-for-web';
    public static getExploreProducts = '/app/buyer/explore-products-for-web';
    public static addUpdateWishList = '/app/buyer/p-add-or-update-wish-list';
    public static filteredSellersForWeb = '/app/buyer/filtered-sellers-for-web';
    public static wholikeBuyerComments = '/app/buyer/who-like-buyer-comments';
    public static muteUnMuteFollowingUsers = '/app/buyer/mute-un-mute-following-users';
    
    public static getSizesColorsOfProducts = '/app/buyer/product-color-and-sizes';
    public static filteredProductsForWeb = '/app/buyer/filtered-products-for-web';



    // Cart
    public static deleteCart = '/app/cart';
    public static addToCart = '/app/cart/to-cart';
    public static updateQuantity = '/app/cart/cart';
    public static editCart = '/app/cart/cart-for-web';
    public static getUserCart = '/app/cart/user-cart';
    public static getShippingFees = '/app/cart/shipping-fees';
    public static getCartItemsCount = '/app/cart/cart-items-count';


    // Comment 
    public static editComment = '/app/comment';
    public static deleteComment = '/app/comment';
    public static editReply = '/app/comment/reply';
    public static deleteReply = '/app/comment/reply';
    public static addComment = '/app/buyer/p-add-comment';
    public static addReply = '/app/buyer/c-add-comment-reply';
    public static getProductComments = '/app/buyer/product-comments';
    public static updateCommentLike = '/app/buyer/c-add-or-update-comment-like';

    // Profile 
    public static getBuyerProfile = '/app/my-profile';
    public static updateProfile = '/app/my-profile/edit';
    public static getUserNamePhone = '/app/my-profile/user-name-and-phone';

    
    // Addreses 
    public static addAddress = '/app/address';
    public static getAddresses = '/app/address';



    // cities 
    public static getCities = '/app/city/cities';
    public static getDistrictsAndZones = '/app/city/districts-and-zones';


    // profile 
    public static editProfile = '/app/my-profile/edit';



    // Account Setting 
    public static accountSettings = '/app/account-setting';
    public static editaccountSettings = '/app/account-setting/edit';
    public static checkPassword = '/app/account-setting/check-password';
    public static confirmDeleteAccount = '/app/account-setting/confirm-delete';
    public static sendOnTimePassword = '/app/account-setting/send-on-time-password'; // Send otp for delete account
    public static sendVerifPhoneCode = '/app/account-setting/send-verify-phone-code';
    public static sendVerifyEmailCode = '/app/account-setting/send-verify-email-code';
    public static confirmVerifPhoneCode = '/app/account-setting/confirm-verify-phone-code';
    public static confirmVerifyEmailCode = '/app/account-setting/confirm-verify-email-code';
    public static setDefaultPaymentMethod = '/app/account-setting/set-default-payment-method';

    
    // Voucher
    public static userVouchers = '/app/voucher/user-vouchers';
    public static validateVoucher = '/app/voucher/validate-vouchers';

    
    // Order 
    public static order = '/app/order';
    public static trackOrder = '/app/order/track-order';
    public static cancelOrder = '/app/order/cancel-order';
    public static refundOrder = '/app/order/refund-order';
    public static orderDetails = '/app/order/order-details';
    public static refundOrderItem = '/app/order/refund-order-item';
    public static cancelOrderItem = '/app/order/cancel-order-item';
    public static ordersHistory = '/app/order/buyer-web-orders-history';
    public static orderStatistics = '/app/order/buyer-order-statistics';
    


    // Ads 
    public static getAdsBanner = '/app/ads-banner/ads-banner';
    public static getAdsVideo = '/app/ads-video/ads-video';


    // Category
    public static getCategories = '/app/category/categories';


    // Seller
    public static getSellers = '/app/seller/sellers';


    // Credit Card
    public static getCreditCard = '/app/credit-card';


    // Notifications
    public static getNotifications = '/app/app-notification';
    public static clearAllNotifications = '/app/app-notification/all';


    // Wallet 
    public static userWalletBalance = '/app/wallet/user-wallet-balance';
    public static topupYourWallet = '/app/wallet/pay-tab-details-for-top-up-wallet';
    public static userWalletBalancType = '/app/wallet/user-wallet-balance-and-type';
    public static codeTransferAmountToUser = '/app/wallet/code-for-transfer-amount-to-user';
    public static confirmTransferAmountToUser = '/app/wallet/confirm-transfer-amount-to-user';
    public static walletTransactionsByMonth = '/app/wallet/user-wallet-transactions-by-month';


    // Review
    public static review = '/app/review';
    public static getProductReviews = '/app/review/product-reviews'
    public static getStatisticsReviews = '/app/review/review-statistics'



    // Product
    public static sendSellerRequest = '/app/product/send-seller-request';

}