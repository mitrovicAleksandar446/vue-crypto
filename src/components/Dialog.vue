<template>
    <div></div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Dialog",
        props: {
            data: {
                required:true,
                type: Object
            }
        },
        methods: {
            ...mapActions('dialog', ['hideDialog'])
        },
        mounted() {
            this.$dialog.alert(this.data);
            this.hideDialog();
        }
    }
</script>

<style scoped>

</style>