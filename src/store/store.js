import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/fb'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        projects: [],
        teams: [
            { name: 'The Net Ninja', role: 'Web developer', avatar:'/avatar-1.png' },
            { name: 'Ryu', role: 'Graphic designer', avatar:'/avatar-2.png' },
            { name: 'Chun Li', role: 'Web developer', avatar:'/avatar-3.png' },
            { name: 'Gouken', role: 'Social media maverick', avatar:'/avatar-4.png' },
            { name: 'Yoshi', role: 'Sales guru', avatar:'/avatar-5.png'}
        ],
        links:[
            {icon:'mdi-view-dashboard', text:'Dashboard', route:'/' },
            {icon:'mdi-folder', text:'My Projects', route:'/projects'},
            {icon:'mdi-account', text:'Team', route:'/team'}
        ],
    },
    mutations:{
        fetchProjects:state=>{
            db.collection('projects').onSnapshot(res => {
                const changes = res.docChanges();
          
                changes.forEach(change => {
                    var Id = change.doc.id
                    var index = state.projects.map(x => {
                        return x.id;
                    }).indexOf(Id);

                    if (change.type === 'added') {
                        state.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                        })
                    }
                    else if(change.type === 'modified'){
                        state.projects.splice(index, 1, change.doc.data());
                    }
                    else if(change.type === 'removed') {
                        state.projects.splice(index, 1);
                    }
                });
            })
        }
    },
    actions:{
        fetchProjects:context =>{
            context.commit('fetchProjects')
        }
    }
})

store.dispatch('fetchProjects')