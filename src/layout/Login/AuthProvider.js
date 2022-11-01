
export function UserAuth(){
   let user = JSON.parse(localStorage.getItem("get-user"))
   return user
}