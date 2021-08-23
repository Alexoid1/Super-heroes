import firebase from './firebase';

const socialMediaAuth = (provider) => firebase.auth()
  .signInWithPopup(provider)
  .then((res) => res.user)
  .catch((er) => er);

export default socialMediaAuth;
