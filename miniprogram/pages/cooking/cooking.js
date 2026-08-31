Page({
  data: {
    steps: [],
    recipeName: '',
    currentStep: 0,
    totalSteps: 0,
    checked: false,
    checkedSteps: {},
    allDone: false
  },
  
  updateProgress() {
    const percent = Math.round((this.data.currentStep + 1) / this.data.totalSteps * 100)
    this.setData({ progressWidth: percent + '%' })
  },
  
  onLoad(options) {
    if (options.recipe) {
      const recipe = JSON.parse(decodeURIComponent(options.recipe))
      this.setData({
        steps: recipe.steps,
        recipeName: recipe.title,
        totalSteps: recipe.steps.length
      })
    }
  },

  onCheck() {
    const checkedSteps = this.data.checkedSteps
    checkedSteps[this.data.currentStep] = !this.data.checked
    this.setData({
      checked: !this.data.checked,
      checkedSteps: checkedSteps
    })
  },

  onPrev() {
    if (this.data.currentStep > 0) {
      const prevStep = this.data.currentStep - 1
      this.setData({
        currentStep: prevStep,
        checked: !!this.data.checkedSteps[prevStep]
      })
    }
  },

  onNext() {
    if (this.data.currentStep < this.data.totalSteps - 1) {
      const nextStep = this.data.currentStep + 1
      this.setData({
        currentStep: nextStep,
        checked: !!this.data.checkedSteps[nextStep]
      })
    } else {
      this.setData({ allDone: true })
    }
  },

  onBackHome() {
    wx.navigateBack({ delta: 10 })
  }
})