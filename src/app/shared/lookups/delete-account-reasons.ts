import { DeleteAccountReasons } from "../enums/delete-account/delete-account";
import { DeleteAccountReason } from "../models/delete-account-reason/delete-account-reason";

export const deleteAccountReasons: DeleteAccountReason[] = [
    {
        id: DeleteAccountReasons.CannotFindWhatINeedOnWndo,
        name: 'buyer-profile.cannot-findw-need-on-wndo'
    },
    {
        id: DeleteAccountReasons.HaveAnotherWndoAccount,
        name: 'buyer-profile.have-another-wndo-account'
    },
    {
        id: DeleteAccountReasons.NegativeExperienceWithSeller,
        name: 'buyer-profile.negative-experience-with-seller'
    },
    {
        id: DeleteAccountReasons.UnhappyWithWndoPolicies,
        name: 'buyer-profile.unhappy-with-wndo-policies'
    },
    {
        id: DeleteAccountReasons.WndoComplicatedOrHardToUse,
        name: 'buyer-profile.wndo-complicated-or-hard-to-use'
    },
    {
        id: DeleteAccountReasons.SomethingElse,
        name: 'buyer-profile.something-else'
    },
]