import AV, { User, Query } from "leancloud-storage";;

AV.init({
  appId: "XXzanHhs7rc8Bw0pFTQF4g4Y-MdYXbMMI",
  appKey: "uAoR3gnJHKgwioRznOHsXw7S",
  serverURL: "https://xxzanhhs.api.lncldglobal.com",
});
const Auth = {
  register(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.signUp().then(
        (loginedUser) => resolve(loginedUser),
        (error) => reject(error)
      );
    });
  },
  login(username, password) {
    let user = new User();
    user.setUsername(username);
    user.setPassword(password);
    return new Promise((resolve, reject) => {
      user.logIn(username, password).then(
        (loginUser) => resolve(loginUser),
        (error) => reject(error)
      );
    });
  },
  logout() {
    User.logOut();
  },

  getCurrentUser() {
    return User.current();
  },
};
const UpLoader = {
  add(file, fileName) {
    const item = new AV.Object("Image");
    const avFile = new AV.File( fileName,file);
    item.set("fileName", fileName);
    item.set("owner", AV.User.current());
    item.set("url", avFile);

    return new Promise((resolve, reject) => {
      item.save().then(
        (serverFile) => resolve(serverFile),
        (error) => reject(error)
      );
    });
  },

  find({page=0, limit=10}){
    const query = new AV.Query('Image');
    query.include('owner');
    query.limit(limit);
    query.descending('createdAt')
    query.skip(page*limit);
    query.equalTo('owner',AV.User.current())
    return new Promise((resolve,reject)=>{
      query.find().then(
        results=>resolve(results)
      ).catch(error => reject(error))
    })
  }
};


export { Auth,UpLoader };
