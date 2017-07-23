import Vue from 'vue';
import Router from 'vue-router';
import Desktop from '@/modules/desktop/Desktop';
import About from '@/modules/home/About';
import Hello from '@/components/Hello';
import Customer from '@/modules/customer/customer';
import User from '@/modules/user/user';

import UserList from '@/modules/user/views/list';
import UserDetail from '@/modules/user/views/detail';

import UserDetail2 from '@/modules/user/components/user.detail.component.js'

import Activity from '@/modules/activity/activity';
import Quotation from '@/modules/quotation/quotation';


Vue.use(Router);

var helloRoute = { path: '/hello', name: 'crm.hello', component: Hello };
var aboutRoute = { path: '/about', name: 'crm.About', component: About };
var customerRoute = { path: '/customer', name: 'crm.customer', component: Customer };
var activityRoute = { path: '/activity', name: 'crm.activity', component: Activity };
var quotationRoute = { path: '/quotation', name: 'crm.quotation', component: Quotation };
var userRoute = { path: '/user', name: 'crm.user', component: User };
userRoute.children = [
    { path: '', name: 'crm.user.list', component: UserDetail2 },
    { path: 'detail', name: 'crm.user.detail', component: UserDetail }
];

var routeCrm = { path: '/', name: 'crm', component: Desktop };
routeCrm.children = [helloRoute, userRoute, aboutRoute, customerRoute, activityRoute, quotationRoute];
export default new Router({ routes: [routeCrm] });