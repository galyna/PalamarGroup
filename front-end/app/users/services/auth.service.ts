export class AuthService{

    static $inject = ['$http', '$window', '$rootScope'];
    static tokenKey = 'Authorization';
    static loginUrl = '/api/authenticate';
    
    constructor(private $http, private $window, private $rootScope){

    }

    saveToken(token) {
        this.$window.localStorage[AuthService.tokenKey] = token;
    }

    getToken() {
        return this.$window.localStorage[AuthService.tokenKey];
    }

    setTokenHeader(token){
        this.$http.defaults.headers.common[AuthService.tokenKey] = `Bearer ${token}`;
    }

    logout() {
        this.$window.localStorage.removeItem(AuthService.tokenKey);
        delete this.$http.defaults.headers.common[AuthService.tokenKey];
        this.$rootScope.user = null;
    }

    isLoggedIn() {
        var token = this.getToken();
        var payload;

        if(token){
            payload = this.parseToken(token);
            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    parseToken(token: string){
        if(!token) return null;
        let payload = token.split('.')[1];
        payload = this.$window.atob(payload);
        return JSON.parse(payload);
    }

    register(user) {
        return this.$http.post('/api/register', user).then(function(data){
            this.saveToken(data.token);
        });
    };

    setUserInfo(token?: string){
        token = token || this.getToken();
        if(!token) return;
        
        this.setTokenHeader(token);
        this.saveToken(token);
        this.$rootScope.user = this.parseToken(token);
    }
    
    getUserInfo(){
        return this.$rootScope.user;
    }
    
    login(user:{email: string, password: string}) {
        return this.$http.post(AuthService.loginUrl, user).then((res) => {
            return this.setUserInfo(res.data.token);
        });
    };
}

export let AuthServiceName = "authService";