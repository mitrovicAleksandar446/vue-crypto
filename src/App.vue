<template>
    <div>
        <Dialog v-if="this.dialogData" v-bind:data="this.dialogData"></Dialog>
        <Toast v-if="this.toastData" v-bind:data="this.toastData"></Toast>
        <Loader></Loader>
        <section v-if="appLoaded">
            <router-view></router-view>
        </section>
    </div>
</template>


<script>
    import Dialog from './components/Dialog.vue';
    import Toast from './components/Toast.vue';
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
            Loader,
            Toast
        },

        computed: {
            ...mapState({
                dialogData: state => state.dialog.data,
                toastData: state => state.toast.data
            })
        },

        methods: {
            ...mapActions("loader", ["activateLoader"]),
            ...mapActions("user", ["getUser"]),
            ...mapActions("wallet", ["readWallet"]),
            ...mapActions("contract", ["getContract"]),
            ...mapActions("toast", ["showDangerToast"]),

            initApp() {
                if (isTokenValid()) {
                    return Promise.all([
                        this.getUser(),
                        this.getContract(),
                        Promise.resolve(this.readWallet())
                    ]);
                }
            }
        },

        async created() {

            try {
                this.activateLoader(true);
                await this.initApp();
                this.activateLoader(false);
                this.appLoaded = true;

            } catch (err) {
                this.activateLoader(false);
                this.showDangerToast(err.response ? err.response.data.message : err.message);
            }
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
