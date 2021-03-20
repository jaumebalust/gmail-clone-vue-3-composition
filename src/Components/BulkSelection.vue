<template>
  <div class="bulk-selection bulk-action-bar">
    <span class="bulk-selection__title checkbox">
      <input type="checkbox" :checked="allEmailsSelected"
             :class="[someEmailSelected ? 'partial-check' :'']"
      @click="bulkSelect">
    </span>
    <span class="bulk-selection__content">
      <button :disabled="emailSelection.allAreRead()" @click="emailSelection.markRead()">Mark Read</button>
      <button :disabled="emailSelection.allAreUnRead()" @click="emailSelection.markUnRead()">Mark UnRead</button>
      <button :disabled="numberSelected === 0" @click="emailSelection.archive()">Archive</button>
    </span>
  </div>
</template>

<script>
import useEmailSelection from "@/composables/use-email-selection";
import {computed} from 'vue'

export default {
  name: 'bulk-selection',
  props: {
    emails: {
      type: Array,
      required: true
    }
  },
  mixins: [],
  setup(props) {
    let emailSelection = useEmailSelection()
    let numberSelected = computed(() => emailSelection.emails.size)
    let numberEmails = computed(() => props.emails.length)
    let allEmailsSelected = computed(() => {
      return numberSelected.value === numberEmails.value
    })
    let someEmailSelected = computed(() => {
      return numberSelected.value > 0 && numberSelected.value < numberEmails.value
    })

    let bulkSelect = ()=>{
      if (allEmailsSelected.value){
        emailSelection.clear()
      } else {
        emailSelection.addMultiple(props.emails)
      }
    }

    return {

      allEmailsSelected,
      someEmailSelected,
      bulkSelect,
      emailSelection,
      numberSelected
    }
  },
  mounted() {

  },
  methods: {},
  computed: {}
}
</script>
