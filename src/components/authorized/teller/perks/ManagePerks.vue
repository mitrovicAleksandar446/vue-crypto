<template>
    <section>
        <div>
            <router-link :to="{name: 'newPerk'}" class="button is-buefy">
                New perk
            </router-link>
        </div>
        <div v-if="perks.length > 0" class="tile is-ancestor columns is-multiline">
            <div v-for="perk in perks" class="tile is-parent column is-4" :key="perk.id">
                <article class="tile is-child box">
                    <p class="title">{{ perk.name }}</p>
                    <p class="subtitle tag is-buefy">{{ perk.value }} QXC</p>
                    <p class="subtitle">{{ perk.description }}</p>
                    <figure class="image">
                        <img :src="perk.image" alt="perk-image" />
                    </figure>

                    <article class="tile-footer tile is-child notification is-primary">
                        <a class="button is-buefy" @click="openDeleteDialog(perk.id)">
                            Delete
                        </a>
                        <a class="button is-buefy" @click="openEdit(perk.id)">
                            Edit
                        </a>
                    </article>
                </article>
            </div>
        </div>
        <span v-else class="tag is-warning is-large">
            No perks ...
        </span>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapState} from 'vuex'

    export default {
        name: "ManagePerks",

        computed: {
            ...mapState({
                perks: state => state.perk.perksList
            })
        },

        methods: {
            ...mapActions('perk', ['getAllPerks', 'destroyPerk']),
            ...mapActions('dialog', ['showDialog']),

            openDeleteDialog(perkId) {
                this.showDialog({
                    status: 'confirm',
                    message: "Are you sure you want to delete this perk ?",
                    cancelText: 'No',
                    confirmText: 'Yes',
                    onConfirm: () => this.destroy(perkId)
                });
            },

            destroy(perkId) {
                this.destroyPerk(perkId)
                    .then(() => {
                        this.$toast.open({
                            message: 'Perk deleted',
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

            openEdit(perkId) {
                this.$router.push({name: "editPerk", params: {id: perkId}});
            }
        },

        created() {
            this.getAllPerks();
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

    .image {
        overflow: hidden;
        position: relative;
        height: 200px;
        margin: auto;
    }

    .tile.is-child {
        width:100% !important;
    }

    img {
        display: block;
        position: absolute;
        left: -1000%;
        right: -1000%;
        top: -1000%;
        bottom: -1000%;
        margin: auto;
        height: auto;
        width: 100%;
    }
</style>