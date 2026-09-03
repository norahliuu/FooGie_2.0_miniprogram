Page({
  data: {
    recipe: {}
  },

  onShow() {
    const pages = getCurrentPages()
    const options = pages[pages.length - 1].options
    const index = options.index || 0
    const history = wx.getStorageSync('recipeHistory') || []
    if (history[index]) {
      this.setData({ recipe: history[index], recipeIndex: index })
    }
    const checked = wx.getStorageSync('checkedIngredients_' + index) || {}
    this.setData({ checkedIngredients: checked })
  },

  onCopyLink() {
    const text = this.data.recipe.source_url || ''
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '链接已复制，打开抖音即可查看', icon: 'none' })
      }
    })
  },
  onStartCooking() {
  wx.navigateTo({
    url:
      '/pages/cooking/cooking?recipe=' +
      encodeURIComponent(JSON.stringify(this.data.recipe))
  })
  },

  onEdit() {
    wx.navigateTo({
      url: '/pages/edit/edit?index=' + this.data.recipeIndex
    })
  },

  onToggleIngredient(e) {
    const index = e.currentTarget.dataset.index
    const checked = this.data.checkedIngredients
    checked[index] = !checked[index]
    this.setData({ checkedIngredients: checked })
    // 保存勾选状态到本地
    wx.setStorageSync('checkedIngredients_' + this.data.recipeIndex, checked)
  },
})