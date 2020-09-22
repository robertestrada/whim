import React from 'react';
import '../styles/categories.css';

const CategoryButton = ({cat, categoryFetch}) => {

  return (
    <button className="category__button" onClick={() => categoryFetch(cat)}>
      <img className="category__image" src={`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-categories/${cat}.png`} alt=""/>
      <div className="category__name">{cat}</div>
    </button>
  );
}

export default CategoryButton;
