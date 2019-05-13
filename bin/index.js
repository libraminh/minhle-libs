#!/usr/bin/env node

const chalk = require('chalk')
const clear       = require('clear')
const figlet      = require('figlet')
const fs = require('fs-extra')
const path = require('path')
const inquirer = require('./lib/inquirer')

const CURR_DIR = process.cwd()
const filesFeature = require('./lib/files')
const vuePrompt = require('./lib/promptData/vuePrompt')
const htmlPrompt = require('./lib/promptData/htmlPrompt')

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Minh Le Libs', { 
      font: 'Ghost'
    })
  )
);

const run = async () => {
  const answers = await inquirer.askTemplates()
  let dataPrompt = null
  let promptMode = null
  let templates = answers.templates

  if(answers.templates === 'html-starter') {
    dataPrompt = htmlPrompt.promptData(answers).dataConditional
    promptMode = htmlPrompt
  } else if(answers.templates === 'vue-starter') {
    dataPrompt = vuePrompt.promptData(answers).dataConditional
    promptMode = vuePrompt
  }

  // const vueDataArray = Object.entries(vueData)
  // const vueDataArrayObject = vueDataArray.map(([item, val]) => ({[item]: val}))
  const templatePath = path.join(__dirname, '/../', 'templates', templates)
  const newProjectPath = templates

  try {
    await fs.remove(path.join(CURR_DIR, templates))
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