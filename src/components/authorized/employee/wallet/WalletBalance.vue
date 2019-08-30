<template>
    <section>
        <section class="level">
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Wallet</p>
                    <p class="title">{{ formattedBalance }}</p>
                </div>
            </div>
        </section>
        <div class="is-divider" data-content="history"></div>
        <section>
            <div v-if="history.length > 0" class="has-text-centered">
                <div class="timeline is-centered">
                    <header class="timeline-header">
                        <span class="tag is-medium is-primary">End</span>
                    </header>
                    <div class="timeline-item" v-for="transaction in history" v-bind:key="transaction.id">
                        <div v-if="transaction.type === 'achievement'" class="timeline-marker is-icon is-warning">
                            <i class="fas fa-award"></i>
                        </div>
                        <div v-else class="timeline-marker is-icon is-info">
                            <i class="fas fa-money-bill-alt"></i>
                        </div>
                        <div class="timeline-content">
                            <p class="heading">{{ new Date(transaction.updated_at).toDateString() }}</p>
                            <p v-if="transaction.type === 'achievement'">Rewarded <b>{{transaction.value }} QXC</b> for {{transaction.name}} </p>
                            <p v-else>Purchased {{transaction.name}} for <b>{{transaction.value }} QXC</b> </p>
                        </div>
                    </div>
                    <div class="timeline-header">
                        <span class="tag is-medium is-primary">Start</span>
                    </div>
                </div>
            </div>
            <span v-else class="tag is-warning is-large">
                No history ...
            </span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import {mapActions} from 'vuex'
    import qxcContract from '@/services/eth/contract/'
    import historyApi from '@/services/api/history/'

    export default {
        name: "WalletBalance",

        data() {
            return {
                history: [],
                balance: 0
            }
        },

        computed: {

            ...mapState({
                user: state => state.user.authUser
            }),

            formattedBalance() {
                return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'QXC'}).format(this.balance);
            },

        },

        actions: {

            ...mapActions('toast', ['showDangerToast'])
        },

        async created() {
            try {
                const address = this.user.address;
                const contract = await qxcContract.getInstance(address);

                this.history = await historyApi.getMyHistory();
                this.balance = await contract.balanceOf(address);

            } catch (err) {
                this.showDangerToast(err.response ? err.response.data.message : err.message);
            }
        },
    }
</script>

<style scoped lang="scss">
    h3 {
        color: $buefy-purple;
    }

    .timeline {
        margin-top:20px;
    }

    .is-divider {
        display: block;
        position: relative;
        border-top: .1rem solid #dbdbdb;
        height: .1rem;
        margin: 2rem 0;
        text-align: center;
    }

    .is-divider[data-content]::after, .is-divider-vertical[data-content]::after {
        background: $html-background;
        color: #b5b5b5;
        content: attr(data-content);
        display: inline-block;
        font-size: 1rem;
        padding: .4rem .8rem;
        -webkit-transform: translateY(-1.1rem);
        -ms-transform: translateY(-1.1rem);
        transform: translateY(-1.1rem);
        text-align: center;
    }
</style>