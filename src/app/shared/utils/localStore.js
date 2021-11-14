const localStore = {
  getItem: item => {
    const itemStr = localStorage.getItem(item);
    return itemStr ? JSON.parse(itemStr) : null;
  },
  setItem: (item, data) => {
    item && data && localStorage.setItem(item, JSON.stringify(data));
  },
  removeItem: item => {
    localStorage.removeItem(item);
  },
};

export default localStore;
