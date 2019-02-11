<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style lang="scss">
    @import './assets/scss/customized-buefy';

    body,
    html {
        padding: 0px;
        margin: 0px;
        background: $html-background;
    }
</style>
