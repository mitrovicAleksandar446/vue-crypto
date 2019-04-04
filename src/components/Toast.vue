<template>
    <div></div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: "Toast",

        methods: {
            ...mapActions("toast", ["hideToast"])
        },

        props: {
            data: {
                required: true,
                type: Object
            }
        },

        mounted() {
            this.$toast.open(this.data);
            this.hideToast();
        }
    }
</script>

<style scoped>

</style>