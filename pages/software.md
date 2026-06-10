---
layout: page
title: Software
permalink: /docs/software/
show_title: false
---

<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">Community tools</span>
    <h1 class="hero__title">Software</h1>
    <p class="hero__lead">Apps, tools, and plugins built by the community for working with Call of Duty assets, files, and game data.</p>
  </div>
</section>

<div class="card-grid">
  {% for post in site.docs %}{% if post.section == "software" %}
    <a class="card" href="{{ post.url | prepend: site.baseurl }}">
      <span class="card__eyebrow">Software</span>
      <h3 class="card__title">{{ post.title }}</h3>
      {% if post.description %}<p class="card__desc">{{ post.description }}</p>{% endif %}
    </a>
  {% endif %}{% endfor %}
</div>
