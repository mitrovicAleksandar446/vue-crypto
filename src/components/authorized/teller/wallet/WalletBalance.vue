<template>
    <section>
        <section class="level">
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Wallet</p>
                    <p class="title">{{ formattedBalance }}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Rewarded</p>
                    <p class="title">{{ formattedRewarded }}</p>
                </div>
            </div>
            <div class="level-item has-text-centered">
                <div>
                    <p class="heading">Redeemed</p>
                    <p class="title">{{ formattedRedeemed }}</p>
                </div>
            </div>
        </section>
        <div class="is-divider" data-content="history"></div>
        <section>
            <div v-if="rewardedHistory.length > 0" class="has-text-centered">
                <div class="timeline is-centered">
                    <header class="timeline-header">
                        <span class="tag is-medium is-primary">End</span>
                    </header>
                    <div class="timeline-item" v-for="transaction in rewardedHistory" v-bind:key="transaction.id">
<!--                        <header v-if="getMonth(new Date(transaction.created_at)) !== getMonth(new Date())" class="timeline-header">-->
<!--                            <span class="tag is-primary">{{ getMonth(new Date(transaction.created_at)) }}</span>-->
<!--                        </header>-->
                        <div class="timeline-marker is-icon is-warning">
                            <i class="fas fa-award"></i>
                        </div>
                        <div class="timeline-content">
                            <p class="heading">{{ new Date(transaction.created_at).toDateString() }}</p>
                            <p>Rewarded <b>{{ transaction.value }} QXC</b> to {{ transaction.username }} for {{ transaction.achievement.name }}</p>
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
    import qxcContract from '../../../../services/eth/contract'
    import historyApi from '../../../../services/api/history'

    export default {
        name: "WalletBalance",

        data() {
            return {
                balance: 0,
                redeemed: 0,
                rewarded: 0,
                rewardedHistory: []
            }
        },

        computed: {
            ...mapState({
                user: state => state.user.authUser
            }),

            formattedBalance() {
                return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'QXC'}).format(this.balance);
            },

            formattedRedeemed() {
                return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'QXC'}).format(this.redeemed);
            },

            formattedRewarded() {
                return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'QXC'}).format(this.rewarded);
            }
        },

        async created() {

            try {
                const address = this.user.address;
                const contract = await qxcContract.getInstance(address);

                const results = await Promise.all([historyApi.getAll(), contract.balanceOf(address)]);

                this.rewarded = results[0].rewarded_qxcs;
                this.redeemed = results[0].redeemed_qxcs;
                this.rewardedHistory = results[0].rewarded;
                this.balance = results[1];

            } catch (err) {
                this.$toast.open({
                    message: err.response ? err.response.data.message : err.message,
                    type: "is-danger",
                    position: "is-top-right"
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
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