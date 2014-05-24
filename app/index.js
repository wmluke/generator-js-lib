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
            this.log(chalk.magenta('Out of the box I include HTML5 Boilerplate, jQuery, and a gulpfile.js to build your app.'));
        }

        var prompts = [
            {
                type: 'checkbox',
                name: 'features',
                message: 'What more would you like?',
                choices: [
                    {
                        name: 'Sass',
                        value: 'includeSass',
                        checked: true
                    },
                    {
                        name: 'Bootstrap',
                        value: 'includeBootstrap',
                        checked: true
                    },
                    {
                        name: 'Modernizr',
                        value: 'includeModernizr',
                        checked: true
                    }
                ]
            }
        ];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            var hasFeature = function (feat) {
                return features.indexOf(feat) !== -1;
            };

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeSass = hasFeature('includeSass');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');

            cb();
        }.bind(this));
    },

    srcFiles: function () {
        this.mkdir('dist');
        this.mkdir('src');
        this.copy('src/scripts/_project-lib.js', 'src/scripts/' + _str.slugify(this.appname) + '.js');
    },

    testFiles: function () {
        this.mkdir('test');
        this.mkdir('test/specs');
        this.mkdir('test/e2e');

        this.copy('app/styles/main.scss', 'test/app/styles/main.scss');
        this.copy('app/scripts/app.js', 'test/app/scripts/app.js');
        this.template('app/_index.html', 'test/app/index.html');
    },

    projectFiles: function () {
        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.copy('_gulpfile.js', 'gulpfile.js');
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
        this.copy('bowerrc', '.bowerrc');
    }
});

module.exports = JsLibGenerator;
