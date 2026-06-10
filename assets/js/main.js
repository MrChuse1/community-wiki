---
exclude_in_search: true
layout: null
---
/* CoD Mods Wiki — theme JS (vanilla, no dependencies) */
(function () {
  'use strict';

  var SEARCH_URL = "{{ site.baseurl }}/search/";

  // -------- Search redirect (any input.js-search) --------
  document.addEventListener('keypress', function (e) {
    if (e.key !== 'Enter') return;
    var t = e.target;
    if (!(t && t.classList && t.classList.contains('js-search'))) return;
    e.preventDefault();
    var q = t.value || '';
    window.location.href = SEARCH_URL + '?q=' + encodeURIComponent(q);
  });

  // -------- Mobile sidebar toggle --------
  var menuBtn = document.querySelector('.menu-toggle');
  var sidebar = document.querySelector('.sidebar');
  var overlay = document.querySelector('.sidebar-overlay');
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
  }
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('visible');
    });
  }
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // -------- Hero + breadcrumb integration fallback --------
  var main = document.querySelector('.main');
  if (main) {
    var hasBreadcrumbs = !!main.querySelector('nav[aria-label="breadcrumb"]');
    var content = main.querySelector('.content');
    var hasLeadingHero = !!(content && content.firstElementChild && content.firstElementChild.classList && content.firstElementChild.classList.contains('hero'));
    if (hasBreadcrumbs && hasLeadingHero) {
      main.classList.add('main--hero-with-crumbs');
    }
  }

  // -------- Mobile TOC drawer toggle --------
  var tocToggle = document.querySelector('.toc-toggle');
  var tocRail = document.querySelector('.toc-rail');
  var tocOverlay = document.querySelector('.toc-overlay');
  function closeToc() {
    if (tocRail) tocRail.classList.remove('open');
    if (tocOverlay) tocOverlay.classList.remove('visible');
    if (tocToggle) tocToggle.setAttribute('aria-expanded', 'false');
  }
  if (tocToggle && tocRail) {
    tocToggle.addEventListener('click', function () {
      var isOpen = tocRail.classList.toggle('open');
      if (tocOverlay) tocOverlay.classList.toggle('visible', isOpen);
      tocToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }
  if (tocOverlay) tocOverlay.addEventListener('click', closeToc);
  window.addEventListener('resize', function () {
    if (window.innerWidth > 1200) closeToc();
  });

  // -------- Header link "active" highlighting --------
  var path = window.location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.nav a, .nav-tree a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    var hp = href.replace(/\/+$/, '');
    if (hp && hp !== '' && (path === hp || (hp !== '{{ site.baseurl }}' && path.indexOf(hp) === 0))) {
      a.classList.add('active');
    }
  });

  // -------- Permalink anchors on headings --------
  ['h2', 'h3', 'h4'].forEach(function (tag) {
    document.querySelectorAll('.content ' + tag).forEach(function (h) {
      if (!h.id) return;
      if (h.querySelector('.headerlink')) return;
      var a = document.createElement('a');
      a.className = 'headerlink';
      a.href = '#' + h.id;
      a.title = 'Permanent link';
      a.textContent = '¶';
      h.appendChild(a);
    });
  });

  // -------- Build right-rail TOC from headings --------
  var tocRoot = document.getElementById('TableOfContents');
  if (tocRoot) {
    var headings = document.querySelectorAll('.content h2, .content h3');
    if (headings.length === 0) {
      var rail = document.querySelector('.toc-rail .toc-title');
      if (rail) rail.style.display = 'none';
    } else {
      var rootUl = document.createElement('ul');
      var currentH2Ul = null;
      headings.forEach(function (h) {
        if (!h.id) {
          h.id = h.textContent.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        }
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent.replace(/¶/g, '').trim();
        a.dataset.target = h.id;
        li.appendChild(a);
        if (h.tagName === 'H2') {
          rootUl.appendChild(li);
          currentH2Ul = null;
        } else {
          if (!currentH2Ul) {
            currentH2Ul = document.createElement('ul');
            var lastLi = rootUl.lastElementChild;
            if (lastLi) lastLi.appendChild(currentH2Ul);
            else rootUl.appendChild(currentH2Ul);
          }
          currentH2Ul.appendChild(li);
        }
      });
      tocRoot.innerHTML = '';
      tocRoot.appendChild(rootUl);

      tocRoot.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          if (window.innerWidth <= 1200) closeToc();
        });
      });

      // Scrollspy
      var links = tocRoot.querySelectorAll('a[data-target]');
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = tocRoot.querySelector('a[data-target="' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });
      headings.forEach(function (h) { observer.observe(h); });
    }
  }

  // -------- Code blocks: line numbers + copy button --------
  function countCodeLines(codeText) {
    if (!codeText) return 1;
    var normalized = codeText.replace(/\r\n/g, '\n');
    var lines = normalized.split('\n');
    if (lines.length > 1 && lines[lines.length - 1] === '') lines.pop();
    return Math.max(lines.length, 1);
  }

  function getCodeText(pre) {
    var code = pre.querySelector('code');
    return (code ? code.textContent : pre.textContent || '').replace(/\u00a0/g, ' ');
  }

  document.querySelectorAll('.content pre').forEach(function (pre) {
    if (pre.dataset.enhanced === 'true') return;
    pre.dataset.enhanced = 'true';

    var text = getCodeText(pre);
    var lineCount = countCodeLines(text);

    var block = document.createElement('div');
    block.className = 'code-block';

    var toolbar = document.createElement('div');
    toolbar.className = 'code-block__toolbar';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.textContent = 'Copy';
    toolbar.appendChild(btn);

    var inner = document.createElement('div');
    inner.className = 'code-block__inner';

    var gutter = document.createElement('div');
    gutter.className = 'code-gutter';
    gutter.setAttribute('aria-hidden', 'true');
    var nums = [];
    for (var i = 1; i <= lineCount; i++) nums.push('<span>' + i + '</span>');
    gutter.innerHTML = nums.join('');

    pre.parentNode.insertBefore(block, pre);
    block.appendChild(toolbar);
    block.appendChild(inner);
    inner.appendChild(gutter);
    inner.appendChild(pre);

    btn.addEventListener('click', function () {
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied';
        window.setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
      }).catch(function () {
        btn.textContent = 'Failed';
        window.setTimeout(function () { btn.textContent = 'Copy'; }, 1200);
      });
    });
  });

  // -------- LUI positioning demo --------
  var luiDemoPresets = {
    1: {
      xMode: 'left', xLeft: 12, xRight: 48,
      yMode: 'center', yTop: -45, yBottom: 45,
      note: 'Left anchored: offsets are measured from the parent left edge.'
    },
    2: {
      xMode: 'right', xLeft: -60, xRight: -30,
      yMode: 'center', yTop: -45, yBottom: 45,
      note: 'Right anchored: negative offsets pull the child left from the parent right edge.'
    },
    3: {
      xMode: 'center', xLeft: -15, xRight: 15,
      yMode: 'center', yTop: -45, yBottom: 45,
      note: 'Center anchored: matching offsets on either side keep the child centered.'
    },
    4: {
      xMode: 'double', xLeft: 0, xRight: 0,
      yMode: 'double', yTop: 0, yBottom: 0,
      note: 'Double anchored: each edge follows the matching parent edge.'
    },
    5: {
      xMode: 'double', xLeft: 2, xRight: -2,
      yMode: 'double', yTop: 2, yBottom: -2,
      note: 'Double anchored with margins: positive start offsets and negative end offsets inset the child.'
    },
    6: {
      xMode: 'center', xLeft: -20, xRight: 10,
      yMode: 'center', yTop: -45, yBottom: 45,
      note: 'Center anchored with uneven offsets: the child is 5 units left of center.'
    }
  };

  function luiAnchorConfig(mode, firstAnchor, secondAnchor) {
    var customAnchors = [
      luiClamp(luiNumber(firstAnchor, 0), 0, 1),
      luiClamp(luiNumber(secondAnchor, 1), 0, 1)
    ];
    if (mode === 'custom') {
      return {
        anchors: customAnchors,
        args: [luiFormat(customAnchors[0]), luiFormat(customAnchors[1])]
      };
    }
    if (mode === 'right' || mode === 'bottom') return { anchors: [1, 1], args: ['false', 'true'] };
    if (mode === 'center') return { anchors: [0.5, 0.5], args: ['false', 'false'] };
    if (mode === 'double') return { anchors: [0, 1], args: ['true', 'true'] };
    return { anchors: [0, 0], args: ['true', 'false'] };
  }

  function luiNumber(value, fallback) {
    var parsed = parseFloat(value);
    return isFinite(parsed) ? parsed : fallback;
  }

  function luiClamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function luiFormat(value) {
    var rounded = Math.round(value * 100) / 100;
    return String(rounded).replace(/\.00$/, '');
  }

  function luiComputeAxis(parentStart, parentSize, mode, firstOffset, secondOffset, firstAnchor, secondAnchor) {
    var config = luiAnchorConfig(mode, firstAnchor, secondAnchor);
    var start = parentStart + (parentSize * config.anchors[0]) + firstOffset;
    var end = parentStart + (parentSize * config.anchors[1]) + secondOffset;
    return {
      start: start,
      end: end,
      size: end - start,
      anchors: config.anchors,
      args: config.args
    };
  }

  function luiSetMetric(demo, name, value) {
    var el = demo.querySelector('[data-lui-metric="' + name + '"]');
    if (el) el.textContent = typeof value === 'number' ? luiFormat(value) : value;
  }

  function luiControl(demo, name) {
    return demo.querySelector('[data-lui-control="' + name + '"]');
  }

  function luiSetInput(demo, name, value) {
    var input = luiControl(demo, name);
    if (input) input.value = value;
  }

  function luiSetAnchorInputs(demo, axis, anchors, disabled) {
    var first = luiControl(demo, axis + '-anchor-a');
    var second = luiControl(demo, axis + '-anchor-b');
    if (first) {
      first.value = luiFormat(anchors[0]);
      first.disabled = !!disabled;
    }
    if (second) {
      second.value = luiFormat(anchors[1]);
      second.disabled = !!disabled;
    }
  }

  function luiSetMode(demo, axis, mode) {
    demo.querySelectorAll('[data-lui-axis="' + axis + '"] [data-lui-mode]').forEach(function (button) {
      var active = button.getAttribute('data-lui-mode') === mode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (mode !== 'custom') {
      luiSetAnchorInputs(demo, axis, luiAnchorConfig(mode).anchors, true);
    } else {
      var first = luiControl(demo, axis + '-anchor-a');
      var second = luiControl(demo, axis + '-anchor-b');
      if (first) first.disabled = false;
      if (second) second.disabled = false;
    }
  }

  function luiPositionElement(el, left, top, width, height, rootWidth, rootHeight) {
    if (!el) return;
    el.style.left = (left / rootWidth * 100) + '%';
    el.style.top = (top / rootHeight * 100) + '%';
    el.style.width = (width / rootWidth * 100) + '%';
    el.style.height = (height / rootHeight * 100) + '%';
  }

  function luiSetAnchorLines(demo, axis, anchors) {
    var first = demo.querySelector('[data-lui-anchor-' + axis + '-a]');
    var second = demo.querySelector('[data-lui-anchor-' + axis + '-b]');
    var samePoint = Math.abs(anchors[0] - anchors[1]) < 0.0001;
    var firstLabel = (axis === 'x' ? 'A ' : 'A ') + luiFormat(anchors[0]);
    var secondLabel = (axis === 'x' ? 'B ' : 'B ') + luiFormat(anchors[1]);
    if (first) {
      first.style.display = '';
      first.setAttribute('data-label', firstLabel);
      first.classList.toggle('is-near-end', anchors[0] > 0.78);
      if (axis === 'x') first.style.left = (anchors[0] * 100) + '%';
      else first.style.top = (anchors[0] * 100) + '%';
    }
    if (second) {
      second.style.display = samePoint ? 'none' : '';
      second.setAttribute('data-label', secondLabel);
      second.classList.toggle('is-near-end', anchors[1] > 0.78);
      if (axis === 'x') second.style.left = (anchors[1] * 100) + '%';
      else second.style.top = (anchors[1] * 100) + '%';
    }
  }

  function luiReadState(demo) {
    var parentLeft = luiNumber(luiControl(demo, 'parent-left').value, 340);
    var parentTop = luiNumber(luiControl(demo, 'parent-top').value, 110);
    var parentWidth = luiClamp(luiNumber(luiControl(demo, 'parent-width').value, 600), 40, 1280);
    var parentHeight = luiClamp(luiNumber(luiControl(demo, 'parent-height').value, 400), 40, 720);
    var xActive = demo.querySelector('[data-lui-axis="x"] .is-active');
    var yActive = demo.querySelector('[data-lui-axis="y"] .is-active');

    return {
      parentLeft: parentLeft,
      parentTop: parentTop,
      parentWidth: parentWidth,
      parentHeight: parentHeight,
      xMode: xActive ? xActive.getAttribute('data-lui-mode') : 'left',
      yMode: yActive ? yActive.getAttribute('data-lui-mode') : 'center',
      xAnchorA: luiClamp(luiNumber(luiControl(demo, 'x-anchor-a').value, 0), 0, 1),
      xAnchorB: luiClamp(luiNumber(luiControl(demo, 'x-anchor-b').value, 0), 0, 1),
      yAnchorA: luiClamp(luiNumber(luiControl(demo, 'y-anchor-a').value, 0.5), 0, 1),
      yAnchorB: luiClamp(luiNumber(luiControl(demo, 'y-anchor-b').value, 0.5), 0, 1),
      xLeft: luiNumber(luiControl(demo, 'x-left').value, 12),
      xRight: luiNumber(luiControl(demo, 'x-right').value, 48),
      yTop: luiNumber(luiControl(demo, 'y-top').value, -45),
      yBottom: luiNumber(luiControl(demo, 'y-bottom').value, 45)
    };
  }

  function luiRenderDemo(demo, note) {
    var rootWidth = 1280;
    var rootHeight = 720;
    var state = luiReadState(demo);
    var parent = demo.querySelector('[data-lui-parent]');
    var child = demo.querySelector('[data-lui-child]');
    var x = luiComputeAxis(state.parentLeft, state.parentWidth, state.xMode, state.xLeft, state.xRight, state.xAnchorA, state.xAnchorB);
    var y = luiComputeAxis(state.parentTop, state.parentHeight, state.yMode, state.yTop, state.yBottom, state.yAnchorA, state.yAnchorB);
    var childWidth = Math.max(0, x.size);
    var childHeight = Math.max(0, y.size);

    luiPositionElement(parent, state.parentLeft, state.parentTop, state.parentWidth, state.parentHeight, rootWidth, rootHeight);

    if (child) {
      child.style.left = ((x.start - state.parentLeft) / state.parentWidth * 100) + '%';
      child.style.top = ((y.start - state.parentTop) / state.parentHeight * 100) + '%';
      child.style.width = (childWidth / state.parentWidth * 100) + '%';
      child.style.height = (childHeight / state.parentHeight * 100) + '%';
      child.classList.toggle('is-invalid', x.size <= 0 || y.size <= 0);
      child.classList.toggle('is-compact', childWidth < 90 || childHeight < 32);
    }

    luiSetAnchorLines(demo, 'x', x.anchors);
    luiSetAnchorLines(demo, 'y', y.anchors);

    luiSetMetric(demo, 'left', x.start);
    luiSetMetric(demo, 'right', x.end);
    luiSetMetric(demo, 'top', y.start);
    luiSetMetric(demo, 'bottom', y.end);
    luiSetMetric(demo, 'width', x.size);
    luiSetMetric(demo, 'height', y.size);
    luiSetMetric(demo, 'x-anchors', luiFormat(x.anchors[0]) + ', ' + luiFormat(x.anchors[1]));
    luiSetMetric(demo, 'y-anchors', luiFormat(y.anchors[0]) + ', ' + luiFormat(y.anchors[1]));

    var xCall = 'setLeftRight(' + x.args[0] + ', ' + x.args[1] + ', ' + luiFormat(state.xLeft) + ', ' + luiFormat(state.xRight) + ')';
    var yCall = 'setTopBottom(' + y.args[0] + ', ' + y.args[1] + ', ' + luiFormat(state.yTop) + ', ' + luiFormat(state.yBottom) + ')';
    var xCallEl = demo.querySelector('[data-lui-call="x"]');
    var yCallEl = demo.querySelector('[data-lui-call="y"]');
    var formulaEl = demo.querySelector('[data-lui-formula]');
    var summaryEl = demo.querySelector('[data-lui-summary]');

    if (xCallEl) xCallEl.textContent = xCall;
    if (yCallEl) yCallEl.textContent = yCall;
    if (summaryEl) {
      summaryEl.textContent = note || (state.xMode === 'custom' || state.yMode === 'custom'
        ? 'Custom mode feeds numeric anchor values directly into the call.'
        : 'Change the anchors or offsets to recalculate the child widget.');
    }
    if (formulaEl) {
      formulaEl.textContent =
        'Parent: left=' + luiFormat(state.parentLeft) + ', top=' + luiFormat(state.parentTop) + ', width=' + luiFormat(state.parentWidth) + ', height=' + luiFormat(state.parentHeight) + '\n' +
        'Anchors: x=(' + luiFormat(x.anchors[0]) + ', ' + luiFormat(x.anchors[1]) + '), y=(' + luiFormat(y.anchors[0]) + ', ' + luiFormat(y.anchors[1]) + ')\n\n' +
        'Left  = ' + luiFormat(state.parentLeft) + ' + (' + luiFormat(state.parentWidth) + ' * ' + luiFormat(x.anchors[0]) + ') + ' + luiFormat(state.xLeft) + ' = ' + luiFormat(x.start) + '\n' +
        'Right = ' + luiFormat(state.parentLeft) + ' + (' + luiFormat(state.parentWidth) + ' * ' + luiFormat(x.anchors[1]) + ') + ' + luiFormat(state.xRight) + ' = ' + luiFormat(x.end) + '\n' +
        'Width = ' + luiFormat(x.end) + ' - ' + luiFormat(x.start) + ' = ' + luiFormat(x.size) + '\n\n' +
        'Top    = ' + luiFormat(state.parentTop) + ' + (' + luiFormat(state.parentHeight) + ' * ' + luiFormat(y.anchors[0]) + ') + ' + luiFormat(state.yTop) + ' = ' + luiFormat(y.start) + '\n' +
        'Bottom = ' + luiFormat(state.parentTop) + ' + (' + luiFormat(state.parentHeight) + ' * ' + luiFormat(y.anchors[1]) + ') + ' + luiFormat(state.yBottom) + ' = ' + luiFormat(y.end) + '\n' +
        'Height = ' + luiFormat(y.end) + ' - ' + luiFormat(y.start) + ' = ' + luiFormat(y.size);
    }
  }

  function luiApplyPreset(demo, presetId) {
    var preset = luiDemoPresets[presetId] || luiDemoPresets[1];
    luiSetMode(demo, 'x', preset.xMode);
    luiSetMode(demo, 'y', preset.yMode);
    luiSetInput(demo, 'x-left', preset.xLeft);
    luiSetInput(demo, 'x-right', preset.xRight);
    luiSetInput(demo, 'y-top', preset.yTop);
    luiSetInput(demo, 'y-bottom', preset.yBottom);

    demo.querySelectorAll('[data-lui-preset]').forEach(function (button) {
      var active = button.getAttribute('data-lui-preset') === String(presetId);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    luiRenderDemo(demo, preset.note);
  }

  document.querySelectorAll('[data-lui-positioning-demo]').forEach(function (demo) {
    demo.querySelectorAll('[data-lui-axis] [data-lui-mode]').forEach(function (button) {
      button.addEventListener('click', function () {
        var group = button.closest('[data-lui-axis]');
        luiSetMode(demo, group.getAttribute('data-lui-axis'), button.getAttribute('data-lui-mode'));
        demo.querySelectorAll('[data-lui-preset]').forEach(function (presetButton) {
          presetButton.classList.remove('is-active');
          presetButton.setAttribute('aria-pressed', 'false');
        });
        luiRenderDemo(demo);
      });
    });

    demo.querySelectorAll('[data-lui-control]').forEach(function (input) {
      input.addEventListener('input', function () {
        demo.querySelectorAll('[data-lui-preset]').forEach(function (presetButton) {
          presetButton.classList.remove('is-active');
          presetButton.setAttribute('aria-pressed', 'false');
        });
        luiRenderDemo(demo);
      });
    });

    demo.querySelectorAll('[data-lui-preset]').forEach(function (button) {
      button.addEventListener('click', function () {
        luiApplyPreset(demo, button.getAttribute('data-lui-preset'));
      });
    });

    luiApplyPreset(demo, 1);
  });

  // -------- Scroll-to-top button --------
  var st = document.getElementById('scrolltop');
  if (st) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 240) st.classList.add('visible');
      else st.classList.remove('visible');
    });
    st.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------- Keep floating controls clear of footer content --------
  var footer = document.querySelector('.site-footer');
  function updateFloatingControlPositions() {
    var overlap = 0;
    if (footer) {
      var rect = footer.getBoundingClientRect();
      overlap = Math.max(0, window.innerHeight - rect.top);
    }

    var isNarrow = window.innerWidth <= 1200;
    var hasTocFab = !!(tocToggle && window.getComputedStyle(tocToggle).display !== 'none');
    var extra = overlap > 0 ? overlap + 12 : 0;

    if (tocToggle) {
      var tocBase = isNarrow ? 14 : 16;
      tocToggle.style.bottom = (tocBase + extra) + 'px';
    }

    if (st) {
      var stBase = hasTocFab ? ((isNarrow ? 14 : 16) + 56) : (isNarrow ? 14 : 24);
      st.style.bottom = (stBase + extra) + 'px';
    }
  }

  updateFloatingControlPositions();
  window.addEventListener('scroll', updateFloatingControlPositions, { passive: true });
  window.addEventListener('resize', updateFloatingControlPositions);

  // -------- GitHub stars/forks --------
  var ghStars = document.getElementById('gh-stars');
  var ghForks = document.getElementById('gh-forks');

  function setGhStats(stars, forks) {
    if (ghStars) ghStars.textContent = stars + ' Stars';
    if (ghForks) ghForks.textContent = forks + ' Forks';
  }

  function setGhUnavailable() {
    if (ghStars) ghStars.textContent = '? Stars';
    if (ghForks) ghForks.textContent = '? Forks';
  }

  if (ghStars || ghForks) {
    var cacheKey = 'codmods-gh-stats-v1';
    var cacheTtlMs = 6 * 60 * 60 * 1000;
    var now = Date.now();
    var cache = null;

    try {
      cache = JSON.parse(localStorage.getItem(cacheKey) || 'null');
    } catch (e) {
      cache = null;
    }

    if (cache && typeof cache.stars === 'number' && typeof cache.forks === 'number') {
      setGhStats(cache.stars, cache.forks);
    }

    if (cache && typeof cache.ts === 'number' && (now - cache.ts) < cacheTtlMs) {
      return;
    }

    var url = 'https://api.github.com/repos/{{ site.github_user }}/{{ site.github_repo }}';
    fetch(url, { headers: { 'Accept': 'application/vnd.github.v3+json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('github-api-' + r.status);
        return r.json();
      })
      .then(function (r) {
        if (!r) throw new Error('github-empty-response');
        var stars = Number(r.stargazers_count);
        var forks = Number(r.forks_count);
        if (!Number.isFinite(stars) || !Number.isFinite(forks)) throw new Error('github-invalid-data');
        setGhStats(stars, forks);
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ stars: stars, forks: forks, ts: now }));
        } catch (e) {
          // Ignore storage quota/privacy mode errors.
        }
      })
      .catch(function () {
        if (!(cache && typeof cache.stars === 'number' && typeof cache.forks === 'number')) {
          setGhUnavailable();
        }
      });
  }
})();
