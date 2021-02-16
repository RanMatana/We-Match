export default class user {
    constructor(User_ID, Username, Email, Gender, Interested, Photo, Latitude, Longitude, Token, Range, Birth, About) {

        this.User_ID = User_ID;
        this.Username = Username;
        this.Email = Email;
        this.Gender = Gender;
        this.Interested = Interested;
        this, Photo = Photo;
        this.Latitude = Latitude;
        this.Longitude = Longitude;
        this.Token = Token;
        this.Range = Range;
        this.Birth = Birth;
        this.About = About;
    }

    show() {
        return `id=${this.User_ID} name=${this.First_Name} ${this.Last_Name}`;
    }
}