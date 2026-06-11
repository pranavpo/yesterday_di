/* =========================================================
   Yesterday Admin CMS — Vanilla JS interactions
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Helpers ---------- */
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function on(el, evt, fn) { if (el) el.addEventListener(evt, fn); }
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {

    /* ---------- Sidebar collapse / mobile drawer ---------- */
    var shell = qs('#appShell');
    var sidebarToggle = qs('#sidebarToggle');
    if (shell && sidebarToggle) {
      on(sidebarToggle, 'click', function () {
        if (window.innerWidth <= 720) {
          shell.classList.toggle('show-sidebar');
        } else {
          shell.classList.toggle('is-collapsed');
        }
      });
    }
    // Mobile menu button is auto-inserted near top bar on mobile
    if (shell) {
      var topbar = qs('.topbar', shell);
      if (topbar) {
        var menuBtn = document.createElement('button');
        menuBtn.className = 'menu-btn';
        menuBtn.setAttribute('aria-label', 'Open menu');
        menuBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        topbar.insertBefore(menuBtn, topbar.firstChild);
        on(menuBtn, 'click', function () { shell.classList.toggle('show-sidebar'); });
      }
    }

    /* ---------- Password show/hide ---------- */
    qsa('[data-toggle-pass]').forEach(function (btn) {
      on(btn, 'click', function () {
        var input = document.getElementById(btn.getAttribute('data-toggle-pass'));
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    /* ---------- 5-digit code input ---------- */
    var codeRow = qs('#codeRow');
    var confirmBtn = qs('#confirmBtn');
    if (codeRow) {
      var inputs = qsa('.code-input', codeRow);
      function refreshConfirm() {
        if (!confirmBtn) return;
        var filled = inputs.every(function (i) { return i.value.length === 1; });
        if (filled) {
          confirmBtn.classList.remove('is-disabled');
          confirmBtn.disabled = false;
        } else {
          confirmBtn.classList.add('is-disabled');
          confirmBtn.disabled = true;
        }
      }
      inputs.forEach(function (input, idx) {
        on(input, 'input', function (e) {
          var v = input.value.replace(/[^0-9]/g, '').slice(0, 1);
          input.value = v;
          if (v && idx < inputs.length - 1) inputs[idx + 1].focus();
          refreshConfirm();
        });
        on(input, 'keydown', function (e) {
          if (e.key === 'Backspace' && !input.value && idx > 0) {
            inputs[idx - 1].focus();
          }
        });
      });
      refreshConfirm();
    }

    /* ---------- Resend code countdown (verify page) ---------- */
    var timerEl = qs('#resendTimer');
    if (timerEl) {
      var secs = 39;
      var t = setInterval(function () {
        secs--;
        if (secs < 0) { clearInterval(t); timerEl.textContent = '00:00'; return; }
        var s = String(secs).padStart(2, '0');
        timerEl.textContent = '00:' + s;
      }, 1000);
    }

    /* ---------- Date picker popover (dashboard) ---------- */
    var dateBtn = qs('#dateSortBtn');
    var datePicker = qs('#datePicker');
    if (dateBtn && datePicker) {
      on(dateBtn, 'click', function (e) {
        e.stopPropagation();
        datePicker.classList.toggle('hidden');
        // Position popover below button
        var rect = dateBtn.getBoundingClientRect();
        var content = qs('.content');
        var contentRect = content.getBoundingClientRect();
        datePicker.style.left = (rect.right - 320 - contentRect.left) + 'px';
        datePicker.style.top = (rect.bottom - contentRect.top + 8) + 'px';
      });
      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!datePicker.contains(e.target) && e.target !== dateBtn) {
          datePicker.classList.add('hidden');
        }
      });
      var apply = qs('#applyDate');
      on(apply, 'click', function () { datePicker.classList.add('hidden'); });
    }

    /* ---------- Notifications panel ---------- */
    var bell = qs('#bellBtn');
    var notifPanel = qs('#notifPanel');
    var notifDots = qs('#notifDots');
    var notifOptions = qs('#notifOptions');
    if (bell && notifPanel) {
      on(bell, 'click', function (e) {
        e.stopPropagation();
        notifPanel.classList.toggle('hidden');
        if (notifOptions) notifOptions.classList.add('hidden');
      });
      document.addEventListener('click', function (e) {
        if (!notifPanel.contains(e.target) && e.target !== bell && !bell.contains(e.target)) {
          notifPanel.classList.add('hidden');
          if (notifOptions) notifOptions.classList.add('hidden');
        }
      });
    }
    if (notifDots && notifOptions) {
      on(notifDots, 'click', function (e) {
        e.stopPropagation();
        notifOptions.classList.toggle('hidden');
        // Position relative to dots button
        var rect = notifDots.getBoundingClientRect();
        notifOptions.style.position = 'fixed';
        notifOptions.style.top = (rect.bottom + 4) + 'px';
        notifOptions.style.left = (rect.right - 220) + 'px';
      });
    }

    /* ---------- Tabs (user details) ---------- */
    qsa('.tab').forEach(function (tab) {
      on(tab, 'click', function () {
        var target = tab.getAttribute('data-tab');
        var siblings = qsa('.tab', tab.parentElement);
        siblings.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        qsa('.tab-panel').forEach(function (panel) {
          panel.classList.toggle('active', panel.id === ('panel-' + target));
        });
      });
    });

    /* ---------- Edit user details form toggle ---------- */
    var editBtn = qs('#editBtn');
    var cancelEditBtn = qs('#cancelEditBtn');
    var basicView = qs('#basicView');
    var basicEdit = qs('#basicEdit');
    if (editBtn && basicView && basicEdit) {
      on(editBtn, 'click', function () {
        basicView.classList.add('hidden');
        basicEdit.classList.remove('hidden');
      });
    }
    if (cancelEditBtn) {
      on(cancelEditBtn, 'click', function () {
        if (basicEdit) basicEdit.classList.add('hidden');
        if (basicView) basicView.classList.remove('hidden');
      });
    }
    var editForm = qs('#editUserForm');
    on(editForm, 'submit', function (e) {
      e.preventDefault();
      if (basicEdit) basicEdit.classList.add('hidden');
      if (basicView) basicView.classList.remove('hidden');
    });

    /* ---------- Modals (delete + block) ---------- */
    function openModal(id) {
      var modal = document.getElementById(id);
      if (modal) modal.classList.remove('hidden');
    }
    function closeModal(modal) {
      if (modal) modal.classList.add('hidden');
    }
    on(qs('#deleteBtn'), 'click', function () { openModal('deleteModal'); });

    // Block toggle opens confirmation modal
    var blockToggle = qs('#blockToggle');
    if (blockToggle) {
      on(blockToggle, 'change', function () {
        if (blockToggle.checked) {
          openModal('blockModal');
        }
      });
      // Reset toggle if modal closes via Cancel
      var blockModalEl = qs('#blockModal');
      if (blockModalEl) {
        qsa('[data-modal-close]', blockModalEl).forEach(function (btn) {
          on(btn, 'click', function () { blockToggle.checked = false; });
        });
      }
    }

    // Generic modal close handlers
    qsa('[data-modal-close]').forEach(function (btn) {
      on(btn, 'click', function () {
        var modal = btn.closest('.modal-overlay');
        closeModal(modal);
      });
    });
    qsa('.modal-overlay').forEach(function (overlay) {
      on(overlay, 'click', function (e) {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    /* ---------- Review card kebab menu ---------- */
    var reviewMenu = qs('#reviewMenu');
    if (reviewMenu) {
      qsa('[data-review-menu]').forEach(function (btn) {
        on(btn, 'click', function (e) {
          e.stopPropagation();
          var rect = btn.getBoundingClientRect();
          reviewMenu.style.position = 'fixed';
          reviewMenu.style.top = (rect.bottom + 6) + 'px';
          reviewMenu.style.left = (rect.right - 200) + 'px';
          reviewMenu.classList.toggle('hidden');
        });
      });
      document.addEventListener('click', function (e) {
        if (!reviewMenu.contains(e.target) && !e.target.closest('[data-review-menu]')) {
          reviewMenu.classList.add('hidden');
        }
      });
    }

    /* ---------- Filter dropdowns: keep label after change ---------- */
    qsa('select.filter-select').forEach(function (sel) {
      var defaultLabel = sel.options[0] ? sel.options[0].textContent : '';
      on(sel, 'change', function () {
        if (sel.selectedIndex === 0) {
          sel.options[0].textContent = defaultLabel;
        }
      });
    });

    /* ---------- Logout confirm (optional minimal) ---------- */
    qsa('.nav-item.logout').forEach(function (link) {
      on(link, 'click', function (e) {
        // Allow navigation, but could add confirm dialog here
      });
    });

    /* ---------- Pill-tab filter row (deliveries.html) ---------- */
    var pillRow = qs('#deliveryFilters');
    var dtable = qs('#deliveriesTable tbody');
    if (pillRow && dtable) {
      qsa('.pill-tab', pillRow).forEach(function (btn) {
        on(btn, 'click', function () {
          qsa('.pill-tab', pillRow).forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var f = btn.getAttribute('data-filter');
          qsa('tr', dtable).forEach(function (row) {
            var st = row.getAttribute('data-status');
            row.style.display = (f === 'all' || st === f) ? '' : 'none';
          });
        });
      });
    }

    /* ---------- Toast success ---------- */
    var toast = qs('#successToast');
    function flashToast() {
      if (!toast) return;
      toast.classList.remove('hidden');
      clearTimeout(flashToast._t);
      flashToast._t = setTimeout(function () { toast.classList.add('hidden'); }, 2400);
    }
    qsa('[data-show-toast]').forEach(function (btn) {
      on(btn, 'click', function () { flashToast(); });
    });

    /* ---------- Upload zone click ---------- */
    qsa('.upload-zone input[type="file"]').forEach(function (input) {
      // browser already triggers via the wrapping label; nothing extra needed
    });
  });
})();
