export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._selector = selector;
    this._renderer = renderer;
  }
  renderer() {
    this._items.forEach((item) => {
      this._renderer(item);
      console.log(item);
    });
  }
  add_Item(item) {
    document.querySelector(this._selector).append(item);
  }
}
