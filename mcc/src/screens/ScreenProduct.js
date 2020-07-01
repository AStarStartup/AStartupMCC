import React, {StyleSheet} from 'react';

function ScreenProduct() {
  return (
<!--- Product --->
<div class="row">
  <div class="products-container col-lg-8">
    {% for product in site.products %}
    {% include product.html %}
    {% endfor %}
  </div>
</div>
);
}

const styles = StyleSheet.create({
});

export default ScreenProduct;