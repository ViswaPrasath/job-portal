export interface UserModel {
    name: string,
    password: string,
    DOB: string,
    jobTitle: string,
    gender: string,
    description: string,
    email: string,
    phoneNo: string,
    address: string,
    education : {title:string,institute:string,degree:string,year:string}[],
    skill: {technology: string,percentage: string}[],
    socialLinks: { facebook: string, linkedIn: string, instagram: string },
    cv: string
}