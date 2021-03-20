<template>
  <div class="MailView">
    <div>
      <button @click="toggleArchive">{{email.archived ? 'Move to Inbox (e)' : 'Archive (e)'}}</button>
      <button @click="toggleRead">{{email.read ? 'Mark Unread' : 'Mark Read'}}</button>
      <button @click="goNewer">Newer</button>
      <button @click="goOlder">Older</button>
    </div>
    <h2 class="MailView__title mb-0">Subject: <strong>{{email.subject}}</strong></h2>
    <div class="MailView__content">
      <div><em>From {{email.from}} on {{ format(new Date(email.sentAt),'MMM do yyyy') }}</em></div>
      <div v-html="marked(email.body)"></div>
    </div>
  </div>
</template>

<script>

import {format} from 'date-fns'
import marked from 'marked'
import useKeyDown from "@/composables/use-keydown";
import axios from "axios";
export default {
  name: 'MailView',

  mixins: [],
  setup(props,{emit}){
    let email = props.email

    let toggleRead = () =>{ emit('changeEmail',{toggleRead:true,save:true})}
    let toggleArchive = () =>{ emit('changeEmail',{toggleArchive:true,save:true,closeModal:true})}
    let goNewer = () =>{ emit('changeEmail',{changeIndex:-1})}
    let goOlder = () =>{ emit('changeEmail',{changeIndex:1})}
    let goNewerAndArchive = () =>{ emit('changeEmail',{changeIndex:-1,toggleArchive:true,save:true})}
    let goOlderAndArchive = () =>{ emit('changeEmail',{changeIndex:1,toggleArchive:true,save:true})}

    useKeyDown([
      {key:'r',fn:toggleRead},
      {key:'e',fn:toggleArchive},
      {key:'k',fn:goNewer},
      {key:'j',fn:goOlder},
      {key:'l',fn:goNewerAndArchive},
      {key:'ñ',fn:goOlderAndArchive}
    ])
    return {
      format,
      marked,
      toggleRead,
      toggleArchive,
      goOlder,
      goNewer
    }
  },
  props:{
    email:{
      type:Object,
      required:true
    }
  },
  mounted() {

  },
  methods: {},
  computed: {}
}
</script>
<style >

</style>

