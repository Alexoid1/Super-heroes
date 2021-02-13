import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeText, searchHeroes } from '../actions/index';
import './SearchBar.css';

const SearchBar = ({ heroes, changeText, searchHeroes }) => {
  const [text, setText] = useState(heroes.text);
  const handleTextChange = event => {
    setText(event.target.value);
    changeText(event.target.value);
    searchHeroes();
  };

  return (
    <>
      <div>
        <form className="formSe">
          <div className="inputSearch">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Hero Name"
            />
          </div>

        </form>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.object),
  changeText: PropTypes.func.isRequired,
  searchHeroes: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  heroes: [],
};
const mapStateToProps = state => ({
  heroes: state.heroes,
});

const mapDispatchToProps = dispatch => ({
  changeText: text => dispatch(changeText(text)),
  searchHeroes: () => dispatch(searchHeroes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
