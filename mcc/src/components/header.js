import React, {StyleSheet} from './node_modules/react';

function ComponentHeader() {
  return (
    <header>
  <div class="col-lg-12">
    <div class="row">
      <div class="col-lg-8 left">
        <div class="org">
          <div class="org-editor">
            <a href="/">
              <img src="/theme/logo.png" class="org-logo-image" />
            </a>
            <h1>
              <select class="org-editor-selections" name="selected-org">
                <option value="1">Astartup</option>
              </select>
            </h1>
            <div class="oversight-nav" style="vertical-align: bottom;">
              <ul>
                <li><a href="https://github.com/a-startup"><i class="fab fa-github"></i></a></li>
                <li><a href="">Description</a></li>
                <li><a href="">Mission and Vision</a></li>
                <li><a href="">Status</a></li>
              </ul>
            </div>
            <textarea
              class="org-editor-macro">The mission of the A* Startup network and Astartup Live-stream and app is to help you create, learn, and discover with I am You Language and Issue-driven Development. Our vision is to stop Global Warming by teaching everyone in the world how to make Oregon-Coolers with IMUL and IDD.</textarea>
          </div>
          <div class="org-editor">
          </div>
        </div>
      </div>
      <div class="col-lg-4" style="margin-top: 1em;">
        <div class="row">
          <div>
            <div class="astartup-bot">
              <nav>
                <ul class="nav">
                  <li>
                    <a class="nav-link" href="/estuaries">Estuaries</a>
                  </li>
                  <li>
                    <a class="nav-link" href="/discover">Discover</a>
                  </li>
                  <li>
                    <a class="nav-link" href="/jobs">Jobs</a>
                  </li>
                  <li>
                    <a class="nav-link" href="/resources">Resources</a>
                  </li>
                </ul>
              </nav>
              <div class="astartup-bot-search" style="text-align: center;">
                <input type="text" value="What are you looking for?" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  );
}

const styles = StyleSheet.create({
  fooStyle: {
    fontSize: 1
  }
});

export default ComponentHeader;