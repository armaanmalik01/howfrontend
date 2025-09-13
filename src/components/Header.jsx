import { ContactsOutlined, CustomerServiceOutlined, CustomerServiceTwoTone } from "@ant-design/icons"

export default function Header(props) {
    return <header
        style={
            {
                height: '55px',
                background: "#fff",
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0 1rem',
                alignItems: 'center'
            }
        }
    >

        {/* <span
            style={{
                fontSize: '1.3rem',
                fontWeight: "700",
                textTransform: 'uppercase'
            }}
        >Logo</span> */}
        <img src="logo.png" alt="logo" width={'45px'} />
        
        <a href="https://t.me/howorthearning" target="_blank">
        <div
            style={{
                display:'flex',
                alignItems:'center',
                justifyContent:"center",
                flexDirection:"column",
                gap:'2px',
                cursor:'pointer'
            }}
        >
            <CustomerServiceOutlined style={{ fontSize: "22px" }} />
            <span
                style={{
                    fontSize:"0.6rem",
                    appearance:"none",
                    pointerEvents:'none'
                }}  
            >Support</span>
        </div>
            </a>
    </header>

}
