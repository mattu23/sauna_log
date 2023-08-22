// import App from './App.vue'
import { createApp } from 'vue';


const app = createApp({
  data: () => ({
    newItem: '',
    saunalogs: []
  }),
  methods: {
    //データを表示するメソッド
    addList: function() {
      if(this.newItem === '') return
      let saunalog = {
        item: this.newItem
      }
      this.saunalogs.push(saunalog)
      this.newItem = ''
    },
    //データを削除するメソッド
    deleteList: function(index) {
      this.saunalogs.splice(index, 1)
    }
  }
})
app.mount('#app')