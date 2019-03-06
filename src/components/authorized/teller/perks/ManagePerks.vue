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
                    <figure class="image is-4by3">
                        <img :src="perk.image">
                    </figure>
                    <article class="tile-footer tile is-child notification is-primary">
                        <a class="button is-buefy">
                            Delete
                        </a>
                        <a class="button is-buefy">
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
            ...mapActions('perk', ['getAllPerks'])
        },

        created() {
            this.getAllPerks();
        }
    }
</script>

<style scoped>
    .is-ancestor {
        margin-top: 10px;
    }

    .tile-footer {
        text-align:center;
    }

    .tile-footer > a {
        margin-left: 5px;
    }
</style>