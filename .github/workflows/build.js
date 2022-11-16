const fs = require("fs");
const path = require("path");
const { resolve } = require("path");

const ROOT = resolve(__dirname + "/../../");

const HEADER_JS = `${ROOT}/assets/scripts/header.js`;
const HEADER_RE =
  /<script src="[\/\.]+assets\/scripts\/header\.js"(\s+async)?><\/script>/gm;

const FOOTER_JS = `${ROOT}/assets/scripts/footer.js`;
const FOOTER_RE =
  /<script src="[\/\.]+assets\/scripts\/footer\.js"(\s+async)?><\/script>/gm;

const SIDEBAR_JS = `${ROOT}/assets/scripts/sidebar.js`;
const SIDEBAR_RE =
  /<script src="[\/\.]+assets\/scripts\/sidebar\.js"(\s+async)?><\/script>/gm;

const CTA_AREA_JS = `${ROOT}/assets/scripts/cta-area.js`;
const CTA_AREA_RE =
  /<script src="[\/\.]+assets\/scripts\/cta-area\.js"(\s+async)?><\/script>/gm;

globalThis.window = {};
globalThis.document = { getElementById: () => null };
globalThis.location = { pathname: "/", protocol: "https:", href: "" };
globalThis.getNavMenu = () => globalThis.window.getNavMenu();

const buildSection = (filePath, regExp, scriptPath) => {
  globalThis.insertAdjacentHTMLContent = (_, content) => {
    if (regExp === SIDEBAR_RE) {
      content = content.replace(/<\/?aside>/gm, '');
    }
    const data = fs.readFileSync(filePath, "utf8");
    const result = data.replace(regExp, content.replace(/\s+/gm, " "));
    fs.writeFileSync(filePath, result, "utf8");
  };

  require(scriptPath);
  delete require.cache[require.resolve(scriptPath)];
};

const getFiles = (dirPath) => {
  let result = [];
  const files = fs.readdirSync(dirPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(dirPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      result = result.concat(getFiles(filename));
    } else if (filename.endsWith(".html")) {
      result.push(filename);
    }
  }
  return result;
};

const files = getFiles(ROOT);
files.forEach((filePath) => {
  const pathname = filePath.split("/").slice(-2, -1)[0];
  globalThis.location.pathname =
    "Komito-CDN" === pathname ? "/" : `/${pathname}/`;

  buildSection(filePath, HEADER_RE, HEADER_JS);
  buildSection(filePath, FOOTER_RE, FOOTER_JS);
  // buildSection(filePath, SIDEBAR_RE, SIDEBAR_JS);
  buildSection(filePath, CTA_AREA_RE, CTA_AREA_JS);
});
