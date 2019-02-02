<template>
    <h1>Hello world</h1>
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

    .menu-list li {
        margin: 5px
    }

    .menu-list li a:hover {
        background: $buefy-purple;
    }

    .hero.is-primary {
        background: linear-gradient(to top right, #524ad0 10%, #D099FA);
    }

    .is-large.fab {
        font-size: 7em;
    }

    .is-large.fas {
        font-size: 5em;
        margin-left: 0.2em;
    }
</style>
