<template>
    <div>
        <Header />
        <section class="position-relative py-4 py-xl-5">
        <div class="container">
            <div class="row mb-5">
                <div class="col-md-8 col-xl-6 text-center mx-auto">
                    <h2>Inscription</h2>
                </div>
            </div>
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-xl-4">
                    <div class="card mb-5">
                        <div class="card-body d-flex flex-column align-items-center mt-3">
                            <form class="text-center" @submit.prevent="send">
                                <div class="mb-3">
                                    <input type="text" v-model="lastname" class="form-control" name="lastname" placeholder="Nom">
                                </div>
                                <div class="mb-3">
                                    <input type="text" v-model="firstname" class="form-control" name="firstname" placeholder="Prénom">
                                </div>
                                <div class="mb-3">
                                    <input type="email" v-model="email" class="form-control" name="email" placeholder="Email">
                                </div>
                                <div class="mb-3">
                                    <input type="password" v-model="password" class="form-control" name="password" placeholder="Mot de passe">
                                </div>
                                <div class="mb-3">
                                    <button class="btn btn-primary d-block w-100" type="submit" @click="onSignup()">Inscription</button>
                                </div>
                                <div v-if="success != ''" class="alert alert-success" role="alert">
                                    {{success}}
                                </div>
                                <div v-if="error != ''" class="alert alert-danger" role="alert">
                                    {{error}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
    
</template>

<script src="./Signup.js" />