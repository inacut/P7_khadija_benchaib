export default {
    name: 'Header',
    data: function() {
      return {
        userId: JSON.parse(localStorage.getItem('headers')) ? JSON.parse(localStorage.getItem('headers')).userId : null,
      }
    },
    methods: {
      onLogout: function() {
        localStorage.removeItem('headers')
        this.$router.push('/')
      }
    }
  }