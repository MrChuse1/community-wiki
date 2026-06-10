---
layout: page
title: Asset Types
permalink: /docs/asset-types/
show_title: false
---

<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">Asset Types</span>
    <h1 class="hero__title">Game Asset <span class="accent">Guides</span></h1>
    <p class="hero__lead">Guides for specific asset families, their setup workflows, and the engine systems they connect to.</p>
  </div>
</section>

<div class="card-grid">
  {% for post in site.docs %}{% if post.asset_type_landing == true %}
    <a class="card" href="{{ post.url | prepend: site.baseurl }}">
      <span class="card__eyebrow">Asset Types</span>
      <h3 class="card__title">{{ post.title }}</h3>
      {% if post.description %}<p class="card__desc">{{ post.description }}</p>{% endif %}
    </a>
  {% endif %}{% endfor %}
</div>
