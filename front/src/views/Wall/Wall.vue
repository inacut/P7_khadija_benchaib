<template>
    <div>
        <Header></Header>
        <div class="container mt-5">
            <CreateMessage 
                :onRefresh="onGetAllMessages"
            />
            <h4 class="mb-3">Publications</h4>
            <Message 
                v-for="(message) in messages" 
                :key="message.id_share ? 's' + message.id_share : 'p' + message.id_post" 
                :post="message"
                :onRefresh="onGetAllMessages"
            />
        </div>
    </div>
</template>

<script src="./Wall.js" />