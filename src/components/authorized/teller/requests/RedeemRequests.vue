<template>
    <section>
        <section v-if="requests.length > 0">
            <div class="box" v-for="request in requests" v-bind:key="request.id">
                <article class="media">
                    <div class="media-left">
                        <span class="icon is-large">
                          <i class="is-large fas fa-money-bill-alt" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ request.username }}</strong>
                                <br>
                                Requested a {{ request.perk.name }} for <strong>{{ request.value }} QXC</strong>
                            </p>
                            <p v-if="request.employee_note">
                                <em>"{{ request.employee_note }}"</em>
                            </p>
                        </div>
                        <nav class="level is-mobile teller-note">
                            <teller-note v-bind:note.sync="request.teller_note"
                                         v-on:save:note="updateTellerNote(request)"></teller-note>
                        </nav>
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <a class="level-item button is-success" v-on:click="approveRequest(request)">
                                    Approve
                                </a>
                                <a class="level-item button is-danger" v-on:click="rejectRequest(request)">
                                    Reject
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </section>
        <span v-else class="tag is-warning is-large">
            No pending requests ...
        </span>
    </section>
</template>

<script>
	import TellerNote from './TellerNote'
	import {mapState} from 'vuex'
	import {mapActions} from 'vuex'
	import perkApi from '@/services/api/perk/'
	import qxcContract from '@/services/eth/contract/'

	export default {
		name: "RedeemRequests",

		components: {
			TellerNote
		},

		data() {
			return {
				requests: []
			}
		},

		computed: {
			...mapState({
				tellerAddress: state => state.contract.tellerAddress
			})
		},

		async created() {
			this.requests = await perkApi.getRequests('pending');
		},

		methods: {
			...mapActions("loader", ["activateLoader"]),
			...mapActions("toast", ["showSuccessToast", "showDangerToast"]),

			updateTellerNote(request) {
				if (!request.teller_note) return;
				perkApi.updateRequest({teller_note: request.teller_note}, request.id);
			},

			async approveRequest(request) {

				this.activateLoader(true);
				try {
					await perkApi.updateRequest({status: 'approved'}, request.id);
					this.requests = this.requests.filter(req => req.id !== request.id);
					this.activateLoader(false);
					this.showSuccessToast("Request approved");
				} catch (err) {
					this.activateLoader(false);
					this.showDangerToast(err.response.data.message);
				}

			},

			async rejectRequest(request) {

				this.activateLoader(true);
				const contract = await qxcContract.getInstance();

				contract.transfer(request.address, request.value)
					.then(async () => {
						await perkApi.updateRequest({status: 'rejected'}, request.id);
						this.requests = this.requests.filter(req => req.id !== request.id);
						this.activateLoader(false);
						this.showSuccessToast("Request rejected");
					})
					.catch(err => {
						this.activateLoader(false);
						this.showDangerToast(err.message);
					});
			}
		}
	}
</script>

<style scoped>
    .is-large.fas {
        font-size: 2em;
    }
</style>
