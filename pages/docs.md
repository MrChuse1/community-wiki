---
layout: page
title: Documentation
permalink: /docs/
hero:
  eyebrow: Knowledge base
  title: Documentation
  lead: Browse every guide on the wiki, grouped by topic.
show_title: false
---

{% if page.hero %}
<section class="hero">
  <div class="hero__inner">
    <span class="hero__eyebrow">{{ page.hero.eyebrow }}</span>
    <h1 class="hero__title">{{ page.hero.title }}</h1>
    <p class="hero__lead">{{ page.hero.lead }}</p>
  </div>
</section>
{% endif %}

{% for section in site.data.toc %}
{% if section.url contains 'docs/' %}
<section style="margin-bottom: 2rem;">
  <h2 style="margin-top: 1.5rem;">{{ section.title }}</h2>
  <div class="card-grid">
    {% for entry in section.links %}
      <a class="card" href="{{ site.baseurl }}/{{ entry.url }}">
        <span class="card__eyebrow">{{ section.title }}</span>
        <h3 class="card__title">{{ entry.title }}</h3>
        {% if entry.description %}<p class="card__desc">{{ entry.description }}</p>{% endif %}
        {% if entry.children %}<div class="card__footer"><span>{{ entry.children | size }} sub-pages</span><span>→</span></div>{% endif %}
      </a>
    {% endfor %}
  </div>
</section>
{% endif %}
{% endfor %}
