<template>
    <div>
        <Header />
        <div class="container mt-5">
            <h4 class="mb-3" v-if="user.userId != userId">Profil de {{user.lastname}} {{user.firstname}}</h4>
            <h4 class="mb-3" v-else>Votre profil</h4>
            <div v-if="user.userId == userId || isAdmin" class="card mb-5">
                <div class="card-body card-body-bordered p-sm-5">
                    <form @submit.prevent="send">
                        <div class="mb-3">
                            <img v-if="userProfil.image == ''" src="@/assets/default-profil.png" class="profil-thumbnail">
                            <img v-else :src="userProfil.image" class="profil-thumbnail">
                        </div>
                        <div class="mb-3">
                            <input type="file" class="form-control" @change="setProfilPic($event)">
                        </div>
                        <div class="mb-3">
                            <input type="text" v-model="user.lastname" class="form-control" name="lastname" placeholder="Nom">
                        </div>
                        <div class="mb-3">
                            <input type="text" v-model="user.firstname" class="form-control" name="firstname" placeholder="Prénom">
                        </div>
                        <div class="mb-3">
                            <input type="email" v-model="user.email" class="form-control" name="email" placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <input type="password" v-model="user.password" class="form-control" name="password" placeholder="Nouveau mot de passe">
                        </div>
                        <div>
                            <button class="btn btn-primary" type="submit" @click="onUpdateUserProfil()">
                                Modifier
                            </button>
                        </div>
                        <div v-if="success != ''" class="alert alert-success mt-3" role="alert">
                            {{success}}
                        </div>
                        <div v-if="error != ''" class="alert alert-danger mt-3" role="alert">
                            {{error}}
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="user.userId == userId || isAdmin" class="mb-5" style="display: flex; justify-content: flex-end;">
                <button class="btn btn-secondary ull-right" type="submit" @click="onDeleteUser()">
                    Supprimer le profil
                </button>
            </div>
            <CreateMessage 
                v-if="user.userId == userId"
                :onRefresh="onGetAllMessages"
            />
            <h4 class="mb-3">Publications</h4>
            <Message 
                v-for="(message, index) in messages" 
                :key="index" 
                :post="message"
                :onRefresh="onGetAllMessages"
            />
        </div>
    </div>
    
</template>

<script src="./Profil.js" />
<style src="./Profil.css" />