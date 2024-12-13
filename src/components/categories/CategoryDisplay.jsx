import React from 'react';

import { defaultStyles, compactStyles, featuredStyles } from "./styleCategory";

const styles = {
    default: defaultStyles,
    compact: compactStyles,
    featured: featuredStyles,
};


const Category = ({ category, selectedLocation }) => {
    const style = styles[category.style || 'default'];

    // Filter items available for the selected location
    const availableItems = category.items.filter(item =>
        item.prices && item.prices[selectedLocation] !== undefined
    );

    if (availableItems.length === 0) {
        return null;
    }

    const renderImage = (position) => {
        if (!category.image || category.image.position !== position) return null;

        return (
            <div className={`${style.image.container} ${style.image[position]}`}>
                <img
                    src={category.image.url}
                    alt={category.image.alt}
                    className={position === 'beside-title' ? style.image['beside-title'] : style.image.img}
                />
            </div>
        );
    };

    const renderTitle = () => (
        <div id={`category-${category.id}`} className="flex flex-col items-center scroll-mt-20">
            <div className="flex items-center">
                <h2 className={style.title}>{category.name}</h2>
                {renderImage('beside-title')}
            </div>
            {category.subtitle && (
                <p className={style.subtitle}>{category.subtitle}</p>
            )}
        </div>
    );

    return (
        <div className={style.container}>
            {renderImage('top')}
            {renderTitle()}
            <div className={style.grid}>
                {availableItems.map((item) => (
                    <div key={item.id} className={style.item}>
                        <div className='flex flex-col text-left'>
                            <h3 className={style.itemName}>{item.name}</h3>
                            <p className={style.itemDescription}>{item.description}</p>
                        </div>
                        <p className={style.price}>
                            ${(item.prices[selectedLocation]).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
            {renderImage('bottom')}
        </div>
    );
};

export default Category;