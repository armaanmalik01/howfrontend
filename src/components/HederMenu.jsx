import { TeamOutlined, UserAddOutlined, GiftOutlined, DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router";

const headerMenu = [
    {
        title: "Team",
        icon: TeamOutlined,
        href: "team"
    },
    {
        title: "Invite",
        icon: UserAddOutlined,
        href: "invite"
    },
    {
        title: "Gifts",
        icon: GiftOutlined,
        href: "gift"
    },
    {
        title: "App",
        icon: DownloadOutlined,
        href: "download.apk"
    }
]


export default function HeaderMenu(props) {
    const navigate = useNavigate();

    return <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(4 ,1fr)",
            height: "65px",
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "5px",
            columnGap: "10px",
            margin: "1rem",
        }}
    >
        {
            headerMenu.map(ele => {
                return <div
                    onClick={()=>navigate(ele.href)}
                    style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            gap: "4px",
                            backgroundColor: "#000",
                            borderRadius: '5px',
                            color: "#fff"
                        }
                    }
                >
                    <ele.icon style={{ fontSize: '25px' }} />
                    <span
                        style={
                            {
                                fontSize: "0.8rem",
                                fontWeight: 'bold'
                            }
                        }
                    >{ele.title}</span>
                </div>
            })
        }
    </div>

}