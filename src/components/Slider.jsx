import { Carousel } from "antd";

const cardstyle = {
    height: "200px",
    backgroundSize:"cover"
};


export default function Slider(props) {

    return <Carousel autoplay>
        <div>
            <div style={{...cardstyle, backgroundImage : "url(/1.jpg)"}}></div>
        </div>
        <div>
            <div style={{...cardstyle, backgroundImage : "url(/2.jpg)"}}></div>
        </div>
        <div>
            <div style={{...cardstyle, backgroundImage : "url(/3.jpg)"}}></div>
        </div>
        <div>
            <div style={{...cardstyle, backgroundImage : "url(/4.jpg)"}}></div>
        </div>
    </Carousel>
}