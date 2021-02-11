import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeText, searchHeroes } from '../actions/index';
import Spinner from './Spinner';
import './SearchBar.css'



const SearchBar = ({  heroes, changeText, searchHeroes }) => {
  const [text, setText] = useState(heroes.text);
  const [arr, setArr] = useState(heroes.heroes);
  const handleTextChange = event => {
    setText(event.target.value);
    changeText(event.target.value)
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
              placeholder="Book Name"
            />
          </div>

          
        </form>
      </div>

      <div className="boo">
        {/* { search.heroes.map(book => (
         
        } */}

      </div>
    </>
);
}

SearchBar.propTypes = {
//   searchHeroes: PropTypes.func.isRequired,
  heroes: PropTypes.arrayOf(PropTypes.object),
};

SearchBar.defaultProps = {
  heroes: [],
};
const mapStateToProps = state => ({
  heroes: state.heroes,
});

const mapDispatchToProps = dispatch => ({ 
    changeText: text => dispatch(changeText(text)),
    searchHeroes: () => dispatch(searchHeroes())
 });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);