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

  onCopyLink() {
    const text = this.data.recipe.source_url || ''
    wx.setClipboardData({
      data: text,
      success: () => {
        wx.showToast({ title: '链接已复制，打开抖音即可查看', icon: 'none' })
      }
    })
  }
})