import { authSlice, registerSlice } from './slices';

// export const autoLogin = () => dispatch => {
//     fetch(`http://localhost:4000/auto_login`, {
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//         }
//     })
//         .then(res => res.json())
//         .then(data => {
//             localStorage.setItem("token", data.token)
//             console.log(data)
//             dispatch(setUser(data.user))
//         })
// }