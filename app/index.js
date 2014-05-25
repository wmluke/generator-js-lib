'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _str = require('underscore.string');


var JsLibGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var cb = this.async();

        // welcome message
        if (!this.options['skip-welcome-message']) {
            this.log(yosay());
            this.log(chalk.magenta('Throwing up js lib scaffold...'));
        }

        var prompts = [];

        this.prompt(prompts, function (answers) {
            cb();
        }.bind(this));
    },

    srcFiles: function () {
        this.mkdir('dist');
        this.copy('src/scripts/_project-lib.js', 'src/scripts/' + _str.slugify(this.appname) + '.js');
        this.copy('src/jshintrc', 'src/.jshintrc');
    },

    testFiles: function () {
        this.copy('karma.conf.js', 'karma.conf.js')
        this.template('test/specs/_project-lib-spec.js', 'test/specs/' + _str.slugify(this.appname) + '-spec.js');
        this.copy('test/specs/jshintrc', 'test/specs/.jshintrc');
        this.copy('app/styles/main.scss', 'test/app/styles/main.scss');
        this.copy('app/scripts/app.js', 'test/app/scripts/app.js');
        this.template('app/_index.html', 'test/app/index.html');
    },

    projectFiles: function () {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.copy('gulpfile.js', 'gulpfile.js');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('travis.yml', '.travis.yml');
        this.copy('Makefile', 'Makefile');
    }
});

module.exports = JsLibGenerator;
