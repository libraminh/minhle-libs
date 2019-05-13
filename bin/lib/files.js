const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs')
const CURR_DIR = process.cwd()

const instance = {}

instance.createDirectoryContents = async (templatePath, newProjectPath, promptMode, dataPrompt) => {
  const filesToCreate = fs.readdirSync(templatePath)
  let files = dataPrompt ? promptMode.filterFiles(filesToCreate, dataPrompt) : filesToCreate

  files.forEach(async file => {
    const currentFilePath = path.join(path.resolve(), 'templates', newProjectPath, file)
    const renderFilesPath = path.join(CURR_DIR, newProjectPath, file)
    const origFilePath = path.join(templatePath, file)

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      ejs.renderFile(currentFilePath, dataPrompt || {}, async function(err, str){
        try {
          await fs.outputFile(renderFilesPath, str)
          console.log()
        } catch (err) {
          console.error(err)
        }
      });
    } else if (stats.isDirectory()) {
      await fs.ensureDir(renderFilesPath)

      // recursive call
      instance.createDirectoryContents(path.join(templatePath, file), path.join(newProjectPath, file), promptMode, dataPrompt);
    }
  })
}

module.exports = instance