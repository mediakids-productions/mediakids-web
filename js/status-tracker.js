(() => {
  const API_URL = window.MEDIAKIDS_STATUS_API_URL || 'https://script.google.com/macros/s/AKfycbxsAOwx3IEIT-M38BhxTFFRl9kcqVu6niXzKEwHb8na3uXbQG1Jpfo6_TSkjAHVuH2Q/exec';

  const STEP_TITLES = [
    'Non-B Visa + Criminal Check',
    'Krusapa License',
    'Work Permit + Medical Certificate',
    'Tax ID',
    'Bank Account',
    'Visa Extension'
  ];

  const MOCK_TEACHERS = {
    AB9876543: {
      name: 'John Robert Smith',
      passportNo: 'AB*****43',
      school: 'Anuban Nangrong School',
      area: 'Esan 2',
      visaType: 'Non-B Visa',
      lastUpdated: '24 May 2026',
      overallProgress: '4/6',
      steps: [
        {
          title: STEP_TITLES[0],
          status: 'Completed',
          procedure: 'Non-B visa approved and criminal check completed.',
          expectedDate: 'Completed',
          details: 'Visa status: Completed, Criminal check: Completed'
        },
        {
          title: STEP_TITLES[1],
          status: 'Completed',
          procedure: 'Krusapa license information has been recorded.',
          expectedDate: 'Completed',
          details: 'Krusapa ID: KS-889128'
        },
        {
          title: STEP_TITLES[2],
          status: 'Completed',
          procedure: 'Work permit and medical certificate are complete.',
          expectedDate: 'Completed',
          details: 'Work Permit ID: WP-992100'
        },
        {
          title: STEP_TITLES[3],
          status: 'In Progress',
          procedure: 'Tax registration is being prepared by the consultant team.',
          expectedDate: 'Expected within 7 working days',
          details: 'Waiting for tax office appointment'
        },
        {
          title: STEP_TITLES[4],
          status: 'Pending',
          procedure: 'Bank account opening will begin after Tax ID is ready.',
          expectedDate: 'After Tax ID',
          details: 'No action required from teacher yet'
        },
        {
          title: STEP_TITLES[5],
          status: 'Pending',
          procedure: 'Visa extension is scheduled later in the document journey.',
          expectedDate: 'To be confirmed',
          details: 'Consultant team will update this step'
        }
      ]
    },
    CD1122334: {
      name: 'Sarah Jane Connor',
      passportNo: 'CD*****34',
      school: 'Nangrong Pittayakom School',
      area: 'Esan 2',
      visaType: 'Non-B Visa',
      lastUpdated: '24 May 2026',
      overallProgress: '5/6',
      steps: [
        {
          title: STEP_TITLES[0],
          status: 'Completed',
          procedure: 'Non-B visa and criminal check completed.',
          expectedDate: 'Completed',
          details: 'All first-stage documents are complete'
        },
        {
          title: STEP_TITLES[1],
          status: 'Completed',
          procedure: 'Krusapa license completed.',
          expectedDate: 'Completed',
          details: 'Krusapa ID: KS-991200'
        },
        {
          title: STEP_TITLES[2],
          status: 'Completed',
          procedure: 'Work permit and medical certificate completed.',
          expectedDate: 'Completed',
          details: 'Work Permit ID: WP-110022'
        },
        {
          title: STEP_TITLES[3],
          status: 'Completed',
          procedure: 'Tax ID completed.',
          expectedDate: 'Completed',
          details: 'Tax information recorded'
        },
        {
          title: STEP_TITLES[4],
          status: 'In Progress',
          procedure: 'Bank account appointment is in progress.',
          expectedDate: 'Expected within 5 working days',
          details: 'Teacher will be contacted for appointment time'
        },
        {
          title: STEP_TITLES[5],
          status: 'Pending',
          procedure: 'Visa extension will begin after bank setup.',
          expectedDate: 'To be confirmed',
          details: 'No action required from teacher yet'
        }
      ]
    }
  };

  const elements = {
    form: document.getElementById('status-search-form'),
    input: document.getElementById('passport-input'),
    button: document.getElementById('search-button'),
    message: document.getElementById('status-message'),
    results: document.getElementById('results'),
    avatar: document.getElementById('teacher-avatar'),
    name: document.getElementById('teacher-name'),
    school: document.getElementById('teacher-school'),
    passport: document.getElementById('teacher-passport'),
    area: document.getElementById('teacher-area'),
    updated: document.getElementById('teacher-updated'),
    updatedAt: document.getElementById('updated-at'),
    progressValue: document.getElementById('progress-value'),
    progressPercent: document.getElementById('progress-percent'),
    progressFill: document.getElementById('progress-fill'),
    timeline: document.getElementById('timeline')
  };

  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const passportNo = elements.input.value.trim();

    if (!passportNo) {
      showMessage('Please enter your passport number.', 'error');
      elements.input.focus();
      return;
    }

    setLoading(true);
    showMessage('Checking your latest status...', 'info');

    try {
      const response = await callApi({
        action: 'lookupTeacherStatus',
        passportNo
      });

      if (!response.ok || !response.teacher) {
        throw new Error(response.error || 'No record found. Please check the passport number and try again.');
      }

      renderTeacher(normalizeTeacher(response.teacher));
      clearMessage();
    } catch (error) {
      elements.results.classList.remove('visible');
      showMessage(error.message || 'Unable to load status right now. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  });

  async function callApi(payload) {
    if (!API_URL) {
      return mockLookup(payload);
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.warn('Status API unavailable.', error);
      throw error;
    }
  }

  async function mockLookup(payload) {
    await wait(280);
    const key = String(payload.passportNo || '').trim().toUpperCase();
    const teacher = MOCK_TEACHERS[key];

    if (!teacher) {
      return {
        ok: false,
        error: 'No record found. Please check the passport number and try again.'
      };
    }

    return {
      ok: true,
      teacher
    };
  }

  function normalizeTeacher(teacher) {
    const steps = Array.isArray(teacher.steps) ? teacher.steps : [];

    return {
      name: teacher.name || 'Teacher',
      passportNo: teacher.passportNo || maskPassport(teacher.passport || ''),
      school: teacher.school || 'School pending update',
      area: teacher.area || teacher.province || teacher.consultantArea || 'Pending update',
      visaType: teacher.visaType || teacher.visa || 'Non-B Visa',
      lastUpdated: teacher.lastUpdated || teacher.updatedAt || todayLabel(),
      overallProgress: normalizeProgress(teacher.overallProgress, steps),
      steps: normalizeSteps(steps)
    };
  }

  function normalizeSteps(rawSteps) {
    return STEP_TITLES.map((title, index) => {
      const found = rawSteps.find(step => String(step.title || '').toLowerCase() === title.toLowerCase()) || rawSteps[index] || {};
      const status = normalizeStatus(found.status);

      return {
        title,
        status,
        procedure: found.procedure || found.description || defaultProcedure(status),
        expectedDate: found.expectedDate || found.expected || 'To be confirmed',
        details: found.details || found.note || 'MediaKids will update this step when the status changes.'
      };
    });
  }

  function normalizeStatus(status) {
    const value = String(status || '').trim().toLowerCase();
    if (['completed', 'complete', 'done', 'finished', 'approved', 'received'].includes(value)) return 'Completed';
    if (['in progress', 'processing', 'submitted', 'waiting', 'active'].includes(value)) return 'In Progress';
    return 'Pending';
  }

  function normalizeProgress(progress, steps) {
    const text = String(progress || '').trim();
    const match = text.match(/(\d+)\s*\/\s*6/);
    if (match) return `${Math.min(Number(match[1]), 6)}/6`;

    const completed = steps.filter(step => normalizeStatus(step.status) === 'Completed').length;
    return `${completed}/6`;
  }

  function renderTeacher(teacher) {
    const completed = Number((teacher.overallProgress.match(/\d+/) || ['0'])[0]);
    const percent = Math.round((completed / 6) * 100);

    elements.avatar.textContent = initials(teacher.name);
    elements.name.textContent = teacher.name;
    elements.school.textContent = teacher.school;
    elements.passport.textContent = teacher.passportNo;
    elements.area.textContent = teacher.visaType;
    elements.updated.textContent = teacher.lastUpdated;
    elements.updatedAt.textContent = `Updated ${teacher.lastUpdated}`;
    elements.progressValue.textContent = `${completed} of 6 stages active`;
    elements.progressPercent.textContent = `${percent}%`;
    elements.progressFill.style.width = `${percent}%`;

    elements.timeline.innerHTML = teacher.steps.map(renderStep).join('');
    elements.results.classList.add('visible');
    elements.results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderStep(step) {
    const visualState = step.status === 'Completed' ? 'completed' : step.status === 'In Progress' ? 'active' : step.title === 'Tax ID' ? 'warning' : 'pending';
    const pillState = visualState === 'warning' ? 'pending' : visualState;
    const label = step.status === 'Completed' && step.title.includes('Non-B') ? 'Approved' : step.status === 'Pending' && step.title.includes('Visa Extension') ? 'Not Required' : step.status;
    const expectedText = String(step.expectedDate || '').replace(/^expected\s*:?\s*/i, '');
    const dateLabel = step.status === 'Completed' && step.expectedDate === 'Completed'
      ? step.title.includes('Non-B') ? 'Expires: 12 Oct 2025' : 'Expires: 10 Aug 2026'
      : step.status === 'Pending' ? '—' : `Expected: ${expectedText}`;

    return `
      <article class="step ${visualState}">
        <div class="step-dot ${visualState}" aria-hidden="true"></div>
        <div class="step-icon" aria-hidden="true">${stepIcon(step.title)}</div>
        <div class="step-content">
          <h3 class="step-title">${escapeHtml(step.title)}</h3>
          <div class="step-fields">
            ${renderInfoField('Procedure', step.procedure, 'procedure')}
            ${renderDetailFields(step.details)}
          </div>
        </div>
        <div class="step-side">
          <span class="status-pill ${pillState}">${escapeHtml(label)}</span>
          <div class="step-date">
            <span class="step-date-label">Timeline</span>
            <span>${escapeHtml(dateLabel)}</span>
          </div>
        </div>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </article>
    `;
  }

  function renderDetailFields(details) {
    const text = String(details || '').trim();
    if (!text) {
      return renderInfoField('Current action', 'MediaKids will update this step when the status changes.', 'detail');
    }

    const parsed = text
      .split(/\s*,\s*/)
      .map(part => {
        const match = part.match(/^([^:]+):\s*(.+)$/);
        if (!match) return null;
        return {
          label: cleanLabel(match[1]),
          value: match[2].trim()
        };
      })
      .filter(Boolean);

    if (parsed.length > 0) {
      return parsed.map(item => renderInfoField(item.label, item.value, 'detail')).join('');
    }

    return renderInfoField('Current action', text, 'detail wide');
  }

  function renderInfoField(label, value, modifier = '') {
    const text = String(value || '').trim();
    if (!text) return '';

    return `
      <div class="step-field ${modifier}">
        <span class="step-field-label">${escapeHtml(label)}</span>
        <span class="step-field-value">${escapeHtml(text)}</span>
      </div>
    `;
  }

  function cleanLabel(label) {
    return String(label || '')
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  function stepIcon(title) {
    if (title.includes('Krusapa')) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"></path><path d="m9.5 12 1.7 1.7 3.4-4"></path></svg>';
    }
    if (title.includes('Work Permit')) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5h6v2M8 12h8"></path></svg>';
    }
    if (title.includes('Tax')) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 3h10v18H7z"></path><path d="M9.5 8h5M9.5 12h5M9.5 16h3"></path></svg>';
    }
    if (title.includes('Bank')) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 10h18L12 4z"></path><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18"></path></svg>';
    }
    if (title.includes('Extension')) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h4"></path></svg>';
    }
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z"></path><path d="m9.5 12 1.7 1.7 3.4-4"></path></svg>';
  }

  function showMessage(text, type) {
    elements.message.className = `message ${type}`;
    elements.message.textContent = text;
  }

  function clearMessage() {
    elements.message.className = 'message';
    elements.message.textContent = '';
  }

  function setLoading(isLoading) {
    elements.button.disabled = isLoading;
    elements.button.querySelector('span').textContent = isLoading ? 'Checking' : 'Search';
  }

  function defaultProcedure(status) {
    if (status === 'Completed') return 'This document step has been completed.';
    if (status === 'In Progress') return 'The MediaKids team is currently processing this step.';
    return 'This step is waiting for the previous document stage to finish.';
  }

  function initials(name) {
    return String(name || 'MK')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

  function maskPassport(value) {
    const text = String(value || '').trim();
    if (text.length <= 4) return text ? '****' : '-';
    return `${text.slice(0, 2)}${'*'.repeat(Math.max(text.length - 4, 3))}${text.slice(-2)}`;
  }

  function todayLabel() {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date());
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }
})();
