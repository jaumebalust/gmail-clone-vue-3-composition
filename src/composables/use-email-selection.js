import {reactive} from "vue";
import axios from "axios";

let emails = reactive(new Set())
export const useEmailSelection = function (){

  let toggle  = (email) => {
    if (emails.has(email)){
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  let clear = ()=>{
    emails.clear()
  }
  let addMultiple = (newEmails) => {
    newEmails.forEach(email => {
      emails.add(email)
    })
  }

  let forSelected = (fn) =>{
    emails.forEach(email => {
      fn(email)
      axios.put(`http://localhost:3000/emails/${email.id}`,email )
    })
    clear()
  }

  let markRead = ()=>{
    forSelected(email => email.read = true)
  }

  let markUnRead = ()=>{
    forSelected(email => email.read = false)
  }

  let toggleArchive = ()=>{
    forSelected(email => email.archived = !email.archived)
  }

  let allAreRead = ()=>{
    //check that every email passes the condition
    //we need the spread operator because it's a set.
    return [...emails].every(email => email.read)
  }
  let allAreUnRead = ()=>{
    //check that every email passes the condition
    //we need the spread operator because it's a set.
    return [...emails].every(email => !email.read)
  }


  return {
    emails,toggle,clear,addMultiple,markRead,markUnRead, toggleArchive,allAreRead,allAreUnRead
  }
}

export default useEmailSelection


