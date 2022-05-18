export default {
    name: 'CreateComment',
    props: ['post', 'onRefresh'],
    data: function() {
        return {
            api: process.env.VUE_APP_API_URL,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            message: '',
            comments: '',
            success: '',
            error: ''
        }
    },
    methods: {
        onCreateComment: function() {
            fetch(`${this.api}/comments/${this.post.id_post}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: this.message
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    this.success = ''
                    this.error = data.error
                } else {
                    this.error = ''
                    this.message = ''
                    this.success = 'Commentaire crée avec succés !'
                    this.onRefresh()
                }
            })
            .catch(error => {
                this.success = ''
                this.error = error
            })
        },
    }
}