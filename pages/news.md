---
layout: page
title: News
permalink: /news/
---

Subscribe with [RSS]({{ site.baseurl }}/feed.xml) to keep up with the latest news.
For site changes, see the [changelog](https://github.com/{{ site.github_user }}/{{ site.github_repo }}/blob/master/CHANGELOG.md) kept with the code base.

{% for post in site.posts limit:10 %}
<article class="post-preview">
  <h2 style="margin-top:0;"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
  <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
  {% if post.badges %}<div style="margin: 0.4rem 0;">{% for badge in post.badges %}<span class="badge badge-{{ badge.type }}">{{ badge.tag }}</span> {% endfor %}</div>{% endif %}
  {{ post.content | split:'<!--more-->' | first }}
  {% if post.content contains '<!--more-->' %}
    <a href="{{ site.baseurl }}{{ post.url }}">read more →</a>
  {% endif %}
</article>
{% endfor %}

Want to see more? See the <a href="{{ site.baseurl }}/archive/">News Archive</a>.
