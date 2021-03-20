import {reactive,ref} from "vue";
import axios from "axios";

let screen = ref('inbox')
export const useScreenSelection = function (){
  let toggleScreen = ()=>{
    if (screen === 'inbox'){
      screen = 'archive'
    }
    if (screen === 'archive'){
      screen = 'inbox'
    }
  }
  let isInboxSelected = ()=>{
    return screen.value == 'inbox'
  }
  let isArchivedSelected = ()=>{
    return screen.value == 'archived'
  }
  let selectInbox = ()=>{
    screen.value = 'inbox'
  }
  let selectArchived = ()=>{
    console.log('selectin archived')
    screen.value = 'archived'
  }

  return {
    toggleScreen,
    isInboxSelected,
    isArchivedSelected,
    screen,
    selectArchived,selectInbox
  }
}

export default useScreenSelection


