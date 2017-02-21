export default class DemoService {

    set url(url) { this._url = url; } 
    get url() { this._url };

    constructor(email, secretKeyrl) {
        this._email = email;
        this._secretkey = secretKey;
        this._url = url;
    }

}