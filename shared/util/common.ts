import {Injectable} from '@angular/core';

@Injectable()
export class Common {

    public getCurrentDateTime() {
        const date = new Date();

        return date.getFullYear().toString() +
            this.pad2(date.getDate()) +
            this.pad2(date.getMonth() + 1) +
            this.pad2(date.getHours()) +
            this.pad2(date.getMinutes()) +
            this.pad2(date.getSeconds());
    }

    private pad2(n) {
        return n < 10 ? '0' + n : n;
    }

    setLoginCookie(name, value, expiration) {
        const now = new Date();
        let time = now.getTime();
        time += expiration;
        now.setTime(time);
        document.cookie =
            '' + name + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
    }

    getCookie(name) {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) { return parts.pop().split(';').shift(); }
    }

    deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // public isValidDate(pText) {
    //     let isValid = false ;
    //     let t = pText.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    //
    //     if (t !== null) {
    //         let y = +t[3], m = +t[1], d = +t[2];
    //         let date = new Date(m - 1, d, y);
    //
    //         isValid = (date.getFullYear() === y && date.getMonth() === m - 1) ;
    //     }
    //
    //     return isValid ;
    // }

    public isValidDate(str) {
        var t = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if(t === null)
            return false;
        var d = +t[2], m = +t[1], y = +t[3];

        // Below should be a more acurate algorithm
        if(m >= 1 && m <= 12 && d >= 1 && d <= 31) {
            return true;
        }

        return false;
    }
}