const inquirer   = require('inquirer');
const fs = require('fs-extra')
const path = require('path')
const vueQuestions = require('./questions/vue-starter') 
const htmlQuestions = require('./questions/html-starter')

const projectsURL = path.join(__dirname, '/../', '/../' , 'templates')
const projects = fs.readdirSync(projectsURL)

module.exports = {

  askTemplates: () => {
    const questions = [
      {
        name: 'templates',
        type: 'list',
        message: 'Please choice the template you want to generator',
        choices: projects
      }
    ]

    vueQuestions.forEach(item => {
      questions.push(item)
    })

    htmlQuestions.forEach(item => {
      questions.push(item)
    })

    return inquirer.prompt(questions);
  }
}
