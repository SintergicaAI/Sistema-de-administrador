import {ConfigProvider} from "antd";

type Props = {
    children: React.ReactNode
}

export const ThemeConfiguration = ({children}:Props) => {
    return (<ConfigProvider wave={{disabled:true}} theme={
        {
            token: {
                borderRadius: 8,
                colorSplit:'var(--c_slate_300)',
                fontSizeHeading1:20,
                fontFamily:'var(--base-font)',
            },
            // algorithm: theme.darkAlgorithm,
            components: {
                Layout: {
                    bodyBg:'var(--c_slate_100)',
                    headerBg:"inherit",
                    headerHeight:50,
                    headerPadding:0,
                    siderBg: 'var(--c_slate_200)',
                    colorText:'var(--c_slate_500)',
                    algorithm: true
                },
                Button:{
                    colorPrimary:'var(--c_brand-500)',
                    colorPrimaryHover:'var(--c_brand_400)',
                    colorPrimaryActive:'var(--c_brand_600)',

                },

                List: {
                    colorFillAlter: '#123',
                    algorithm: true,
                },
                Menu: {
                    colorText: 'var(--c_slate_500)',
                    itemBg:'',
                    iconSize:24,
                    itemSelectedBg:'var(--c_brand_100)',
                    itemSelectedColor:'var(--c_brand-500)',
                    itemHoverColor:'var(--c_brand_500)',
                    itemHoverBg:'',
                    collapsedIconSize:24,
                    itemPaddingInline:1,
                    itemMarginInline:10,
                },
                "Divider": {
                    "margin": 0
                },
                Table: {
                    colorBgContainer:'var(--c_slate_50)',
                    headerBg:'var(--c_slate_100)',
                    headerColor:'var(--c_slate_500)',
                    fontWeightStrong:300,
                    rowHoverBg:'var(--c_slate_200)',
                    "cellPaddingBlock": 12,
                    "cellPaddingInline": 12,
                    borderColor: "var(--c_slate_200)",
                },
                Avatar:{
                    colorTextLightSolid:'var(--c_brand-500)',
                    colorTextPlaceholder:'var(--c_brand_100)',
                    containerSize:32,
                    fontSize:12,
                },
                Input:{
                    activeBorderColor:"var(--c_brand_300)",
                    colorTextDescription:"var(--c_slate_500)",
                    colorText: "var(--c_brand_950)",
                    borderRadius:8,
                    controlHeight:40,

                }

            },
        }}>
            {children}
        </ConfigProvider>)
}