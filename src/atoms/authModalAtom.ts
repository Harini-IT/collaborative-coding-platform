import {atom} from 'recoil'
type AuthModalState ={
    isOpen:boolean;
    type:'login'| 'register'|'forgotPassword'
}
const initialAuthModalState:AuthModalState = {
    isOpen:false,
    type:'login'
}

export const authModalState = atom<AuthModalState>({
    key:'authModalState',
    default:initialAuthModalState
})

export const contestState:any = atom({
    key: "contestState",
    default: false,
  });
  
  export const timerState = atom({
    key: "timerState",
    default: "00:00:00",
  });