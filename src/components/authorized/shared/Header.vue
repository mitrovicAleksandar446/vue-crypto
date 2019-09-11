<template>
    <section>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container content">
                    <div class="container">
                        <i class="is-large fab fa-ethereum"></i>
                        <i class="is-large fas">QXC</i>
                    </div>
                </div>
            </div>
        </section>
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
            <div class="container content">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                    </a>

                    <a role="button" :class="{'navbar-burger': true, 'burger': true, 'is_active': burgerActive}"
                       aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="toggleBurger">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="navbarBasicExample" :class="{'navbar-menu': true, 'is-active': burgerActive}">
                    <div class="navbar-start">
                        <a href="http://git.quantox.tech/aleksa446/quantox-vue" class="navbar-item" target="_blank">
                            <span class="icon">
                              <i class="fab fa-github"></i>
                            </span>
                            <span>Project</span>
                        </a>
                        <router-link :to="{name: this.recoverWalletPath}" class="navbar-item">
                            <span class="icon">
                              <i class="fas fa-wallet"></i>
                            </span>
                            <span>Recover wallet</span>
                        </router-link>
                        <a @click.prevent="logout" class="navbar-item">
                            <span class="icon">
                              <i class="fas fa-sign-out-alt"></i>
                            </span>
                            <span>Sign out</span>
                        </a>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div v-if="user" class="tag">
                                <span class="icon">
                                    <i class="fas fa-user"></i>
                                </span>
                                <span>{{ user.name }}</span>
                            </div>
                            <div v-if="user" :class="{'tag': true, 'is-danger': !user.active, 'is-success': user.active}">
                                <span class="icon">
                                    <i :class="{'fas': true, 'fa-check-circle': user.active, 'fa-times-circle': !user.active}"></i>
                                </span>
                                <span>active</span>
                            </div>
                            <div :class="{'tag': true, 'is-danger': !wallet, 'is-success': wallet}">
                                <span class="icon">
                                    <i :class="{'fas': true, 'fa-check-circle': wallet, 'fa-times-circle': !wallet}"></i>
                                </span>
                                <span>wallet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';
    import {mapGetters} from 'vuex';
    import {TELLER_ID} from "@/utils/role-types/";

    export default {
        name: "Header",

        data() {
            return {
                burgerActive: false
            }
        },

        computed: {
            ...mapState({
                user: state => state.user.authUser,
                wallet: state => state.wallet.wallet
            }),

            ...mapGetters('user', ['userRoles']),

            recoverWalletPath() {
                return this.userRoles.includes(TELLER_ID) ? 'recoverWallet' : 'employeeRecoverWallet';
            }
        },

        methods: {
            ...mapActions('user', ["signOut"]),

            logout() {
                this.signOut()
                    .then(() => this.$router.replace({name: "login"}));

            },

            toggleBurger() {
                this.burgerActive = !this.burgerActive;
            }
        }
    }
</script>

<style scoped>
    .hero.is-primary {
        background: linear-gradient(to top right, #524ad0 10%, #D099FA);
    }

    .is-large.fab {
        font-size: 7em;
    }

    .is-large.fas {
        font-size: 5em;
        margin-left: 0.2em;
    }
</style>
