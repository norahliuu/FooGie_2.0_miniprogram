Page({
  data: {
    historyList: []
  },

  onShow() {
    const history = wx.getStorageSync('recipeHistory') || []
    this.setData({ historyList: history })
  },

  onHistoryTap(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/result/result?index=' + index
    })
  },

  onDelete(e) {
    const index = e.currentTarget.dataset.index
    let history = wx.getStorageSync('recipeHistory') || []
    history.splice(index, 1)
    wx.setStorageSync('recipeHistory', history)
    this.setData({ historyList: history })
    wx.showToast({ title: '已删除', icon: 'success' })
  },

  onCreateRecipe() {
    wx.navigateTo({
      url: '/pages/edit/edit?mode=create'
    })
  }
})
