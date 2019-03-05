<template>
    <aside class="is-medium menu">
        <p class="menu-label">
            options
        </p>
        <ul class="menu-list">
            <li v-for="(option, name) in options" v-bind:key="name">
                <router-link :to="option.href" v-bind:class='{"is-active": option.active}'>
                    {{ name }}
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: "Sidebar",
        props: {
            options: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-list li {
        margin: 5px
    }

    .menu-list li > a {
        background: $primary;
        color: #fff;
    }

    .menu-list li a:hover {
        background: $buefy-purple;
    }

    .is-active {
        background: $buefy-purple !important;
    }
</style>