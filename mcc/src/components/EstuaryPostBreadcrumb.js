import React from 'react';

const ComponentEstuaryPostBreadcrumb = (Props) => {
  return (
    <nav aria-label="breadcrumb" role="navigation">
  <ol class="breadcrumb">
    <li class="breadcrumb-item">
      <a href="/blog">Blog</a>
    </li>
    <li class="breadcrumb-item">
      <a href="/blog/categories">Categories</a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">{{ page.title }}</li>
  </ol>
</nav>
  );
}

const styles = StyleSheet.create({
});

export default ComponentEstuaryPostBreadcrumb;