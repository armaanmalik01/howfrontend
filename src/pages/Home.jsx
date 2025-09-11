import { useNavigate, useNavigation, } from "react-router";
import { Button, Card, Carousel, DatePicker, Flex } from "antd";

import HeaderMenu from "../components/HederMenu";
import Header from "../components/Header";
import Slider from "../components/Slider";
import FinanceButton from "../components/FinanceButton";
import CompanyAbout from "../components/CompanyAbount";
import Analytics from "../components/Analytics";

import { useLoaderData } from "react-router"



function Home(props) {

    const { data } = useLoaderData();

    return <div style={{ backgroundColor: '#e8e8e8' }}>
        <Header />
        <HeaderMenu />
        <Slider />
        <FinanceButton />
        <Analytics data={data} />
    </div>
}

export default Home