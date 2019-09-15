<template>
    <section>
        <b-tabs v-model="tabIndex" @change="tabChanged($event)">
            <b-tab-item label="Request perk">
                <RequestPerks></RequestPerks>
            </b-tab-item>
            <b-tab-item label="My orders">
                <MyPerks v-if="myPerksLoaded"></MyPerks>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    import MyPerks from "./MyPerks";
    import RequestPerks from "./RequestPerks";

    export default {
        name: "PerksList",

        components: {
            MyPerks,
            RequestPerks
        },

        data() {
            return {
                tabIndex: 0,
                myPerksLoaded: false
            }
        },

        methods: {

            async tabChanged(index) {
                if (index === 1)
                    this.myPerksLoaded = true;
            }
        }
    }
</script>

<style scoped>

</style>