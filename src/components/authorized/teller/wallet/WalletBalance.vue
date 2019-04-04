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
        <section>
            <div v-if="rewardedHistory.length > 0" class="has-text-centered">
                <div>
                    <h3 class="title">
                        History
                    </h3>
                </div>
                <div class="history-content">
                    <ul class="content">
                        <li v-for="transaction in rewardedHistory" v-bind:key="transaction.id">
                            <b>{{ transaction.created_at }}</b> Rewarded <b>{{ transaction.value }} QXC</b> to {{ transaction.username }} for {{ transaction.achievement.name }}
                        </li>
                    </ul>
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
                console.log(err);
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

    .history-content {
        margin-top:20px;
    }
</style>