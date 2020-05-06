import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('../views/home.vue')
const Enter=()=>import('../views/enter.vue')
const UserManagement=()=>import('../views/userManagement.vue')
const TitleManagement=()=>import('../views/titleManagement.vue')
const TimeManagement=()=>import('../views/timeManagement.vue')
const StudentTitleSelect=()=>import('../views/studentTitleSelect.vue')
const TitleLook=()=>import('../views/titleLook.vue')
const StatusReport=()=>import('../views/statusReport.vue')
const Paper=()=>import('../views/paper.vue')
const TeacherTitleSelect=()=>import('../views/teacherTitleSelect.vue')


Vue.use(VueRouter)

const routes=[
    {
        path:'',
        redirect:'/enter'
    },
    {
        path:'/home',
        component:Home
    },
    {
        path:'/enter',
        component:Enter
    },
    {
        path:'/userManagement',
        component:UserManagement
    },
    {
        path:'/titleManagement',
        component:TitleManagement
    },
    {
        path:'/timeManagement',
        component:TimeManagement
    },
    {
        path:'/studentTitleSelect',
        component:StudentTitleSelect
    },
    {
        path:'/titleLook',
        component:TitleLook
    },
    {
        path:'/statusReport',
        component:StatusReport
    },
    {
        path:'/paper',
        component:Paper
    },
    {
        path:'/teacherTitleSelect',
        component:TeacherTitleSelect
    },
]
const router =new VueRouter({
    routes,
    mode:'history'
})

export default router