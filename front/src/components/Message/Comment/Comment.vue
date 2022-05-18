<template>
    <div class="card-body">
        <hr>
        <h4 class="card-title">
            <router-link :to="'/profil/' + comment.id_user">{{comment.firstname}} {{comment.lastname}}</router-link> le {{getDateHour(comment.date_comment)}}
        </h4>
        <p class="card-text"  v-if="!update">
            {{comment.message}}
        </p>
        <form class="mb-3" v-if="update">
            <textarea v-model="newComment" class="form-control  mb-3"></textarea>
            <button class="btn btn-primary" type="button" @click="onUpdateComment()">Modifier le commentaire</button>
        </form>
        <a class="card-link" @click="onToggleUpdate()" v-if="!update && (comment.id_user == userId || isAdmin)">Modifier</a>
        <a class="card-link" @click="onToggleUpdate()" v-if="update  && (comment.id_user == userId || isAdmin)">Annuler la modification</a>
        <a class="card-link" @click="onDeleteComment()" v-if="comment.id_user == userId || isAdmin">Supprimer</a>
    </div>
</template>

<script src="./Comment.js" />