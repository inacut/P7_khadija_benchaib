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
            messages: '',
        }
    },
    components: {
        Message,
        CreateMessage,
        Header
    },
    methods: {
        onGetAllMessages: function () {
            fetch(`${this.api}/messages/`, {
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
    },
    created: function() {
        this.onGetAllMessages()
    }
}