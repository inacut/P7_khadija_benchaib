<template>
    <nav class="navbar navbar-light navbar-expand-md py-3">
        <div class="container">
            <router-link class="navbar-brand d-flex align-items-center" to="/">
                <span class="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex justify-content-center align-items-center me-2 bs-icon">
                    <img class="header-logo" src="@/assets/logo-black.svg" />
                </span>
            </router-link>
            <button data-bs-toggle="collapse" data-bs-target="#navcol-1" class="navbar-toggler">
                <span class="visually-hidden">Toggle navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" v-if="$route.name == 'Signup' || $route.name == 'Login'">Connexion</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signup" v-if="$route.name == 'Signup' || $route.name == 'Login'">Inscription</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/wall" v-if="$route.name == 'Wall' || $route.name == 'Profil'">Mur</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="'/profil/' + userId" v-if="$route.name == 'Wall' || $route.name == 'Profil'">Profil</router-link>
                    </li>
                </ul>
                <button class="btn btn-secondary" type="button" @click="onLogout()"  v-if="$route.name == 'Wall' || $route.name == 'Profil'">Déconnexion</button>
            </div>
        </div>
    </nav>
</template>

<script src="./Header.js"></script>
<style scoped src="./Header.css"></style>