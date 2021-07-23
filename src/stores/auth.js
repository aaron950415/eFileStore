import { observable,action } from "mobx";

export class AuthStore{
    @observable isLogin =false;
    @observable isLoading = false;
    @observable value ={
        username : "",
        password : ""
    }
    @action setIsLogin(isLogin){
        this.isLogin =isLogin;
    }
    @action setUserName(username){
        this.isLogin =username;
    }
    @action setPassword(password){
        this.isLogin =password;
    }
    @action login(isLogin){
        console.log("login wait...")
        this.isLoading = true;
        setTimeout(()=>{
            console.log('login successful');
            this.isLogin = true;
            this.isLoading = false;
        },1000)
    }
    @action register(isLogin){
        console.log("register wait...")
        this.isLoading = true;
        setTimeout(()=>{
            console.log('register successful');
            this.isLogin = true;
            this.isLoading = false;
        },1000)
    }

    @action logout(isLogin){
        console.log("logout successful")
    }
}
