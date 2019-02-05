<template>
    <div>
        <Header></Header>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-3">
                        <Sidebar v-bind:options="sidebarOptions"></Sidebar>
                    </div>
                    <div class="column is-9">
                        <h1>Home component</h1>
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
                sidebarOptions: {
                    "Link1" : {
                        href: "wwww.google.com",
                        active: true
                    },
                    "Link2" : {
                        href: "wwww.yahoo.com",
                        active: false
                    },
                    "Link3" : {
                        href: "wwww.bing.com",
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