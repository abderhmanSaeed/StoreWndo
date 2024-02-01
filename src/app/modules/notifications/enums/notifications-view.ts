export enum NotificationType {
    NewProduct = 1, //approve only show no sr and firebase  done
    PostProduct = 2, //publish -> admin(sr) done
    ApproveProduct = 3, // (approved & rejected) =>user(firbase)    done
    RejectProduct = 4, //(approved & rejected) =>user(firbase)    done
    BuyerOrder = 5, //create order =>admin(sr) , (sellers)firebase   done
    Wallet = 6, //transfer =>admin(sr) ,  decrease =>user(firbase)  done

    DeleteAccount = 7, //userDelete his account => admin (sr)    done
    Live = 8, //when start send firebase to followers user
    ContactReply = 9, //when admin reply user message   done
    LiveStart = 10, //firebase

    LikeProduct = 11, //only show no sr and firebase   done
    LikeComment = 12, //only show no sr and firebase   done
    ProductComment = 13, //only show no sr and firebase  done
    LiveComment = 14, //only show no sr and firebase
    Follow = 15, //only show no sr and firebase          done
    Report = 16, //only show no sr and firebase          done
    Block = 17, //only show no sr and firebase           done
    WishList = 18, //only show no sr and firebase        done
    SellerOrder = 19, //create order =>admin(sr) , (sellers)firebase   done
    LiveEnd = 20,
    WalletSales = 21,
    OrderState = 22,
    AdminContactUs = 23,
    UpdateProductQuantity = 24,
    CompleteData = 25,
    NewSeller =26,
    SellerUpdateData =27,
    NotifyAdmin =28,
    ReturnMoney = 29,
    ApproveMarketer = 30,
    RejectMarketer = 31,
    NewMarketerRequest = 32,
    AcceptMarketerRequest = 33,
    RejectMarketerRequest = 34,
    NewComment = 35
}