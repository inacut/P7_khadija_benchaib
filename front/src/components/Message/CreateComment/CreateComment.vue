<template>
    <div class="card-body p-3">
        <h5 class="card-title mb-3">Nouveau commentaire</h5>
        <form>
            <textarea v-model="message" class="form-control mb-3"></textarea>
            <button class="btn btn-primary" type="button" @click="onCreateComment()">Commenter</button>
            <div v-if="success !== ''" class="alert alert-success mt-3" role="alert">
                {{success}}
            </div>
            <div v-if="error !==''" class="alert alert-danger mt-3" role="alert">
                {{error}}
            </div>
        </form>
    </div>
</template>

<script src="./CreateComment" />