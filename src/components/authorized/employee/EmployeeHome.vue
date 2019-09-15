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
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
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
        name: "employeeHome",

        data() {
            return {
                sidebarOptions: [
                    {
                        name: "Achievements",
                        href: {name: "achievementsList"},
                        active: false
                    },
                    {
                        name: "Perks",
                        href: {name: "perksList"},
                        active: false
                    },
                    {
                        name: "Wallet",
                        href: {name: "employeeWalletBalance"},
                        active: false
                    }
                ]
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