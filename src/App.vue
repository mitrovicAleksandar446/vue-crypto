<template>
    <div>
        <Dialog v-if="this.dialogData" v-bind:data="this.dialogData"></Dialog>
        <router-view></router-view>
    </div>
</template>

<script>
    import Dialog from './components/Dialog.vue';
    import {mapState} from 'vuex';

    export default {
        name: 'app',
        components: {
            Dialog
        },
        computed: {
            ...mapState({
                dialogData: state => state.dialog.data
            })
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
