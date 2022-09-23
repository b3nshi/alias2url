import Aliases from "./modules/aliases.js";
import Command from "./modules/command.js";

const aliases = new Aliases(chrome.storage.sync);

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, tab) => {
  const command = Command.extractCommand(tab.url);
  if (Command.isValid(command) && changeInfo.status === "loading") {
    aliases.loadStore().then(() => {
      const newURL = aliases.getURL(command);

      if (newURL) {
        chrome.tabs.update(tab.id, { url: newURL });
      }
    });
  }
});
