<template>
    <div></div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Dialog",

        props: {
            data: {
                required: true,
                type: Object
            }
        },

        methods: {
            ...mapActions('dialog', ['hideDialog'])
        },

        mounted() {

            switch (this.data.status) {
                case 'confirm':
                    this.$dialog.confirm(this.data);
                    break;
                default:
                    this.$dialog.alert(this.data);
                    break;
            }
            this.hideDialog();
        }
    }
</script>

<style scoped>
</style>