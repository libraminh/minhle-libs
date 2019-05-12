#!/usr/bin/env node

const chalk = require('chalk')
const clear       = require('clear')
const figlet      = require('figlet')
const Configstore = require('configstore')
const fs = require('fs-extra')
const path = require('path')
const ejs = require('ejs')

const files = require('./lib/files')
const inquirer  = require('./lib/inquirer')
const conf = new Configstore('ginit')
const CURR_DIR = process.cwd()

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Minh Le Libs', { 
      horizontalLayout: 'full',
      font: 'Ghost'
    })
  )
);

const run = async () => {
  const answers = await inquirer.askTemplates()
  const templates = answers.templates
  const additional = answers.additional
  const features = answers.features
  const hasFeature = feat => features && features.indexOf(feat) !== -1
  const hasAdditional = add => additional && additional.indexOf(add) !== -1

  const vueData = {
    includeVue: hasFeature("vue-starter"),
    includeAxios: hasFeature("includeAxios"),
    includeMomentJs: hasFeature("includeMomentJs"),
    includeJquery: hasFeature("includeJquery"),
    includeVue2Animate: hasFeature("includeVue2Animate"),
    includeFontAwesome: hasFeature("includeFontAwesome"),
    includeVuex: hasAdditional("includeVuex"),
    includeVueRouter: hasAdditional("includeVueRouter"),
    includeEslint: hasAdditional("includeEslint")
  }

  const vueDataArray = Object.entries(vueData)
  const vueDataArrayObject = vueDataArray.map(([item, val]) => ({[item]: val}))
  const templatePath = path.join(path.resolve(), 'templates', templates)
  const newProjectPath = templates


  try {
    await fs.remove(path.join(CURR_DIR, templates))
    createDirectoryContents(templatePath, newProjectPath, vueData)
    console.log('success!')
  } catch (err) {
    console.error(err)
  }
}

async function createDirectoryContents (templatePath, newProjectPath, vueData) {
  const filesToCreate = fs.readdirSync(path.join(templatePath))

  let files = filesToCreate.filter(item => {
    if(vueData.includeVuex === false && item.includes('store')) {
      return false
    } else if(vueData.includeVueRouter === false && item.includes('router.js')) {
      return false
    } else if(vueData.includeEslint === false && item.includes('.eslintrc.js')) {
      return false
    }
    return true
  })

  files.forEach(async file => {
    const currentFilePath = path.join(path.resolve(), 'templates', newProjectPath, file)
    const renderFilesPath = path.join(CURR_DIR, newProjectPath, file)
    const origFilePath = path.join(templatePath, file)

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      ejs.renderFile(currentFilePath, vueData, async function(err, str){
        try {
          await fs.outputFile(renderFilesPath, str)
        } catch (err) {
          console.error(err)
        }
      });
    } else if (stats.isDirectory()) {
      await fs.ensureDir(renderFilesPath)

      // recursive call
      createDirectoryContents(path.join(templatePath, file), path.join(newProjectPath, file), vueData);
    }
  })
}

run();



// console.log(renderPath)
// console.log(filesToCreate)

// if (files.directoryExists('.git')) {
//   console.log(chalk.red('Already a git repository!'));
//   process.exit();
// }