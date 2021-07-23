import { observable, action, makeObservable } from "mobx";
import resolve from "resolve";
import { UpLoader } from "../models";
class ImageStore {
  constructor() {
    makeObservable(this);
  }
  @observable fileName = "";
  @observable file = null;
  @observable isLoading = false;
  @observable serverFile = null;

  @action setFileName(newFileName) {
    this.fileName = newFileName;
  }
  @action setFile(newFile) {
    this.file = newFile;
  }

  @action upLoader() {
    this.isLoading = true;
    this.serverFile=null;
    return new Promise((resolve, reject) => {
      UpLoader.add(this.file, this.fileName)
        .then((serverFile) => {
            this.serverFile=serverFile
          resolve(serverFile);
        })
        .catch((err) => reject(err))
        .finally(() => (this.isLoading = false));
    });
  }
  @action reset() {
    this.isLoading = false;
    this.serverFile = null;
  }
}

export default new ImageStore();
