<template>
    <section>
        <section v-if="perks.length > 0">
            <div class="box" v-for="perk in perks" v-bind:key="perk.id">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{{ perk.name }}</strong>
                            </p>
                            <p>
                                <span class="tag is-buefy">
                                    {{ perk.value }} QXC
                                </span>
                            </p>
                            <p>
                                {{ perk.description }}
                            </p>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-right">
                                <a class="level-item button is-success" v-on:click="promptRequest(perk.id)">
                                    Request
                                </a>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </section>
        <span v-else class="tag is-warning is-large">
            No perks ...
        </span>
    </section>
</template>

<script>
	import perkApi from '@/services/api/perk/'
	import {mapActions, mapState} from 'vuex'
	import qxcContract from '@/services/eth/contract/'

	export default {
		name: "RequestPerks",

		data() {
			return {
				perks: []
			}
		},

		computed: {
			...mapState({
				tellerAddress: state => state.contract.tellerAddress
			})
		},

		async created() {
			this.perks = await perkApi.getAll();
		},

		methods: {
			...mapActions('dialog', ['showDialog']),
			...mapActions('loader', ['activateLoader']),
			...mapActions('toast', ['showSuccessToast', 'showDangerToast']),

			promptRequest(id) {

				this.showDialog({
					status: 'prompt',
					message: `Enter note for admin?`,
					inputAttrs: {
						required: false,
						size: 1000,
						placeholder: 'Note here...'
					},
					onConfirm: (value) => this.createRequest(value, id)
				})
			},

			async createRequest(note, id) {

				this.activateLoader(true);
				const requestedPerk = this.perks.find(perk => perk.id === id);
				const contract = await qxcContract.getInstance();

				contract.transfer(this.tellerAddress, requestedPerk.value)
					.then(async () => {
						const request = note ? {"employee_note": note} : {};
						await perkApi.createRequest(request, id);
						this.activateLoader(false);
						this.showSuccessToast("Perk requested");
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

</style>