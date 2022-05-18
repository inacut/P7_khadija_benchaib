import Header from '@/components/Header/Header.vue'

export default {
    name: 'Signup',
    data: function() {
        return {
            lastname: '',
            firstname: '',
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
        onSignup: function() {
            fetch(`${this.api}/users/signup`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    lastname: this.lastname,
                    firstname: this.firstname,
                    email: this.email,
                    password: this.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error) {
                    this.error = data.error
                    this.success = ''
                } else {
                    this.error = ''
                    this.success = data.message
                }
            })
            .catch(error => this.error = error)
        }
    }
}