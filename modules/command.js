const Command = {
  extractFromSearchURL: (url) => {
    return (url.split("q=")[1].split("&")[0] || "").replace("%23", "#");
  },

  extractCommand: (url) => {
    if (url.includes("q=")) {
      return Command.extractFromSearchURL(url);
    }
  },

  isValid: (cmd) => {
    return cmd && cmd.length > 1 && cmd.split("#").length === 2;
  },
};

export default Command;
