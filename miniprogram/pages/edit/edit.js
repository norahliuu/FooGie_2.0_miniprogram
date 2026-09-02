Page({
  data: {
    recipe: {},
    recipeIndex: 0
  },

  onLoad(options) {
    const index = options.index || 0
    const history = wx.getStorageSync('recipeHistory') || []
    if (history[index]) {
      this.setData({
        recipe: JSON.parse(JSON.stringify(history[index])),
        recipeIndex: parseInt(index)
      })
    }
  },

  onTitleChange(e) {
    this.setData({ 'recipe.title': e.detail.value })
  },

  onIngredientChange(e) {
    const { index, field } = e.currentTarget.dataset
    const key = `recipe.ingredients[${index}].${field}`
    this.setData({ [key]: e.detail.value })
  },

  onAddIngredient() {
    const ingredients = this.data.recipe.ingredients
    ingredients.push({ name: '', quantity: '' })
    this.setData({ 'recipe.ingredients': ingredients })
  },

  onDeleteIngredient(e) {
    const index = e.currentTarget.dataset.index
    const ingredients = this.data.recipe.ingredients
    ingredients.splice(index, 1)
    this.setData({ 'recipe.ingredients': ingredients })
  },

  onStepChange(e) {
    const index = e.currentTarget.dataset.index
    const key = `recipe.steps[${index}].content`
    this.setData({ [key]: e.detail.value })
  },

  onAddStep() {
    const steps = this.data.recipe.steps
    steps.push({ step: steps.length + 1, content: '' })
    this.setData({ 'recipe.steps': steps })
  },

  onDeleteStep(e) {
    const index = e.currentTarget.dataset.index
    const steps = this.data.recipe.steps
    steps.splice(index, 1)
    steps.forEach((s, i) => s.step = i + 1)
    this.setData({ 'recipe.steps': steps })
  },

  onMoveStep(e) {
    const { index, direction } = e.currentTarget.dataset
    const steps = this.data.recipe.steps
    const i = parseInt(index)

    if (direction === 'up' && i > 0) {
      [steps[i], steps[i - 1]] = [steps[i - 1], steps[i]]
    } else if (direction === 'down' && i < steps.length - 1) {
      [steps[i], steps[i + 1]] = [steps[i + 1], steps[i]]
    } else {
      return
    }

    steps.forEach((s, idx) => s.step = idx + 1)
    this.setData({ 'recipe.steps': steps })
  },

  onSave() {
    const history = wx.getStorageSync('recipeHistory') || []
    history[this.data.recipeIndex] = this.data.recipe
    wx.setStorageSync('recipeHistory', history)
    wx.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1000)
  }
})