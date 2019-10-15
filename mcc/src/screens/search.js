import React, {StyleSheet} from 'react';

function ScreenSearch() {
  return (
<!--- Search --->
<div class="row">
  <div class="col-lg-12">

    <div id="search-searchbar"></div>
  </div>
</div>
<ul>
  <div class="row">
    <div class="col-lg-12">

      <div id="search-hits"></div>
    </div>
</ul>


{%- include algolia_search.html -%}
);
}

const styles = StyleSheet.create({
});

export default ScreenSearch;