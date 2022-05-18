import Comment from './Comment/Comment.vue'
import CreateComment from './CreateComment/CreateComment.vue'

export default {
    name: 'Message',
    props: ['post', 'onRefresh'],
    data: function() {
        return {
            api: process.env.VUE_APP_API_URL,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            isAdmin: JSON.parse(localStorage.getItem('headers')).isAdmin,
            comments: false,
            commentsData: [],
            update: false,
            newMessage: this.post.message,
        }
    },
    components: {
        Comment,
        CreateComment
    },
    methods: {
        onGetAllComments: function(){
            fetch(`${this.api}/comments/${this.post.id_post}`, {
                method: 'GET',
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(comments => {
                this.commentsData = comments
            })
            .catch(error => console.log(error))
        },
        onShare: function() {
            fetch(`${this.api}/share/${this.post.id_post}`, {
                method: 'POST',
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
                    this.onRefresh()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        onUpdate: function() {
            fetch(`${this.api}/messages/${this.post.id_post}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: this.newMessage
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(data.error)
                } else {
                    this.onToggleUpdate()
                    this.onRefresh()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        onToggleUpdate: function() {
            this.newMessage = this.post.message
            this.update = !this.update
        },
        onToggleComments: function() {
            this.onGetAllComments()
            this.comments = !this.comments
        },
        onDeleteMessage: function() {
            fetch(`${this.api}/messages/${this.post.id_post}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },

            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(error)
                } else {
                    this.onRefresh()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        onDeleteShare: function() {
            fetch(`${this.api}/share/${this.post.id_share}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    console.log(error)
                } else {
                    this.onRefresh()
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        getDateHour: function(theDate) {
            let date = theDate.split('T')[0].split('-')
            let hour = ('0' + (Number(theDate.split('T')[1].split('.')[0].split(':')[0]) + 2)).slice(-2)
            let minute = theDate.split('T')[1].split('.')[0].split(':')[1]

            return `${date[2]}/${date[1]}/${date[0]} à ${hour}:${minute}`
        }
    },
    created: function() {
        this.onGetAllComments()
    }
}