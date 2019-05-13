const instance = {}

instance.promptData = (answers) => {
  const templates = answers.templates
  const features = answers.features
  const hasFeature = feat => features && features.indexOf(feat) !== -1

  const dataConditional = {
    includeBootstrap: hasFeature("includeBootstrap"),
    includePug: hasFeature("includePug"),
    includeFontAwesome: hasFeature("includeFontAwesome"),
    includeJQuery: answers.includeJQuery,
    elementName: answers.elementName,
    currentJQuery:
      this.includeJQuery == undefined ? true : this.includeJQuery
  }

  return {templates, dataConditional}
}

instance.filterFiles = (filesToCreate, dataConditional) => {
  return filesToCreate.filter(item => {
    // console.log(item)

    if(dataConditional.includePug === false && item.includes('index.pug')) {
      return false
    } else if(dataConditional.includePug === false && item.includes('jadefiles')) {
      return false
    } else if(dataConditional.includePug === true && item.includes('index.html')) {
      return false
    }

    return true
  })
}

module.exports = instance
