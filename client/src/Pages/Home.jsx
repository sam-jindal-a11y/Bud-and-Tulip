import React from 'react';

import Carousel from '../Components/Carousel';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Carousel Section */}
      <section className="mb-12">
      
        <Carousel />
      </section>
      {/* New Arrivals Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT763ir31.jpg"
            name="Rabbit Suit"
            price="2000.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT762ir21.jpg"
            name="Manushi Suit"
            price="2500.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT761ir11.jpg"
            name="Jhilmil Suit"
            price="3000.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT760ir01.jpg"
            name="Lavanya Suit"
            price="3500.00"
          />
        </div>
      </section>
      {/* Best Sellers Section */}
      <section  className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-12">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT758iq81.jpg"
            name="Heena Sharara Suit"
            price="4000.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT757iq71.jpg"
            name="Falguni Suit"
            price="4500.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT756iq61.jpg"
            name="Ira Suit"
            price="5000.00"
          />
          <ProductCard
            image="https://www.budandtulips.com/Content/Pro_Images/BT755iq51.jpg"
            name="Apple Pear Shirt"
            price="5500.00"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
