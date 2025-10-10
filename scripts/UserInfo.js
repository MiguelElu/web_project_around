export default class UserInfo {
  constructor(name, job) {
    this.name = name;
    this.job = job;
  }

  getUserInfo() {
    return [this.name, this.job];
  }

  setUserInfo(name, job, name_selector, job_selector) {
    this.name = name;
    this.job = job;
    name_selector.innerHTML = `${this.name}`;
    job_selector.innerHTML = `${this.job}`;
  }
}
