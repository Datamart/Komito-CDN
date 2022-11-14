const fs = require("fs");
const { resolve } = require("path");

globalThis.window = {};
globalThis.document = {};
globalThis.location = { pathname: "/", protocol: "https:" };

globalThis.getNavMenu = () => globalThis.window.getNavMenu();

const buildSection = (filePath, regExp, scriptPath) => {
  const pathname = filePath.split("/").slice(-2, -1)[0];
  globalThis.location.pathname =
    "Komito-CDN" === pathname ? "/" : "/" + pathname + "/";

  globalThis.insertAdjacentHTMLContent = (_, content) => {
    const data = fs.readFileSync(filePath, "utf8");
    const result = data.replace(regExp, content.replace(/\s+/gm, " "));
    fs.writeFileSync(filePath, result, "utf8");
  };
  require(scriptPath);
  delete require.cache[require.resolve(scriptPath)];
};

const FILES = [
  resolve(__dirname + "/../../index.html"),
  resolve(__dirname + "/../../about/index.html"),
  resolve(__dirname + "/../../demo/index.html"),
  resolve(__dirname + "/../../integration/index.html"),
  resolve(__dirname + "/../../services/index.html"),
  resolve(__dirname + "/../../support/index.html"),
  resolve(__dirname + "/../../404.html"),
];

const HEADER_JS = resolve(__dirname + "/../../assets/scripts/header.js");
const HEADER_RE =
  /<script src="[\/\.]+assets\/scripts\/header\.js"(\s+async)?><\/script>/gm;

const FOOTER_JS = resolve(__dirname + "/../../assets/scripts/footer.js");
const FOOTER_RE =
  /<script src="[\/\.]+assets\/scripts\/footer\.js"(\s+async)?><\/script>/gm;

const CTA_AREA_JS = resolve(__dirname + "/../../assets/scripts/cta-area.js");
const CTA_AREA_RE =
  /<script src="[\/\.]+assets\/scripts\/cta-area\.js"(\s+async)?><\/script>/gm;

const buildHeader = (filePath) => {
  buildSection(filePath, HEADER_RE, HEADER_JS);
};

const buildFooter = (filePath) => {
  buildSection(filePath, FOOTER_RE, FOOTER_JS);
};

const buildCTA = (filePath) => {
  buildSection(filePath, CTA_AREA_RE, CTA_AREA_JS);
};

FILES.forEach((filePath) => {
  buildHeader(filePath);
  buildFooter(filePath);
  buildCTA(filePath);
});
