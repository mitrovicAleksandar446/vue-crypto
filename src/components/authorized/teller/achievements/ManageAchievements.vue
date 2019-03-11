<template>
    <section>
        <div>
            <router-link :to="{name: 'newAchievement'}" class="button is-buefy">
                New achievement
            </router-link>
        </div>
        <div v-if="achievements.length > 0" class="tile is-ancestor columns is-multiline">
            <div v-for="achievement in achievements" class="tile is-parent column is-4" :key="achievement.id">
                <article class="tile is-child box">
                    <p class="title">{{ achievement.name }}</p>
                    <p class="subtitle tag is-buefy">{{ achievement.value }} QXC</p>
                    <p class="subtitle">{{ achievement.description }}</p>
                    <article class="tile-footer tile is-child notification is-primary">
                        <a class="button is-buefy" @click="openDeleteDialog(achievement.id)">
                            Delete
                        </a>
                        <a class="button is-buefy" @click="openEdit(achievement.id)">
                            Edit
                        </a>
                    </article>
                </article>
            </div>
        </div>
        <span v-else class="tag is-warning is-large">
            No achievements ...
        </span>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: "ManageAchievements",

        computed: {
            ...mapState({
                achievements: state => state.achievement.achievementsList
            })
        },

        methods: {
            ...mapActions('achievement', ['getAllAchievements', 'destroyAchievement']),
            ...mapActions('dialog', ['showDialog']),

            openDeleteDialog(achievementId) {
                this.showDialog({
                    status: 'confirm',
                    message: "Are you sure you want to delete this achievement ?",
                    cancelText: 'No',
                    confirmText: 'Yes',
                    onConfirm: () => this.destroy(achievementId)
                });
            },

            destroy(achievementId) {
                this.destroyAchievement(achievementId)
                    .then(() => {
                        this.$toast.open({
                            message: 'Achievement deleted',
                            type: 'is-success',
                            position: 'is-top-right'
                        });
                    }).catch(err => {
                    this.$toast.open({
                        message: err.response.data.message,
                        type: 'is-danger',
                        position: 'is-top-right'
                    });
                });
            },

            openEdit(achievementId) {
                this.$router.push({name: "editAchievement", params: {id: achievementId}});
            }
        },

        created() {
            this.getAllAchievements();
        }
    }
</script>

<style scoped>
    .is-ancestor {
        margin-top: 10px;
    }

    .tile-footer {
        text-align: center;
    }

    .tile-footer > a {
        margin-left: 5px;
    }
</style>