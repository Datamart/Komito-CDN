var fs = require("fs");

globalThis.window = {};
globalThis.document = {};
globalThis.location = { pathname: "/", protocol: "https:" };

globalThis.getNavMenu = () => globalThis.window.getNavMenu();

const buildSection = (filePath, regExp, scriptPath, callback) => {
  globalThis.insertAdjacentHTMLContent = (_, content) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) return console.error(err);
      const result = data.replace(regExp, content.replace(/\s+/gm, " "));
      fs.writeFile(filePath, result, "utf8", (err) => {
        if (err) return console.error(err);
        callback && callback();
      });
    });
  };
  require(scriptPath);
};

const buildHeader = () => {
  const regExp = /<script src="(\.+)?\/assets\/scripts\/header.js"><\/script>/gm;
  const scriptPath = "../../assets/scripts/header.js";
  const filePath = "../../index.html";
  buildSection(filePath, regExp, scriptPath, buildFooter);
};

const buildFooter = () => {
  const regExp = /<script src="(\.+)?\/assets\/scripts\/footer.js"(\s+async)?><\/script>/gm;
  const scriptPath = "../../assets/scripts/footer.js";
  const filePath = "../../index.html";
  buildSection(filePath, regExp, scriptPath, buildCTA);
};

const buildCTA = () => {
  const regExp = /<script src="(\.+)?\/assets\/scripts\/cta-area.js"(\s+async)?><\/script>/gm;
  const scriptPath = "../../assets/scripts/cta-area.js";
  const filePath = "../../index.html";
  buildSection(filePath, regExp, scriptPath, buildCTA);
}

buildHeader();
