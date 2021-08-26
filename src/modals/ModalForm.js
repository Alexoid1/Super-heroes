import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  projectStorage,
  projectFirestore,
  timestamp,
  googleAuthProvider,
  facebookAuthProvider,
} from '../service/firebase';
import ProgressBar2 from '../components/ProgressBar2';
import { changeAuth,fetchHeroesSuccess } from '../actions/index';
import './ModalForm.css';
import googlelogo from '../images/googlelogo.png';
import facelogo from '../images/facebook.png';
import socialMediaAuth from '../service/socialMediaAuth';

function ModalForm({ changeAuth, authorizee, fetchHeroesSuccess }) {
  const history = useHistory();
  const [values, setValues] = useState({
    heroname: '',
    alias: '',
    alterEgos: '',
    place: '',
    occupation: '',
    eyeColor: '',
    hairColor: '',
    heightt: '',
    weightt: '',
    gender: '',
    race: '',
    strength: '',
    intelligence: '',
    aligment: 'good',
    groupAffiliation: '',
    relatives: '',
    publisher: '',
    speed: '',
    power: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const imgTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  useEffect(() => {
    setFile(null);
    setUploading(false);
    setValues({
      heroname: '',
      alias: '',
      alterEgos: '',
      place: '',
      occupation: '',
      eyeColor: '',
      hairColor: '',
      heightt: '',
      weightt: '',
      gender: '',
      race: '',
      strength: '',
      intelligence: '',
      aligment: 'good',
      groupAffiliation: '',
      relatives: '',
      publisher: '',
      speed: '',
      power: '',
    });
  }, [url]);

  const changeFileHandler = (e) => {
    const selected = e.target.files[0];

    if (selected && imgTypes.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 50) {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      setUploading(true);

      // Get items from FireStore
      const collectionRef = projectFirestore.collection('images');
      // Add image to storage
      const storageRef = projectStorage.ref(`images/${file.name}`);
      storageRef.put(file).on('state_changed', (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, () => projectStorage.ref('images').child(file.name).getDownloadURL().then((url) => {
        const createdAt = timestamp();
        // add item to firestore
        collectionRef.add({
          name: values.heroname,
          slug: values.heroname,
          powerstats: {
            intelligence: values.intelligence * 1,
            strength: values.strength * 1,
            speed: values.speed * 1,
            durability: values.strength * 1,
            power: values.power * 1,
            combat: values.power * 1,
          },
          appearance: {
            gender: values.gender,
            race: values.race,
            height: [values.heightt],
            weight: [values.weightt],
            eyeColor: values.eyeColor,
            hairColor: values.hairColor,
          },
          biography: {
            fullName: values.heroname,
            alterEgos: values.alterEgos,
            aliases: [values.alias],
            placeOfBirth: values.place,
            firstAppearance: createdAt,
            publisher: values.publisher,
            alignment: values.aligment,
          },
          work: {
            occupation: values.occupation,
            base: '-',
          },
          connections: {
            groupAffiliation: values.groupAffiliation,
            relatives: values.relatives,
          },
          images: {
            xs: url,
            sm: url,
            md: url,
            lg: url,
          },
          createdAt,

        });

        setUrl(url);
        fetchHeroesSuccess([])
        return true;
      }));
    }
  };

  const userStore = (res) => {
    const userRef = projectFirestore.collection('users');
    const createdAt = timestamp();
    userRef.add({
      username: res.bc.displayName,
      email: res.bc.email,
      lastSession: res.metadata.lastSignInTime,
      currentTime: createdAt,
    });
  };

  // Google Auth
  const handleGoogleClick = async (provider) => {
    const res = await socialMediaAuth(provider);
    try {
      if (res.bc.displayName) {
        userStore(res);
        changeAuth();
      } else {
        history.push('/');
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleFacebookClick = async (provider) => {
    const re = await socialMediaAuth(provider);
    try {
      if (re.bc.displayName) {
        userStore(re);
        changeAuth();
      } else {
        history.push('/');
      }
    } catch (error) {
      setError(error);
    }
  };

  let comp;
  if (authorizee) {
    comp = (
      <div>

        <form onSubmit={handleUpload}>
          <div>
            <label htmlFor="heroname" className="labelHero">
              Hero Name:
              <input
                type="text"
                id="heroname"
                name="heroname"
                className="inputHero"
                value={values.heroname}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroalias" className="labelHero">
              Hero Alias:
              <input
                type="text"
                id="heroalias"
                name="alias"
                className="inputHero"
                value={values.alias}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroalter" className="labelHero">
              Hero Alter Ego:
              <input
                type="text"
                id="heroalter"
                name="alterEgos"
                className="inputHero"
                value={values.alterEgos}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroOccupation" className="labelHero">
              Occupation:
              <input
                type="text"
                id="heroOccupation"
                name="occupation"
                className="inputHero"
                value={values.occupation}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroplace" className="labelHero">
              Place of Birth:
              <input
                type="text"
                id="heroplace"
                name="place"
                className="inputHero"
                value={values.place}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroeye" className="labelHero">
              Eye Color:
              <input
                type="text"
                id="heroeye"
                name="eyeColor"
                className="inputHero"
                value={values.eyeColor}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="herohair" className="labelHero">
              Hair Color:
              <input
                type="text"
                id="herohair"
                name="hairColor"
                className="inputHero"
                value={values.hairColor}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroGender" className="labelHero">
              Gender:
              <input
                type="text"
                id="heroGender"
                name="gender"
                className="inputHero"
                value={values.gender}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroRace" className="labelHero">
              Race:
              <input
                type="text"
                id="heroRace"
                name="race"
                className="inputHero"
                value={values.race}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroaligment" className="labelHero">
              Aligment:
              <select className="inputHero select" name="aligment" onChange={handleChange} value={values.aligment}>

                <option key="good" value="good">good</option>
                <option key="bad" value="bad">bad</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="herogroupAffiliation" className="labelHero">
              Group Affiliation:
              <input
                type="text"
                id="herogroupAffiliation"
                name="groupAffiliation"
                className="inputHero"
                value={values.groupAffiliation}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroRelatives" className="labelHero">
              Relatives:
              <input
                type="text"
                id="heroRelatives"
                name="relatives"
                className="inputHero"
                value={values.relatives}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroPublisher" className="labelHero">
              Publisher:
              <input
                type="text"
                id="heroPublisher"
                name="publisher"
                className="inputHero"
                value={values.publisher}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroheight" className="labelHero">
              Height:
              <input
                type="text"
                id="heroheight"
                name="heightt"
                className="inputHero"
                value={values.heightt}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div>
            <label htmlFor="heroWeight" className="labelHero">
              Weight:
              <input
                type="text"
                id="heroWeight"
                name="weightt"
                className="inputHero"
                value={values.weightt}
                onChange={handleChange}
                required="required"
              />
            </label>
          </div>
          <div className="rangeCont">
              <span>Strength:</span>
              <div>
              <label htmlFor="herostrength" className="labelHero rangeCont">
                <span>0</span>
                <input
                  type="range"
                  id="herostrength"
                  name="strength"
                  className="inputHero range"
                  min="0"
                  max="1000"
                  step="1"
                  value={values.strength || '0'}
                  onChange={handleChange}
                  required="required"
                />
                <span>1000</span>
                </label>
              </div>
          </div>
          <div className="rangeCont">
              <span>Intelligence:</span>
              <div>
                <label htmlFor="heroint" className="labelHero">
                  <span>0</span>
                  <input
                    type="range"
                    id="heroint"
                    name="intelligence"
                    className="inputHero range"
                    min="0"
                    max="1000"
                    step="1"
                    value={values.intelligence || '0'}
                    onChange={handleChange}
                    required="required"
                  />
                  <span>1000</span>
                </label>
              </div>
          </div>
          <div className="rangeCont">
              <span>Speed:</span>
              <div>
              <label htmlFor="herospeed" className="labelHero">
                <span>0</span>
                <input
                  type="range"
                  id="herospeed"
                  name="speed"
                  className="inputHero range"
                  min="-1"
                  max="1000"
                  step="1"
                  value={values.speed || '0'}
                  onChange={handleChange}
                  required="required"
                />
                <span>1000</span>
                </label>
              </div>
          </div>
          <div className="rangeCont">

              <span>Power:</span>
              <div>
              <label htmlFor="heropower" className="labelHero">
                <span>0</span>
                <input
                  type="range"
                  id="heropower"
                  name="power"
                  className="inputHero range"
                  min="0"
                  max="1000"
                  step="1"
                  value={values.power || '0'}
                  onChange={handleChange}
                  required="required"
                />
                <span>1000</span>
                </label>
              </div>

          </div>
          <div>
            <input className="selectFIle" type="file" onChange={changeFileHandler} required="required" />
          </div>
          <div className="buttonCont">
            <button className="create" type="submit">Create hero</button>
          </div>
          {error && <div className="error">{error}</div>}

          {uploading && <ProgressBar2 progress={progress} />}
        </form>
      </div>
    );
  } else {
    comp = (
      <div className="loginCont">
        <div className="buttonGoCon">
          <button className="googleButton" type="button" onClick={() => handleGoogleClick(googleAuthProvider)}>
            <img className="logogoo" src={googlelogo} alt="googlelogo" />
          </button>
          <p>Login with Google</p>
        </div>
        <div className="buttonGoCon">
          <button className="googleButton" type="button" onClick={() => handleFacebookClick(facebookAuthProvider)}>
            <img className="logogoo" src={facelogo} alt="facelogo" />
          </button>
          <p>Login with Facebook</p>
        </div>
      </div>
    );
  }
  return comp;
}

ModalForm.propTypes = {
  changeAuth: PropTypes.func.isRequired,
  authorizee: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authorizee: state.heroes.authorize,
});

const mapDispatchToProps = (dispatch) => ({
  changeAuth: () => dispatch(changeAuth()),
  fetchHeroesSuccess:(heroes) => dispatch(fetchHeroesSuccess(heroes)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);
