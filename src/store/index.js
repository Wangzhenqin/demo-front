import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store=new Vuex.Store({
  state:{
    isEnter: false,
    directory: [],
    user: {
      userId: null,
      userType: null,
      name: null,
      facultyId: null
    },
    faculty:[]
  },
  mutations:{
    exit(state){
      state.isEnter=false
      state.user={
        userId: null,
        userType: null,
        name: null,
        facultyId: null
      }
    },
    enter(state,userDTO){
      state.isEnter=true
      state.user=userDTO
    },
    getDirectory(state,directory) {
      state.directory = directory;
    },
    getFaculty(state,faculty) {
      state.faculty = faculty;
    },
  },
  actions:{

  },
  getters:{

  },
  modules:{

  }
})

export default store
