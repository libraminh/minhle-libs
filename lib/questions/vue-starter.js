
const questionConditional = answers => answers.templates.indexOf("vue-starter") !== -1

const vueQuestions = [
  {
    type: "checkbox",
    name: "additional",
    message: "Which additional features would you like to include?",
    choices: [
      {
        name: "Vuex",
        value: "includeVuex",
        checked: true
      },
      {
        name: "Vue Router",
        value: "includeVueRouter",
        checked: true
      },
      {
        name: "Eslint",
        value: "includeEslint",
        checked: true
      }
    ],
    when: questionConditional
  },
  {
    type: "checkbox",
    name: "features",
    message: "Would you like to install these utility libraries?",
    choices: [
      {
        name: "Axios",
        value: "includeAxios",
        checked: true
      },
      {
        name: "Moment js",
        value: "includeMomentJs",
        checked: true
      },
      {
        name: "Jquery",
        value: "includeJquery",
        checked: true
      },
      {
        name: "Vue2 Animate",
        value: "includeVue2Animate",
        checked: true
      },
      {
        name: "FontAwesome 4",
        value: "includeFontAwesome",
        checked: true
      }
    ],
    when: questionConditional
  }
]

module.exports = vueQuestions