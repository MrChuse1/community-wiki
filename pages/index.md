---
layout: home
title: CoD Mods Wiki
permalink: /
show_breadcrumbs: false
hero:
  eyebrow: Community wiki
  title: "Documentation for modding <span class='accent'>Black Ops III</span>."
  lead: Tutorials, tooling, and reference material focused on Black Ops III mod tools, but open to every Call of Duty title the community supports.
  cta:
    - label: Browse Documentation
      url: /docs/
      primary: true
    - label: Join Discord
      url: https://discord.gg/tzzn6zAVBz
---

<div class="card-grid">
  <a class="card" href="{{ site.baseurl }}/docs/sounds/">
    <span class="card__eyebrow">Sounds</span>
    <h3 class="card__title">Audio Guides</h3>
    <p class="card__desc">Ambient rooms, localization, sound assets, and practical setup notes for map audio.</p>
    <div class="card__footer"><span>Ambience &amp; localization</span><span>→</span></div>
  </a>
  <a class="card" href="{{ site.baseurl }}/docs/asset-types/">
    <span class="card__eyebrow">Asset Types</span>
    <h3 class="card__title">Game Asset Guides</h3>
    <p class="card__desc">Destructibles today, with room for weapon attachments and other authored asset families later.</p>
    <div class="card__footer"><span>Asset workflows</span><span>→</span></div>
  </a>
  <a class="card" href="{{ site.baseurl }}/docs/lui/">
    <span class="card__eyebrow">LUI</span>
    <h3 class="card__title">Interface Guides</h3>
    <p class="card__desc">Lua UI positioning, layout rules, and interactive reference material.</p>
    <div class="card__footer"><span>UI &amp; layout</span><span>→</span></div>
  </a>
  <a class="card" href="{{ site.baseurl }}/docs/software/">
    <span class="card__eyebrow">Software</span>
    <h3 class="card__title">Community Tools</h3>
    <p class="card__desc">Apps, plugins, and utilities maintained by the modding community.</p>
    <div class="card__footer"><span>Apps &amp; plugins</span><span>→</span></div>
  </a>
</div>

## About the wiki

Welcome to the main repository for the **CoD Mods Wiki**. Our goal is to provide a single home for technical and general information on modding Call of Duty, with a primary focus on **Call of Duty: Black Ops III** — the only title in the franchise to ship official mod tools — while welcoming contributions for any other CoD title, including those without an official SDK.

> This wiki is **not affiliated** with Activision or the developers. It's maintained by modders, for modders.

## Contributing

Our goal is to build this wiki up with as much information as possible, and your help is highly appreciated. The fastest path:

1. **Fork the repo** on GitHub (new to forks? [GitHub's guide is here](https://docs.github.com/en/get-started/quickstart/fork-a-repo)).
2. **Add your page** under [_docs/](_docs/) — copy an existing one for structure.
3. **Register it** in [_data/toc.yml](_data/toc.yml) so it appears in the sidebar.
4. **Open a pull request** — we'll review, polish, and merge.

If you find that workflow daunting but still want to help, drop your draft (with images and assets) in our Discord or open an issue and we'll handle the rest.

## Credits

The wiki is published with [Jekyll](https://jekyllrb.com/) on a custom in-house theme.
