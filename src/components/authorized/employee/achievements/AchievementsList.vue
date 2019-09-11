<template>
    <section>
        <b-tabs v-model="tabIndex" @change="tabChanged($event)">
            <b-tab-item label="Request achievements">
                <RequestAchievements></RequestAchievements>
            </b-tab-item>
            <b-tab-item label="My achievements">
                <MyAchievements v-if="myAchievementsLoaded"></MyAchievements>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    import RequestAchievements from "./RequestAchievements";
    import MyAchievements from "./MyAchievements";

    export default {
        name: "AchievementsList",

        components: {
            MyAchievements,
            RequestAchievements
        },

        data() {
            return {
                tabIndex: 0,
                myAchievementsLoaded: false
            }
        },

        methods: {

            async tabChanged(index) {
                if (index === 1)
                    this.myAchievementsLoaded = true;
            }
        }
    }
</script>

<style scoped>
</style>
