import { create } from "zustand";


export const useTabs = create((set)=>({
    tabTitle:'RGCP',

    setTabTitle:(title)=>{
        set({ tabTitle: title });
    },

    tabActive:'inicio',

    setTabActive:(tab)=>{
        set({ tabActive: tab });
    },
}))