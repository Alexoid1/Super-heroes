import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter, searchByFilter } from '../actions/index';
import './CategoryFilter.css';

const CategoryFilter = ({ changeFilter, searchByFilter }) => {
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
    'Tamaranean'];
  const [text, setText] = useState('All');

  const handleTextChange = e => {
    const { target: { value } } = e;
    setText(value);
    changeFilter(value);
    searchByFilter();
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
          heroesCategories.map(book => (
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
  searchByFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  changeFilter: value => dispatch(changeFilter(value)),
  searchByFilter: () => dispatch(searchByFilter()),
});

const mapStateToProps = state => ({
  filter: state.heroes.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
