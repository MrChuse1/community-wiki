---
layout: page
title: LUI
permalink: /docs/lui/
show_title: false
---

<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">LUI</span>
    <h1 class="hero__title">Interface <span class="accent">Guides</span></h1>
    <p class="hero__lead">Notes and examples for working with Lua UI elements, layout, anchors, and widget behavior.</p>
  </div>
</section>

<div class="card-grid">
  {% for post in site.docs %}{% if post.section == "lui" %}
    <a class="card" href="{{ post.url | prepend: site.baseurl }}">
      <span class="card__eyebrow">LUI</span>
      <h3 class="card__title">{{ post.title }}</h3>
      {% if post.description %}<p class="card__desc">{{ post.description }}</p>{% endif %}
    </a>
  {% endif %}{% endfor %}
</div>
