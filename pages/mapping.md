---
layout: page
title: Mapping
permalink: /docs/mapping/
show_title: false
---

<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">Mapping</span>
    <h1 class="hero__title">Level Design <span class="accent">Guides</span></h1>
    <p class="hero__lead">Guides for Radiant workflows, playable spaces, visual setup, and map-specific technical setup.</p>
  </div>
</section>

<div class="card-grid">
  {% for post in site.docs %}{% if post.section == "mapping" %}
    <a class="card" href="{{ post.url | prepend: site.baseurl }}">
      <span class="card__eyebrow">Mapping</span>
      <h3 class="card__title">{{ post.title }}</h3>
      {% if post.description %}<p class="card__desc">{{ post.description }}</p>{% endif %}
    </a>
  {% endif %}{% endfor %}
</div>
