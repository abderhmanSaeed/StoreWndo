import { ReportReasons } from "../enums/report-reason/report-reason";
import { ReportReason } from "../models/report-reason/report-reason";

export const ReportRasonsList: ReportReason[] = [
    {
        id: ReportReasons.Suspicious,
        label: 'shared.report-reasons.suspicious'
    },
    {
        id: ReportReasons.Harassment,
        label: 'shared.report-reasons.harassment'
    },
    {
        id: ReportReasons.Violence,
        label: 'shared.report-reasons.violence'
    },
    {
        id: ReportReasons.AdultContent,
        label: 'shared.report-reasons.adult-content'
    },
    {
        id: ReportReasons.IntellectualProperty,
        label: 'shared.report-reasons.intellectual-property'
    }
]