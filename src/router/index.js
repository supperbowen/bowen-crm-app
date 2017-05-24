import Vue from 'vue'
import Router from 'vue-router'
import Desktop from '@/modules/desktop/Desktop'
import About from '@/modules/home/About'
import Hello from '@/components/Hello'
import Customer from '@/modules/customer/customer'
import User from '@/modules/user/user'
import UserList from '@/modules/user/children/list'
import UserDetail from '@/modules/user/children/detail'
import Activity from '@/modules/activity/activity'
import Quotation from '@/modules/quotation/quotation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'crm',
      component: Desktop,
      children: [
        {
          path: '/hello',
          name: 'crm.hello',
          component: Hello
        },
        {
          path: '/user',
          name: 'crm.user',
          component: User,
          children:[
            {
              path: '',
              name: 'crm.user.list',
              component: UserList,
            },
            {
              path: 'detail',
              name: 'crm.user.detail',
              component: UserDetail,
            }
          ]
        },
        {
          path: '/about',
          name: 'crm.About',
          component: About
        },
        {
          path: '/customer',
          name: 'crm.customer',
          component: Customer
        },
        {
          path: '/activity',
          name: 'crm.activity',
          component: Activity
        },
        {
          path: '/quotation',
          name: 'crm.quotation',
          component: Quotation
        }
      ]
    }
  ]
})
