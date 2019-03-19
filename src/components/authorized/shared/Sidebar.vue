<template>
    <aside class="is-medium menu">
        <p class="menu-label">
            options
        </p>
        <ul class="menu-list">
            <li v-for="option in options" @click="setActive(option.name)" v-bind:key="option.name">
                <router-link :to="option.href" v-bind:class='{"is-active": option.active}'>
                    {{ option.name }}
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
                type: Array,
                required: true
            }
        },

        methods: {
            setActive(activeName) {
                for (const option of this.options) {
                    option.active = option.name === activeName;
                }
            }
        },

        mounted() {
            let activeFound = false;
            const currentRoute = this.$route.path;
            const defaultOne = this.options.find(option => option.active);

            this.options.forEach(option => {
                option.active = currentRoute === option.href.path;
                if (option.active) {
                    activeFound = true;
                }
            });
            if (!activeFound) {
                defaultOne.active = true;
                this.$router.push(defaultOne.href);
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