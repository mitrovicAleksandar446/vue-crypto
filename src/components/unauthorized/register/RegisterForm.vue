<template>
    <div class="container">
        <h1 class="title">
            Register
        </h1>
        <b-field label="Name">
            <b-input placeholder="Name here" maxlength="30"></b-input>
        </b-field>

        <b-field label="Email"
                 type="is-danger"
                 message="This email is invalid">
            <b-input type="email"
                     placeholder="Email here..."
                     maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Password"
                 type="is-warning"
                 :message="['Password is too short', 'Password must have at least 8 characters']">
            <b-input placeholder="Password here" type="password" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password repeat"
                 type="is-warning"
                 :message="['Repeated password must match']">
            <b-input placeholder="Password repeat here..." type="password" maxlength="30"></b-input>
        </b-field>

        <b-field label="Role">
            <b-select multiple placeholder="Select a role" native-size="2" v-model="roles">
                <option v-for="role in roles" v-bind:key="role.id" :value="role.id">{{ role.name }}</option>
            </b-select>
        </b-field>

        <b-field>
            <a class="button is-primary">Register</a>
        </b-field>

        <span>Already have an account ? </span>
        <span>
            <router-link :to="{ path: 'login' }"> <a>Login</a> </router-link>
        </span>
    </div>
</template>

<script>
    import { EMPLOYEE, TELLER, EMPLOYEE_ID, TELLER_ID } from '@/utils/role-types'

    export default {
        name: "RegisterForm",
        data() {
            return {
                roles: [
                    {"id": EMPLOYEE_ID, "name": EMPLOYEE},
                    {"id": TELLER_ID, "name": TELLER}
                ]
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