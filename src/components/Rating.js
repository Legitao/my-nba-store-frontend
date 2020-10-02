import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, numReviews }) => {
  const createStars = (num, starType) => {
    const stars = [];
    for (let j = 0; j < num; j++) {
      stars.push(
        <span className='rating-star' key={j}>
          <i className={`rating-star ${starType}`}></i>
        </span>
      );
    }
    return stars;
  };

  const numFullStar = Math.floor(value);
  const numHalfStar = value - numFullStar >= 0.5 ? 1 : 0;
  const numEmptyStar = 5 - numFullStar - numHalfStar;

  return (
    <div className='rating'>
      <span className='rating-number'> {value} </span>
      {createStars(numFullStar, 'fas fa-star')}
      {createStars(numHalfStar, 'fas fa-star-half-alt')}
      {createStars(numEmptyStar, 'far fa-star')}
      <span> ({numReviews}) </span>
    </div>
  );
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};

export default Rating;
