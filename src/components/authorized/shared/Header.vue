<template>
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
                        <div class="navbar" role="navigation" aria-label="main navigation">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a href="http://git.quantox.tech/aleksa446/quantox-vue" target="_blank"
                                       class="button is-primary is-large">
                                        <span class="icon">
                                          <i class="fab fa-github"></i>
                                        </span>
                                        <span>Github</span>
                                    </a>
                                    <a @click.prevent="logout" class="button is-primary is-large">
                                        <span class="icon">
                                          <i class="fas fa-sign-out-alt"></i>
                                        </span>
                                        <span>Sign out</span>
                                    </a>
                                </div>
                            </div>
                            <div class="navbar-item">
                                <span v-if="user.active" class="icon has-text-success" title="Active">
                                  <i class="fas fa-3x fa-check-square"></i>
                                </span>
                                <span v-else class="icon has-text-danger" title="Inactive">
                                  <i class="fas fa-3x fa-ban"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "Header",

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