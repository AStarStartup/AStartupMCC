import React, {StyleSheet} from 'react';

function ComponentSidebar() {
  return (
    <div class="card">
  {%- include qr-login.html -%}
</div>
<div class="card">
  <div class="widget-toolbar">
    <ul>
      <li><a href="">Tools</a></li>
      <li><a href="">Content</a></li>
      <li><a href="">Community</a></li>
    </ul>
  </div>
  <p>An open-source book about how to combat global warming with DIY Oregon-Coolers.</p>
  <div>
    <a href="https://oregoncooler.org">Visit website</a>
    <a href="https://github.com/oregon-cooler">Visit GitHub</a>
  </div>
  {%- include github_follow_button.html -%}
  {%- include twitter_follow_button.html -%}
</div>
  );
}

const styles = StyleSheet.create({
});

export default ComponentSidebar;