(() => {
  const API_URL = window.MEDIAKIDS_STAFF_API_URL || 'https://script.google.com/macros/s/AKfycbxsAOwx3IEIT-M38BhxTFFRl9kcqVu6niXzKEwHb8na3uXbQG1Jpfo6_TSkjAHVuH2Q/exec';
  const SESSION_KEY = 'mediakids_staff_session';

  const state = {
    department: 'Consultant',
    sessionToken: '',
    teachers: [],
    selectedTeacher: null,
    templates: [],
    templateResponse: null,
    selectedAreaKey: '',
    selectedSchoolKey: '',
    activeDocFilter: 'All',
    selectedTemplateIds: new Set(),
    preview: [],
    hasWarnings: false
  };

  const mockTeachers = [
    {
      id: 'AB9876543',
      name: 'John Robert Smith',
      passportNo: 'AB9876543',
      school: 'Anuban Nangrong School',
      consultantArea: 'Esan 2',
      province: 'Buriram',
      overallProgress: '4/6'
    },
    {
      id: 'CD1122334',
      name: 'Sarah Jane Connor',
      passportNo: 'CD1122334',
      school: 'Nangrong Pittayakom School',
      consultantArea: 'Esan 2',
      province: 'Buriram',
      overallProgress: '5/6'
    },
    {
      id: 'EF5566778',
      name: 'Michael James Lee',
      passportNo: 'EF5566778',
      school: 'Suwannaphum School',
      consultantArea: 'Esan 2',
      province: 'Roi Et',
      overallProgress: '3/6'
    }
  ];

  const mockTemplateMap = {
    AB9876543: {
      matched: true,
      areaName: 'Esan 2',
      schoolName: 'Anuban Nangrong School',
      documents: [
        { tabId: 'doc-nonb-nangrong', title: 'ขอ Non-B ตปท นางรอง' },
        { tabId: 'doc-nonb-lao-nangrong', title: 'ขอ Non-B ลาว นางรอง' },
        { tabId: 'doc-teacher-nangrong', title: 'ขอ ครู นางรอง' },
        { tabId: 'doc-workpermit-nangrong', title: 'ขอเวิร์ค นางรอง' },
        { tabId: 'doc-tax-nangrong', title: 'ขอเลขภาษี Tax นางรอง' },
        { tabId: 'doc-visa-extension-nangrong', title: 'ต่อวีซ่า นางรอง' }
      ]
    },
    CD1122334: {
      matched: true,
      areaName: 'Esan 2',
      schoolName: 'Nangrong Pittayakom School',
      documents: [
        { tabId: 'doc-nonb-pitta', title: 'ขอ Non-B ตปท นางรองพิทยาคม' },
        { tabId: 'doc-workpermit-pitta', title: 'ขอเวิร์ค นางรองพิทยาคม' },
        { tabId: 'doc-bank-pitta', title: 'เปิดบัญชี Bank นางรองพิทยาคม' }
      ]
    },
    EF5566778: {
      matched: true,
      areaName: 'Esan 2',
      schoolName: 'Suwannaphum School',
      documents: [
        { tabId: 'doc-nonb-suwan', title: 'ขอ Non-B ตปท ราชี' },
        { tabId: 'doc-attach16-suwan', title: 'แนบท้าย 16' },
        { tabId: 'doc-tax-suwan', title: 'ขอเลขภาษี Tax ราชี' }
      ]
    }
  };

  const mockTagData = {
    TeacherName: 'John Robert Smith',
    PassportNo: 'AB9876543',
    School: 'Anuban Nangrong School',
    ConsultantArea: 'Esan 2',
    Nationality: 'American',
    VisaType: 'Non-B',
    WorkPermitStatus: 'Completed',
    TaxStatus: 'In Progress',
    TodayDateTH: '24 พฤษภาคม 2569'
  };

  const el = {
    loginScreen: document.getElementById('login-screen'),
    portal: document.getElementById('portal'),
    loginForm: document.getElementById('login-form'),
    passcodeInput: document.getElementById('passcode-input'),
    loginButton: document.getElementById('login-button'),
    loginError: document.getElementById('login-error'),
    loginFoot: document.querySelector('.login-foot'),
    departmentButtons: Array.from(document.querySelectorAll('.dept-btn[data-department]')),
    logoutButton: document.getElementById('logout-button'),
    userChip: document.getElementById('user-chip'),
    teacherSearch: document.getElementById('teacher-search'),
    teacherCount: document.getElementById('teacher-count'),
    teacherList: document.getElementById('teacher-list'),
    templateSearch: document.getElementById('template-search'),
    refreshTemplatesButton: document.getElementById('refresh-templates-button'),
    templateList: document.getElementById('template-list'),
    filterChips: Array.from(document.querySelectorAll('.filter-chip[data-doc-filter]')),
    selectionStrip: document.getElementById('selection-strip'),
    selectedProfile: document.getElementById('selected-profile'),
    profileAvatar: document.getElementById('profile-avatar'),
    profileName: document.getElementById('profile-name'),
    profileMeta: document.getElementById('profile-meta'),
    previewEmpty: document.getElementById('preview-empty'),
    previewList: document.getElementById('preview-list'),
    warningBox: document.getElementById('warning-box'),
    confirmRow: document.getElementById('confirm-row'),
    confirmWarning: document.getElementById('confirm-warning'),
    generateButton: document.getElementById('generate-button'),
    resultList: document.getElementById('result-list')
  };

  initialize();

  function initialize() {
    const saved = readSession();
    if (saved?.sessionToken) {
      state.sessionToken = saved.sessionToken;
      state.department = saved.department || 'Consultant';
      showPortal();
    }

    el.departmentButtons.forEach(button => {
      button.addEventListener('click', () => {
        state.department = button.dataset.department;
        el.departmentButtons.forEach(item => {
          item.classList.toggle('active', item === button);
          item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
        });
      });
    });

    el.loginForm.addEventListener('submit', handleLogin);
    el.logoutButton.addEventListener('click', logout);
    el.teacherSearch.addEventListener('input', debounce(searchTeachers, 180));
    el.templateSearch.addEventListener('input', debounce(renderTemplates, 120));
    el.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        setActiveDocFilter(chip.dataset.docFilter || 'All');
        renderTemplates();
      });
    });
    el.refreshTemplatesButton.addEventListener('click', () => {
      if (state.selectedTeacher) loadTemplates(state.selectedTeacher.id);
    });
    el.confirmWarning.addEventListener('change', updateGenerateState);
    el.generateButton.addEventListener('click', generateDocuments);
  }

  async function handleLogin(event) {
    event.preventDefault();
    const passcode = el.passcodeInput.value.trim();

    if (!passcode) {
      showLoginError('Please enter the department passcode.');
      return;
    }

    setButtonLoading(el.loginButton, true, 'Verifying');
    clearLoginError();

    try {
      const response = await callApi({
        action: 'staffLogin',
        department: state.department,
        passcode
      });

      if (!response.ok || !response.sessionToken) {
        throw new Error(response.error || 'Invalid department or passcode.');
      }

      state.sessionToken = response.sessionToken;
      state.department = response.department || state.department;
      writeSession({ sessionToken: state.sessionToken, department: state.department });
      el.passcodeInput.value = '';
      showPortal();
    } catch (error) {
      showLoginError(error.message || 'Unable to sign in.');
    } finally {
      setButtonLoading(el.loginButton, false, 'Continue');
    }
  }

  function showPortal() {
    document.body.classList.add('is-portal');
    el.loginScreen.style.display = 'none';
    if (el.loginFoot) el.loginFoot.style.display = 'none';
    el.portal.classList.add('visible');
    el.userChip.textContent = 'CO';
    searchTeachers();
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    state.sessionToken = '';
    state.teachers = [];
    state.selectedTeacher = null;
    state.templates = [];
    state.templateResponse = null;
    state.selectedAreaKey = '';
    state.selectedSchoolKey = '';
    setActiveDocFilter('All');
    state.selectedTemplateIds.clear();
    state.preview = [];
    document.body.classList.remove('is-portal');
    el.portal.classList.remove('visible');
    el.loginScreen.style.display = '';
    if (el.loginFoot) el.loginFoot.style.display = '';
    el.teacherSearch.value = '';
    resetWorkspace();
  }

  async function searchTeachers() {
    setPanelLoading(el.teacherList, 'Searching teacher records...');

    try {
      const response = await callApi({
        action: 'searchTeachers',
        query: el.teacherSearch.value.trim(),
        sessionToken: state.sessionToken
      });

      if (!response.ok) {
        throw new Error(response.error || 'Unable to search teachers.');
      }

      state.teachers = response.teachers || [];
      renderTeacherList();
    } catch (error) {
      el.teacherList.innerHTML = emptyState(error.message || 'Unable to search teachers.');
    }
  }

  function renderTeacherList() {
    if (el.teacherCount) {
      const suffix = state.teachers.length === 1 ? 'teacher' : 'teachers';
      el.teacherCount.textContent = `${state.teachers.length} ${suffix} found`;
    }

    if (!state.teachers.length) {
      el.teacherList.innerHTML = emptyState('No matching teachers found.');
      return;
    }

    el.teacherList.innerHTML = state.teachers.map(teacher => {
      const active = state.selectedTeacher?.id === teacher.id ? ' active' : '';
      const statusLabel = teacher.overallProgress === '5/6' ? 'In Progress' : teacher.overallProgress === '3/6' ? 'Not Started' : 'Active';
      const level = teacher.overallProgress === '5/6' ? 'Secondary' : 'Primary';
      const city = teacher.province || 'Bangkok';
      return `
        <button class="teacher-card${active}" type="button" data-teacher-id="${escapeAttr(teacher.id)}">
          <span class="teacher-initials">${escapeHtml(initials(teacher.name))}</span>
          <span>
            <h3 class="teacher-name">${escapeHtml(teacher.name)}</h3>
            <p class="teacher-meta">${escapeHtml(teacher.school)}</p>
            <span class="teacher-pills">
              <span class="mini-pill">${escapeHtml(level)}</span>
              <span class="mini-pill">${escapeHtml(city)}</span>
              <span class="mini-pill">▣ ${escapeHtml(teacher.passportNo || '')}</span>
            </span>
          </span>
          <span class="status-label">
            <span class="status-dot"></span>
            ${escapeHtml(statusLabel)}
          </span>
        </button>
      `;
    }).join('');

    el.teacherList.querySelectorAll('.teacher-card').forEach(card => {
      card.addEventListener('click', () => {
        const teacher = state.teachers.find(item => item.id === card.dataset.teacherId);
        if (teacher) selectTeacher(teacher);
      });
    });
  }

  async function selectTeacher(teacher) {
    state.selectedTeacher = teacher;
    state.selectedTemplateIds.clear();
    state.preview = [];
    state.hasWarnings = false;
    state.selectedAreaKey = '';
    state.selectedSchoolKey = '';
    setActiveDocFilter('All');
    el.resultList.innerHTML = '';
    el.confirmWarning.checked = false;
    el.templateSearch.value = '';
    renderSelectedProfile();
    renderTeacherList();
    updateSelectionStrip();
    resetPreview();
    await loadTemplates(teacher.id);
  }

  function renderSelectedProfile() {
    const teacher = state.selectedTeacher;
    if (!teacher) {
      el.selectedProfile.classList.remove('visible');
      return;
    }

    el.selectedProfile.classList.add('visible');
    el.profileAvatar.textContent = initials(teacher.name);
    el.profileName.textContent = teacher.name;
    el.profileMeta.textContent = `${teacher.school} · ${teacher.passportNo} · ${teacher.consultantArea || teacher.province || 'Area pending'}`;
  }

  async function loadTemplates(teacherId) {
    setPanelLoading(el.templateList, 'Loading Google Doc tab tree...');

    try {
      const response = await callApi({
        action: 'listTemplatesForTeacher',
        teacherId,
        sessionToken: state.sessionToken
      });

      if (!response.ok) {
        throw new Error(response.error || 'Unable to load templates.');
      }

      state.templateResponse = response;
      const matchedIds = new Set((response.matchedDocuments || response.documents || []).map(template => template.tabId));
      const allDocuments = response.allDocuments || response.documents || [];
      state.templates = allDocuments.map(template => ({
        ...template,
        recommended: Boolean(template.recommended || matchedIds.has(template.tabId))
      }));
      syncTemplateNavigation(buildLibraryTree(getCategoryTemplates()));
      renderTemplates();
    } catch (error) {
      state.templates = [];
      state.templateResponse = null;
      el.templateList.innerHTML = emptyState(error.message || 'Unable to load templates.');
    } finally {
      updateSelectionStrip();
      updateGenerateState();
    }
  }

  function renderTemplates() {
    const response = state.templateResponse || {};
    if (!state.templates.length) {
      el.templateList.innerHTML = emptyState(response.warning || 'No visible document templates found in the Google Doc library yet.');
      return;
    }

    const query = el.templateSearch.value.trim().toLowerCase();
    const categoryTemplates = getCategoryTemplates();
    const recommendedCount = state.templates.filter(template => template.recommended).length;
    const hint = buildTemplateHint(response, recommendedCount, state.templates.length);

    if (!categoryTemplates.length) {
      el.templateList.innerHTML = `
        ${hint}
        ${emptyState('No document templates match this category.')}
      `;
      return;
    }

    if (query) {
      const visibleTemplates = categoryTemplates.filter(template => matchesTemplateQuery(template, query));
      if (!visibleTemplates.length) {
        el.templateList.innerHTML = `
          ${hint}
          ${emptyState('No document templates match this search.')}
        `;
        return;
      }

      el.templateList.innerHTML = `
        ${hint}
        <div class="library-search-head">
          <strong>Search results</strong>
          <span>${visibleTemplates.length} documents</span>
        </div>
        ${renderSearchGroups(visibleTemplates)}
      `;
      bindTemplateNavigation();
      return;
    }

    const tree = buildLibraryTree(categoryTemplates);
    syncTemplateNavigation(tree);
    const selectedArea = tree.find(area => area.key === state.selectedAreaKey) || tree[0];
    const selectedSchool = selectedArea?.schools.find(school => school.key === state.selectedSchoolKey) || selectedArea?.schools[0];
    const documents = selectedSchool?.documents || [];

    el.templateList.innerHTML = `
      ${hint}
      <div class="library-steps">
        <section class="library-step">
          <div class="library-step-head">
            <span class="step-index">1</span>
            <strong>Area</strong>
          </div>
          <div class="library-card-list">
            ${tree.map(renderAreaCard).join('')}
          </div>
        </section>
        <section class="library-step">
          <div class="library-step-head">
            <span class="step-index">2</span>
            <strong>School</strong>
            ${selectedArea ? `<em>${escapeHtml(selectedArea.name)}</em>` : ''}
          </div>
          <div class="library-card-list">
            ${selectedArea ? selectedArea.schools.map(renderSchoolCard).join('') : emptyState('Choose an area first.')}
          </div>
        </section>
        <section class="library-step">
          <div class="library-step-head">
            <span class="step-index">3</span>
            <strong>Documents</strong>
            ${selectedSchool ? `<em>${escapeHtml(selectedSchool.name)}</em>` : ''}
          </div>
          <div class="doc-list">
            ${documents.length ? documents.map(renderTemplateCard).join('') : emptyState('Choose a school to see its documents.')}
          </div>
        </section>
      </div>
    `;

    bindTemplateNavigation();
  }

  function buildTemplateHint(response, recommendedCount, totalCount) {
    const base = response.warning
      ? `No exact school match yet. Showing all ${totalCount} available templates. ${response.warning}`
      : recommendedCount
        ? `${recommendedCount} templates match this teacher first. You can still choose by Area and School.`
        : `Showing ${totalCount} available templates by Area and School.`;

    return `<div class="template-hint">${escapeHtml(base)}</div>`;
  }

  function getCategoryTemplates() {
    if (state.activeDocFilter === 'All') return state.templates;
    return state.templates.filter(template => docCategory(template.title) === state.activeDocFilter);
  }

  function buildLibraryTree(templates) {
    const areas = new Map();

    templates.forEach(template => {
      const areaKey = templateAreaKey(template);
      const schoolKey = templateSchoolKey(template);

      if (!areas.has(areaKey)) {
        areas.set(areaKey, {
          key: areaKey,
          name: template.areaName || 'Unassigned Area',
          documentsCount: 0,
          recommendedCount: 0,
          schoolsMap: new Map()
        });
      }

      const area = areas.get(areaKey);
      if (!area.schoolsMap.has(schoolKey)) {
        area.schoolsMap.set(schoolKey, {
          key: schoolKey,
          areaKey: areaKey,
          name: template.schoolName || 'Unassigned School',
          documents: [],
          recommendedCount: 0
        });
      }

      const school = area.schoolsMap.get(schoolKey);
      school.documents.push(template);
      area.documentsCount += 1;

      if (template.recommended) {
        area.recommendedCount += 1;
        school.recommendedCount += 1;
      }
    });

    return Array.from(areas.values()).map(area => ({
      ...area,
      schools: Array.from(area.schoolsMap.values()).sort(sortLibraryItems)
    })).sort(sortLibraryItems);
  }

  function syncTemplateNavigation(tree) {
    if (!tree.length) {
      state.selectedAreaKey = '';
      state.selectedSchoolKey = '';
      return;
    }

    const currentArea = tree.find(area => area.key === state.selectedAreaKey);
    const selectedArea = currentArea || tree.find(area => area.recommendedCount > 0) || tree[0];
    state.selectedAreaKey = selectedArea.key;

    const currentSchool = selectedArea.schools.find(school => school.key === state.selectedSchoolKey);
    const selectedSchool = currentSchool || selectedArea.schools.find(school => school.recommendedCount > 0) || selectedArea.schools[0];
    state.selectedSchoolKey = selectedSchool ? selectedSchool.key : '';
  }

  function selectArea(areaKey) {
    const tree = buildLibraryTree(getCategoryTemplates());
    const area = tree.find(item => item.key === areaKey);
    if (!area) return;

    state.selectedAreaKey = area.key;
    const school = area.schools.find(item => item.recommendedCount > 0) || area.schools[0];
    state.selectedSchoolKey = school ? school.key : '';
    renderTemplates();
  }

  function selectSchool(schoolKey) {
    state.selectedSchoolKey = schoolKey;
    renderTemplates();
  }

  function renderAreaCard(area) {
    const active = area.key === state.selectedAreaKey ? ' active' : '';
    const schoolCount = area.schools.length;
    return `
      <button class="library-card${active}" type="button" data-area-key="${escapeAttr(area.key)}">
        <span>
          <strong>${escapeHtml(area.name)}</strong>
          <small>${schoolCount} school${schoolCount === 1 ? '' : 's'} · ${area.documentsCount} document${area.documentsCount === 1 ? '' : 's'}</small>
        </span>
        ${area.recommendedCount ? '<span class="doc-badge">Match</span>' : ''}
      </button>
    `;
  }

  function renderSchoolCard(school) {
    const active = school.key === state.selectedSchoolKey ? ' active' : '';
    return `
      <button class="library-card school-card${active}" type="button" data-school-key="${escapeAttr(school.key)}">
        <span>
          <strong>${escapeHtml(school.name)}</strong>
          <small>${school.documents.length} document${school.documents.length === 1 ? '' : 's'}</small>
        </span>
        ${school.recommendedCount ? '<span class="doc-badge">Match</span>' : ''}
      </button>
    `;
  }

  function renderSearchGroups(templates) {
    const tree = buildLibraryTree(templates);
    return tree.map(area => area.schools.map(school => `
      <div class="template-group-title">${escapeHtml(area.name)} / ${escapeHtml(school.name)}</div>
      ${school.documents.map(renderTemplateCard).join('')}
    `).join('')).join('');
  }

  function bindTemplateNavigation() {
    el.templateList.querySelectorAll('[data-area-key]').forEach(card => {
      card.addEventListener('click', () => selectArea(card.dataset.areaKey));
    });

    el.templateList.querySelectorAll('[data-school-key]').forEach(card => {
      card.addEventListener('click', () => selectSchool(card.dataset.schoolKey));
    });

    el.templateList.querySelectorAll('.doc-card').forEach(card => {
      card.addEventListener('click', () => toggleTemplate(card.dataset.templateId));
    });
  }

  function renderTemplateCard(template) {
    const selected = state.selectedTemplateIds.has(template.tabId) ? ' selected' : '';
    const path = template.path || [template.areaName, template.schoolName].filter(Boolean).join(' / ');
    const meta = [docCategory(template.title), path].filter(Boolean).join(' · ');

    return `
      <button class="doc-card${selected}" type="button" data-template-id="${escapeAttr(template.tabId)}">
        <span class="doc-icon-tile" aria-hidden="true">${documentGlyph()}</span>
        <span>
          <span class="doc-title">${escapeHtml(cleanTemplateTitle(template.title))}</span>
          <span class="doc-meta">${escapeHtml(meta)}</span>
          ${template.recommended ? '<span class="doc-badge">Recommended</span>' : ''}
        </span>
        <span class="check" aria-hidden="true"></span>
      </button>
    `;
  }

  function matchesTemplateQuery(template, query) {
    if (!query) return true;
    const searchable = [
      template.title,
      cleanTemplateTitle(template.title),
      docCategory(template.title),
      template.areaName,
      template.schoolName,
      template.path
    ].filter(Boolean).join(' ').toLowerCase();
    return searchable.includes(query);
  }

  function templateAreaKey(template) {
    return template.areaTabId || `area:${template.areaName || 'Unassigned Area'}`;
  }

  function templateSchoolKey(template) {
    return template.schoolTabId || `${templateAreaKey(template)}::school:${template.schoolName || 'Unassigned School'}`;
  }

  function sortLibraryItems(a, b) {
    const priority = Number(b.recommendedCount > 0) - Number(a.recommendedCount > 0);
    if (priority) return priority;
    return String(a.name).localeCompare(String(b.name), 'th');
  }

  function setActiveDocFilter(filter) {
    state.activeDocFilter = filter || 'All';
    el.filterChips.forEach(chip => {
      chip.classList.toggle('active', (chip.dataset.docFilter || 'All') === state.activeDocFilter);
    });
  }

  async function toggleTemplate(templateId) {
    if (state.selectedTemplateIds.has(templateId)) {
      state.selectedTemplateIds.delete(templateId);
    } else {
      state.selectedTemplateIds.add(templateId);
    }

    el.confirmWarning.checked = false;
    el.resultList.innerHTML = '';
    renderTemplates();
    updateSelectionStrip();

    if (state.selectedTemplateIds.size) {
      await previewTags();
    } else {
      resetPreview();
    }
  }

  async function previewTags() {
    if (!state.selectedTeacher || !state.selectedTemplateIds.size) return;
    el.previewEmpty.style.display = 'grid';
    el.previewEmpty.textContent = 'Previewing tag values...';
    el.previewList.innerHTML = '';
    el.warningBox.classList.remove('visible');
    el.confirmRow.classList.remove('visible');
    updateGenerateState();

    try {
      const response = await callApi({
        action: 'previewTemplateTags',
        teacherId: state.selectedTeacher.id,
        templateTabIds: Array.from(state.selectedTemplateIds),
        sessionToken: state.sessionToken
      });

      if (!response.ok) {
        throw new Error(response.error || 'Unable to preview tags.');
      }

      state.preview = response.preview || [];
      renderPreview();
    } catch (error) {
      el.previewEmpty.style.display = 'grid';
      el.previewEmpty.textContent = error.message || 'Unable to preview tags.';
      el.previewList.innerHTML = '';
      state.preview = [];
      state.hasWarnings = false;
    } finally {
      updateGenerateState();
    }
  }

  function renderPreview() {
    if (!state.preview.length) {
      el.previewEmpty.style.display = 'grid';
      el.previewEmpty.textContent = 'No tags found in the selected templates.';
      el.previewList.innerHTML = '';
      state.hasWarnings = false;
      return;
    }

    const warnings = [];
    el.previewEmpty.style.display = 'none';
    el.previewList.innerHTML = state.preview.map(item => {
      const resolved = item.resolved || {};
      const missing = item.missing || [];
      const unknown = item.unknown || [];

      missing.forEach(tag => warnings.push(`Missing value: ${tag} in ${item.title}`));
      unknown.forEach(tag => warnings.push(`Unknown tag: ${tag} in ${item.title}`));

      const rows = [
        ...Object.entries(resolved).map(([tag, value]) => ({ tag, value })),
        ...missing.map(tag => ({ tag, value: 'Pending HR update' })),
        ...unknown.map(tag => ({ tag, value: 'Unknown tag' }))
      ];

      return `
        <article class="tag-card">
          <h4>${escapeHtml(cleanTemplateTitle(item.title || 'Template'))}</h4>
          ${rows.length ? rows.slice(0, 8).map(row => `
            <div class="tag-row">
              <span class="tag-name">${escapeHtml(row.tag)}</span>
              <span class="tag-value">${escapeHtml(row.value)}</span>
            </div>
          `).join('') : '<div class="tag-row"><span class="tag-name">No tags</span><span class="tag-value">This template has no replacement tags.</span></div>'}
        </article>
      `;
    }).join('');

    state.hasWarnings = warnings.length > 0;

    if (warnings.length) {
      el.warningBox.innerHTML = `
        <strong>${warnings.length} warning${warnings.length === 1 ? '' : 's'} found.</strong>
        <br>${warnings.slice(0, 6).map(escapeHtml).join('<br>')}
        ${warnings.length > 6 ? '<br>More warnings are hidden in this preview.' : ''}
      `;
      el.warningBox.classList.add('visible');
      el.confirmRow.classList.add('visible');
    } else {
      el.warningBox.classList.remove('visible');
      el.confirmRow.classList.remove('visible');
    }
  }

  async function generateDocuments() {
    if (!state.selectedTeacher || !state.selectedTemplateIds.size) return;
    if (state.hasWarnings && !el.confirmWarning.checked) return;

    setButtonLoading(el.generateButton, true, 'Generating');
    el.resultList.innerHTML = '';

    try {
      const response = await callApi({
        action: 'generateDocuments',
        teacherId: state.selectedTeacher.id,
        templateTabIds: Array.from(state.selectedTemplateIds),
        sessionToken: state.sessionToken
      });

      if (!response.ok) {
        throw new Error(response.error || 'Unable to generate documents.');
      }

      renderResults(response.documents || []);
    } catch (error) {
      el.resultList.innerHTML = `<div class="notice visible">${escapeHtml(error.message || 'Unable to generate documents.')}</div>`;
    } finally {
      setButtonLoading(el.generateButton, false, 'Generate selected documents');
      updateGenerateState();
    }
  }

  function renderResults(documents) {
    if (!documents.length) {
      el.resultList.innerHTML = '<div class="notice visible">No documents were generated.</div>';
      return;
    }

    el.resultList.innerHTML = documents.map(doc => {
      const openUrl = doc.url || '#';
      const downloadUrl = doc.downloadUrl || toExportUrl(openUrl, 'pdf');
      const cleanupNote = doc.cleanupPolicy || 'Generated files are moved to Trash automatically after the retention period.';
      return `
        <article class="result-card">
          <div class="result-top">
            <div>
              <h3 class="result-title">${escapeHtml(doc.filename || doc.title || 'Generated document')}</h3>
              <p class="result-meta">Exact Google Doc copy created. Only template tags were changed.</p>
              <p class="result-meta">${escapeHtml(cleanupNote)}</p>
            </div>
            <span class="mini-pill">Ready</span>
          </div>
          <div class="result-actions">
            <a class="link-btn" href="${escapeAttr(openUrl)}" target="_blank" rel="noopener">Open exact Doc</a>
            <a class="link-btn" href="${escapeAttr(downloadUrl)}" target="_blank" rel="noopener">Download PDF</a>
          </div>
        </article>
      `;
    }).join('');
  }

  function updateSelectionStrip() {
    const count = state.selectedTemplateIds.size;
    if (!count) {
      el.selectionStrip.classList.remove('visible');
      el.selectionStrip.textContent = '0 selected';
      return;
    }

    el.selectionStrip.classList.add('visible');
    el.selectionStrip.textContent = `${count} selected`;
  }

  function updateGenerateState() {
    const hasTeacher = Boolean(state.selectedTeacher);
    const hasTemplates = state.selectedTemplateIds.size > 0;
    const warningsOk = !state.hasWarnings || el.confirmWarning.checked;
    el.generateButton.disabled = !(hasTeacher && hasTemplates && warningsOk);
  }

  function resetPreview() {
    state.preview = [];
    state.hasWarnings = false;
    el.previewEmpty.style.display = 'grid';
    el.previewEmpty.textContent = 'Select a teacher and one or more document templates to preview tag values.';
    el.previewList.innerHTML = '';
    el.warningBox.classList.remove('visible');
    el.confirmRow.classList.remove('visible');
    updateGenerateState();
  }

  function resetWorkspace() {
    el.teacherList.innerHTML = emptyState('Enter a name, passport number, or school to begin.');
    if (el.templateSearch) el.templateSearch.value = '';
    state.templateResponse = null;
    el.templateList.innerHTML = emptyState('Select a teacher to load Area, School, and document folders.');
    el.selectionStrip.classList.remove('visible');
    el.selectedProfile.classList.remove('visible');
    resetPreview();
    el.resultList.innerHTML = '';
  }

  async function callApi(payload) {
    if (!API_URL) {
      return mockApi(payload);
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
      console.warn('Staff API unavailable.', error);
      throw error;
    }
  }

  async function mockApi(payload) {
    await wait(220);

    if (payload.action === 'staffLogin') {
      const passcode = String(payload.passcode || '').trim();
      if (payload.department !== 'Consultant' || passcode.length < 4) {
        return { ok: false, error: 'Invalid department or passcode.' };
      }
      return {
        ok: true,
        department: 'Consultant',
        sessionToken: `preview-session-${Date.now()}`
      };
    }

    if (!payload.sessionToken && payload.action !== 'staffLogin') {
      return { ok: false, error: 'Please sign in again.' };
    }

    if (payload.action === 'searchTeachers') {
      const query = String(payload.query || '').trim().toLowerCase();
      const teachers = !query
        ? mockTeachers
        : mockTeachers.filter(teacher => (
          teacher.name.toLowerCase().includes(query) ||
          teacher.passportNo.toLowerCase().includes(query) ||
          teacher.school.toLowerCase().includes(query)
        ));
      return { ok: true, teachers };
    }

    if (payload.action === 'listTemplatesForTeacher') {
      const mockResponse = mockTemplateMap[payload.teacherId] || { matched: false, warning: 'No matching template tree found.', documents: [] };
      const allDocuments = buildMockTemplateDocuments(payload.teacherId);
      const matchedDocuments = allDocuments.filter(template => template.mockTeacherId === payload.teacherId);
      return {
        ok: true,
        ...mockResponse,
        documents: matchedDocuments,
        matchedDocuments,
        allDocuments
      };
    }

    if (payload.action === 'previewTemplateTags') {
      const teacher = mockTeachers.find(item => item.id === payload.teacherId) || mockTeachers[0];
      const templates = findMockTemplatesByIds(payload.templateTabIds);
      return {
        ok: true,
        preview: templates.map((template, index) => ({
          tabId: template.tabId,
          title: template.title,
          resolved: {
            '{{TeacherName}}': teacher.name,
            '{{PassportNo}}': teacher.passportNo,
            '{{School}}': teacher.school,
            '{{ConsultantArea}}': teacher.consultantArea,
            '{{TodayDateTH}}': mockTagData.TodayDateTH,
            '{{Nationality}}': index === 0 ? mockTagData.Nationality : 'British'
          },
          missing: template.title.includes('ภาษี') ? ['{{DirectorTitle}}', '{{DirectorName}}'] : [],
          unknown: template.title.includes('ต่อวีซ่า') ? ['{{OldExtensionTag}}'] : []
        }))
      };
    }

    if (payload.action === 'generateDocuments') {
      const teacher = mockTeachers.find(item => item.id === payload.teacherId) || mockTeachers[0];
      const templates = findMockTemplatesByIds(payload.templateTabIds);
      const date = new Date().toISOString().slice(0, 10);
      const retentionMinutes = 10080;
      const autoTrashAt = new Date(Date.now() + retentionMinutes * 60 * 1000).toISOString();
      return {
        ok: true,
        cleanupPolicy: {
          enabled: true,
          retentionMinutes,
          message: 'Generated files are moved to Trash after 7 days since last edit.'
        },
        documents: templates.map(template => {
          const cleanTitle = cleanTemplateTitle(template.title);
          const url = `https://docs.google.com/document/d/preview-${encodeURIComponent(template.tabId)}/edit`;
          return {
            title: cleanTitle,
            filename: `${teacher.name} - ${cleanTitle} - ${date}`,
            url,
            downloadUrl: toExportUrl(url, 'pdf'),
            autoTrashAt,
            autoTrashAfterMinutes: retentionMinutes,
            cleanupPolicy: 'Generated files are moved to Trash after 7 days since last edit.',
            mimeType: 'application/vnd.google-apps.document'
          };
        })
      };
    }

    return { ok: false, error: 'Unknown preview action.' };
  }

  function buildMockTemplateDocuments(selectedTeacherId) {
    return Object.entries(mockTemplateMap).flatMap(([teacherId, response]) => (
      (response.documents || []).map(template => {
        const areaName = response.areaName || 'Esan 2';
        const schoolName = response.schoolName || 'Unassigned School';
        return {
          ...template,
          areaName,
          areaTabId: `mock-area-${slugValue(areaName)}`,
          schoolName,
          schoolTabId: `mock-school-${slugValue(schoolName)}`,
          path: `${areaName} / ${schoolName} / ${template.title}`,
          recommended: teacherId === selectedTeacherId,
          mockTeacherId: teacherId
        };
      })
    ));
  }

  function findMockTemplatesByIds(templateIds) {
    const selected = new Set(templateIds || []);
    return buildMockTemplateDocuments().filter(template => selected.has(template.tabId));
  }

  function slugValue(value) {
    return String(value || 'item').trim().toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
  }

  function showLoginError(message) {
    el.loginError.textContent = message;
    el.loginError.classList.add('visible');
  }

  function clearLoginError() {
    el.loginError.textContent = '';
    el.loginError.classList.remove('visible');
  }

  function setButtonLoading(button, isLoading, label) {
    button.disabled = isLoading;
    const span = button.querySelector('span');
    if (span) span.textContent = isLoading ? label : label;
  }

  function setPanelLoading(container, text) {
    container.innerHTML = emptyState(text);
  }

  function emptyState(text) {
    return `<div class="empty-state">${escapeHtml(text)}</div>`;
  }

  function cleanTemplateTitle(title) {
    return String(title || 'Document').replace(/^\d+\s*[-.]\s*/, '').trim();
  }

  function docCategory(title) {
    const value = String(title || '').toLowerCase();
    if (value.includes('work') || value.includes('เวิร์ค')) return 'Work Permit';
    if (value.includes('tax') || value.includes('ภาษี') || value.includes('bank') || value.includes('บัญชี')) return 'Finance';
    if (value.includes('ครู') || value.includes('teacher')) return 'School';
    return 'Visa';
  }

  function documentGlyph() {
    return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M7 3h7l4 4v14H7z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h4"></path></svg>';
  }

  function toExportUrl(url, format) {
    if (!url || url === '#') return '#';
    const tabMatch = String(url).match(/[?&]tab=([^&]+)/);
    let exportUrl = String(url).replace(/\/edit(\?.*)?$/, `/export?format=${encodeURIComponent(format)}`);
    if (tabMatch && !exportUrl.includes('tab=')) {
      exportUrl += `&tab=${tabMatch[1]}`;
    }
    return exportUrl;
  }

  function writeSession(value) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(value));
  }

  function readSession() {
    try {
      return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
    } catch {
      return null;
    }
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

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
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

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, '&#096;');
  }
})();
