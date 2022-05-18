<template>
    <div class="card-body card-body-bordered mb-5 p-3">
        <h4 class="card-title mb-3">Nouveau message</h4>
        <form @submit.prevent="send">
            <textarea v-model="message" class="form-control mb-3"></textarea>
            <button class="btn btn-primary" type="button" @click="onCreateMessage()">Publier</button>
        </form>
        <div v-if="success != ''" class="alert alert-success mt-3" role="alert">
            {{success}}
        </div>
        <div v-if="error != ''" class="alert alert-danger mt-3" role="alert">
            {{error}}
        </div>
    </div>
</template>

<script src="./CreateMessage.js"></script>