
export type CompanyDetailedView = {
    id: string;
    code: string;
    companyName: string;
    oldComericalName: string | null;
    info: string | null;
    companyType: string;
    namesOfPartners: string | null;
    phoneNumber: string;
    address: string | null;
    commercialRegistrationNo: string;
    violationsAndPenalties: string | null;
    complianceOfficer: string | null;
    imageUrl: string | null;
    applicationFee: number | null;
    companyCapital: number;
    licenceFee: number | null;
    financialGuarantee: number | null;
    notes: string | null;
    licenceRequestStatus: string;
    licenceStatus: string;
    licenceNo: string | null;
    licenseFileAttached: string | null;
    updateDate: string | null;
    dateOfApplication: string | null;
    licenceRequestDate: string | null;
    dateOfPreliminaryApproval: string | null;
    createDate: string;

}