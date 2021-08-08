import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeText } from '../actions/index';
import './SearchBar.css';

const SearchBar = ({ heroes, changeText, onChange }) => {
  const [text, setText] = useState(heroes.text);
  const handleTextChange = (event) => {
    setText(event.target.value);
    onChange(event.target.value);
    changeText(event.target.value);
  };

  return (
    <>
      <div>
        <form className="formSe">
          <div className="inputSearch">
            <Link to="#0" className="underline">
              <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Write a Hero Name"
              />
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

SearchBar.propTypes = {
  heroes: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    heroes: PropTypes.arrayOf(PropTypes.object),
    sHeroes: PropTypes.arrayOf(PropTypes.object),
    error: PropTypes.string.isRequired,
    startIndex: PropTypes.number.isRequired,
    lastIndex: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }),
  changeText: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  heroes: [],
};
const mapStateToProps = (state) => ({
  heroes: state.heroes,
});

const mapDispatchToProps = (dispatch) => ({
  changeText: (text) => dispatch(changeText(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
