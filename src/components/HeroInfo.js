import React, { useEffect,useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHero } from '../actions/index';
import ProgressBar from './ProgressBar'
import Spinner from './Spinner';
import MenuHero from './MenuHero';
import './HeroInfo.css'

function HeroInfo({ match, hero, loading, heroes }) {

    const { id } = useParams();
   
    const herou=heroes.heroes.filter(hero=>hero.id===id*1)[0]
      
    let heroRender;
    if(herou.length===0){
        heroRender =<Spinner/>
    }else {
        heroRender=(<>
          <div className="superCont">
            <div className="hero-container">
                <h2 className="heroTitle">{herou.name}</h2>
                <div className="powerStats">
                    <div className="powerT">
                        <h3>Powerstats</h3>
                        <p>Intelligence:</p>
                        <ProgressBar pts={herou.powerstats.intelligence}/><br/>
                        <p>Strength:</p>
                        <ProgressBar pts={herou.powerstats.strength}/><br/>
                        <p>Speed:</p>
                        <ProgressBar pts={herou.powerstats.speed}/><br/>
                        <p>Durability:</p>
                        <ProgressBar pts={herou.powerstats.durability}/><br/>
                        <p>Power:</p>
                        <ProgressBar pts={herou.powerstats.power}/><br/>
                        <p>Combat:</p>
                        <ProgressBar pts={herou.powerstats.combat}/><br/>
                    </div>
                    <div className="imga">
                        <div className="imageCenter">
                            <img className="imgCon" src={herou.images.md}/>
                        </div>
                        <div className="apparenceC">
                            <div>
                                <p>Gender: {herou.appearance.gender}</p>
                                <p>Race: {herou.appearance.race}</p>
                                <p>Height: {herou.appearance.height[1]}</p>
                                <p>Weight: {herou.appearance.weight[1]}</p>
                                <p>Eye Color: {herou.appearance.eyeColor}</p>
                                <p>Hair Color: {herou.appearance.hairColor}</p>
                            </div>
                            <div>
                                <p>Full Name: {herou.biography.fullName}</p>
                                <p>Alter Egos: {herou.biography.alterEgos}</p>
                                <p>Place Of Birth: {herou.biography.placeOfBirth}</p>
                                <p>Alignment: {herou.biography.alignment}</p>
                                <p>Occupation: {herou.work.occupation}</p>
                                <p>Publisher: {herou.biography.publisher}</p>
                            </div>
                        </div>
                        <p>Relatives: {herou.connections.relatives}</p>
                    </div>
                </div>
                <MenuHero preview={id}/>
            </div>
          </div> 
        </>)
    }
    return heroRender
}
  
const mapDispatchToProps = dispatch => ({ 
    fetchHero: (id) => dispatch(fetchHero(id)),
});
  
  const mapStateToProps = state => ({
    hero: state.hero,
    loading: state.hero.loading,
    heroes: state.heroes,
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HeroInfo);