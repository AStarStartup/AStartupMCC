import React from 'react';

const ComponentEstuaryPostComments = (Props) => {
  let disqus_config = function () {
    this.page.url = "{{ site.url }}{{ page.url }}"; /* Replace PAGE_URL with your page's canonical URL variable */
    this.page.identifier = "{{ page.id }}"; /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
  };
  (function () {
    /* DON'T EDIT BELOW THIS LINE */
    var d = document,
      s = d.createElement('script');
    s.src = 'https://{{ site.disqus_shortname }}.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
}

const styles = StyleSheet.create({
});

export default ComponentEstuaryPostComments;