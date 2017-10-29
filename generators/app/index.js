const BaseGenerator = require('../../utils/BaseGenerator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends BaseGenerator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to ' + chalk.red('Hapi Swagger ES6') + ' generator!'));

    const { author, email = this.git.email() } = this._getNPMConfig();

    const prompts = [
      // Server
      {
        type: `input`,
        name: 'service.name',
        message: `Server Name`,
        default: this._hyphenate(this.appname)
      },
      {
        type: `input`,
        name: 'service.description',
        message: `Description (what does this server do)`,
        default: 'A modern hapijs backend'
      },
      {
        type: `input`,
        name: 'service.port',
        message: `Default port of the server`,
        default: 3000
      },
      // Author
      {
        type: `input`,
        name: 'author.fullName',
        message: `Author (also used in license)`,
        default: author.trim(),
        store: true
      },
      {
        type: `input`,
        name: 'author.name',
        message: `Author short name`,
        default: this._hyphenate(author.trim()),
        store: true
      },
      {
        type: `input`,
        name: `author.email`,
        message: `Author Email`,
        default: email.trim(),
        store: true
      },
      {
        type: `input`,
        name: `author.github`,
        message: `Github Username`,
        store: true
      },
      // Docker
      {
        type: `confirm`,
        name: `useDocker`,
        default: true,
        message: `Do want to use docker ?`
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    const { fullName: name, email } = this.props.author;
    this.composeWith(require.resolve('generator-license'), {
      name,
      email,
      licensePrompt: 'Which license do you want to use?',
      defaultLicense: 'MIT'
    });
  }

  writing() {
    console.log(this.prompt === require('inquirer').prompt);
    // Folders
    this._copyFile('lib');
    this._copyFile('test');
    this._copyFile('config');
    // Root files
    this._copyFile('.gitignore');
    this._copyFile('.eslintignore');
    this._copyFile('.eslintrc');
    // Docker
    if (this.props.useDocker) {
      this._copyFile('docker-compose.yml');
      this._copyFile('Dockerfile');
    }

    this._copyFile('README.md');
    // Special files
    this._copyFile({ from: '__package.json', to: 'package.json' });
  }

  install() {
    /* This.installDependencies(); */
  }
};
