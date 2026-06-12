/**
 * <variant-selector> Web Component
 * Handles variant selection and URL/price updates without a framework.
 * Follows the same pattern as Dawn's variant picker.
 */
class VariantSelector extends HTMLElement {
  connectedCallback() {
    this.addEventListener('change', this.onVariantChange.bind(this));
  }

  onVariantChange() {
    const url = new URL(this.dataset.url, window.location.origin);
    const selectedOptions = [...this.querySelectorAll('select')].map(el => el.value);

    // Update URL without reload
    const params = new URLSearchParams(window.location.search);
    params.set('variant', this.getVariantId(selectedOptions));
    window.history.replaceState({}, '', `${url.pathname}?${params}`);

    // Dispatch event for other components to react (e.g. product-form)
    this.dispatchEvent(new CustomEvent('variant:change', {
      bubbles: true,
      detail: { selectedOptions }
    }));
  }

  getVariantId(selectedOptions) {
    // Shopify exposes product JSON via a script tag — query it
    const productData = JSON.parse(
      document.querySelector('[data-product-json]')?.textContent || '{}'
    );

    const match = (productData.variants || []).find(variant =>
      variant.options.every((opt, i) => opt === selectedOptions[i])
    );

    return match?.id || '';
  }
}

customElements.define('variant-selector', VariantSelector);
