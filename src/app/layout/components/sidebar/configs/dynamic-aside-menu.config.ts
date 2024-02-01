export const DynamicAsideMenuConfig = {
    menu1: [
        {
            title: 'explore',
            page: '/explore',  
            target: '_self',
            isExternal: false,
            className: 'explore',
            svg: './assets/media/svg/discovery.svg',    
        },
        {
            title: 'knowledge-gate',
            page: 'https://wndo.com/', 
            isExternal: true, 
            target: '_blank',
            className: 'gate',
            svg: './assets/media/svg/document.svg',  
        },
    ],

    menu2: [
        {
            title: 'Fashion',
            page: '/....',  
            className: 'gate',
            svg: './assets/media/svg/fashion.svg',  
            svgActive: './assets/media/svg/fashion.svg',  
            submenu: [
                {
                    title: 'Men',
                    page: '/....',  
                    className: '',
                    svg: './assets/media/svg/men.svg',    
                    svgActive: './assets/media/svg/men-active.svg',    
                },
                {
                    title: 'Women',
                    page: '/....',  
                    className: '',
                    svg: './assets/media/svg/women.svg',    
                    svgActive: './assets/media/svg/women-active.svg',    
                },
                {
                    title: 'Kids',
                    page: '/....',  
                    className: '',
                    svg: './assets/media/svg/kids.svg',  
                    svgActive: './assets/media/svg/kids-active.svg',      
                },
                {
                    title: 'Unisex',
                    page: '/....',  
                    className: '',
                    svg: './assets/media/svg/unisex.svg',  
                    svgActive: './assets/media/svg/unisex-active.svg',   
                },
            ]
        },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
        // {
        //     title: 'Beauty & Health',
        //     page: '/....',  
        //     className: 'gate',
        //     svg: './assets/media/svg/health.svg',  
        //     svgActive: './assets/media/svg/health.svg',  
        //     submenu: [
        //         {
        //             title: 'Men',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/men.svg',    
        //             svgActive: './assets/media/svg/men-active.svg',    
        //         },
        //         {
        //             title: 'Women',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/women.svg',    
        //             svgActive: './assets/media/svg/women-active.svg',    
        //         },
        //         {
        //             title: 'Kids',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/kids.svg',  
        //             svgActive: './assets/media/svg/kids-active.svg',      
        //         },
        //         {
        //             title: 'Unisex',
        //             page: '/....',  
        //             className: '',
        //             svg: './assets/media/svg/unisex.svg',  
        //             svgActive: './assets/media/svg/unisex-active.svg',   
        //         },
        //     ]
        // },
    ]
}