<template>
    <div class="card-body card-body-bordered mb-4">
        <div class="row share pt-1" v-if="post.type == 'share'">
            <div class="col">
                <h6 class="text-light">Partage : <router-link class="text-light" :to="'/profil/' + post.id_user_share">{{post.name_user_share}}</router-link> le {{getDateHour(post.date_share)}}</h6>
            </div>
        </div>
        <div class="row author">
            <div class="col-1 profil-picture" >
                <img v-if="post.image_user_post == ''" src="@/assets/default-profil.png">
                <img v-else :src="post.image_user_post">
            </div>
            <div class="col d-flex align-items-center">
                <h5 class="card-title text-light">Auteur : <router-link class="text-light" :to="'/profil/' + post.id_user_post">{{post.name_user_post}}</router-link> le {{getDateHour(post.date_post)}}</h5>
            </div>
        </div>
        <p class="card-text mt-3" v-if="!update">
            {{post.message}}
        </p>
        <form class="my-3" v-if="update">
            <textarea v-model="newMessage" class="form-control  mb-3"></textarea>
            <button class="btn btn-primary" type="button" @click="onUpdate()">Modifier le message</button>
        </form>
        <a class="card-link" @click="onShare()" v-if="post.type == 'post'">Partager</a>

        <a class="card-link" @click="onToggleComments()" v-if="post.type == 'post' && !comments">Commentaires</a>
        <a class="card-link" @click="onToggleComments()" v-if="post.type == 'post' && comments">Fermer les commentaires</a>

        <a class="card-link" @click="onToggleUpdate()" v-if="!update && post.type == 'post' && (userId == post.id_user_post || isAdmin)">Modifier</a>
        <a class="card-link" @click="onToggleUpdate()" v-if="update && post.type == 'post'  && (userId == post.id_user_post || isAdmin)">Annuler la modification</a>

        <a class="card-link" @click="post.type == 'share' ? onDeleteShare() : onDeleteMessage()" v-if="isAdmin || (post.type == 'share'  && userId == post.id_user_share) || (post.type == 'post'  && userId == post.id_user_post)">Supprimer</a>
        <div class="comments" v-if="comments">
            <hr>
            <h5 class="mb-0">Commentaires</h5>
            <hr>
            <CreateComment 
                :onRefresh="onGetAllComments" 
                :post="post"
            />
            <Comment 
                v-for="(commentData) in commentsData" 
                :key="commentData.id_comment" 
                :comment="commentData" 
                :onRefresh="onGetAllComments" 
                :post="post" 
            />
        </div>
    </div>
</template>

<script src="./Message.js" />
<style scoped src="./Message.css" />