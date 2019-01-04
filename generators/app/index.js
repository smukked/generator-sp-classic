'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        var config = this.config.getAll();

        this.log(
            yosay(`Welcome to the excellent ${chalk.red('generator-sp-classic')} generator!`)
        );

        const prompts = [
            {
                type: 'input',
                name: 'client',
                message: 'Customer name',
                default: config.customer || 'Client',
                store: !config.customer
            },
            {
                type: 'input',
                name: 'project',
                message: 'Project name (example: MyDemoProject)',
                default: config.project
            },
            {
                type: 'input',
                name: 'description',
                message: 'Description',
                default: config.description
            }
        ];

        return this.prompt(prompts).then(props => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    writing() {
        let folderName = this.props.client.replace(/ /g, '') + "-" + this.props.project.replace(/ /g, '');

        this.destinationRoot(folderName);

        // set template options
        var options = {
            client: this.props.client,
            project: this.props.project,
            clientLower: this.props.client.toLowerCase(),
            projectLower: this.props.project.toLowerCase(),
            description: this.props.description
        }

        // copy helper functions
        this.copyRaw = function (folder) {
            this.fs.copy(
                this.templatePath(folder),
                this.destinationPath(folder));
        }
        this.copyTemplate = function (source) {
            var target = source
                .replace(/___ClientProject___/g, (options.client + options.project))
                .replace(/___Project___/g, options.project)
                .replace(/^_/g, '')
                .replace(/\/_/g, '/');

            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(target),
                options);
        };

        // src files        
        this.copyTemplate("src/___ClientProject___/Actions/_StateActions.ts");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Flux.module.scss");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Flux.test.tsx");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Flux.tsx");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Pages.module.scss");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Pages.test.tsx");
        this.copyTemplate("src/___ClientProject___/Component/___Project___Pages.tsx");
        this.copyTemplate("src/___ClientProject___/Constans/StateActionTypes.ts");
        this.copyTemplate("src/___ClientProject___/Dispatcher/Dispatcher.ts");
        this.copyTemplate("src/___ClientProject___/Initialize/_Init.tsx");
        this.copyTemplate("src/___ClientProject___/Initialize/Init.scss");
        this.copyTemplate("src/___ClientProject___/Models/PageModel.ts");
        this.copyTemplate("src/___ClientProject___/Services/___mocks__/___Project___Service.ts");
        this.copyTemplate("src/___ClientProject___/Services/___Project___Service.ts");
        this.copyTemplate("src/___ClientProject___/Stores/StateStor.ts");

        // - Config
        this.copyTemplate('_config/process-coverage-report.js');

        // - Config/Jest
        this.copyTemplate('_config/_Jest/_jest.config.json');
        this.copyTemplate('_config/_Jest/jest.setup.ts');
        this.copyTemplate('_config/_Jest/jest.trx.processor.js');
        // - Config/Jest/Mocks
        this.copyTemplate('_config/_Jest/mocks/_global.mock.ts');

        // - Config/WebPack
        this.copyTemplate('_config/_WebPack/_webpack.config.js');
        this.copyTemplate('_config/_WebPack/webpack.common.config.js');
        this.copyTemplate('_config/_WebPack/webpack.dev.server.config.js');

        // - Package
        this.copyTemplate('_package/010_Style_Library/_Deploy.ps1');
        this.copyTemplate('_package/020_Link/_Deploy.ps1');
        this.copyTemplate('_package/Install.ps1');

        // - Root files
        this.copyRaw(".vscode");
        this.copyTemplate('_Default.html');
        this.copyTemplate('_package.json');
        this.copyTemplate('_readme.md');
        this.copyTemplate('_.gitignore');
        this.copyTemplate('_api-server.js');
        this.copyTemplate('_tsconfig.json');
        this.copyTemplate('_tslint.json');
    }

    install() {
        this.npmInstall();
        // this.installDependencies();
    }
};