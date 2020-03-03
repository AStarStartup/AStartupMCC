<div class="card">

---
layout: compress
---
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: " en " }}">
{%- include head.html -%}
<body>
  <div class="container-fluid">
    {%- include header.html -%}
    <div class="col-lg-12">
      {{ content }}
    </div>
    {%- include footer.html -%}
  </div>
  <div hidden id="snipcart" data-api-key="Y2I1NTAyNWYtMTNkMy00ODg0LWE4NDItNTZhYzUxNzJkZTI5NjM3MDI4NTUzNzYyMjQ4NzU0"></div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
    integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  <script src="https://cdn.snipcart.com/themes/v3.0.0-beta.3/default/snipcart.js" defer></script>
</body>
</html>