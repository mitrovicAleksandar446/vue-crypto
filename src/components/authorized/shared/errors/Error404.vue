<template>
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1>Oops!</h1>
                <h2>404 - The Page can't be found</h2>
            </div>
            <router-link class="is-primary" :to="{name: 'login'}">
                Go TO Homepage
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error404"
    }
</script>

<style scoped lang="scss">
    @import './../../../../assets/scss/error-style';
</style>