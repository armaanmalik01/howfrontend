import { Outlet, NavLink, useNavigation, useNavigate, Link, useLocation } from "react-router";
import { HomeOutlined, WalletOutlined, OrderedListOutlined, UserOutlined, ProductOutlined } from '@ant-design/icons';
import { Flex, Col, Row,Spin } from "antd";
import "./Dashboard.css"
import { useEffect, useRef } from "react";


const menuItems = [
    {
        title: "Home",
        icon: HomeOutlined,
        href: '/dashboard'
    },
    {
        title: "Products",
        icon: ProductOutlined,
        href: 'product'
    },
    {
        title: "Wallet",
        icon: WalletOutlined,
        href: "wallet"
    },
    {
        title: "Orders",
        icon: OrderedListOutlined,
        href: "orders"
    },
    {
        title: "Profile",
        icon: UserOutlined,
        href: "profile"
    }
]


export default function Dashboard(props) {


    useEffect(()=> {
        if(!localStorage.getItem("token")) {
            navigate('/');
        }
    }, [])

    const navigate = useNavigate();

    const navigation = useNavigation();

    const location = useLocation();
    const ref = useRef();

    useEffect(() => {
        const active_location = location.pathname.split("/").at(-1);
        const children = Array.from(ref.current.children);
        children.map(ele => {
            if (ele.ariaLabel == active_location) {
                ele.classList.add("active")
            } else {
                ele.classList.remove("active")
            }
        });
    });


    return <>
        <div
            ref={ref}
            style={
                {
                    width: '100vw',
                    height: "65px",
                    padding: '10px 14px',
                    boxSizing: 'border-box',
                    position: 'fixed',
                    bottom: "0%",
                    left: "0%",
                    zIndex: "10",
                    background: '#fff',
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    rowGap: "10px",
                    columnGap: "10px",
                    overflow: "hidden",
                    borderTop: '2px solid #7132f5'
                }
            }
        >
            {
                menuItems.map(e => {
                    return <div key={e.title} aria-label={e.href.replace('/', '')}
                        style={{
                            cursor: "pointer",
                            color: "#49396f",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onClick={_ => navigate(e.href)}>
                        <e.icon style={{ fontSize: "22px" }} />
                        <span style={{ fontSize: "0.7rem", pointerEvents: "none" }}>{e.title}</span>
                    </div>
                })
            }
        </div>
        <Flex vertical style={{
            // backgroundColor: "#e8e8e8",
            // height:"100vh",
            // padding:"1rem 0"
        }}>

            {
                navigation.state == "loading" ?

                    <Flex align="center" gap="middle" style={{minHeight:"100vh"}} justify="center">
                        <Spin size="large" />
                    </Flex>
                    : <><Outlet />
                        <div style={{
                            height: "80px"
                        }}>
                        </div></>
            }
        </Flex>
    </>
}