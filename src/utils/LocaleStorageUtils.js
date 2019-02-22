export class LocaleStorageUtils {
  static LSget(key) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) {
        return undefined;
      }
      if (typeof data === "object") {
        return JSON.parse(data);
      }
      return data;
    } catch (e) {
      return undefined;
    }
  }

  static LSupdate(key, data) {
    localStorage.setItem(key, data);
  }

  static LSdelete(key) {
    localStorage.removeItem(key);
  }
}
