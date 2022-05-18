import Message from '@/components/Message/Message.vue'
import Header from '@/components/Header/Header.vue'
import CreateMessage from '@/components/CreateMessage/CreateMessage.vue'

export default {
    name: 'Wall',
    data: function() {
        return {
            api: process.env.VUE_APP_API_URL,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            isAdmin: JSON.parse(localStorage.getItem('headers')).isAdmin,
            messages: '',
            userProfil: '',
            user: {
                userId: 0,
                lastname: '',
                firstname: '',
                email: '',
                password: ''
            },
            profilPic: '',
            success: '',
            error: '',
            refresher: 0,
        }
    },
    components: {
        Message,
        CreateMessage,
        Header
    },
    methods: {
        onGetAllMessages: function () {
            fetch(`${this.api}/messages/${this.$route.params.id}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                this.messages = data;
            })
            .catch(error => console.log(error))
        },
        onGetUserProfil: function () {
            fetch(`${this.api}/users/${this.$route.params.id}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(user => {
                this.userProfil = user;
                this.user = user
            })
            .catch(error => console.log(error))
        },
        onUpdateUserProfil: function() {
            let formData = new FormData();
            formData.append('lastname', this.user.lastname)
            formData.append('firstname', this.user.firstname)
            formData.append('email', this.user.email)
            formData.append('password', this.user.password)
            formData.append('image', this.profilPic)


            fetch(`${this.api}/users/${this.$route.params.id}`, {
                method: 'PUT',
                headers: {
                    'authorization': this.token,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.error = data.error
                    this.success = ''
                } else {
                    this.error = ''
                    this.success = 'Profil modifié avec succés !'
                }
            })
            .catch(error => {
                this.error = error
                this.success = ''
            })
        },
        onDeleteUser: function() {
            if(
                confirm('Êtes-vous sûr de vouloir supprimer le compte ?')
            ) {
                fetch(`${this.api}/users/${this.$route.params.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': this.token,
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        console.log(data.error)
                    } else {
                        if(this.userId == this.userId) {
                            localStorage.removeItem('headers')
                            this.$router.push('/')
                        } else {
                            this.$router.push('/wall')
                        }
                    }
                })
                .catch(error => {
                    console.log(error)
                })
            }
        },
        setProfilPic: function(e) {
            this.profilPic = e.target.files[0]
        }
    },
    created: function() {
        this.onGetAllMessages()
        this.onGetUserProfil()
    },
    watch: {
        '$route' () {
            this.$router.go(this.$route.path)
        }
    }
}