Page({
  data: {
    inputUrl: '',
    loading: false,
    historyList: []
  },


  onInputChange(e) {
    this.setData({ inputUrl: e.detail.value })
  },

  onParse() {
    const url = this.data.inputUrl.trim()
    if (!url) {
      wx.showToast({ title: '请粘贴视频链接', icon: 'none' })
      return
    }

    this.setData({ loading: true })

    wx.request({
      url: 'http://127.0.0.1:8000/api/parse-recipe',
      method: 'POST',
      data: { url: url },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        if (res.data.success) {
          const recipe = res.data.data
          // 保存到历史记录
          let history = wx.getStorageSync('recipeHistory') || []
          history.unshift(recipe)
          if (history.length > 50) history = history.slice(0, 50)
          wx.setStorageSync('recipeHistory', history)

          this.setData({ 
            historyList: history,
            inputUrl: ''
          })

          // 跳转到结果页
          wx.navigateTo({
            url: '/pages/result/result?index=0'
          })
        } else {
          wx.showToast({ title: res.data.detail || '解析失败', icon: 'none' })
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络错误，请确认后端服务已启动', icon: 'none' })
      },
      complete: () => {
        this.setData({ loading: false })
      }
    })
  },

  goToHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    })
  }
})