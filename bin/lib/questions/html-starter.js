
const questionConditional = answers => answers.templates.includes("html-starter")

const htmlQuestions = [
  {
    type: "input",
    name: "elementName",
    message: "What would you like to name your project?",
    default: "Starter",
    when: questionConditional
  },
  {
    type: "checkbox",
    name: "features",
    message: "Which additional features would you like to include?",
    choices: [
      {
        name: "Bootstrap",
        value: "includeBootstrap",
        checked: true
      },
      {
        name: "Jade/Pug",
        value: "includePug",
        checked: true
      },
      {
        name: "FontAwesome 4",
        value: "includeFontAwesome",
        checked: true
      }
    ],
    when: questionConditional
  },
  {
    type: "confirm",
    name: "includeJQuery",
    message: "Would you like to include jQuery?",
    default: true,
    when: answers => answers.templates.includes('html-starter') && answers.features.includes('includeBootstrap')
  }
]

module.exports = htmlQuestions