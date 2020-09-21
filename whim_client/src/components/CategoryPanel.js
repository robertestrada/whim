import React from 'react';
import CategoryButton from './CategoryButton';
import '../styles/categories.css';

const CategoryPanel = ({catShow, categoryFetch, mouseEnter, mouseLeave}) => {

  const categories = ["Clothing", "Outdoor", "Technology"]

  return (
    <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={catShow ? "category-panel pressed" : "category-panel"}>
      {categories.map((cat, cdx) => <CategoryButton key={cdx} cat={cat} categoryFetch={categoryFetch}/>)}
    </div>
  );
}

export default CategoryPanel;
