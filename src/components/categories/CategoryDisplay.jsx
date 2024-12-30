import React from 'react';
import { defaultStyles, compactStyles, featuredStyles } from "./styleCategory";
import { motion } from 'framer-motion';

const styles = {
    default: defaultStyles,
    compact: compactStyles,
    featured: featuredStyles,
};

const Category = ({ category }) => {

    const style = styles[category.style || 'default'];

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
        <motion.div
            id={`category-${category._id}`}
            className="flex flex-col items-center scroll-mt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center">
                <h2 className={style.title}>{category.name}</h2>
                {renderImage('beside-title')}
            </div>
            {category.subtitle && (
                <p className={style.subtitle}>{category.subtitle}</p>
            )}
        </motion.div>
    );

    return (
        <div className={style.container}>
            {renderImage('top')}
            {renderTitle()}
            <div className={style.grid}>
                {category.items.map((item) => (
                    <>
                        <div key={item._id} className={style.item}>
                            <div className='flex flex-col text-left'>
                                <h3 className={style.itemName}>{item.name}</h3>
                                <p className={style.itemDescription}>{item.description}</p>
                            </div>
                            <p className={style.price}>
                                {item.prices > 0 && `$${(item.prices).toFixed(2)}`}
                            </p>
                        </div>
                    </>
                ))}
            </div>
            {renderImage('bottom')}
        </div>
    );
};

export default Category;