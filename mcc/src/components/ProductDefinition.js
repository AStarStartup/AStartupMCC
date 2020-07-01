import React, {StyleSheet} from 'react';

const ComponentProductDefinition = (Props) => {
  return (
    <button class="buy-button snipcart-add-item btn-success" data-item-id="{{ product.identifier }}"
  data-item-name="{{ product.name }}" data-item-price="{{ product.price }}" data-item-image="{{ product.image }}"
  data-item-url="https://devlopr.netlify.com{{ page.url }}"
  data-item-description="{{ product.content | remove: '<p>' | remove: '</p>' }}">
  Add to cart (${{ product.price }})
</button>
  );
}

const styles = StyleSheet.create({
});

export default ComponentProductDefinition;