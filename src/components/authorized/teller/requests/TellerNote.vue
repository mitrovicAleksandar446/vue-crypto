<template>
    <p v-if="!editMode">
        <em><u>"{{ note }}"</u></em>
        <span class="icon is-large teller-note-btn" title="Click to enter edit mode">
          <i class="is-small fas fa-edit" aria-hidden="true" @click="toggleEditMode(true)"></i>
        </span>
    </p>
    <div v-else class="edit-mode columns">
        <div class="column is-two-thirds">
            <b-input type="textarea"
                     :value="note"
                     @input="updateNote($event)"
                     placeholder="Note here...">

            </b-input>
        </div>
        <div class="column">
            <a class="button is-primary" @click="toggleEditMode(false); saveNote();">Done</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TellerNote",

        props: {
            note: {
                required: true
            }
        },

        data() {
            return {
                editMode: false,
                isDirty: false
            }
        },

        created() {
            this.editMode = !this.note;
        },

        methods: {

            toggleEditMode(status) {
                if ((!status && this.note) || status)
                    this.editMode = status;
            },

            saveNote() {
                if (!this.isDirty) return;
                this.$emit('save:note');
                this.isDirty = false;
            },

            updateNote(note) {
                this.$emit('update:note', note);
            }
        },

        watch: {
            note(oldValue, newValue) {
                this.isDirty = newValue !== oldValue;
            }
        }
    }
</script>

<style scoped>
    .teller-note-btn {
        cursor: pointer;
    }
</style>