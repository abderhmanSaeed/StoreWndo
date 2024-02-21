export class Constant {
  // local storage keys
  public static order = 'order';
  public static sentTo = 'sentTo';
  public static locale = 'locale';
  public static token = 'WndoToken';
  public static userData = 'userData';
  public static guestToken = 'guestToken';
  public static walletAmount = 'walletAmount';
  public static explorePages = 'explorePages';
  public static isHybridPayment = 'isHybridPayment';
  public static showHybridPayment = 'showHybridPayment';
  public static isNeededMultiplePayment = 'isNeededMultiplePayment';

  // regex
  public static complexPassword = RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );

  //Breakpoint
  public static mobileWidth = 768; //   breakpoint  mobile devices
  public static tabletWidth = 990; //   breakpoint  tablet devices
  public static laptopWidth = 1024;// breakpoint  laptop devices
}
