import React from 'react';
import AdSense from 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

const ComponentAds = (Props) => {
  return (
    <!-- Google Adsense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    {(adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: "ca-pub-7259836434848202",
      enable_page_level_ads: true
    });}
  );
}

const styles = StyleSheet.create({
});

export default ComponentAds;