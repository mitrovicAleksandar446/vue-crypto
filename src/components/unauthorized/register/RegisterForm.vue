<template>
    <div class="container">
        <h1 class="title">
            Register
        </h1>
        <form @submit.prevent="validateBeforeSubmit">
            <b-field label="Name"
                     :type="{'is-danger': errors.has('name')}"
                     :message="errors.first('name')">
                <b-input v-model="user.name"
                         v-validate="'required|min:3'"
                         name="name"
                         placeholder="Name here" maxlength="30">

                </b-input>
            </b-field>

            <b-field label="Email"
                     :type="{'is-danger': errors.has('email')}"
                     :message="errors.first('email')">
                <b-input type="email"
                         v-model="user.email"
                         v-validate="'required|email'"
                         name="email"
                         placeholder="Email here..."
                         maxlength="30">
                </b-input>
            </b-field>

            <b-field label="Password"
                     :type="{'is-danger': errors.has('password')}"
                     :message="errors.first('password')">
                <b-input type="password"
                         v-model="user.password"
                         name="password"
                         v-validate="'required|min:3'"
                         placeholder="Password here" maxlength="30">

                </b-input>
            </b-field>

            <b-field label="Confirm password"
                     :type="{'is-danger': errors.has('passwordConfirm')}"
                     :message="[{
                        'The confirm password field is required' : errors.firstByRule('passwordConfirm', 'required'),
                        'The confirm password is not valid' : errors.firstByRule('passwordConfirm', 'is')
                     }]">
                <b-input type="password"
                         v-model="user.passwordConfirm"
                         name="passwordConfirm"
                         v-validate="{ required: true, is: user.password }"
                         placeholder="Password repeat here..." maxlength="30"></b-input>
            </b-field>

            <b-field label="Roles"
                     :type="{'is-danger': errors.has('selectedRoles')}"
                     :message="[{
                        'Role is required': errors.firstByRule('selectedRoles', 'required')
                     }]">
                <b-select v-model="user.selectedRoles"
                          name="selectedRoles"
                          v-validate="'required'"
                          multiple placeholder="Select a role"
                          native-size="2">
                    <option v-for="role in roles" v-bind:key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>
                </b-select>
            </b-field>

            <b-field>
                <button type="submit" class="button is-primary">
                    Sign up
                </button>
            </b-field>
        </form>

        <span>Already have an account ? </span>
        <span>
            <router-link :to="{ path: 'login' }"> <a>Login</a> </router-link>
        </span>
    </div>
</template>

<script>
    import {EMPLOYEE, TELLER, EMPLOYEE_ID, TELLER_ID} from '@/utils/role-types'
    import { mapActions } from 'vuex'

    export default {
        name: "RegisterForm",
        data() {
            return {
                roles: [
                    {"id": EMPLOYEE_ID, "name": EMPLOYEE},
                    {"id": TELLER_ID, "name": TELLER}
                ],
                user: {
                    name: null,
                    email: null,
                    password: null,
                    passwordConfirm: null,
                    selectedRoles: []
                }
            }
        },
        methods: {
            ...mapActions('user', ['signUp']),
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // this.$toast.open({
                        //     message: 'Yor have successfully registered!',
                        //     type: 'is-success',
                        //     position: 'is-bottom'
                        // });
                        this.signUp(this.user);
                        return;
                    }
                    this.$toast.open({
                        message: 'Form is not valid! Please check the fields.',
                        type: 'is-danger',
                        position: 'is-bottom'
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin-top: 30px;
        width: 300px;
    }

    .container h1 {
        color: $buefy-purple;
    }
</style>