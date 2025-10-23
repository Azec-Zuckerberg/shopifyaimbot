document.documentElement.classList.add('js-enabled');

const headerToggle = document.querySelector('.site-header__nav-toggle');
const headerNav = document.querySelector('.site-header__nav');

if (headerToggle && headerNav) {
  headerToggle.addEventListener('click', () => {
    const expanded = headerToggle.getAttribute('aria-expanded') === 'true';
    headerToggle.setAttribute('aria-expanded', String(!expanded));
    headerNav.setAttribute('aria-expanded', String(!expanded));
  });
}

document.querySelectorAll('[data-address-toggle]').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const form = document.getElementById('AddressFormNew');
    if (!form) return;
    const hidden = form.hasAttribute('hidden');
    if (hidden) {
      form.removeAttribute('hidden');
    } else {
      form.setAttribute('hidden', 'hidden');
    }
  });
});

document.querySelectorAll('[data-address-edit]').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-address-edit');
    const form = document.getElementById('EditAddress_' + id);
    if (!form) return;
    const hidden = form.hasAttribute('hidden');
    document.querySelectorAll('[id^="EditAddress_"]').forEach((f) => f.setAttribute('hidden', 'hidden'));
    if (hidden) {
      form.removeAttribute('hidden');
    } else {
      form.setAttribute('hidden', 'hidden');
    }
  });
});

document.querySelectorAll('form[action*="/account/addresses/"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const message = form.getAttribute('data-confirm-message');
    if (!window.confirm(message || 'Delete this address?')) {
      event.preventDefault();
    }
  });
});

if (window.Shopify && Shopify.CountryProvinceSelector) {
  document.querySelectorAll('[data-address-country-select]').forEach((select) => {
    const formId = select.getAttribute('data-form-id');
    const province = document.getElementById('AddressProvince_' + formId);
    new Shopify.CountryProvinceSelector(select.id, province ? province.id : null);
  });
}
