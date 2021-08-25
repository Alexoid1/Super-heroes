import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter, fetchHeroesSuccess } from '../actions/index';
import './CategoryFilter.css';

const CategoryFilter = ({ changeFilter, fetchHeroesSuccess, onChange }) => {
  const heroesCategories = ['Human',
    'Icthyo Sapien',
    'Ungaran',
    'Cosmic Entity',
    'Cyborg',
    'Xenomorph XX121',
    'Android',
    'Vampire',
    'God / Eternal',
    'Symbiote',
    'Mutant',
    'Atlantean',
    'Alien',
    'Neyaphem',
    'New God',
    'Alpha',
    'Bizarro',
    'Inhuman',
    'Metahuman',
    'Demon',
    'Human / Clone',
    'Human / Radiation',
    'Human-Kree',
    'Dathomirian Zabrak',
    'Human / Cosmic',
    'Human / Altered',
    'Kryptonian',
    'Kakarantharaian',
    'Black Racer',
    'Zen-Whoberian',
    'Strontian',
    'Kaiju',
    'Saiyan',
    'Gorilla',
    'Rodian',
    'Flora Colossus',
    'Human-Vuldarian',
    'Asgardian',
    'Demi-God',
    'Eternal',
    'Gungan',
    'Bolovaxian',
    'Animal',
    'Czarnian',
    'Martian',
    'Spartoi',
    'Luphomoid',
    'Parademon',
    'Yautja',
    'Maiar',
    'Talokite',
    'Korugaran',
    'Zombie',
    'Human-Vulcan',
    'Human-Spartoi',
    'Tamaranean',
    'Half Demon',
    'Dog Demon'];
  const [text, setText] = useState('All');

  const handleTextChange = (e) => {
    const { target: { value } } = e;
    onChange(value);
    setText(value);
    
    changeFilter(value);
  };

  return (
    <div className="filter">
      <select
        value={text}
        onChange={handleTextChange}
        className="selectFilter"
      >
        <option value="All">All</option>
        {
          heroesCategories.map((book) => (
            <option
              key={book}
              value={book}
            >
              {book}
            </option>
          ))
        }
      </select>

    </div>
  );
};

CategoryFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  fetchHeroesSuccess: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeFilter: (value) => dispatch(changeFilter(value)),
  fetchHeroesSuccess: (heroes) => dispatch(fetchHeroesSuccess(heroes)),
});

const mapStateToProps = (state) => ({
  filter: state.heroes.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
