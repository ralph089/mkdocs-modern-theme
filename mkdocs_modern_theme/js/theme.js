/**
 * MkDocs Modern Theme — Alpine.js stores and components
 */

document.addEventListener('alpine:init', () => {

  // ================================================
  // Theme Store — dark/light/system toggle
  // ================================================
  Alpine.store('theme', {
    mode: localStorage.getItem('modern-theme-mode') || 'system',

    init() {
      this._apply();
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.mode === 'system') this._apply();
      });
    },

    get isDark() {
      if (this.mode === 'dark') return true;
      if (this.mode === 'light') return false;
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    get nextLabel() {
      var el = document.documentElement;
      var labels = {
        light: el.dataset.langLight || 'light',
        dark: el.dataset.langDark || 'dark',
        system: el.dataset.langSystem || 'system'
      };
      if (this.mode === 'system') return labels.light;
      if (this.mode === 'light') return labels.dark;
      return labels.system;
    },

    cycle() {
      if (this.mode === 'system') this.mode = 'light';
      else if (this.mode === 'light') this.mode = 'dark';
      else this.mode = 'system';

      localStorage.setItem('modern-theme-mode', this.mode);
      this._apply();
    },

    _apply() {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      initMermaid();
    }
  });

  // ================================================
  // Announce Store — dismissible announcement bar
  // ================================================
  Alpine.store('announce', {
    dismissed: false,
    _hash: '',

    init() {
      var el = document.getElementById('modern-announce');
      if (!el) return;
      var text = el.textContent.trim();
      if (!text) return;
      this._hash = this._computeHash(text);
      var saved = localStorage.getItem('modern-announce-dismissed');
      if (saved === this._hash) {
        this.dismissed = true;
        return;
      }
      // Measure and set the height after render
      requestAnimationFrame(() => {
        this._updateHeight();
      });
      // Re-measure on resize
      window.addEventListener('resize', () => {
        if (!this.dismissed) this._updateHeight();
      });
    },

    _updateHeight() {
      var el = document.getElementById('modern-announce');
      if (!el) return;
      var h = el.offsetHeight;
      document.documentElement.style.setProperty('--modern-announce-height', h + 'px');
    },

    dismiss() {
      this.dismissed = true;
      localStorage.setItem('modern-announce-dismissed', this._hash);
      document.documentElement.style.setProperty('--modern-announce-height', '0px');
    },

    _computeHash(str) {
      var hash = 5381;
      for (var i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash).toString(36);
    }
  });

  // ================================================
  // Sidebar Store — collapsible desktop sidebar
  // ================================================
  Alpine.store('sidebar', {
    collapsed: localStorage.getItem('modern-sidebar-collapsed') === 'true',

    toggle() {
      this.collapsed = !this.collapsed;
      localStorage.setItem('modern-sidebar-collapsed', this.collapsed);
    },

    expand() {
      this.collapsed = false;
      localStorage.setItem('modern-sidebar-collapsed', 'false');
    },

    collapse() {
      this.collapsed = true;
      localStorage.setItem('modern-sidebar-collapsed', 'true');
    }
  });

  // ================================================
  // Mobile Menu Store
  // ================================================
  Alpine.store('mobile', {
    isOpen: false,

    toggle() {
      this.isOpen = !this.isOpen;
    },

    open() {
      this.isOpen = true;
    },

    close() {
      this.isOpen = false;
    },

    init() {
      // Close on escape
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });
      // Close on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024 && this.isOpen) this.close();
      });
    }
  });

  // ================================================
  // Search Store — Ctrl+K modal with lunr.js
  // ================================================
  Alpine.store('search', {
    isOpen: false,
    query: '',
    results: [],
    selectedIndex: 0,
    loading: false,
    _index: null,
    _docs: null,
    _baseUrl: '',

    init() {
      // Global keyboard shortcut
      window.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.isOpen ? this.close() : this.open();
        }
      });

      // Watch query changes
      Alpine.effect(() => {
        if (this.query.length > 0) {
          this._search(this.query);
        } else {
          this.results = [];
          this.selectedIndex = 0;
        }
      });
    },

    open() {
      this.isOpen = true;
      this.query = '';
      this.results = [];
      this.selectedIndex = 0;
      // Load index lazily on first open
      if (!this._index) this._loadIndex();
      // Focus input after transition
      setTimeout(() => {
        const input = document.querySelector('[x-ref="searchInput"]');
        if (input) input.focus();
      }, 50);
    },

    close() {
      this.isOpen = false;
      this.query = '';
      this.results = [];
    },

    async _loadIndex() {
      if (this._index || this.loading) return;
      this.loading = true;
      try {
        let searchUrl = 'search/search_index.json';
        // Determine the base URL from the theme stylesheet path
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (const link of links) {
          const href = link.getAttribute('href');
          if (href && href.includes('css/theme.css')) {
            this._baseUrl = href.replace('css/theme.css', '');
            searchUrl = this._baseUrl + 'search/search_index.json';
            break;
          }
        }
        const resp = await fetch(searchUrl);
        const data = await resp.json();
        this._docs = data.docs;
        // Build or load lunr index
        if (data.index) {
          this._index = lunr.Index.load(data.index);
        } else {
          this._index = lunr(function() {
            this.ref('location');
            this.field('title', { boost: 10 });
            this.field('text');
            data.docs.forEach((doc) => {
              this.add(doc);
            });
          });
        }
      } catch (err) {
        console.error('Failed to load search index:', err);
      }
      this.loading = false;
    },

    _search(query) {
      if (!this._index || !query) {
        this.results = [];
        return;
      }
      const base = this._baseUrl;
      const mapResults = (raw) => raw.slice(0, 20).map((r) => {
        const doc = this._docs.find(d => d.location === r.ref);
        return {
          location: base + (doc ? doc.location : r.ref),
          title: doc ? doc.title : r.ref,
          text: doc ? (doc.text || '').substring(0, 150) : ''
        };
      });
      try {
        // Try exact match first (works with lunr stemming)
        let raw = this._index.search(query);
        // Fallback: try wildcard for partial matches
        if (raw.length === 0) {
          try { raw = this._index.search(query + '*'); } catch (_) {}
        }
        // Fallback: try each word with wildcard
        if (raw.length === 0) {
          try {
            const terms = query.split(/\s+/).map(t => t + '*').join(' ');
            raw = this._index.search(terms);
          } catch (_) {}
        }
        this.results = mapResults(raw);
      } catch (e) {
        // If lunr throws, try simpler query
        try {
          const raw = this._index.search(query.replace(/[^\w\s]/g, ''));
          this.results = mapResults(raw);
        } catch (_) {
          this.results = [];
        }
      }
      this.selectedIndex = 0;
    },

    nextResult() {
      if (this.selectedIndex < this.results.length - 1) {
        this.selectedIndex++;
        this._scrollToSelected();
      }
    },

    prevResult() {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
        this._scrollToSelected();
      }
    },

    _scrollToSelected() {
      requestAnimationFrame(() => {
        var list = document.querySelector('[data-search-results]');
        if (!list) return;
        var items = list.querySelectorAll('li');
        if (items[this.selectedIndex]) {
          items[this.selectedIndex].scrollIntoView({ block: 'nearest' });
        }
      });
    },

    goToResult() {
      if (this.results[this.selectedIndex]) {
        window.location.href = this.results[this.selectedIndex].location;
        this.close();
      }
    }
  });
});

// ================================================
// TOC Scroll Spy — Alpine.js component
// ================================================
function tocSpy() {
  return {
    activeId: '',
    showScrollTop: false,
    _observer: null,

    init() {
      const headings = document.querySelectorAll('.modern-content h2[id], .modern-content h3[id]');
      if (!headings.length) return;

      // Set initial active to first heading
      this.activeId = headings[0].id;

      // IntersectionObserver for scroll spy
      this._observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeId = entry.target.id;
            }
          });
        },
        {
          rootMargin: '-80px 0px -80% 0px',
          threshold: 0
        }
      );

      headings.forEach((h) => this._observer.observe(h));

      // Scroll-to-top visibility
      window.addEventListener('scroll', () => {
        this.showScrollTop = window.scrollY > 300;
      }, { passive: true });
    },

    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        this.activeId = id;
      }
    },

    destroy() {
      if (this._observer) this._observer.disconnect();
    }
  };
}

// ================================================
// Copy Markdown — copies raw page source to clipboard
// ================================================
function copyMarkdown() {
  return {
    copied: false,
    _timeout: null,

    copy() {
      const el = this.$refs.markdownSource;
      if (!el) return;
      try {
        const markdown = JSON.parse(el.textContent);
        navigator.clipboard.writeText(markdown).then(() => {
          this.copied = true;
          clearTimeout(this._timeout);
          this._timeout = setTimeout(() => { this.copied = false; }, 2000);
        });
      } catch (e) {
        console.error('Failed to copy markdown:', e);
      }
    }
  };
}

// ================================================
// Page Feedback — "Was this page helpful?" widget
// ================================================
function pageFeedback() {
  return {
    state: 'prompt',
    rating: null,
    comment: '',
    _pageUrl: '',

    init() {
      this._pageUrl = this.$el.dataset.pageUrl || window.location.pathname;
      var prev = localStorage.getItem('modern-feedback:' + this._pageUrl);
      if (prev) {
        this.rating = prev;
        this.state = 'thanks';
      }
    },

    vote(value) {
      this.rating = value;
      if (value === 'yes') {
        this._save();
        this._dispatch();
        this.state = 'thanks';
      } else {
        this.state = 'comment';
      }
    },

    submitComment() {
      this._save();
      this._dispatch();
      this.state = 'thanks';
    },

    _save() {
      localStorage.setItem('modern-feedback:' + this._pageUrl, this.rating);
    },

    _dispatch() {
      var detail = {
        page: this._pageUrl,
        rating: this.rating,
        comment: this.comment || null
      };
      window.dispatchEvent(new CustomEvent('modern-feedback', { detail: detail }));
      if (typeof gtag === 'function') {
        gtag('event', 'page_feedback', {
          page_url: this._pageUrl,
          rating: this.rating,
          comment: this.comment || undefined
        });
      }
    }
  };
}

// ================================================
// Tabbed Content (pymdownx.tabbed alternate style)
// ================================================
(function() {
  function initTabs() {
    document.querySelectorAll('.tabbed-set').forEach(function(tabSet) {
      var inputs = tabSet.querySelectorAll(':scope > input');
      var labels = tabSet.querySelectorAll('.tabbed-labels > label');
      var blocks = tabSet.querySelectorAll('.tabbed-content > .tabbed-block');

      function update() {
        inputs.forEach(function(input, i) {
          if (labels[i]) {
            if (input.checked) {
              labels[i].classList.add('tabbed-label--active');
            } else {
              labels[i].classList.remove('tabbed-label--active');
            }
          }
          if (blocks[i]) {
            if (input.checked) {
              blocks[i].classList.add('tabbed-block--active');
            } else {
              blocks[i].classList.remove('tabbed-block--active');
            }
          }
        });
      }

      inputs.forEach(function(input) {
        input.addEventListener('change', update);
      });

      update();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }
})();

// ================================================
// Mermaid Diagram Support
// ================================================
function initMermaid() {
  if (typeof mermaid === 'undefined') return;
  var els = document.querySelectorAll('.mermaid');
  if (!els.length) return;

  // Save original source on first run so we can re-render on theme change
  els.forEach(function(el) {
    if (!el.getAttribute('data-mermaid-source')) {
      el.setAttribute('data-mermaid-source', el.textContent);
    }
  });

  var isDark = document.documentElement.classList.contains('dark');
  var config = {
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    fontFamily: 'var(--modern-font-sans)',
  };
  if (isDark) {
    config.themeVariables = {
      background: '#1a1a1a',
      primaryColor: '#2d333b',
      primaryTextColor: '#ededed',
      primaryBorderColor: '#444c56',
      secondaryColor: '#2a2e34',
      secondaryTextColor: '#ededed',
      secondaryBorderColor: '#444c56',
      tertiaryColor: '#1e2228',
      tertiaryTextColor: '#ededed',
      lineColor: '#a3a3a3',
      textColor: '#ededed',
      mainBkg: '#2d333b',
      nodeBorder: '#444c56',
      clusterBkg: '#22272e',
      clusterBorder: '#444c56',
      titleColor: '#ededed',
      actorTextColor: '#ededed',
      actorLineColor: '#a3a3a3',
      signalColor: '#a3a3a3',
      signalTextColor: '#ededed',
      labelBoxBkgColor: '#2d333b',
      labelBoxBorderColor: '#444c56',
      labelTextColor: '#ededed',
      loopTextColor: '#ededed',
      noteBkgColor: '#2a2e34',
      noteTextColor: '#ededed',
      noteBorderColor: '#444c56',
    };
  }

  // Restore original source text before re-rendering
  els.forEach(function(el) {
    var source = el.getAttribute('data-mermaid-source');
    if (source && el.querySelector('svg')) {
      el.removeAttribute('data-processed');
      el.innerHTML = source;
    }
  });

  mermaid.initialize(config);
  mermaid.run({ querySelector: '.mermaid' });
}
