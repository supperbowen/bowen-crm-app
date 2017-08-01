import Vue from 'vue';
import Router from 'vue-router';
import Desktop from '@/modules/desktop/Desktop';
import About from '@/modules/home/About';
import Hello from '@/components/Hello';
import Customer from '@/modules/customer/customer';

import User from '@/modules/user/index/index.js';
import UserList from '@/modules/user/list/list.js';
import UserDetail from '@/modules/user/detail/detail.js';

import Rss from '@/modules/rss/index/index.js';
import RssList from '@/modules/rss/list/list.js';
import RssDetail from '@/modules/rss/detail/detail.js';

import RssOption from '@/modules/rssoption/index/index.js';
import RssOptionList from '@/modules/rssoption/list/list.js';
import RssOptionDetail from '@/modules/rssoption/detail/detail.js';

import Activity from '@/modules/activity/activity';
import Quotation from '@/modules/quotation/quotation';


Vue.use(Router);

var helloRoute = {
	path: '/hello',
	name: 'crm.hello',
	component: Hello
};
var aboutRoute = {
	path: '/about',
	name: 'crm.About',
	component: About
};
var customerRoute = {
	path: '/customer',
	name: 'crm.customer',
	component: Customer
};
var activityRoute = {
	path: '/activity',
	name: 'crm.activity',
	component: Activity
};
var quotationRoute = {
	path: '/quotation',
	name: 'crm.quotation',
	component: Quotation
};
var userRoute = {
	path: '/user',
	name: 'crm.user',
	component: User
};
userRoute.children = [{
		path: '',
		name: 'crm.user.list',
		component: UserList
	},
	{
		path: 'detail/:id',
		name: 'crm.user.detail',
		component: UserDetail
	}
];

var rssRoute = {
	path: '/rss',
	name: 'crm.rss',
	component: Rss,
	children: [{
			path: '',
			name: 'crm.rss.list',
			component: RssList
		},
		{
			path: 'detail/:id',
			name: 'crm.rss.detail',
			component: RssDetail
		},
		{
			path: 'create',
			name: 'crm.rss.create',
			component: RssDetail
		}
	]
};


var rssOptionRoute = {
	path: '/rssoption',
	name: 'crm.rssoption',
	component: Rss,
	children: [{
			path: '',
			name: 'crm.rssoption.list',
			component: RssOptionList
		},
		{
			path: 'detail/:id',
			name: 'crm.rssoption.detail',
			component: RssOptionDetail
		},
		{
			path: 'detail',
			name: 'crm.rssoption.create',
			component: RssOptionDetail
		}
	]
};

var routeCrm = {
	path: '/',
	name: 'crm',
	component: Desktop
};
routeCrm.children = [helloRoute, userRoute, aboutRoute, customerRoute, activityRoute, quotationRoute, rssRoute, rssOptionRoute];
export default new Router({
	routes: [routeCrm]
});