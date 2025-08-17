interface UserInfo {
    userId: string;
    preferredUsername: string;
    fullName: string;
    profileUrl?: string;
    pictureUrl?: string;
    email?: string;
    zoneId: string;
    locale: string;
    authorities: Array<string | undefined>;
}
export default UserInfo;
