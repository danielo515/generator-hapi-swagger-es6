'use strict';
const Generator = require('yeoman-generator');
const mkdir = require(`mkdirp`);
const { isPlainObject, set, toPairs } = require(`lodash`);
const { spawnSync: spawn, execSync: exec } = require(`child_process`);

/**
 * This is a yeoman generator that contains some utility methods.
 * It is not meant to be used directly, but to be extended by other generators or sub-generators.
 * Methods in this generator are utility functions that will not be executed during the normal scafolding, but they can be used
 * inside your curreng generator/sub-generator
 * @class {BaseGenerator}
 * @return {type} {description}
 */
module.exports = class extends Generator {
  _getNPMConfig() {
    const author = exec(`npm config get init-author-name`, { encoding: `utf-8` }) || ``;
    const email = exec(`npm config get init-author-email`, { encoding: `utf-8` }) || ``;
    return { author, email };
  }

  _ucFirst(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  _hyphenate(name) {
    return name.split(` `).join(`-`);
  }

  _pathNamesToNestedObjects(src) {
    return toPairs(src).reduce((res, [path, value]) => set(res, path, value));
  }

  _camelCase(name) {
    return name
      .split(`-`)
      .map((s, i) => {
        if (i === 0) return s;
        return this._ucFirst(s);
      })
      .join(``);
  }

  _spawn(cmd) {
    const parts = cmd.split(` `);
    const [first, ...rest] = parts;

    spawn(first, rest, { stdio: `inherit` });
  }

  _copyFile(f) {
    let from = f;
    let to = f;

    if (isPlainObject(f)) ({ from, to } = f);

    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this.props, {
      interpolate: /<%=([\s\S]+?)%>/g
    });
  }

  _createDir(d) {
    mkdir(d, e => {
      if (e) console.error(e);
    });
  }
};
