/**
 * <product-form> Web Component
 * Intercepts the add-to-cart form submission and uses the Cart API.
 */
class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.submitButton = this.querySelector('[type="submit"]');
    this.form?.addEventListener('submit', this.onSubmit.bind(this));
  }

  async onSubmit(event) {
    event.preventDefault();

    this.setLoading(true);

    try {
      const formData = new FormData(this.form);
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
        body: formData
      });

      if (!response.ok) throw new Error('Add to cart failed');

      const item = await response.json();

      // Dispatch event — let the rest of the page react (e.g. cart count update)
      document.dispatchEvent(new CustomEvent('cart:item-added', {
        detail: { item }
      }));

      this.updateCartCount();

    } catch (error) {
      console.error(error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    this.submitButton?.setAttribute('aria-busy', loading);
    this.submitButton.disabled = loading;
  }

  async updateCartCount() {
    const response = await fetch('/cart.js');
    const cart = await response.json();
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cart.item_count;
    });
  }
}

customElements.define('product-form', ProductForm);
