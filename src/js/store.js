class Store {
  constructor({key, storage}) {
    this._storeKey = key;
    this._storage = storage;
  }

  setItem({key, item}) {
    const items = this.getAll();
    items[key] = item;

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  removeItem({key}) {
    const items = this.getAll();
    delete items[key];

    this._storage.setItem(this._storeKey, JSON.stringify(items));
  }

  getItem({key}) {
    const items = this.getAll();
    return items[key];
  }

  getAll() {
    const emptyItems = {};
    const items = this._storage.getItem(this._storeKey);

    if (!items) {
      return emptyItems;
    }

    try {
      return JSON.parse(items);
    } catch (e) {
      return emptyItems;
    }
  }

  setDataItem({key, item}) {
    this._storage.setItem(key, JSON.stringify(item));
  }

  getDataItem({key}) {
    return JSON.parse(this._storage.getItem(key));
  }
}

export default Store;
