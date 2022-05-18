import Header from '@/components/Header/Header.vue'

export default {
    name: 'Login',
    data: function() {
        return {
            email: '',
            password: '',
            api: process.env.VUE_APP_API_URL,
            success: '',
            error: ''
        }
    },
    components: {
        Header
    },
    methods: {
        onLogin: function() {
            fetch(`${this.api}/users/login`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    this.error = data.error
                } else {
                    this.success = 'Connexion avec succès'
                    localStorage.setItem('headers', JSON.stringify({
                        token: `Bearer ${data.token}`,
                        userId: data.userId,
                        isAdmin: data.isAdmin
                    }))
                    this.$router.push('/wall')
                }
            })
            .catch(error => this.error = error)
        }
    }
}