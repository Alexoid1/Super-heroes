import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DotLoader from 'react-spinners/ClipLoader';
import ProgressBar from './ProgressBar';
import MenuHero from './MenuHero';

import './HeroInfo.css';

function HeroInfo({ heroes }) {
  const { category } = useParams();
  const { id } = useParams();

  const index = heroes.findIndex((hero) => hero.id.toString() === id);

  const herou = heroes[index];

  let heroRender;
  if (herou.length === 0) {
    heroRender = <DotLoader />;
  } else {
    heroRender = (
      <>
        <div className="superCont">
          <div className="hero-container">
            <Link className="closeX" to="/">X</Link>
            <h2 className="heroTitle">{herou.name}</h2>
            <div className="powerStats">
              <div className="powerT">
                <h3>Powerstats</h3>
                <p>Intelligence:</p>
                <ProgressBar pts={herou.powerstats.intelligence} />
                <br />
                <p>Strength:</p>
                <ProgressBar pts={herou.powerstats.strength} />
                <br />
                <p>Speed:</p>
                <ProgressBar pts={herou.powerstats.speed} />
                <br />
                <p>Durability:</p>
                <ProgressBar pts={herou.powerstats.durability} />
                <br />
                <p>Power:</p>
                <ProgressBar pts={herou.powerstats.power} />
                <br />
                <p>Combat:</p>
                <ProgressBar pts={herou.powerstats.combat} />
                <br />
              </div>
              <div className="imga">
                <div className="imageCenter">
                  <img className="imgCon" src={herou.images.md} alt="imagemd" />
                </div>
                <div className="apparenceC">
                  <div>
                    <p>
                      Gender:
                      {herou.appearance.gender}
                    </p>
                    <p>
                      Race:
                      {herou.appearance.race}
                    </p>
                    <p>
                      Height:
                      {herou.appearance.height[0]}
                    </p>
                    <p>
                      Weight:
                      {herou.appearance.weight[0]}
                    </p>
                    <p>
                      Eye Color:
                      {herou.appearance.eyeColor}
                    </p>
                    <p>
                      Hair Color:
                      {herou.appearance.hairColor}
                    </p>
                  </div>
                  <div className="mobiledisplay">
                    <p>
                      Full Name:
                      {herou.biography.fullName}
                    </p>
                    <p>
                      Alter Egos:
                      {herou.biography.alterEgos}
                    </p>
                    <p>
                      Place Of Birth:
                      {herou.biography.placeOfBirth}
                    </p>
                    <p>
                      Alignment:
                      {herou.biography.alignment}
                    </p>
                    <p>
                      Occupation:
                      {herou.work.occupation}
                    </p>
                    <p>
                      Publisher:
                      {herou.biography.publisher}
                    </p>
                  </div>
                </div>
                <p>
                  Relatives:
                  {herou.connections.relatives}
                </p>
              </div>
            </div>
            <MenuHero
              preview={index}
              category={category}
              categoryLength={heroes.length}
            />
          </div>
        </div>
      </>
    );
  }
  return heroRender;
}

const mapStateToProps = (state) => ({
  heroes: state.heroes.heroes,
});

export default connect(mapStateToProps)(HeroInfo);
