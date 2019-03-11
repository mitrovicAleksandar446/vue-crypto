<template>
    <aside class="is-medium menu">
        <p class="menu-label">
            options
        </p>
        <ul class="menu-list">
            <li v-for="(option, name) in options" @click="setActive(name)" v-bind:key="name">
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
        },

        methods:{
            setActive(activeName) {
                for (const [key, option] of Object.entries(this.options)) {
                    option.active = key === activeName;
                }
            }
        },

        mounted() {
            const currentRoute = this.$route.path;
            for (const option of Object.values(this.options)) {
                option.active = currentRoute === option.href.path;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu-list li {
        margin: 5px;
        font-size: 16px;
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