---
layout: page
title: Sounds
permalink: /docs/sounds/
show_title: false
---

<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">Sounds</span>
    <h1 class="hero__title">Audio <span class="accent">Guides</span></h1>
    <p class="hero__lead">Guides for ambience, localization, sound assets, and audio behavior in Call of Duty mod tools.</p>
  </div>
</section>

<div class="card-grid">
  {% for post in site.docs %}{% if post.section == "sounds" %}
    <a class="card" href="{{ post.url | prepend: site.baseurl }}">
      <span class="card__eyebrow">Sounds</span>
      <h3 class="card__title">{{ post.title }}</h3>
      {% if post.description %}<p class="card__desc">{{ post.description }}</p>{% endif %}
    </a>
  {% endif %}{% endfor %}
</div>
