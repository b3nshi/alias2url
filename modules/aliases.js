// Class used to manage our Aliases
function Aliases(chromeStorage) {
  var STORAGE_NAME = "alias2url_db";
  this.db = {};

  this.loadStore = () => {
    return new Promise((resolve) => {
      chromeStorage.get([STORAGE_NAME], (storage) => {
        const obj = storage[STORAGE_NAME];

        if (obj) {
          this.db = JSON.parse(obj);
        }

        resolve(this.db);
      });
    });
  };

  this.getStore = () => this.db;

  this.saveStore = () => {
    chromeStorage.set({ [STORAGE_NAME]: JSON.stringify(this.db) });
  };

  this.addAlias = (alias, target) => {
    if (alias[0] === "#") {
      alias = alias.substring(1);
    }

    if (this.db[alias]) {
      return false;
    }

    this.db[alias] = target;
    this.saveStore();
    return true;
  };

  this.removeAlias = (alias) => {
    if (alias[0] === "#") {
      alias = alias.substring(1);
    }

    if (this.db[alias]) {
      delete this.db[alias];
      this.saveStore();
      return true;
    }

    return false;
  };

  this.getURL = (command) => {
    if (command[0] === "#") {
      command = command.substring(1);
    }
    return this.db[command];
  };
}

export default Aliases;
