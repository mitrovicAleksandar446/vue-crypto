<template>
    <section>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="columns">
                    <div class="column is-12">
                        <div class="container content">
                            <div class="container">
                                <i class="is-large fab fa-ethereum"></i>
                                <i class="is-large fas">QXC</i>
                                <h1 class="title">Code <em>All</em> The Things</h1>
                                <h3 class="subtitle">
                                    Collection of code goodies
                                </h3>
                            </div>
                        </div>
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
                        <a href="http://git.quantox.tech/aleksa446/quantox-vue" class="navbar-item">
                        <span class="icon">
                          <i class="fab fa-github"></i>
                        </span>
                            <span>Project</span>
                        </a>
                    </div>

                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <a @click.prevent="logout" class="button is-primary">
                                        <span class="icon">
                                            <i class="fas fa-sign-out-alt"></i>
                                        </span>
                                    <span>Sign out</span>
                                </a>
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

    export default {
        name: "Header",

        data() {
            return {
                burgerActive: false
            }
        },

        computed: {
            ...mapState({
                user: state => state.user.authUser
            })
        },

        methods: {
            ...mapActions('user', ["signOut"]),

            logout() {
                this.signOut();
                this.$router.replace({name: "login"});
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