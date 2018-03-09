import {Injectable} from '@angular/core';

@Injectable()
export class BaseService {
      // ENABLE FOR DEV ENV

       public getBaseURL(): string {
         const apis = localStorage.getItem('app_api');
          // console.log(apis==null)
          if(apis!=null){
            return (JSON.parse(apis)).api_fs;
          }else{
            return "https://dev-api.fusionseven.net/api";
            //return "http://localhost:3225/api";
          }

       }

       BASE_URL = this.getBaseURL();

       LOGIN_URL = this.BASE_URL+"/usermgmt/auth/login";
       ORGANIZARION_BASE_URL = this.BASE_URL+"/usermgmt/organization";
       ORGANIZATIONCONTACT_BASE_URL = this.BASE_URL + '/usermgmt/organizationContact'

       UPDATE_PASSWORD = this.BASE_URL+"/usermgmt/auth/resetPassword/update";

       REQUEST_RESET_CODE = this.BASE_URL+"/usermgmt/auth/resetPassword/request";

       CREATE_EDIT_ORGANIZARION = this.ORGANIZARION_BASE_URL + "/contact";

       GET_ORGANIZATION_BY_ID  = this.ORGANIZARION_BASE_URL + "/contact";

       PARTNER_TYPE = this.BASE_URL+"/usermgmt/partnerType";

       GET_ORGANIZATION_CONTACT_BY_ID = this.ORGANIZATIONCONTACT_BASE_URL;

       GET_ACCESS_TOKEN_URL = this.BASE_URL+"/usermgmt/auth/getAccessToken";

       ADMIN_USERS = this.BASE_URL+"/usermgmt/user";

       CREATE_USER_PASSWORD= this.BASE_URL+"/usermgmt/user/password/activate";

       GET_ADMIN_ROLE = this.BASE_URL+"/usermgmt/role/adminRole";

       CHECK_USER_MAIL = this.BASE_URL+"/usermgmt/auth/checkIsEmailValid";

       FEATURE_LIST_URL = this.BASE_URL+"/usermgmt/feature";

       GET_PEREFERENCE_MENU = this.BASE_URL+"/usermgmt/preferences";

       DATA_COLLECTION_URL = this.BASE_URL+"/v1/datacollection";

       TRANSACTION_SCHEMA = this.BASE_URL+"/usermgmt/org/schema";


    constructor() { }
}
