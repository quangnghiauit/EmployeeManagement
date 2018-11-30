export default {
    items1: [


        {
            title: true,
            name: 'Components',
            wrapper: {
                element: '',
                attributes: {}
            },
        },

        {
            name: 'Executive Manager',
            url: '/executivemanager',
            icon: 'icon-pie-chart',
            children: [
                {
                    name: 'Dashboard',
                    url: '/executivemanager/dashboard',
                    icon: 'icon-pie-chart',
                },
                {
                    name: 'Check tickets',
                    url: '/executivemanager/checktickets',
                    icon: 'icon-pie-chart',
                },
                {
                    name: 'Check Reviews',
                    url: '/executivemanager/reviewmanager',
                    icon: 'icon-pie-chart',
                },

            ]
        }
    ],
    items2: [
        {
            title: true,
            name: 'Components',
            wrapper: {
                element: '',
                attributes: {}
            },
        },
        {
            name: 'Manager',
            url: '/manager',
            icon: 'icon-cursor',
            children: [
                {
                    name: 'Dashboard',
                    url: '/manager/managerdashboard',
                    icon: 'icon-cursor'
                },
                {
                    name: 'Reviews',
                    url: '/manager/managerreviews',
                    icon: 'icon-cursor'
                },

            ]
        }

    ],
    items3: [
        {
            title: true,
            name: 'Components',
            wrapper: {
                element: '',
                attributes: {}
            },
        },
        {
            name: 'Worker',
            url: '/worker',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'Information',
                    url: '/worker/information',
                    icon: 'icon-puzzle'
                },
                {
                    name: 'Reviews',
                    url: '/worker/reviews',
                    icon: 'icon-puzzle'
                },
                {
                    name: 'Account',
                    url: '/worker/account',
                    icon: 'icon-puzzle'
                },
                {
                    name: 'List Worker',
                    url: '/worker/listworker',
                    icon: 'icon-puzzle'
                },

            ]
        }

    ]



};
