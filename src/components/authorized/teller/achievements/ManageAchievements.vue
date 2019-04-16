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
        <span v-else class="tag is-warning is-large no-achievements">
            No achievements ...
        </span>
    </section>
</template>

<script>
    import {mapActions} from 'vuex';
    import achievementApi from '@/services/api/achievement/';

    export default {
        name: "ManageAchievements",

        data() {
            return {
                achievements: []
            }
        },

        methods: {
            ...mapActions('toast', ['showDangerToast', 'showSuccessToast']),
            ...mapActions('dialog', ['showDialog']),

            openDeleteDialog(achievementId) {
                this.showDialog({
                    status: 'confirm',
                    message: "Are you sure you want to delete this achievement ?",
                    cancelText: 'No',
                    confirmText: 'Yes',
                    onConfirm: () => this.destroyAchievement(achievementId)
                });
            },

            destroyAchievement(achievementId) {
                achievementApi.destroy(achievementId)
                    .then(() => {
                        this.achievements = this.achievements.filter(achievement => achievement.id !== achievementId);
                        this.showSuccessToast('Achievement deleted');
                    })
                    .catch(err => this.showDangerToast(err.response.data.message));
            },

            openEdit(achievementId) {
                this.$router.push({name: "editAchievement", params: {id: achievementId}});
            }
        },

        async created() {
            this.achievements = await achievementApi.getAll();
        }
    }
</script>

<style scoped>
    .title {
        overflow: hidden;
        height: 35px;
    }

    .subtitle {
        overflow: hidden;
        height: 27px;
    }

    .is-ancestor {
        margin-top: 10px;
    }

    .tile-footer {
        text-align: center;
    }

    .tile-footer > a {
        margin-left: 5px;
        margin-top: 5px;
    }

    .no-achievements {
        margin-top: 10px;
    }
</style>