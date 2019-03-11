<template>
    <div>
        <Header></Header>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-2">
                        <Sidebar v-bind:options.sync="sidebarOptions"></Sidebar>
                    </div>
                    <div class="column is-10">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Sidebar from './../shared/Sidebar.vue';
    import Header from './../shared/Header.vue';

    export default {
        name: "tellerHome",

        data() {
            return {
                sidebarOptions: {
                    "Achievements" : {
                        href: {name: "achievements"},
                        active: true
                    },
                    "Perks" : {
                        href: {name: "perks"},
                        active: false
                    },
                    "Inactive users" : {
                        href: {name: "inactiveUsers"},
                        active: false
                    }
                }
            }
        },

        components: {
            Sidebar,
            Header
        }
    }
</script>

<style scoped>
</style>