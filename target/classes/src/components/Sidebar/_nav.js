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

            ]
        }

    ]


    // {
    //     divider: true
    // },
    // {
    //     title: true,
    //     name: 'Extras'
    // },
    //
    // {
    //     name: 'Pages',
    //     url: '/pages',
    //     icon: 'icon-star',
    //     children: [
    //         {
    //             name: 'Login',
    //             url: '/login',
    //             icon: 'icon-star'
    //         },
    //         {
    //             name: 'Register',
    //             url: '/register',
    //             icon: 'icon-star'
    //         },
    //         {
    //             name: 'Error 404',
    //             url: '/404',
    //             icon: 'icon-star'
    //         },
    //         {
    //             name: 'Error 500',
    //             url: '/500',
    //             icon: 'icon-star'
    //         }
    //     ]
    // },
    // {
    //     name: 'UI Kits',
    //     url: '/ui-kits',
    //     icon: 'icon-layers',
    //     children: [
    //         {
    //             name: 'Invoicing',
    //             url: '/ui-kits/invoicing',
    //             icon: 'icon-speech',
    //             children: [
    //                 {
    //                     name: 'Invoice',
    //                     url: '/ui-kits/invoicing/invoice',
    //                     icon: 'icon-speech'
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Email',
    //             url: '/ui-kits/email',
    //             icon: 'icon-speech',
    //             children: [
    //                 {
    //                     name: 'Inbox',
    //                     url: '/ui-kits/email/inbox',
    //                     icon: 'icon-speech'
    //                 },
    //                 {
    //                     name: 'Message',
    //                     url: '/ui-kits/email/message',
    //                     icon: 'icon-speech'
    //                 },
    //                 {
    //                     name: 'Compose',
    //                     url: '/ui-kits/email/compose',
    //                     icon: 'icon-speech'
    //                 }
    //             ]
    //         }
    //     ]
    // },


};
