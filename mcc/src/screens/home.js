import React, {StyleSheet} from 'react';
import Repo from '../components/repo.js'
import Stream from '../components/stream.js'
import Sidebar from '../components/sidebar.js'

function ScreenHome() {
  return (
<div class="row">
  <div class="col-lg-8">
    <div class="card">
      {%- include repo.html -%}
    </div>
    <div class="card">
      {%- include stream.html -%}
    </div>
  </div>
  <div class="col-lg-4">
      {%- include sidebar.html -%}
  </div>
</div>
);
}

const styles = StyleSheet.create({
});

export default ScreenHome;
