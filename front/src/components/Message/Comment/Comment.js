export default {
    name: "Comments",
    props: ['comment', 'onRefresh'],
    data: function() {
        return {
            api: process.env.VUE_APP_API_URL,
            token: JSON.parse(localStorage.getItem('headers')).token,
            userId: JSON.parse(localStorage.getItem('headers')).userId,
            isAdmin: JSON.parse(localStorage.getItem('headers')).isAdmin,
            update: false,
            newComment: this.comment.message
        }
    },
    methods: {
        onUpdateComment() {
            fetch(`${this.api}/comments/${this.comment.id_comment}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': this.token,
                },
                body: JSON.stringify({
                    message: this.newComment
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
        onDeleteComment() {
            fetch(`${this.api}/comments/${this.comment.id_comment}`, {
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
        onToggleUpdate() {
            this.newComment = this.comment.message
            this.update = !this.update
        },
        getDateHour: function(theDate) {
            let date = theDate.split('T')[0].split('-')
            let hour = ('0' + (Number(theDate.split('T')[1].split('.')[0].split(':')[0]) + 2)).slice(-2)
            let minute = theDate.split('T')[1].split('.')[0].split(':')[1]

            return `${date[2]}/${date[1]}/${date[0]} à ${hour}:${minute}`
        }
    }
}