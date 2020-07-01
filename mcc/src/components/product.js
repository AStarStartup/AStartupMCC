import React from 'react';

const ComponentProject = (Props) => {
  return (
    <div class="blog-post card product">
      <img src="{{ Props.Product.image }}" alt="{{ product.name }} product image" class="product__image card-img-top">
      <div class="product_information">
        <h2 class="product_title">{{ product.name }}</h2>
        <p class="product_description">{ Props.product.content | remove: '<p>' | remove: '</p>' }</p>
        <ProductDefinition />
      </div>
    </div>
  );
}

export default ComponentProject;
