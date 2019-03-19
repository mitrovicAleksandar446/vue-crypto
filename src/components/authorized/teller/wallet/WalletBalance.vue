<template>
    <h1>Teller balance</h1>
</template>

<script>
    import {mapState} from 'vuex'
    import qxcContract from "../../../../services/eth/contract";

    export default {
        name: "WalletBalance",

        computed: {
            ...mapState({
                user: state => state.user.authUser
            })
        },

        async created() {

            const contract = await qxcContract.getInstance();
            const totalSupply = await contract.totalSupply();

            console.log(totalSupply);
        }
    }
</script>

<style scoped>

</style>