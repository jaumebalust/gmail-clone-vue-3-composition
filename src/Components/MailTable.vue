<template>
  <button @click="selectedScreen = 'inbox'" :disabled="selectedScreen === 'inbox'"> Inbox</button>
  <button @click="selectedScreen = 'archived'" :disabled="selectedScreen === 'archived'"> Archived</button>

  <bulk-selection :emails="filteredEmails"></bulk-selection>
  <table class="mail-table">
    <tbody>
    <tr v-for="email in filteredEmails" :key="email.id" :class="['clickable', email.read ? 'read':'']">
      <td>
        <input type="checkbox" @click="emailSelection.toggle(email)" :checked="emailSelection.emails.has(email)"/>
      </td>
      <td @click="openEmail(email)">
        {{ email.from }}
      </td>
      <td @click="openEmail(email)">
        <p><strong>{{ email.subject }}</strong> - {{ email.body }}</p>
      </td>
      <td class="date" @click="openEmail(email)">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
      <td>
        <button @click="archiveEmail(email)">Archive</button>
      </td>
    </tr>
    </tbody>
  </table>


  <ModalView v-if="openedEmail" @closeModal="openedEmail = null">
    <MailView :email="openedEmail" @changeEmail="changeEmail"/>
  </ModalView>

</template>
<script>
import {format} from 'date-fns'
import axios from 'axios'
import MailView from "@/Components/MailView";
import ModalView from "@/Components/ModalView";
import {reactive, ref} from 'vue'
import useEmailSelection from '../composables/use-email-selection'
import BulkSelection from "@/Components/BulkSelection";

export default {
  name: 'MailTable',
  components: {BulkSelection, ModalView, MailView},
  async setup() {
    let response = await axios.get('http://localhost:3000/emails')
    let emails = response.data


    return {
      format,
      emails: ref(emails),
      openedEmail: ref(null),
      emailSelection: useEmailSelection(),
      selectedScreen:ref('inbox')
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },
    filteredEmails() {
      if (this.selectedScreen == 'inbox'){
        return this.sortedEmails.filter(e => !e.archived)
      } else if (this.selectedScreen == 'archived'){
        return this.sortedEmails.filter(e => e.archived)
      }

    }
  },
  methods: {
    changeEmail({toggleRead, toggleArchive, save, closeModal, changeIndex}) {
      let email = this.openedEmail
      if (toggleRead) {
        email.read = !email.read
      }
      if (toggleArchive) {
        email.archived = !email.archived
      }
      if (save) {
        this.updateEmail(email)
      }
      if (closeModal) {
        this.openedEmail = null
      }
      if (changeIndex) {
        let emails = this.unarchivedEmails
        let currentIndex = emails.indexOf(this.openedEmail)
        let newEmail = emails[currentIndex + changeIndex]
        this.openEmail(newEmail)

      }
    },
    openEmail(email) {
      this.openedEmail = email
      if (email) {
        email.read = true
        this.updateEmail(email)
      }

    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  }

}
</script>
<style>

/* Global Styles */

button {
  font-size: 16px;
  padding: 8px;
  border-radius: 3px;
  margin: 5px 10px 5px 0px;
  cursor: pointer;
}

button:disabled {
  cursor: auto;
}

input[type='checkbox'] {
  -webkit-appearance: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 2px;
  border: 1px solid #555;
  position: relative;
  vertical-align: middle;
  padding: 10px;
}

input[type='checkbox']:checked {
  background: #679;
}

/* Modal */

/* Email Modal */

/* Mail Table */

.mail-table tr {
  height: 40px;
}

.mail-table td {
  border-bottom: 1px solid black;
  padding: 5px;
  text-align: left;
}

.mail-table tr:first-of-type td {
  border-top: 1px solid black;
}

.mail-table td p {
  max-height: 1.2em;
  overflow-y: hidden;
  margin: 0;
}

/* Bulk Action Bar */

.bulk-action-bar input {
  margin: 5px;
}

</style>
