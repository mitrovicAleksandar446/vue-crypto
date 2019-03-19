<template>
    <div>
        <Dialog v-if="this.dialogData" v-bind:data="this.dialogData"></Dialog>
        <Loader></Loader>
        <section v-if="appLoaded">
            <router-view></router-view>
        </section>
    </div>
</template>


<script>
    import Dialog from './components/Dialog.vue';
    import Loader from './components/Loader.vue';
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';
    import {isTokenValid} from "./utils/helpers";

    export default {
        name: 'app',

        data() {
            return {
                appLoaded: false
            }
        },

        components: {
            Dialog,
            Loader
        },

        computed: {
            ...mapState({
                dialogData: state => state.dialog.data
            })
        },

        methods: {
            ...mapActions("loader", ["activateLoader"]),
            ...mapActions("user", ["getUser"]),
            ...mapActions("wallet", ["readWallet"]),

            async initApp() {
                if (isTokenValid()) {
                    await this.getUser();
                    await this.readWallet();
                }
            }
        },

        created() {

            this.activateLoader(true);
            this.initApp()
                .then(() => {
                    this.activateLoader(false);
                    this.appLoaded = true;
                })
                .catch(err => {
                    this.activateLoader(false);
                    this.$toast.open({
                        message: err.response ? err.response.data.message : err.message,
                        type: 'is-danger',
                        position: 'is-top-right'
                    })
                });
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/customized-buefy';

    body,
    html {
        padding: 0px;
        margin: 0px;
        overflow-y: auto;
        background: $html-background;
    }
</style>
