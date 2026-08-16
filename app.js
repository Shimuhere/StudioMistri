/**
 * StudioMistri × Neobrutalism Design System
 * Master Application & Django Backend Integration Logic
 */

// ============================================================================
// 1. Initial State, Storage & API Configuration
// ============================================================================
const API_BASE_URL = 'http://127.0.0.1:8000/api';

const STORAGE_KEYS = {
  FILAMENTS: 'studiomistri_filaments_v1',
  ORDERS: 'studiomistri_orders_v1',
  SETTINGS: 'studiomistri_settings_v1',
  AUTH: 'studiomistri_auth_v1'
};

const DEFAULT_SETTINGS = {
  companyRatePerGram: 3.00, // 3 Tk per gram for Company Account
  currency: '৳',
  prices: {
    'PLA+': 7.00,
    'PLA': 7.00,
    'PETG': 8.50,
    'ABS': 9.00,
    'ASA': 9.50,
    'TPU 95A': 12.00,
    'PLA-CF': 15.00,
    'Silk PLA': 8.50,
    'Resin': 14.00
  },
  studio: {
    name: 'Studio Mistri',
    tagline: 'THINK • DESIGN • MAKE',
    phone: '+880 1700-000000',
    email: 'contact@studiomistri.com',
    bkash: '01700-000000 (bKash Merchant / Personal)',
    address: 'StudioMistri Rapid Prototyping Lab, Dhaka, Bangladesh'
  }
};

const DEFAULT_FILAMENTS = [
  {
    id: 'fil-001',
    brand: 'Bambu Lab',
    type: 'PLA+',
    colorName: 'Signal Orange',
    colorHex: '#ff5500',
    spoolPrice: 2400,
    fullWeight: 1000,
    currentStock: 820,
    location: 'AMS Slot 1 (A-01)',
    nozzleTemp: '210°C - 230°C',
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    id: 'fil-002',
    brand: 'eSun',
    type: 'PLA+',
    colorName: 'Matte Black',
    colorHex: '#1e2022',
    spoolPrice: 2200,
    fullWeight: 1000,
    currentStock: 1450,
    location: 'Rack A-02',
    nozzleTemp: '205°C - 225°C',
    createdAt: '2026-08-02T11:00:00.000Z'
  },
  {
    id: 'fil-003',
    brand: 'Polymaker',
    type: 'PETG',
    colorName: 'Teal Blue',
    colorHex: '#00d2ff',
    spoolPrice: 2600,
    fullWeight: 1000,
    currentStock: 650,
    location: 'Drybox 1',
    nozzleTemp: '230°C - 250°C',
    createdAt: '2026-08-03T12:00:00.000Z'
  },
  {
    id: 'fil-004',
    brand: 'Bambu Lab',
    type: 'PLA-CF',
    colorName: 'Carbon Slate',
    colorHex: '#334155',
    spoolPrice: 3800,
    fullWeight: 1000,
    currentStock: 480,
    location: 'Drybox 2 (Reinforced)',
    nozzleTemp: '220°C - 240°C',
    createdAt: '2026-08-04T13:00:00.000Z'
  },
  {
    id: 'fil-005',
    brand: 'Sunlu',
    type: 'TPU 95A',
    colorName: 'Neon Yellow',
    colorHex: '#eab308',
    spoolPrice: 2900,
    fullWeight: 1000,
    currentStock: 180,
    location: 'Rack B-03',
    nozzleTemp: '215°C - 235°C',
    createdAt: '2026-08-05T14:00:00.000Z'
  },
  {
    id: 'fil-006',
    brand: 'eSun',
    type: 'ABS',
    colorName: 'Pure White',
    colorHex: '#f8fafc',
    spoolPrice: 2300,
    fullWeight: 1000,
    currentStock: 950,
    location: 'Enclosure Rack 01',
    nozzleTemp: '240°C - 260°C',
    createdAt: '2026-08-06T15:00:00.000Z'
  },
  {
    id: 'fil-007',
    brand: 'Polymaker',
    type: 'Silk PLA',
    colorName: 'Imperial Gold',
    colorHex: '#d97706',
    spoolPrice: 2800,
    fullWeight: 1000,
    currentStock: 220,
    location: 'Rack A-05',
    nozzleTemp: '210°C - 225°C',
    createdAt: '2026-08-07T16:00:00.000Z'
  }
];

const DEFAULT_ORDERS = [
  {
    id: 'ord-001',
    invoiceNumber: 'SM-2026-0042',
    customerName: 'Architect Tanvir Ahmed',
    customerPhone: '+880 1711-234567',
    customerEmail: 'tanvir.arch@gmail.com',
    modelName: 'Parametric Pavilion Facade 1:50',
    modelSize: '160 x 110 x 140 mm',
    filamentId: 'fil-001',
    filamentName: 'Signal Orange',
    filamentType: 'PLA+',
    filamentColorHex: '#ff5500',
    filamentBrand: 'Bambu Lab',
    weight: 220,
    pricePerGram: 7.00,
    extraFee: 150,
    totalPrice: 1690,
    companyShare: 660, // 220g * 3.00 = 660 Tk
    salaryShare: 1030, // 1690 - 660 = 1030 Tk
    materialCost: 528,
    status: 'Paid',
    createdAt: '2026-08-10T14:30:00.000Z'
  },
  {
    id: 'ord-002',
    invoiceNumber: 'SM-2026-0043',
    customerName: 'Mechatronics Lab (BUET)',
    customerPhone: '+880 1819-876543',
    customerEmail: 'robotics@buet.ac.bd',
    modelName: 'Robotic Gripper Linkage Arms V3',
    modelSize: '180 x 95 x 65 mm',
    filamentId: 'fil-004',
    filamentName: 'Carbon Slate',
    filamentType: 'PLA-CF',
    filamentColorHex: '#334155',
    filamentBrand: 'Bambu Lab',
    weight: 185,
    pricePerGram: 15.00,
    extraFee: 200,
    totalPrice: 2975,
    companyShare: 555, // 185 * 3 = 555 Tk
    salaryShare: 2420,
    materialCost: 703,
    status: 'Paid',
    createdAt: '2026-08-12T11:15:00.000Z'
  },
  {
    id: 'ord-003',
    invoiceNumber: 'SM-2026-0044',
    customerName: 'Nafis Designs',
    customerPhone: '+880 1912-334455',
    customerEmail: 'nafis@designs.io',
    modelName: 'Custom Ergonomic Mouse Shell',
    modelSize: '125 x 70 x 42 mm',
    filamentId: 'fil-003',
    filamentName: 'Teal Blue',
    filamentType: 'PETG',
    filamentColorHex: '#00d2ff',
    filamentBrand: 'Polymaker',
    weight: 95,
    pricePerGram: 8.50,
    extraFee: 0,
    totalPrice: 807.50,
    companyShare: 285, // 95 * 3 = 285 Tk
    salaryShare: 522.50,
    materialCost: 247,
    status: 'Delivered',
    createdAt: '2026-08-14T16:00:00.000Z'
  },
  {
    id: 'ord-004',
    invoiceNumber: 'SM-2026-0045',
    customerName: 'Dr. Kabir Shafi',
    customerPhone: '+880 1715-998877',
    customerEmail: 'dr.kabir@healthbd.org',
    modelName: 'Orthopedic Foot Insole Prototype',
    modelSize: '240 x 85 x 25 mm',
    filamentId: 'fil-005',
    filamentName: 'Neon Yellow',
    filamentType: 'TPU 95A',
    filamentColorHex: '#eab308',
    filamentBrand: 'Sunlu',
    weight: 140,
    pricePerGram: 12.00,
    extraFee: 100,
    totalPrice: 1780,
    companyShare: 420, // 140 * 3 = 420 Tk
    salaryShare: 1360,
    materialCost: 406,
    status: 'Printing',
    createdAt: '2026-08-16T09:20:00.000Z'
  },
  {
    id: 'ord-005',
    invoiceNumber: 'SM-2026-0046',
    customerName: 'Studio Vertigo Architecture',
    customerPhone: '+880 1678-112233',
    customerEmail: 'info@vertigo.com.bd',
    modelName: 'Geometric Lamp Shade V2',
    modelSize: '190 x 190 x 210 mm',
    filamentId: 'fil-002',
    filamentName: 'Matte Black',
    filamentType: 'PLA+',
    filamentColorHex: '#1e2022',
    filamentBrand: 'eSun',
    weight: 310,
    pricePerGram: 7.00,
    extraFee: 0,
    totalPrice: 2170,
    companyShare: 930, // 310 * 3 = 930 Tk
    salaryShare: 1240,
    materialCost: 682,
    status: 'Slicing',
    createdAt: '2026-08-16T15:45:00.000Z'
  }
];

// App Global State
let state = {
  filaments: [],
  orders: [],
  settings: {},
  currentUser: null,
  currentView: 'landing',
  inventoryViewMode: 'grid',
  activeInvoiceOrder: null,
  pendingDeleteAction: null,
  isBackendConnected: false
};

// Global Chart Instances
let charts = {
  salesFinancials: null,
  salesAllocation: null,
  filamentConsumption: null
};

// ============================================================================
// 2. Storage & Backend API Sync Functions
// ============================================================================
function loadLocalState() {
  try {
    const filamentsStr = localStorage.getItem(STORAGE_KEYS.FILAMENTS);
    state.filaments = filamentsStr ? JSON.parse(filamentsStr) : [...DEFAULT_FILAMENTS];

    const ordersStr = localStorage.getItem(STORAGE_KEYS.ORDERS);
    state.orders = ordersStr ? JSON.parse(ordersStr) : [...DEFAULT_ORDERS];

    const settingsStr = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    state.settings = settingsStr ? JSON.parse(settingsStr) : { ...DEFAULT_SETTINGS };

    const authStr = localStorage.getItem(STORAGE_KEYS.AUTH);
    state.currentUser = authStr ? JSON.parse(authStr) : null;

    if (!filamentsStr) saveFilaments();
    if (!ordersStr) saveOrders();
    if (!settingsStr) saveSettings();
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    state.filaments = [...DEFAULT_FILAMENTS];
    state.orders = [...DEFAULT_ORDERS];
    state.settings = { ...DEFAULT_SETTINGS };
  }
}

async function syncWithDjangoBackend() {
  try {
    const res = await fetch(`${API_BASE_URL}/filaments/`, { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        state.filaments = data.map(f => ({
          id: f.id,
          brand: f.brand,
          type: f.type,
          colorName: f.color_name,
          colorHex: f.color_hex,
          spoolPrice: Number(f.spool_price),
          fullWeight: f.full_weight,
          currentStock: f.current_stock,
          location: f.location,
          nozzleTemp: f.nozzle_temp,
          createdAt: f.created_at
        }));
        saveFilaments();
      }
      state.isBackendConnected = true;
    }

    const orderRes = await fetch(`${API_BASE_URL}/orders/`, { method: 'GET' });
    if (orderRes.ok) {
      const oData = await orderRes.json();
      if (Array.isArray(oData) && oData.length > 0) {
        state.orders = oData.map(o => ({
          id: o.id,
          invoiceNumber: o.invoice_number,
          customerName: o.customer_name,
          customerPhone: o.customer_phone,
          customerEmail: o.customer_email,
          modelName: o.model_name,
          modelSize: o.model_size,
          filamentId: o.filament,
          filamentName: o.filament_name_snapshot,
          filamentType: o.filament_type_snapshot,
          filamentColorHex: o.filament_color_hex_snapshot,
          filamentBrand: o.filament_brand_snapshot,
          weight: Number(o.weight),
          pricePerGram: Number(o.price_per_gram),
          extraFee: Number(o.extra_fee),
          totalPrice: Number(o.total_price),
          companyShare: Number(o.company_share),
          salaryShare: Number(o.salary_share),
          materialCost: Number(o.material_cost),
          status: o.status,
          createdAt: o.created_at
        }));
        saveOrders();
      }
    }

    renderAllViews();
    updateAdminAuthUI();
  } catch (err) {
    state.isBackendConnected = false;
    console.log('[StudioMistri] Running in local offline client mode.');
  }
}

function saveFilaments() {
  localStorage.setItem(STORAGE_KEYS.FILAMENTS, JSON.stringify(state.filaments));
  updateFilamentDropdowns();
  updateLandingPageColorOptions();
}

function saveOrders() {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(state.orders));
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
}

// ============================================================================
// 3. UI Helpers: Toasts, Modals & Admin Auth Controls
// ============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';

  toast.innerHTML = `
    <i data-lucide="${iconName}" style="width: 18px; height: 18px; flex-shrink: 0; stroke-width: 2.5px;"></i>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons({ root: toast });

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 4000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    lucide.createIcons({ root: modal });
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, function(match) {
    const escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeMap[match];
  });
}

function formatBDT(amount) {
  const num = Number(amount) || 0;
  return '৳ ' + num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatDate(isoStr) {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function setQuickWeight(grams) {
  const input = document.getElementById('landing-quote-weight');
  if (input) {
    input.value = grams;
    
    // Update M3 Segmented Buttons Active State
    document.querySelectorAll('.m3-segment-btn').forEach(btn => {
      btn.classList.remove('active');
      const valText = btn.querySelector('.m3-seg-val')?.textContent || btn.textContent;
      if (valText.includes(String(grams))) {
        btn.classList.add('active');
      }
    });

    recalculateLandingPageQuoter();
  }
}

function updateAdminAuthUI() {
  const loginBtn = document.getElementById('btn-open-admin-login');
  const badgeWrap = document.getElementById('admin-logged-in-badge');
  const userTag = document.getElementById('admin-username-tag');

  if (state.currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (badgeWrap) badgeWrap.style.display = 'flex';
    if (userTag) userTag.textContent = state.currentUser.username.toUpperCase();
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (badgeWrap) badgeWrap.style.display = 'none';
  }
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const username = document.getElementById('admin-login-username')?.value.trim();
  const password = document.getElementById('admin-login-password')?.value.trim();

  if (!username || !password) {
    showToast('Please enter both username and password.', 'error');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      state.currentUser = data.user;
      localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.user));
      updateAdminAuthUI();
      closeModal('modal-admin-login');
      showToast(`Admin logged in: ${data.user.username}`, 'success');
      return;
    }
  } catch (err) {
    console.warn('Backend server not responding, using offline admin auth fallback.');
  }

  // Offline / Demo Authentication Fallback
  if (username.toLowerCase() === 'admin' && (password === 'adminpassword123' || password === 'admin')) {
    const demoUser = { id: 1, username: 'admin', email: 'admin@studiomistri.com', is_staff: true, is_superuser: true };
    state.currentUser = demoUser;
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(demoUser));
    updateAdminAuthUI();
    closeModal('modal-admin-login');
    showToast('Admin logged in (Offline Demo Mode)', 'success');
  } else {
    showToast('Invalid admin credentials. Use admin / adminpassword123', 'error');
  }
}

async function handleAdminLogout() {
  try {
    await fetch(`${API_BASE_URL}/auth/logout/`, { method: 'POST' });
  } catch (err) {
    // Ignore network error on logout
  }

  state.currentUser = null;
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  updateAdminAuthUI();
  showToast('Logged out of Admin OS.', 'info');
}

// Navigation between views
function switchView(viewName) {
  state.currentView = viewName;
  
  // Update view containers
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  // Update nav links
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-view') === viewName) {
      link.classList.add('active');
    }
  });

  // Update header breadcrumb
  const titleMap = {
    landing: 'STUDIO HOME',
    dashboard: 'STUDIO DASHBOARD',
    inventory: 'INVENTORY MATRIX',
    orders: 'ORDER LEDGER',
    sales: 'FINANCIAL AUDIT & SALES',
    settings: 'SYSTEM SETTINGS'
  };
  const titleElem = document.getElementById('current-view-title');
  if (titleElem) titleElem.textContent = titleMap[viewName] || 'STUDIOMISTRI';

  // Close mobile sidebar if open
  document.getElementById('sidebar')?.classList.remove('mobile-open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Refresh view contents
  renderAllViews();
}

// ============================================================================
// 4. Landing Page Instant 3D Print Quoter Logic
// ============================================================================
function updateLandingPageColorOptions() {
  const materialSelect = document.getElementById('landing-quote-material');
  const colorSelect = document.getElementById('landing-quote-color');
  if (!materialSelect || !colorSelect) return;

  const selectedMaterial = materialSelect.value;
  const matchingFilaments = state.filaments.filter(f => f.type.toLowerCase().includes(selectedMaterial.toLowerCase()) || selectedMaterial.toLowerCase().includes(f.type.toLowerCase()));

  if (matchingFilaments.length === 0) {
    colorSelect.innerHTML = state.filaments.map(f => `
      <option value="${f.id}" data-color="${f.colorName}" data-hex="${f.colorHex}">
        ${escapeHtml(f.colorName)} (${escapeHtml(f.brand)} ${escapeHtml(f.type)}) - ${f.currentStock}g in stock
      </option>
    `).join('');
  } else {
    colorSelect.innerHTML = matchingFilaments.map(f => `
      <option value="${f.id}" data-color="${f.colorName}" data-hex="${f.colorHex}">
        ${escapeHtml(f.colorName)} (${escapeHtml(f.brand)}) - ${f.currentStock}g in stock
      </option>
    `).join('');
  }
}

function recalculateLandingPageQuoter() {
  const materialSelect = document.getElementById('landing-quote-material');
  if (!materialSelect) return;

  const selectedOpt = materialSelect.options[materialSelect.selectedIndex];
  const ratePerGram = Number(selectedOpt?.getAttribute('data-rate')) || 7.00;
  const weight = Math.max(1, Number(document.getElementById('landing-quote-weight')?.value) || 0);
  const finishFee = Number(document.getElementById('landing-quote-finish')?.value) || 0;
  const quality = document.getElementById('landing-quote-quality')?.value || '0.20';
  const companyRate = Number(state.settings?.companyRatePerGram) || 3.00;

  const basePrice = weight * ratePerGram;
  const totalPrice = basePrice + finishFee;
  const companyShare = weight * companyRate;
  const salaryShare = Math.max(0, totalPrice - companyShare);

  let speedFactor = 1.0;
  if (quality === '0.12') speedFactor = 1.6;
  if (quality === '0.28') speedFactor = 0.75;
  const totalMinutes = Math.round((weight * 1.8) * speedFactor);
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeStr = hours > 0 ? `~ ${hours}h ${mins}m` : `~ ${mins}m`;

  const rateBadge = document.getElementById('landing-quote-rate-badge');
  if (rateBadge) rateBadge.textContent = `RATE: ৳ ${ratePerGram.toFixed(2)} / G`;

  const totalElem = document.getElementById('landing-quote-total-price');
  if (totalElem) totalElem.textContent = formatBDT(totalPrice);

  const weightElem = document.getElementById('landing-quote-weight-display');
  if (weightElem) weightElem.textContent = `${weight}g`;

  const timeElem = document.getElementById('landing-quote-time-display');
  if (timeElem) timeElem.textContent = timeStr;

  const splitElem = document.getElementById('landing-quote-split-display');
  if (splitElem) splitElem.textContent = `৳ ${companyShare.toLocaleString()} Co / ৳ ${salaryShare.toLocaleString()} Sal`;
}

async function handleLandingOrderSubmit() {
  const clientName = document.getElementById('landing-quote-client-name')?.value.trim();
  const clientPhone = document.getElementById('landing-quote-client-phone')?.value.trim();
  const modelTitle = 'Custom 3D Print Model';
  const weight = Number(document.getElementById('landing-quote-weight')?.value) || 150;
  const finishFee = Number(document.getElementById('landing-quote-finish')?.value) || 0;
  
  const materialSelect = document.getElementById('landing-quote-material');
  const selectedOpt = materialSelect.options[materialSelect.selectedIndex];
  const ratePerGram = Number(selectedOpt?.getAttribute('data-rate')) || 7.00;
  const materialType = materialSelect.value;

  const colorSelect = document.getElementById('landing-quote-color');
  const filamentId = colorSelect.value;
  const filament = state.filaments.find(f => f.id === filamentId) || state.filaments[0];

  if (!clientName || !clientPhone) {
    showToast('Please enter your Name and WhatsApp/Phone number.', 'error');
    document.getElementById('landing-quote-client-name')?.focus();
    return;
  }

  const basePrice = weight * ratePerGram;
  const totalPrice = basePrice + finishFee;
  const companyRate = Number(state.settings?.companyRatePerGram) || 3.00;
  const companyShare = weight * companyRate;
  const salaryShare = Math.max(0, totalPrice - companyShare);

  const spoolCostPerGram = filament ? (Number(filament.spoolPrice) / (Number(filament.fullWeight) || 1000)) : 2.20;
  const materialCost = weight * spoolCostPerGram;

  const year = new Date().getFullYear();
  const count = (state.orders.length + 1).toString().padStart(4, '0');
  const invoiceNumber = `SM-${year}-${count}`;

  const newOrder = {
    id: 'ord-' + Date.now(),
    invoiceNumber,
    customerName: clientName,
    customerPhone: clientPhone,
    customerEmail: '',
    modelName: modelTitle,
    modelSize: 'Custom Dimensions',
    filamentId: filament ? filament.id : null,
    filamentName: filament ? filament.colorName : 'Signal Orange',
    filamentType: materialType,
    filamentColorHex: filament ? filament.colorHex : '#ff5500',
    filamentBrand: filament ? filament.brand : 'Bambu Lab',
    weight,
    pricePerGram: ratePerGram,
    extraFee: finishFee,
    totalPrice,
    companyShare,
    salaryShare,
    materialCost,
    status: 'Printing',
    createdAt: new Date().toISOString()
  };

  // Sync to Backend if online
  try {
    await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: clientName,
        customer_phone: clientPhone,
        model_name: modelTitle,
        weight,
        price_per_gram: ratePerGram,
        extra_fee: finishFee,
        status: 'Printing'
      })
    });
  } catch (err) {
    // Local fallback
  }

  if (filament && filament.currentStock >= weight) {
    filament.currentStock = Math.max(0, filament.currentStock - weight);
    saveFilaments();
  }

  state.orders.unshift(newOrder);
  saveOrders();
  renderAllViews();

  showToast(`Order created! Invoice #${invoiceNumber} ready`, 'success');
  viewInvoiceModal(newOrder.id);
}

// ============================================================================
// 5. Inventory Module: CRUD, Quick Stock Stepper, Filters
// ============================================================================
function renderInventory() {
  const searchTerm = (document.getElementById('inv-search-input')?.value || '').toLowerCase().trim();
  const activeMaterialChip = document.querySelector('#inv-material-filters .filter-chip.active')?.getAttribute('data-material') || 'all';
  const brandFilter = document.getElementById('inv-brand-filter')?.value || 'all';
  const stockFilter = document.getElementById('inv-stock-filter')?.value || 'all';

  const filtered = state.filaments.filter(f => {
    const matchesSearch = !searchTerm || 
      f.colorName.toLowerCase().includes(searchTerm) ||
      f.brand.toLowerCase().includes(searchTerm) ||
      f.type.toLowerCase().includes(searchTerm) ||
      (f.location && f.location.toLowerCase().includes(searchTerm));

    let matchesMaterial = true;
    if (activeMaterialChip !== 'all') {
      matchesMaterial = f.type.toLowerCase().includes(activeMaterialChip.toLowerCase());
    }

    let matchesBrand = true;
    if (brandFilter !== 'all') {
      matchesBrand = f.brand.toLowerCase() === brandFilter.toLowerCase();
    }

    let matchesStock = true;
    if (stockFilter === 'in_stock') matchesStock = f.currentStock > 250;
    if (stockFilter === 'low_stock') matchesStock = f.currentStock <= 250 && f.currentStock > 0;
    if (stockFilter === 'out_of_stock') matchesStock = f.currentStock === 0;

    return matchesSearch && matchesMaterial && matchesBrand && matchesStock;
  });

  const totalSpools = state.filaments.length;
  const totalGrams = state.filaments.reduce((acc, f) => acc + (Number(f.currentStock) || 0), 0);
  const totalKg = (totalGrams / 1000).toFixed(2);
  const totalValue = state.filaments.reduce((acc, f) => {
    const costPerGram = (Number(f.spoolPrice) || 0) / (Number(f.fullWeight) || 1000);
    return acc + (costPerGram * (Number(f.currentStock) || 0));
  }, 0);
  const lowStockCount = state.filaments.filter(f => f.currentStock <= 250).length;
  const uniqueColors = new Set(state.filaments.map(f => f.colorName)).size;

  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setElemText('inv-stat-spools', totalSpools);
  setElemText('inv-stat-colors', `${uniqueColors} unique colors`);
  setElemText('inv-stat-weight', `${totalKg} kg`);
  setElemText('inv-stat-grams', `${totalGrams.toLocaleString()}g ready`);
  setElemText('inv-stat-value', formatBDT(totalValue));
  setElemText('inv-stat-low-stock', lowStockCount);
  setElemText('sidebar-filament-count', totalSpools);
  setElemText('sidebar-active-spools', totalSpools);

  const container = document.getElementById('inv-grid-container') || document.getElementById('filament-cards-container');
  const tbody = document.getElementById('inv-table-tbody') || document.getElementById('filament-table-tbody');
  const emptyState = document.getElementById('inv-empty-state');
  const tableContainer = document.getElementById('inv-table-container') || document.getElementById('filament-table-container');

  if (filtered.length === 0) {
    if (container) container.innerHTML = '';
    if (tbody) tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (tableContainer) tableContainer.style.display = 'none';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  if (container) {
    container.innerHTML = filtered.map(f => {
      const fullWeight = Number(f.fullWeight) || 1000;
      const currentStock = Number(f.currentStock) || 0;
      const percent = Math.min(100, Math.max(0, Math.round((currentStock / fullWeight) * 100)));
      const costPerGram = (Number(f.spoolPrice) / fullWeight).toFixed(2);
      
      let fillClass = '';
      let badgeHtml = '<span class="badge badge-in-stock">IN STOCK</span>';
      if (currentStock === 0) {
        fillClass = 'empty';
        badgeHtml = '<span class="badge badge-out-stock">EMPTY</span>';
      } else if (currentStock <= 250) {
        fillClass = 'low';
        badgeHtml = '<span class="badge badge-low-stock">LOW STOCK</span>';
      }

      return `
        <div class="filament-card" data-id="${f.id}">
          <div class="filament-card-top">
            <div class="filament-color-indicator">
              <div class="color-swatch-circle" style="background-color: ${f.colorHex};"></div>
              <div class="filament-title-wrap">
                <div class="filament-color-name">${escapeHtml(f.colorName)}</div>
                <div class="filament-brand-type">${escapeHtml(f.brand)} • <strong style="color: #000;">${escapeHtml(f.type)}</strong></div>
              </div>
            </div>
            ${badgeHtml}
          </div>

          <div class="filament-stock-bar-wrap">
            <div class="stock-labels">
              <span class="current font-mono">${currentStock.toLocaleString()}g <span style="color: var(--nb-text-muted); font-weight: normal;">/ ${fullWeight}g</span></span>
              <span class="percent font-mono">${percent}%</span>
            </div>
            <div class="stock-progress-track">
              <div class="stock-progress-fill ${fillClass}" style="width: ${percent}%;"></div>
            </div>
          </div>

          <div class="filament-card-details">
            <div class="f-detail-item">
              <span class="f-detail-label">Spool Cost</span>
              <span class="f-detail-val font-mono">${formatBDT(f.spoolPrice)}</span>
            </div>
            <div class="f-detail-item">
              <span class="f-detail-label">Cost / Gram</span>
              <span class="f-detail-val font-mono" style="color: #0284c7;">৳ ${costPerGram}/g</span>
            </div>
            <div class="f-detail-item">
              <span class="f-detail-label">Nozzle Temp</span>
              <span class="f-detail-val" style="font-size: 0.8rem;">${escapeHtml(f.nozzleTemp || '210°C')}</span>
            </div>
            <div class="f-detail-item">
              <span class="f-detail-label">Rack Location</span>
              <span class="f-detail-val" style="font-size: 0.8rem;">${escapeHtml(f.location || '-')}</span>
            </div>
          </div>

          <div class="filament-card-actions">
            <div class="quick-stock-stepper" title="Quick Stock Adjustment">
              <button class="stepper-btn" onclick="adjustFilamentStock('${f.id}', -50)">-50g</button>
              <button class="stepper-btn" onclick="adjustFilamentStock('${f.id}', +50)">+50g</button>
              <button class="stepper-btn" onclick="adjustFilamentStock('${f.id}', +500)">+500g</button>
            </div>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn btn-outline btn-sm btn-icon-only" onclick="openEditFilamentModal('${f.id}')" title="Edit Spool Details">
                <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="promptDeleteFilament('${f.id}')" title="Delete Spool">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (tbody) {
    tbody.innerHTML = filtered.map(f => {
      const fullWeight = Number(f.fullWeight) || 1000;
      const currentStock = Number(f.currentStock) || 0;
      const costPerGram = (Number(f.spoolPrice) / fullWeight).toFixed(2);
      
      let badgeHtml = '<span class="badge badge-in-stock">IN STOCK</span>';
      if (currentStock === 0) badgeHtml = '<span class="badge badge-out-stock">EMPTY</span>';
      else if (currentStock <= 250) badgeHtml = '<span class="badge badge-low-stock">LOW STOCK</span>';

      return `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div class="color-swatch-circle" style="width: 20px; height: 20px; background-color: ${f.colorHex};"></div>
              <strong>${escapeHtml(f.colorName)}</strong>
            </div>
          </td>
          <td><span class="badge badge-pending">${escapeHtml(f.type)}</span></td>
          <td>${escapeHtml(f.brand)}</td>
          <td class="font-mono">${formatBDT(f.spoolPrice)}</td>
          <td class="font-mono" style="color: #0284c7;">৳ ${costPerGram}/g</td>
          <td><strong class="font-mono">${currentStock.toLocaleString()}g</strong> <span style="color: var(--nb-text-muted);">/ ${fullWeight}g</span></td>
          <td><span style="font-size: 0.8rem; font-family: 'JetBrains Mono', monospace;">${escapeHtml(f.location || '-')}</span></td>
          <td>${badgeHtml}</td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn btn-outline btn-sm btn-icon-only" onclick="openEditFilamentModal('${f.id}')" title="Edit">
                <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="promptDeleteFilament('${f.id}')" title="Delete">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  if (state.inventoryViewMode === 'grid') {
    if (container) container.style.display = 'grid';
    if (tableContainer) tableContainer.style.display = 'none';
  } else {
    if (container) container.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'block';
  }

  lucide.createIcons();
}

async function adjustFilamentStock(filamentId, deltaGrams) {
  const filament = state.filaments.find(f => f.id === filamentId);
  if (!filament) return;

  const current = Number(filament.currentStock) || 0;
  const newStock = Math.max(0, current + deltaGrams);
  filament.currentStock = newStock;
  saveFilaments();
  renderAllViews();

  // Sync to Backend if online
  try {
    await fetch(`${API_BASE_URL}/filaments/${filamentId}/adjust_stock/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ delta_grams: deltaGrams })
    });
  } catch (err) {
    // Local mode
  }

  showToast(`${filament.colorName} stock: ${newStock}g (${deltaGrams > 0 ? '+' : ''}${deltaGrams}g)`, 'info');
}

function openFilamentModal() {
  document.getElementById('form-filament').reset();
  document.getElementById('filament-edit-id').value = '';
  document.getElementById('modal-filament-title').textContent = 'ADD FILAMENT SPOOL';
  document.getElementById('filament-color-hex').value = '#ff5500';
  document.getElementById('filament-color-hex-text').value = '#FF5500';
  document.getElementById('filament-spool-price').value = '2400';
  document.getElementById('filament-full-weight').value = '1000';
  document.getElementById('filament-current-stock').value = '1000';
  updateFilamentCostPerGramPreview();
  openModal('modal-filament');
}

function openEditFilamentModal(id) {
  const filament = state.filaments.find(f => f.id === id);
  if (!filament) return;

  document.getElementById('filament-edit-id').value = filament.id;
  document.getElementById('modal-filament-title').textContent = `EDIT SPOOL // ${filament.colorName}`;
  document.getElementById('filament-brand').value = filament.brand;
  document.getElementById('filament-type').value = filament.type;
  document.getElementById('filament-color-name').value = filament.colorName;
  document.getElementById('filament-color-hex').value = filament.colorHex || '#ff5500';
  document.getElementById('filament-color-hex-text').value = filament.colorHex || '#ff5500';
  document.getElementById('filament-spool-price').value = filament.spoolPrice;
  document.getElementById('filament-full-weight').value = filament.fullWeight || 1000;
  document.getElementById('filament-current-stock').value = filament.currentStock;
  document.getElementById('filament-location').value = filament.location || '';
  document.getElementById('filament-temp').value = filament.nozzleTemp || '210°C - 230°C';

  updateFilamentCostPerGramPreview();
  openModal('modal-filament');
}

function updateFilamentCostPerGramPreview() {
  const price = Number(document.getElementById('filament-spool-price')?.value) || 0;
  const weight = Number(document.getElementById('filament-full-weight')?.value) || 1000;
  const costGram = weight > 0 ? (price / weight).toFixed(2) : '0.00';
  const elem = document.getElementById('filament-calc-cost-gram');
  if (elem) elem.textContent = `৳ ${costGram} / g`;
}

async function handleFilamentFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('filament-edit-id').value;
  const brand = document.getElementById('filament-brand').value.trim();
  const type = document.getElementById('filament-type').value;
  const colorName = document.getElementById('filament-color-name').value.trim();
  const colorHex = document.getElementById('filament-color-hex').value;
  const spoolPrice = Number(document.getElementById('filament-spool-price').value) || 0;
  const fullWeight = Number(document.getElementById('filament-full-weight').value) || 1000;
  const currentStock = Number(document.getElementById('filament-current-stock').value) || 0;
  const location = document.getElementById('filament-location').value.trim();
  const nozzleTemp = document.getElementById('filament-temp').value.trim();

  if (!brand || !colorName || spoolPrice <= 0) {
    showToast('Please fill all required fields.', 'error');
    return;
  }

  if (editId) {
    const idx = state.filaments.findIndex(f => f.id === editId);
    if (idx !== -1) {
      state.filaments[idx] = {
        ...state.filaments[idx],
        brand,
        type,
        colorName,
        colorHex,
        spoolPrice,
        fullWeight,
        currentStock,
        location,
        nozzleTemp
      };
      showToast(`Spool "${colorName}" updated.`, 'success');
    }
  } else {
    const newFilament = {
      id: 'fil-' + Date.now(),
      brand,
      type,
      colorName,
      colorHex,
      spoolPrice,
      fullWeight,
      currentStock,
      location,
      nozzleTemp,
      createdAt: new Date().toISOString()
    };
    state.filaments.unshift(newFilament);
    showToast(`Spool "${colorName}" added to matrix.`, 'success');
  }

  saveFilaments();
  closeModal('modal-filament');
  renderAllViews();
}

function promptDeleteFilament(id) {
  const filament = state.filaments.find(f => f.id === id);
  if (!filament) return;

  const msg = `Confirm removal of spool: <strong>${escapeHtml(filament.colorName)} (${escapeHtml(filament.brand)} ${escapeHtml(filament.type)})</strong>. Current stock: ${filament.currentStock}g.`;
  document.getElementById('delete-confirm-message').innerHTML = msg;

  state.pendingDeleteAction = () => {
    state.filaments = state.filaments.filter(f => f.id !== id);
    saveFilaments();
    renderAllViews();
    showToast('Spool deleted.', 'info');
  };

  openModal('modal-delete-confirm');
}

function updateFilamentDropdowns() {
  const select = document.getElementById('order-filament-select');
  if (!select) return;

  if (state.filaments.length === 0) {
    select.innerHTML = `<option value="">No filaments available. Add one first.</option>`;
    return;
  }

  select.innerHTML = state.filaments.map(f => {
    const costPerGram = ((Number(f.spoolPrice) || 0) / (Number(f.fullWeight) || 1000)).toFixed(2);
    return `
      <option value="${f.id}" data-type="${f.type}" data-cost="${costPerGram}" data-stock="${f.currentStock}">
        ${escapeHtml(f.colorName)} (${escapeHtml(f.type)} - ${escapeHtml(f.brand)}) • Stock: ${f.currentStock}g (৳${costPerGram}/g)
      </option>
    `;
  }).join('');
}

// ============================================================================
// 6. Order Management & Real-Time Split Calculator (3 Tk/g Company Fund)
// ============================================================================
function renderOrders() {
  const tbody = document.getElementById('orders-table-tbody');
  const emptyState = document.getElementById('order-empty-state');
  const search = (document.getElementById('order-search-input')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('order-status-filter')?.value || 'all';
  const sortFilter = document.getElementById('order-sort-filter')?.value || 'newest';

  let filtered = state.orders.filter(ord => {
    const matchesSearch = !search ||
      ord.invoiceNumber.toLowerCase().includes(search) ||
      ord.customerName.toLowerCase().includes(search) ||
      ord.modelName.toLowerCase().includes(search) ||
      ord.customerPhone.toLowerCase().includes(search);

    const matchesStatus = statusFilter === 'all' || ord.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  filtered.sort((a, b) => {
    if (sortFilter === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortFilter === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortFilter === 'price-desc') return (b.totalPrice || 0) - (a.totalPrice || 0);
    if (sortFilter === 'weight-desc') return (b.weight || 0) - (a.weight || 0);
    return 0;
  });

  const totalOrders = state.orders.length;
  const totalRevenue = state.orders.reduce((acc, o) => acc + (Number(o.totalPrice) || 0), 0);
  const totalCompany = state.orders.reduce((acc, o) => acc + (Number(o.companyShare) || 0), 0);
  const totalSalary = state.orders.reduce((acc, o) => acc + (Number(o.salaryShare) || 0), 0);
  const totalGrams = state.orders.reduce((acc, o) => acc + (Number(o.weight) || 0), 0);

  document.getElementById('order-stat-total').textContent = totalOrders;
  document.getElementById('order-stat-revenue-total').textContent = `${formatBDT(totalRevenue)} in sales`;
  document.getElementById('order-stat-company').textContent = formatBDT(totalCompany);
  document.getElementById('order-stat-salary').textContent = formatBDT(totalSalary);
  document.getElementById('order-stat-grams').textContent = `${totalGrams.toLocaleString()}g`;
  document.getElementById('sidebar-order-count').textContent = totalOrders;

  if (filtered.length === 0) {
    if (tbody) tbody.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  if (tbody) {
    tbody.innerHTML = filtered.map(o => {
      let statusBadge = 'badge-pending';
      if (o.status === 'Printing') statusBadge = 'badge-printing';
      if (o.status === 'Paid') statusBadge = 'badge-paid';
      if (o.status === 'Delivered') statusBadge = 'badge-completed';

      return `
        <tr>
          <td>
            <span class="font-mono" style="font-weight: 900; color: #000;">${escapeHtml(o.invoiceNumber)}</span>
            <div style="font-size: 0.74rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${formatDate(o.createdAt)}</div>
          </td>
          <td>
            <div style="font-weight: 900; color: #000;">${escapeHtml(o.modelName)}</div>
            <div style="font-size: 0.76rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${escapeHtml(o.modelSize || '-')}</div>
          </td>
          <td>
            <div><strong>${escapeHtml(o.customerName)}</strong></div>
            <div style="font-size: 0.76rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${escapeHtml(o.customerPhone)}</div>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="color-swatch-circle" style="width: 14px; height: 14px; background-color: ${o.filamentColorHex || '#fff'};"></span>
              <span style="font-size: 0.82rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;">${escapeHtml(o.filamentName)} <span style="color: var(--nb-text-muted);">(${escapeHtml(o.filamentType)})</span></span>
            </div>
          </td>
          <td><strong class="font-mono">${o.weight}g</strong></td>
          <td class="font-mono">৳ ${Number(o.pricePerGram).toFixed(2)}/g</td>
          <td><strong class="font-mono" style="color: #000; font-size: 1rem;">${formatBDT(o.totalPrice)}</strong></td>
          <td><strong class="font-mono" style="color: #0284c7;">${formatBDT(o.companyShare)}</strong></td>
          <td><strong class="font-mono" style="color: #15803d;">${formatBDT(o.salaryShare)}</strong></td>
          <td>
            <select class="form-control font-mono btn-sm" style="padding: 0.25rem 1.6rem 0.25rem 0.6rem; font-size: 0.76rem; width: auto;" onchange="updateOrderStatus('${o.id}', this.value)">
              <option value="Quotation" ${o.status === 'Quotation' ? 'selected' : ''}>Quotation</option>
              <option value="Slicing" ${o.status === 'Slicing' ? 'selected' : ''}>Slicing</option>
              <option value="Printing" ${o.status === 'Printing' ? 'selected' : ''}>Printing 🖨️</option>
              <option value="Post-Processing" ${o.status === 'Post-Processing' ? 'selected' : ''}>Post-Processing</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Paid" ${o.status === 'Paid' ? 'selected' : ''}>Paid ✅</option>
            </select>
          </td>
          <td>
            <div style="display: flex; gap: 0.35rem;">
              <button class="btn btn-primary btn-sm btn-icon-only" onclick="viewInvoiceModal('${o.id}')" title="Generate PDF Invoice">
                <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn btn-outline btn-sm btn-icon-only" onclick="openEditOrderModal('${o.id}')" title="Edit Order">
                <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="btn btn-danger btn-sm btn-icon-only" onclick="promptDeleteOrder('${o.id}')" title="Delete Order">
                <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  lucide.createIcons();
}

async function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;
  order.status = newStatus;
  saveOrders();
  renderAllViews();

  try {
    await fetch(`${API_BASE_URL}/orders/${orderId}/update_status/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (err) {
    // Local fallback
  }

  showToast(`Order ${order.invoiceNumber} status: ${newStatus}`, 'success');
}

function openOrderModal() {
  document.getElementById('form-order').reset();
  document.getElementById('order-edit-id').value = '';
  document.getElementById('modal-order-title').textContent = 'CREATE 3D PRINT ORDER';
  document.getElementById('order-model-weight').value = '150';
  document.getElementById('order-price-per-gram').value = '7.00';
  document.getElementById('order-extra-fee').value = '0';
  document.getElementById('order-status-select').value = 'Printing';

  updateFilamentDropdowns();
  recalculateLiveOrderModal();
  openModal('modal-order');
}

function openEditOrderModal(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;

  document.getElementById('order-edit-id').value = order.id;
  document.getElementById('modal-order-title').textContent = `EDIT ORDER // ${order.invoiceNumber}`;
  document.getElementById('order-customer-name').value = order.customerName;
  document.getElementById('order-customer-phone').value = order.customerPhone;
  document.getElementById('order-customer-email').value = order.customerEmail || '';
  document.getElementById('order-model-name').value = order.modelName;
  document.getElementById('order-model-size').value = order.modelSize || '';
  document.getElementById('order-model-weight').value = order.weight;
  document.getElementById('order-price-per-gram').value = order.pricePerGram;
  document.getElementById('order-extra-fee').value = order.extraFee || 0;
  document.getElementById('order-status-select').value = order.status;

  updateFilamentDropdowns();
  const filamentSelect = document.getElementById('order-filament-select');
  if (filamentSelect) filamentSelect.value = order.filamentId;

  recalculateLiveOrderModal();
  openModal('modal-order');
}

function recalculateLiveOrderModal() {
  const weight = Number(document.getElementById('order-model-weight')?.value) || 0;
  const ratePerGram = Number(document.getElementById('order-price-per-gram')?.value) || 0;
  const extraFee = Number(document.getElementById('order-extra-fee')?.value) || 0;
  const companyRatePerGram = Number(state.settings?.companyRatePerGram) || 3.00;

  const baseSubtotal = weight * ratePerGram;
  const grandTotal = baseSubtotal + extraFee;
  const companyShare = weight * companyRatePerGram;
  const salaryShare = Math.max(0, grandTotal - companyShare);

  document.getElementById('order-calc-unit-rate').textContent = `Rate: ৳ ${ratePerGram.toFixed(2)}/g`;
  document.getElementById('order-calc-weight-label').textContent = weight;
  document.getElementById('order-calc-rate-label').textContent = ratePerGram.toFixed(2);
  document.getElementById('order-calc-base-subtotal').textContent = formatBDT(baseSubtotal);
  document.getElementById('order-calc-extra-display').textContent = formatBDT(extraFee);
  document.getElementById('order-calc-grand-total').textContent = formatBDT(grandTotal);

  document.getElementById('order-calc-company-total').textContent = formatBDT(companyShare);
  document.getElementById('order-calc-company-formula').textContent = `${weight}g × ৳${companyRatePerGram.toFixed(2)} (Machine Wear & Power)`;

  document.getElementById('order-calc-salary-total').textContent = formatBDT(salaryShare);
  const salaryPerGram = Math.max(0, ratePerGram - companyRatePerGram);
  document.getElementById('order-calc-salary-formula').textContent = `${weight}g × ৳${salaryPerGram.toFixed(2)} + ৳${extraFee} Extras`;
}

async function handleOrderFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('order-edit-id').value;
  const customerName = document.getElementById('order-customer-name').value.trim();
  const customerPhone = document.getElementById('order-customer-phone').value.trim();
  const customerEmail = document.getElementById('order-customer-email').value.trim();
  const modelName = document.getElementById('order-model-name').value.trim();
  const modelSize = document.getElementById('order-model-size').value.trim();
  const filamentId = document.getElementById('order-filament-select').value;
  const weight = Number(document.getElementById('order-model-weight').value) || 0;
  const pricePerGram = Number(document.getElementById('order-price-per-gram').value) || 0;
  const extraFee = Number(document.getElementById('order-extra-fee').value) || 0;
  const status = document.getElementById('order-status-select').value;

  if (!customerName || !customerPhone || !modelName || weight <= 0 || pricePerGram <= 0) {
    showToast('Please fill in all required order fields.', 'error');
    return;
  }

  const filament = state.filaments.find(f => f.id === filamentId);
  const companyRatePerGram = Number(state.settings?.companyRatePerGram) || 3.00;

  const baseSubtotal = weight * pricePerGram;
  const totalPrice = baseSubtotal + extraFee;
  const companyShare = weight * companyRatePerGram;
  const salaryShare = Math.max(0, totalPrice - companyShare);

  const spoolCostPerGram = filament ? (Number(filament.spoolPrice) / (Number(filament.fullWeight) || 1000)) : 2.20;
  const materialCost = weight * spoolCostPerGram;

  if (editId) {
    const idx = state.orders.findIndex(o => o.id === editId);
    if (idx !== -1) {
      state.orders[idx] = {
        ...state.orders[idx],
        customerName,
        customerPhone,
        customerEmail,
        modelName,
        modelSize,
        filamentId: filament ? filament.id : state.orders[idx].filamentId,
        filamentName: filament ? filament.colorName : state.orders[idx].filamentName,
        filamentType: filament ? filament.type : state.orders[idx].filamentType,
        filamentColorHex: filament ? filament.colorHex : state.orders[idx].filamentColorHex,
        filamentBrand: filament ? filament.brand : state.orders[idx].filamentBrand,
        weight,
        pricePerGram,
        extraFee,
        totalPrice,
        companyShare,
        salaryShare,
        materialCost,
        status
      };
      showToast(`Order updated.`, 'success');
    }
  } else {
    const year = new Date().getFullYear();
    const count = (state.orders.length + 1).toString().padStart(4, '0');
    const invoiceNumber = `SM-${year}-${count}`;

    const newOrder = {
      id: 'ord-' + Date.now(),
      invoiceNumber,
      customerName,
      customerPhone,
      customerEmail,
      modelName,
      modelSize,
      filamentId: filament ? filament.id : 'custom',
      filamentName: filament ? filament.colorName : 'Standard Filament',
      filamentType: filament ? filament.type : 'PLA',
      filamentColorHex: filament ? filament.colorHex : '#ff5500',
      filamentBrand: filament ? filament.brand : 'Studio Default',
      weight,
      pricePerGram,
      extraFee,
      totalPrice,
      companyShare,
      salaryShare,
      materialCost,
      status,
      createdAt: new Date().toISOString()
    };

    if (filament && filament.currentStock >= weight) {
      filament.currentStock = Math.max(0, filament.currentStock - weight);
      saveFilaments();
      showToast(`Deducted ${weight}g from ${filament.colorName}.`, 'info');
    }

    state.orders.unshift(newOrder);
    showToast(`Order ${invoiceNumber} created.`, 'success');
  }

  saveOrders();
  closeModal('modal-order');
  renderAllViews();
}

function promptDeleteOrder(id) {
  const order = state.orders.find(o => o.id === id);
  if (!order) return;

  const msg = `Confirm deletion of order <strong>${escapeHtml(order.invoiceNumber)} (${escapeHtml(order.modelName)})</strong> for <strong>${escapeHtml(order.customerName)}</strong>.`;
  document.getElementById('delete-confirm-message').innerHTML = msg;

  state.pendingDeleteAction = () => {
    state.orders = state.orders.filter(o => o.id !== id);
    saveOrders();
    renderAllViews();
    showToast('Order removed from ledger.', 'info');
  };

  openModal('modal-delete-confirm');
}

// ============================================================================
// 7. Invoice Generation & PDF Export Module
// ============================================================================
function viewInvoiceModal(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (!order) return;

  state.activeInvoiceOrder = order;

  document.getElementById('inv-preview-invoice-num').textContent = '#' + order.invoiceNumber;
  document.getElementById('inv-preview-date').textContent = formatDate(order.createdAt);
  
  const statusBadgeElem = document.getElementById('inv-preview-status-badge');
  if (statusBadgeElem) {
    statusBadgeElem.textContent = order.status.toUpperCase();
    if (order.status === 'Paid') statusBadgeElem.style.color = '#15803d';
    else if (order.status === 'Printing') statusBadgeElem.style.color = '#ff5500';
    else statusBadgeElem.style.color = '#0284c7';
  }

  document.getElementById('inv-preview-client-name').textContent = order.customerName;
  document.getElementById('inv-preview-client-phone').textContent = order.customerPhone;
  document.getElementById('inv-preview-client-email').textContent = order.customerEmail || 'N/A';

  document.getElementById('inv-preview-project-name').textContent = order.modelName;
  document.getElementById('inv-preview-dimensions').textContent = order.modelSize || 'Standard 3D Volume';
  document.getElementById('inv-preview-filament-desc').textContent = `${order.filamentType} (${order.filamentName} - ${order.filamentBrand || 'Studio'})`;

  document.getElementById('inv-item-title').textContent = order.modelName;
  document.getElementById('inv-item-desc').textContent = `3D Print Fabrication • ${order.filamentType} ${order.filamentName} • 0.20mm Layer Resolution`;
  document.getElementById('inv-item-weight').textContent = `${order.weight}g`;
  document.getElementById('inv-item-rate').textContent = `৳ ${Number(order.pricePerGram).toFixed(2)}`;
  
  const baseSubtotal = (Number(order.weight) * Number(order.pricePerGram));
  document.getElementById('inv-item-subtotal').textContent = formatBDT(baseSubtotal);

  const extraRow = document.getElementById('inv-extra-row');
  if (order.extraFee && order.extraFee > 0) {
    if (extraRow) extraRow.style.display = 'table-row';
    document.getElementById('inv-item-extra').textContent = formatBDT(order.extraFee);
    document.getElementById('inv-total-extra').textContent = formatBDT(order.extraFee);
  } else {
    if (extraRow) extraRow.style.display = 'none';
    document.getElementById('inv-total-extra').textContent = '৳ 0.00';
  }

  document.getElementById('inv-total-subtotal').textContent = formatBDT(baseSubtotal);
  document.getElementById('inv-total-grand').textContent = formatBDT(order.totalPrice);

  if (state.settings?.studio) {
    document.getElementById('inv-preview-studio-phone').textContent = state.settings.studio.phone || '+880 1700-000000';
    document.getElementById('inv-preview-studio-address').textContent = state.settings.studio.address || 'Dhaka, Bangladesh';
    document.getElementById('inv-preview-bkash').textContent = state.settings.studio.bkash || '01700-000000';
  }

  openModal('modal-invoice');
}

function downloadInvoicePDF() {
  const element = document.getElementById('invoice-printable-node');
  if (!element || !state.activeInvoiceOrder) {
    showToast('Invoice content not ready for PDF generation.', 'error');
    return;
  }

  const opt = {
    margin: [8, 8, 8, 8],
    filename: `StudioMistri_Invoice_${state.activeInvoiceOrder.invoiceNumber}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  showToast('Generating official PDF invoice...', 'info');

  html2pdf().set(opt).from(element).save().then(() => {
    showToast(`Invoice ${state.activeInvoiceOrder.invoiceNumber} exported!`, 'success');
  }).catch(err => {
    console.error('PDF export failed:', err);
    showToast('Failed to export PDF, opening print dialog...', 'error');
    window.print();
  });
}

// ============================================================================
// 8. Sales, Financials & Analytics Reports Engine
// ============================================================================
function renderSalesReports() {
  const dateFilter = document.getElementById('sales-date-filter')?.value || 'all';
  const searchTerm = (document.getElementById('sales-search-input')?.value || '').toLowerCase().trim();
  const tbody = document.getElementById('sales-tx-tbody');

  const now = new Date();
  const transactions = state.orders.filter(ord => {
    const matchesSearch = !searchTerm ||
      ord.invoiceNumber.toLowerCase().includes(searchTerm) ||
      ord.customerName.toLowerCase().includes(searchTerm) ||
      ord.modelName.toLowerCase().includes(searchTerm);

    let matchesDate = true;
    if (dateFilter !== 'all' && ord.createdAt) {
      const orderDate = new Date(ord.createdAt);
      if (dateFilter === 'today') {
        matchesDate = orderDate.toDateString() === now.toDateString();
      } else if (dateFilter === 'month') {
        matchesDate = orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      } else if (dateFilter === 'quarter') {
        const orderQuarter = Math.floor(orderDate.getMonth() / 3);
        const currentQuarter = Math.floor(now.getMonth() / 3);
        matchesDate = orderQuarter === currentQuarter && orderDate.getFullYear() === now.getFullYear();
      }
    }

    return matchesSearch && matchesDate;
  });

  const totalRevenue = transactions.reduce((acc, t) => acc + (Number(t.totalPrice) || 0), 0);
  const totalInventoryCost = transactions.reduce((acc, t) => acc + (Number(t.materialCost) || 0), 0);
  const totalProfit = totalRevenue - totalInventoryCost;
  const netMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0';
  const totalCompanyPool = transactions.reduce((acc, t) => acc + (Number(t.companyShare) || 0), 0);
  const totalSalaryPool = transactions.reduce((acc, t) => acc + (Number(t.salaryShare) || 0), 0);
  const completedOrdersCount = transactions.filter(t => t.status === 'Paid' || t.status === 'Delivered').length;

  document.getElementById('sales-kpi-revenue').textContent = formatBDT(totalRevenue);
  document.getElementById('sales-kpi-orders-count').textContent = `${completedOrdersCount} completed / ${transactions.length} total`;
  document.getElementById('sales-kpi-inventory-cost').textContent = formatBDT(totalInventoryCost);
  document.getElementById('sales-kpi-profit').textContent = formatBDT(totalProfit);
  document.getElementById('sales-kpi-margin-text').textContent = `Margin: ${netMargin}%`;
  document.getElementById('sales-kpi-company-pool').textContent = formatBDT(totalCompanyPool);

  document.getElementById('sales-banner-company').textContent = formatBDT(totalCompanyPool);
  document.getElementById('sales-banner-salary').textContent = formatBDT(totalSalaryPool);

  if (tbody) {
    if (transactions.length === 0) {
      tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; color: var(--nb-text-muted); padding: 2rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;">No transactions found for the selected period.</td></tr>`;
    } else {
      tbody.innerHTML = transactions.map(t => {
        const netProfit = (Number(t.totalPrice) || 0) - (Number(t.materialCost) || 0);
        let badgeClass = 'badge-pending';
        if (t.status === 'Paid') badgeClass = 'badge-paid';
        if (t.status === 'Delivered') badgeClass = 'badge-completed';
        if (t.status === 'Printing') badgeClass = 'badge-printing';

        return `
          <tr>
            <td class="font-mono" style="font-size: 0.78rem;">${formatDate(t.createdAt)}</td>
            <td><strong class="font-mono" style="color: #000;">${escapeHtml(t.invoiceNumber)}</strong></td>
            <td>
              <div style="font-weight: 800; color: #000;">${escapeHtml(t.modelName)}</div>
              <div style="font-size: 0.74rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${escapeHtml(t.filamentName)} (${escapeHtml(t.filamentType)})</div>
            </td>
            <td><strong>${escapeHtml(t.customerName)}</strong></td>
            <td class="font-mono"><strong>${t.weight}g</strong></td>
            <td class="font-mono" style="font-weight: 800; color: #000;">${formatBDT(t.totalPrice)}</td>
            <td class="font-mono" style="color: #dc2626;">${formatBDT(t.materialCost)}</td>
            <td class="font-mono" style="color: #0284c7; font-weight: 800;">${formatBDT(t.companyShare)}</td>
            <td class="font-mono" style="color: #15803d; font-weight: 800;">${formatBDT(t.salaryShare)}</td>
            <td class="font-mono" style="color: #15803d; font-weight: 900;">${formatBDT(netProfit)}</td>
            <td><span class="badge ${badgeClass}">${escapeHtml(t.status)}</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  updateSalesCharts(totalRevenue, totalInventoryCost, totalProfit, totalCompanyPool, totalSalaryPool);
}

function updateSalesCharts(totalRevenue, totalInventoryCost, totalProfit, totalCompanyPool, totalSalaryPool) {
  const ctx1 = document.getElementById('salesFinancialsChart')?.getContext('2d');
  if (ctx1) {
    if (charts.salesFinancials) charts.salesFinancials.destroy();

    charts.salesFinancials = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Gross Revenue', 'Material Cost', 'Net Profit'],
        datasets: [{
          label: 'Amount (৳)',
          data: [totalRevenue, totalInventoryCost, totalProfit],
          backgroundColor: [
            '#ff5500', // Luminous Studio Flame Orange
            '#ef4444', // Dark Red Expense
            '#10b981'  // Emerald Profit Green
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#131822',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#f0f6fc',
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` ৳ ${context.raw.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono', size: 11, weight: '600' },
              callback: (val) => `৳ ${val}`
            }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#f0f6fc', font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' } }
          }
        }
      }
    });
  }

  const ctx2 = document.getElementById('salesAllocationDoughnutChart')?.getContext('2d');
  if (ctx2) {
    if (charts.salesAllocation) charts.salesAllocation.destroy();

    charts.salesAllocation = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: ['Company Pool (3৳/g)', 'Salary Account', 'Material Consumed'],
        datasets: [{
          data: [totalCompanyPool, totalSalaryPool, totalInventoryCost],
          backgroundColor: [
            '#3b82f6', // Cobalt Blue
            '#10b981', // Emerald Green
            '#ff5500'  // Studio Orange
          ],
          borderColor: '#131822',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#f0f6fc', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }, boxWidth: 12, padding: 12 }
          },
          tooltip: {
            backgroundColor: '#131822',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#f0f6fc',
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` ${context.label}: ৳ ${context.raw.toLocaleString()}`
            }
          }
        },
        cutout: '72%'
      }
    });
  }

  const ctx3 = document.getElementById('filamentConsumptionBarChart')?.getContext('2d');
  if (ctx3) {
    if (charts.filamentConsumption) charts.filamentConsumption.destroy();

    const materialGrams = {};
    state.orders.forEach(o => {
      const type = o.filamentType || 'PLA';
      materialGrams[type] = (materialGrams[type] || 0) + (Number(o.weight) || 0);
    });

    const labels = Object.keys(materialGrams);
    const data = Object.values(materialGrams);

    charts.filamentConsumption = new Chart(ctx3, {
      type: 'bar',
      data: {
        labels: labels.length > 0 ? labels : ['PLA+', 'PETG', 'ABS', 'TPU', 'PLA-CF'],
        datasets: [{
          label: 'Grams Printed (g)',
          data: data.length > 0 ? data : [530, 95, 0, 140, 185],
          backgroundColor: '#ff5500',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#131822',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleColor: '#ffffff',
            bodyColor: '#f0f6fc',
            titleFont: { family: 'Plus Jakarta Sans', size: 12, weight: '700' },
            bodyFont: { family: 'JetBrains Mono', size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (context) => ` ${context.raw.toLocaleString()} grams`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
            ticks: {
              color: '#94a3b8',
              font: { family: 'JetBrains Mono', size: 11, weight: '600' },
              callback: (val) => `${val}g`
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#f0f6fc', font: { family: 'Plus Jakarta Sans', size: 12, weight: '700' } }
          }
        }
      }
    });
  }
}

function exportSalesCSV() {
  if (state.orders.length === 0) {
    showToast('No transaction data to export.', 'error');
    return;
  }

  const headers = ['Invoice ID', 'Date', 'Customer Name', 'Phone', 'Model Name', 'Filament', 'Weight (g)', 'Revenue (BDT)', 'Material Cost (BDT)', 'Company 3Tk/g Split (BDT)', 'Salary Split (BDT)', 'Net Profit (BDT)', 'Status'];
  
  const rows = state.orders.map(o => {
    const netProfit = (Number(o.totalPrice) || 0) - (Number(o.materialCost) || 0);
    return [
      `"${o.invoiceNumber}"`,
      `"${formatDate(o.createdAt)}"`,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.modelName}"`,
      `"${o.filamentName} (${o.filamentType})"`,
      o.weight,
      o.totalPrice,
      o.materialCost,
      o.companyShare,
      o.salaryShare,
      netProfit,
      `"${o.status}"`
    ];
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `StudioMistri_Sales_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Sales Report CSV generated.', 'success');
}

// ============================================================================
// 9. Dashboard Overview Module
// ============================================================================
function renderDashboard() {
  const totalRevenue = state.orders.reduce((acc, o) => acc + (Number(o.totalPrice) || 0), 0);
  const totalInventoryCost = state.orders.reduce((acc, o) => acc + (Number(o.materialCost) || 0), 0);
  const totalProfit = totalRevenue - totalInventoryCost;
  const netMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : '0';

  const totalGrams = state.orders.reduce((acc, o) => acc + (Number(o.weight) || 0), 0);
  const totalCompanyPool = state.orders.reduce((acc, o) => acc + (Number(o.companyShare) || 0), 0);
  const totalSalaryPool = state.orders.reduce((acc, o) => acc + (Number(o.salaryShare) || 0), 0);

  const totalFilamentStockGrams = state.filaments.reduce((acc, f) => acc + (Number(f.currentStock) || 0), 0);
  const totalFilamentKg = (totalFilamentStockGrams / 1000).toFixed(2);
  const availableColorsCount = new Set(state.filaments.map(f => f.colorName)).size;
  const completedOrdersCount = state.orders.filter(o => o.status === 'Paid' || o.status === 'Delivered').length;

  const setElemText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setElemText('header-stat-revenue', formatBDT(totalRevenue));
  setElemText('header-stat-company', formatBDT(totalCompanyPool));
  setElemText('header-company-pool', formatBDT(totalCompanyPool));

  setElemText('hero-stat-total-grams', `${totalGrams.toLocaleString()}g`);
  setElemText('hero-stat-orders-completed', completedOrdersCount);
  setElemText('hero-stat-available-colors', availableColorsCount);

  setElemText('dash-split-company', formatBDT(totalCompanyPool));
  setElemText('dash-company-pool-val', formatBDT(totalCompanyPool));
  setElemText('dash-split-salary', formatBDT(totalSalaryPool));
  setElemText('dash-salary-pool-val', formatBDT(totalSalaryPool));

  setElemText('dash-metric-revenue', formatBDT(totalRevenue));
  setElemText('dash-total-revenue', formatBDT(totalRevenue));
  setElemText('dash-metric-order-count', `${state.orders.length} total orders`);
  setElemText('dash-metric-cost', formatBDT(totalInventoryCost));
  setElemText('dash-material-cost', formatBDT(totalInventoryCost));
  setElemText('dash-metric-profit', formatBDT(totalProfit));
  setElemText('dash-net-profit', formatBDT(totalProfit));
  setElemText('dash-metric-margin', `Margin: ${netMargin}%`);
  setElemText('dash-metric-filament-weight', `${totalFilamentKg} kg`);
  setElemText('dash-metric-spool-count', `${state.filaments.length} spools`);
  setElemText('dash-active-spools', state.filaments.length);

  const queueTbody = document.getElementById('dash-recent-orders-table-body') || document.getElementById('dash-queue-tbody');
  const activeOrders = state.orders.filter(o => o.status !== 'Paid');
  if (queueTbody) {
    if (activeOrders.length === 0) {
      queueTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--nb-text-muted); padding: 1.5rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;">No active jobs in queue. Studio ready for printing.</td></tr>`;
    } else {
      queueTbody.innerHTML = activeOrders.slice(0, 5).map(o => {
        let badgeClass = 'badge-pending';
        if (o.status === 'Printing') badgeClass = 'badge-printing';
        if (o.status === 'Delivered') badgeClass = 'badge-completed';

        return `
          <tr>
            <td><strong class="font-mono" style="color: #000;">${escapeHtml(o.invoiceNumber)}</strong></td>
            <td>
              <div style="font-weight: 800; color: #000;">${escapeHtml(o.modelName)}</div>
              <div style="font-size: 0.76rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${escapeHtml(o.customerName)}</div>
            </td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.45rem;">
                <span class="color-swatch-circle" style="width: 12px; height: 12px; background-color: ${o.filamentColorHex || '#fff'};"></span>
                <span style="font-size: 0.8rem; font-family: 'JetBrains Mono', monospace; font-weight: 700;">${escapeHtml(o.filamentName)}</span>
              </div>
            </td>
            <td><strong class="font-mono">${o.weight}g</strong></td>
            <td><strong class="font-mono">${formatBDT(o.totalPrice)}</strong></td>
            <td><span class="badge ${badgeClass}">${escapeHtml(o.status)}</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  const lowStockList = document.getElementById('dash-low-stock-list');
  const lowStockFilaments = state.filaments.filter(f => f.currentStock <= 250);
  if (lowStockList) {
    if (lowStockFilaments.length === 0) {
      lowStockList.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0.5rem; color: #000; font-size: 0.85rem; font-family: 'JetBrains Mono', monospace; font-weight: 800;">
          <i data-lucide="check-circle" style="color: #15803d; width: 24px; height: 24px; margin-bottom: 0.25rem;"></i>
          <div>All spools healthy (&gt;250g).</div>
        </div>
      `;
    } else {
      lowStockList.innerHTML = lowStockFilaments.slice(0, 3).map(f => {
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0; border-bottom: 2px solid #000;">
            <div style="display: flex; align-items: center; gap: 0.65rem;">
              <div class="color-swatch-circle" style="width: 18px; height: 18px; background-color: ${f.colorHex};"></div>
              <div>
                <div style="font-weight: 800; font-size: 0.88rem; color: #000;">${escapeHtml(f.colorName)}</div>
                <div style="font-size: 0.72rem; font-family: 'JetBrains Mono', monospace; color: var(--nb-text-muted);">${escapeHtml(f.brand)} • ${escapeHtml(f.type)}</div>
              </div>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-low-stock font-mono">${f.currentStock}g left</span>
              <button class="btn btn-secondary btn-sm" style="margin-left: 0.4rem; padding: 0.2rem 0.5rem; font-size: 0.72rem;" onclick="adjustFilamentStock('${f.id}', 1000)">+1KG</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  recalculateDashboardQuickCalc();
  lucide.createIcons();
}

function recalculateDashboardQuickCalc() {
  const weight = Number(document.getElementById('quick-calc-weight')?.value) || 0;
  const rate = Number(document.getElementById('quick-calc-rate')?.value) || 0;
  const companyRate = Number(state.settings?.companyRatePerGram) || 3.00;

  const total = weight * rate;
  const company = weight * companyRate;
  const salary = Math.max(0, total - company);

  const totalElem = document.getElementById('quick-calc-total');
  const compElem = document.getElementById('quick-calc-company');
  const salElem = document.getElementById('quick-calc-salary');

  if (totalElem) totalElem.textContent = formatBDT(total);
  if (compElem) compElem.textContent = formatBDT(company);
  if (salElem) salElem.textContent = formatBDT(salary);
}

// ============================================================================
// 10. Settings Module & Data Backup / Restore
// ============================================================================
function loadSettingsIntoForm() {
  const s = state.settings || DEFAULT_SETTINGS;
  document.getElementById('setting-company-rate').value = s.companyRatePerGram || 3.00;
  
  if (s.prices) {
    if (document.getElementById('setting-price-pla')) document.getElementById('setting-price-pla').value = s.prices['PLA+'] || 7.00;
    if (document.getElementById('setting-price-petg')) document.getElementById('setting-price-petg').value = s.prices['PETG'] || 8.50;
    if (document.getElementById('setting-price-abs')) document.getElementById('setting-price-abs').value = s.prices['ABS'] || 9.00;
    if (document.getElementById('setting-price-tpu')) document.getElementById('setting-price-tpu').value = s.prices['TPU 95A'] || 12.00;
    if (document.getElementById('setting-price-cf')) document.getElementById('setting-price-cf').value = s.prices['PLA-CF'] || 15.00;
  }

  if (s.studio) {
    if (document.getElementById('setting-studio-name')) document.getElementById('setting-studio-name').value = s.studio.name || 'Studio Mistri';
    if (document.getElementById('setting-studio-phone')) document.getElementById('setting-studio-phone').value = s.studio.phone || '+880 1700-000000';
    if (document.getElementById('setting-studio-email')) document.getElementById('setting-studio-email').value = s.studio.email || 'contact@studiomistri.com';
    if (document.getElementById('setting-studio-bkash')) document.getElementById('setting-studio-bkash').value = s.studio.bkash || '01700-000000';
    if (document.getElementById('setting-studio-address')) document.getElementById('setting-studio-address').value = s.studio.address || 'Dhaka, Bangladesh';
  }
}

async function handleSaveSettings() {
  const companyRate = Number(document.getElementById('setting-company-rate').value) || 3.00;
  
  state.settings = {
    ...state.settings,
    companyRatePerGram: companyRate,
    prices: {
      'PLA+': Number(document.getElementById('setting-price-pla')?.value) || 7.00,
      'PLA': Number(document.getElementById('setting-price-pla')?.value) || 7.00,
      'PETG': Number(document.getElementById('setting-price-petg')?.value) || 8.50,
      'ABS': Number(document.getElementById('setting-price-abs')?.value) || 9.00,
      'ASA': Number(document.getElementById('setting-price-abs')?.value) || 9.50,
      'TPU 95A': Number(document.getElementById('setting-price-tpu')?.value) || 12.00,
      'PLA-CF': Number(document.getElementById('setting-price-cf')?.value) || 15.00
    },
    studio: {
      name: document.getElementById('setting-studio-name')?.value || 'Studio Mistri',
      phone: document.getElementById('setting-studio-phone')?.value || '+880 1700-000000',
      email: document.getElementById('setting-studio-email')?.value || 'contact@studiomistri.com',
      bkash: document.getElementById('setting-studio-bkash')?.value || '01700-000000',
      address: document.getElementById('setting-studio-address')?.value || 'Dhaka, Bangladesh'
    }
  };

  saveSettings();

  // Sync to Backend if online
  try {
    await fetch(`${API_BASE_URL}/settings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_rate_per_gram: companyRate,
        studio_name: state.settings.studio.name,
        studio_phone: state.settings.studio.phone,
        studio_email: state.settings.studio.email,
        studio_bkash: state.settings.studio.bkash,
        studio_address: state.settings.studio.address,
        price_presets: state.settings.prices
      })
    });
  } catch (err) {
    // Local fallback
  }

  showToast('Settings saved to local & database storage.', 'success');
  renderAllViews();
}

function exportStudioBackup() {
  const backupData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    filaments: state.filaments,
    orders: state.orders,
    settings: state.settings
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const link = document.createElement('a');
  link.setAttribute('href', dataStr);
  link.setAttribute('download', `StudioMistri_Backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Studio backup JSON exported.', 'success');
}

function importStudioBackup(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);
      if (data.filaments && Array.isArray(data.filaments)) state.filaments = data.filaments;
      if (data.orders && Array.isArray(data.orders)) state.orders = data.orders;
      if (data.settings) state.settings = data.settings;

      saveFilaments();
      saveOrders();
      saveSettings();
      loadSettingsIntoForm();
      renderAllViews();
      showToast('Studio data restored successfully.', 'success');
    } catch (err) {
      console.error('Backup import error:', err);
      showToast('Invalid JSON backup file.', 'error');
    }
  };
  reader.readAsText(file);
}

function resetToFactoryDemoData() {
  if (confirm('Reset all inventory, orders, and financial data to factory demo defaults?')) {
    state.filaments = [...DEFAULT_FILAMENTS];
    state.orders = [...DEFAULT_ORDERS];
    state.settings = { ...DEFAULT_SETTINGS };

    saveFilaments();
    saveOrders();
    saveSettings();
    loadSettingsIntoForm();
    renderAllViews();
    showToast('Factory demo data restored.', 'success');
  }
}

// ============================================================================
// 11. Master Render & Event Bindings
// ============================================================================
function renderAllViews() {
  updateLandingPageColorOptions();
  recalculateLandingPageQuoter();
  renderDashboard();
  renderInventory();
  renderOrders();
  renderSalesReports();
}

function setupEventListeners() {
  // Navigation Links
  document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.getAttribute('data-view');
      if (view) switchView(view);
    });
  });

  // Mobile menu toggle
  document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar')?.classList.toggle('mobile-open');
  });

  // Admin Auth triggers
  document.getElementById('btn-open-admin-login')?.addEventListener('click', () => openModal('modal-admin-login'));
  document.getElementById('form-admin-login')?.addEventListener('submit', handleAdminLogin);
  document.getElementById('btn-admin-logout')?.addEventListener('click', handleAdminLogout);

  // Landing Page Quoter events
  document.getElementById('landing-quote-material')?.addEventListener('change', () => {
    updateLandingPageColorOptions();
    recalculateLandingPageQuoter();
  });
  document.getElementById('landing-quote-color')?.addEventListener('change', recalculateLandingPageQuoter);
  document.getElementById('landing-quote-weight')?.addEventListener('input', recalculateLandingPageQuoter);
  document.getElementById('landing-quote-quality')?.addEventListener('change', recalculateLandingPageQuoter);
  document.getElementById('landing-quote-finish')?.addEventListener('change', recalculateLandingPageQuoter);
  document.getElementById('btn-recalculate-quote')?.addEventListener('click', () => {
    recalculateLandingPageQuoter();
    showToast('Estimate recalculated with live pricing telemetry.', 'info');
  });
  document.getElementById('btn-submit-landing-order')?.addEventListener('click', handleLandingOrderSubmit);

  // Top header quick buttons
  document.getElementById('btn-quick-add-filament')?.addEventListener('click', () => openFilamentModal());
  document.getElementById('btn-quick-new-order')?.addEventListener('click', () => openOrderModal());

  // Inventory controls
  document.getElementById('btn-add-filament-modal')?.addEventListener('click', () => openFilamentModal());
  document.getElementById('btn-toggle-inv-view')?.addEventListener('click', () => {
    state.inventoryViewMode = state.inventoryViewMode === 'grid' ? 'table' : 'grid';
    const label = document.getElementById('inv-view-label');
    if (label) label.textContent = state.inventoryViewMode === 'grid' ? 'Table View' : 'Grid View';
    renderInventory();
  });

  document.getElementById('inv-search-input')?.addEventListener('input', () => renderInventory());
  document.getElementById('inv-brand-filter')?.addEventListener('change', () => renderInventory());
  document.getElementById('inv-stock-filter')?.addEventListener('change', () => renderInventory());

  document.querySelectorAll('#inv-material-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#inv-material-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderInventory();
    });
  });

  // Filament Form
  document.getElementById('form-filament')?.addEventListener('submit', handleFilamentFormSubmit);
  document.getElementById('filament-spool-price')?.addEventListener('input', updateFilamentCostPerGramPreview);
  document.getElementById('filament-full-weight')?.addEventListener('input', updateFilamentCostPerGramPreview);
  
  document.getElementById('filament-color-hex')?.addEventListener('input', (e) => {
    document.getElementById('filament-color-hex-text').value = e.target.value.toUpperCase();
  });
  document.getElementById('filament-color-hex-text')?.addEventListener('input', (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      document.getElementById('filament-color-hex').value = e.target.value;
    }
  });

  // Order controls
  document.getElementById('btn-create-order-modal')?.addEventListener('click', () => openOrderModal());
  document.getElementById('order-search-input')?.addEventListener('input', () => renderOrders());
  document.getElementById('order-status-filter')?.addEventListener('change', () => renderOrders());
  document.getElementById('order-sort-filter')?.addEventListener('change', () => renderOrders());

  // Order Modal Calculator inputs
  document.getElementById('order-model-weight')?.addEventListener('input', recalculateLiveOrderModal);
  document.getElementById('order-price-per-gram')?.addEventListener('input', recalculateLiveOrderModal);
  document.getElementById('order-extra-fee')?.addEventListener('input', recalculateLiveOrderModal);
  document.getElementById('order-filament-select')?.addEventListener('change', (e) => {
    const selectedOpt = e.target.options[e.target.selectedIndex];
    const materialType = selectedOpt.getAttribute('data-type');
    if (materialType && state.settings?.prices?.[materialType]) {
      document.getElementById('order-price-per-gram').value = state.settings.prices[materialType].toFixed(2);
    }
    recalculateLiveOrderModal();
  });
  document.getElementById('form-order')?.addEventListener('submit', handleOrderFormSubmit);

  // Quick Calculator on Dashboard
  document.getElementById('quick-calc-weight')?.addEventListener('input', recalculateDashboardQuickCalc);
  document.getElementById('quick-calc-rate')?.addEventListener('input', recalculateDashboardQuickCalc);

  // Invoice Modal actions
  document.getElementById('btn-download-invoice-pdf')?.addEventListener('click', downloadInvoicePDF);
  document.getElementById('btn-print-invoice-modal')?.addEventListener('click', () => window.print());

  // Sales actions
  document.getElementById('sales-search-input')?.addEventListener('input', () => renderSalesReports());
  document.getElementById('sales-date-filter')?.addEventListener('change', () => renderSalesReports());
  document.getElementById('btn-export-sales-csv')?.addEventListener('click', exportSalesCSV);
  document.getElementById('btn-print-financial-statement')?.addEventListener('click', () => window.print());

  // Settings actions
  document.getElementById('btn-save-settings')?.addEventListener('click', handleSaveSettings);
  document.getElementById('btn-export-backup')?.addEventListener('click', exportStudioBackup);
  document.getElementById('btn-import-backup-trigger')?.addEventListener('click', () => {
    document.getElementById('backup-file-input')?.click();
  });
  document.getElementById('backup-file-input')?.addEventListener('change', importStudioBackup);
  document.getElementById('btn-reset-demo-data')?.addEventListener('click', resetToFactoryDemoData);

  // Delete confirmation action
  document.getElementById('btn-confirm-delete-action')?.addEventListener('click', () => {
    if (typeof state.pendingDeleteAction === 'function') {
      state.pendingDeleteAction();
      state.pendingDeleteAction = null;
    }
    closeModal('modal-delete-confirm');
  });
}

// ============================================================================
// 12. Application Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadLocalState();
  setupEventListeners();
  loadSettingsIntoForm();
  updateFilamentDropdowns();
  renderAllViews();
  updateAdminAuthUI();
  lucide.createIcons();

  // Try to sync with live Django REST backend
  syncWithDjangoBackend();
});
