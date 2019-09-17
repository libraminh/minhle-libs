#!/usr/bin/env node

// Import library
const chalk = require('chalk')
const clear       = require('clear')
const figlet      = require('figlet')
const fs = require('fs-extra')
const path = require('path')

// Set variables
const CURR_DIR = process.cwd()
const inquirer = require('./lib/inquirer')
const filesFeature = require('./lib/files')
const vuePrompt = require('./lib/promptData/vuePrompt')
const htmlPrompt = require('./lib/promptData/htmlPrompt')

// Clear terminal and Show author's name
clear();
console.log(
    chalk.yellow(
        figlet.textSync('minhle libs', { 
            font: 'big'
        })
    )
);

const run = async () => {
    const answers = await inquirer.askTemplates()
    let dataPrompt = null
    let promptMode = null
    const templates = answers.templates
    const templatePath = path.join(__dirname, '/../', 'templates', templates)
    const newProjectPath = templates

    // Set chosen template
    switch (answers.templates) {
        case 'html-starter':
            dataPrompt = htmlPrompt.promptData(answers).dataConditional;
            promptMode = htmlPrompt;
            break;
        case 'vue-starter':
            dataPrompt = vuePrompt.promptData(answers).dataConditional;
            promptMode = vuePrompt;
            break;
        default: 
            break;
    }

    try {
        // Remove old build version
        await fs.remove(path.join(CURR_DIR, templates))

        // Create template files
        filesFeature.createDirectoryContents(templatePath, newProjectPath, promptMode, dataPrompt)

        console.log(
            chalk.green('Succeeded !')
        );
        console.log(
            chalk.green(`cd ${answers.templates}`)
        );
        console.log(
            chalk.green('npm install or yarn')
        );
        console.log(
            chalk.green('yarn dev or yarn build')
        );
    } catch (err) {
        console.error(err)
    }
}

run();