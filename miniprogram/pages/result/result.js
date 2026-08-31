Page({
  data: {
    recipe: {}
  },

  onLoad(options) {
    const index = options.index || 0
    const history = wx.getStorageSync('recipeHistory') || []
    if (history[index]) {
      this.setData({ recipe: history[index] })
    }
  },

  onStartCooking() {
    wx.navigateTo({
      url: '/pages/cooking/cooking?recipe=' + encodeURIComponent(JSON.stringify(this.data.recipe))
    })
  }
})