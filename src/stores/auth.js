import { message } from "antd";
import { observable, action, makeObservable } from "mobx";
import { Auth } from "../models";
import UserStore from "./user";
import HistoryStore from "./history";
import ImageStore from "./image"
class AuthStore {
  constructor() {
    makeObservable(this);
  }
  @observable values = {
    username: "aaron",
    password: "",
  };

  @action setUsername(username) {
    this.values.username = username;
  }
  @action setPassword(password) {
    this.values.password = password;
  }
  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then((user) => {

          UserStore.pullUser();
          resolve(user);
        })
        .catch((err) => {
          UserStore.resetUser();
          message.error("fail to login, please check username and password")
          reject(err);
        });
    });
  }
  @action register() {
    return new Promise((resolve, reject) => {
        Auth.register(this.values.username, this.values.password)
          .then((user) => {
            UserStore.pullUser();
            resolve(user);
          })
          .catch((err) => {
            UserStore.resetUser();
            message.error("fail to register, username already exist")
            reject(err);
          });
      });
  }

  @action logout(isLogin) {
    Auth.logout();
    UserStore.resetUser();
    HistoryStore.reset();
    ImageStore.reset();
  }
}

export default new AuthStore();
