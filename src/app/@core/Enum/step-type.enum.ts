export enum StepTypeEnum {
    /** 申請表單*/
    NewApplicant = 0,
    /** 開始*/
    Start = 1,
    /** 同意結束*/
    EndAgree = 2,
    /** 駁回結束*/
    EndReject = 3,
    /** 申請人*/
    ApplicantSelf = 4,
    /** 申請人路線*/
    ApplicantRoute = 5,
    /** 申請人部門主管(會簽)*/
    ApplicantDepartment = 6,
    /** 申請人直屬主管(會簽)*/
    ApplicantAllBoss = 7,
    /** 簽核人部門主管(會簽)*/
    LastApproverDepartment = 8,
    /** 指定人(串簽)*/
    SpecificMember = 9,
    /** 指定對象(會簽)*/
    DesignateList = 10,
    /** 指定角色(會簽)*/
    SpecificRole = 11,
    /** 自定人(串簽)*/
    MemberByFunction = 12,
    /** 自定角色(會簽)*/
    RoleByFunction = 13,
    /** 指定部門(指定)*/
    GotoSpecificDepartment = 14,
    /** 指定部門(循序)*/
    RouteSpecificDepartment = 15,
    /** 指定職級主管(指定)*/
    GotoSpecificJobGrade = 16,
    /** 指定職級主管(循序)*/
    RouteSpecificJobGrade = 17,
    /** 指定職稱主管(指定)*/
    GotoSpecificJobTitle = 18,
    /** 指定職稱主管(循序)*/
    RouteSpecificJobTitle = 19,
    /** 核決權限表(指定)*/
    GotoAuthorizationChart = 20,
    /** 核決權限表(循序)*/
    RouteAuthorizationChart = 21,
    /** 決策*/
    Decision = 22,
    /** 加簽(串簽)*/
    AddApprover = 23,
    /** 加簽(會簽)*/
    AddApproverCountersign = 24,
    /** 指定部門層級(循序)*/
    RouteSpecificDeptLevel = 25,
    /**指定部門層級(指定) */
    GotoSpecificDeptLevel = 26,
    /**未成立結束 */
    EndNotEstablished = 27,
    /**作廢結束 */
    EndInvalidate = 28,
    /**結案結束 */
    EndCaseCompleted = 29

}
