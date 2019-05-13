const instance = {}

instance.promptData = (answers) => {
  const templates = answers.templates
  const additional = answers.additional
  const features = answers.features
  const hasFeature = feat => features && features.indexOf(feat) !== -1
  const hasAdditional = add => additional && additional.indexOf(add) !== -1

  const dataConditional = {
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

  return {templates, dataConditional}
}

instance.filterFiles = (filesToCreate, dataConditional) => {
  return filesToCreate.filter(item => {

    if(dataConditional.includeVuex === false && item.includes('store')) {
      return false
    } else if(dataConditional.includeVueRouter === false && item.includes('router.js')) {
      return false
    } else if(dataConditional.includeEslint === false && item.includes('.eslintrc.js')) {
      return false
    }
    return true
  })
}

module.exports = instance
