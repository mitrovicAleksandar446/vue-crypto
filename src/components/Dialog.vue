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

            const type = this.data.status;

            switch (type) {

                case 'confirm':
                    this.$dialog.confirm(this.data);
                    break;
                case 'prompt':
                    this.$dialog.prompt(this.data);
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