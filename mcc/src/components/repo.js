import React, {StyleSheet} from 'react';

function ComponentRepo() {
  return (
    <div class="repo-streams">
  <img src="/p/astartup.livestream.logo.png" class="repo-logo" />
  <div class="oversight-nav">
    <ul>
      <li>
        <h3>
          <select class="repo-sections" name="selected-repo">
            <option value="1">Live-stream</option>
          </select>
        </h3>
      </li>
      <li><a href="https://github.com/a-startup/livestream"><i class="fab fa-github"></i></a></li>
      <li><a href="">Description</a></li>
      <li><a href="">Mission and Vision</a></li>
      <li><a href="">Status</a></li>
    </ul>
  </div>
  <div class="repo-headline" name="repo_headline">
    <textarea">An entrepreneur, greentech, and maker live-stream.</textarea>
  </div>
</div>
);
}

const styles = StyleSheet.create({
});

export default ComponentRepo;