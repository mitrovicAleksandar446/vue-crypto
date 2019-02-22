<template>
    <div>
        <b-loading :active.sync="active"></b-loading>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Loader",
        computed: {
            ...mapState({
                active: state => state.loader.active
            })
        }
    }
</script>

<style scoped>

</style>