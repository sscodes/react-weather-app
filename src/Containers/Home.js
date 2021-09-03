/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Collapse, Container, CustomInput, Input, Row } from "reactstrap";
import overcast from '../assets/clouds.png';
import hum from '../assets/humidity.png';
import loc from '../assets/placeholder.png';
import vis from '../assets/searching.png';
import cloudy from '../assets/sun.png';
import clear from '../assets/sunny.png';
import windD from '../assets/wind-d.png';
import windSpeed from '../assets/wind.png';
import "./Style.css";

const Home = () => {

    const [place, setPlace] = useState('Kolkata');
    const [unit, setUnit] = useState('°C');
    const [temp, setTemp] = useState(23);
    const [feelsLikeTemp, setFeelsLikeTemp] = useState(30);
    const [maxTemp, setMaxTemp] = useState(25);
    const [minTemp, setMinTemp] = useState(15);
    const [type, setType] = useState('Clear');
    const [humidity, setHumidity] = useState(74);
    const [visibilty, setVisibilty] = useState(7);
    const [winSpeed, setWinSpeed] = useState(4);
    const [direction, setDirection] = useState('North');
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const unitChange = (value) => {
        if (unit === '°F') {
            setTemp(Math.round((5 / 9) * (temp - 32)));
            setMaxTemp(Math.round((5 / 9) * (maxTemp - 32)));
            setMinTemp(Math.round((5 / 9) * (minTemp - 32)));
            setFeelsLikeTemp(Math.round((5 / 9) * (feelsLikeTemp - 32)));
        }
        else {
            setTemp(Math.round(((9 * temp) / 5) + 32));
            setMaxTemp(Math.round(((9 * maxTemp) / 5) + 32));
            setMinTemp(Math.round(((9 * minTemp) / 5) + 32));
            setFeelsLikeTemp(Math.round(((9 * feelsLikeTemp) / 5) + 32));
        }
        setUnit(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b7f4df8ba6b30dcb40ebfbb1bab5b316`);
            console.log(res);
            if (unit === '°F') {
                setTemp(Math.round((9 / 5) * (res.data.main.temp - 273) + 32));
                setMaxTemp(Math.round((5 / 9) * (res.data.main.temp_max - 32)));
                setMinTemp(Math.round((5 / 9) * (res.data.main.temp_min - 32)));
                setFeelsLikeTemp(Math.round((5 / 9) * (res.data.main.feels_like - 32)));
            }
            else {
                setTemp(Math.round(res.data.main.temp - 273));
                setMaxTemp(Math.round((res.data.main.temp_max - 273)));
                setMinTemp(Math.round((res.data.main.temp_min - 273)));
                setFeelsLikeTemp(Math.round((res.data.main.feels_like - 273)));
            }
            if (res.data.clouds.all >= 70)
                setType('Overcast');
            else if (res.data.clouds.all >= 40)
                setType('Cloudy');
            else
                setType('Clear');
            setHumidity(res.data.main.humidity);
            setVisibilty(res.data.visibility / 1000);
            setWinSpeed(res.data.wind.speed);
            if (res.data.wind.deg === 0)
                setDirection("North")
            else if (res.data.wind.deg === 90)
                setDirection("East")
            else if (res.data.wind.deg === 180)
                setDirection("South")
            else if (res.data.wind.deg === 270)
                setDirection("West")
            else if (res.data.wind.deg >= 0 && res.data.wind.deg <= 90)
                setDirection("North-East")
            else if (res.data.wind.deg >= 90 && res.data.wind.deg <= 180)
                setDirection("South-East")
            else if (res.data.wind.deg >= 180 && res.data.wind.deg <= 270)
                setDirection("South-West")
            else if (res.data.wind.deg >= 270 && res.data.wind.deg <= 360)
                setDirection("South-West")
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [place])

    return (
        <>
            <Container className="my-5 d-none d-lg-block">
                <Row className="my-4">
                    <Col lg={8} xl={7} className="d-flex justify-content-end">
                        <Input type="text" name="place" id="examplePlace" placeholder="Enter Place Name" onChange={(e) => setPlace(e.target.value)} />
                    </Col>
                    <Col lg={4} xl={5} className="d-flex justify-content-start">
                        <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={(e) => unitChange(e.target.value)}>
                            <option value="°C">Celsius</option>
                            <option value="°F">Fahrenheit</option>
                        </CustomInput>
                    </Col>
                </Row>
                <Row className="r mx-5 py-4">
                    <Container>
                        <Row>
                            <Col md={1}>
                            </Col>
                            <Col md={5}>
                                <h5><b><u>Place</u></b></h5>
                            </Col>
                            <Col md={3}>
                                <h5><b><u>Temperature</u></b></h5>
                            </Col>
                            <Col md={3}>
                                <h5><b><u>Feels Like</u></b></h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2} className="d-flex justify-content-end">
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={loc} width="100" />
                            </Col>
                            <Col lg={5} className="d-flex justify-content-start">
                                <h1><b>{place}</b></h1>
                            </Col>
                            <Col lg={2}>
                                <h1><b>{temp}{unit}</b></h1>
                            </Col>
                            <Col lg={3}>
                                <h1><b>{feelsLikeTemp}{unit}</b></h1>
                            </Col>
                        </Row>
                        <Row className="py-4 px-2">
                            <Col lg={2} className="d-flex justify-content-end">
                                {(type === 'Clear') ? <img src={clear} width="90" /> : (type === 'Overcast') ? <img src={overcast} width="90" /> : <img src={cloudy} width="90" />}
                            </Col>
                            <Col lg={3} className="weatherType d-flex justify-content-start">
                                {type}
                            </Col>
                            <Col lg={3} className="mt-3">
                                {isOpen ? <Button onClick={toggle} style={{ marginBottom: '1rem' }}>Show Less</Button> : <Button onClick={toggle} style={{ marginBottom: '1rem' }}>Show More</Button>}
                            </Col>
                            <Col lg={4} className="minmax d-flex justify-content-end">
                                Max: {maxTemp}{unit}
                                <br />
                                Min: {minTemp}{unit}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Collapse isOpen={isOpen}>
                                    <Card>
                                        <CardBody>
                                            <Container>
                                                <Row>
                                                    <Col md={6} className="py-3 d-flex justify-content-start">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={vis} width="50" />
                                                        <h4 className="details"><b>Visibility: {visibilty} km</b></h4>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-end">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={hum} width="50" />
                                                        <h4 className="details"><b>Humidity: {humidity}%</b></h4>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-start">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={windD} width="50" />
                                                        <h4 className="details"><b>Wind Direction: {direction}</b></h4>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-end">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={windSpeed} width="50" />
                                                        <h4 className="details"><b>Wind Speed: {winSpeed} km</b></h4>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
            <Container fluid="xl" className="r1 my-5 d-lg-none">
                <Row className="my-4">
                    <Col xs={12} className="my-2 d-flex justify-content-center">
                        <Input type="text" name="place" id="examplePlace" placeholder="Enter Place Name" onChange={(e) => setPlace(e.target.value)} />
                    </Col>
                    <Col xs={12} className="my-2 d-flex justify-content-center">
                        <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={(e) => unitChange(e.target.value)}>
                            <option value="°C">Celsius</option>
                            <option value="°F">Fahrenheit</option>
                        </CustomInput>
                    </Col>
                </Row>
                <Row className="r r1 mx-sm-1 mx-md-2 py-4">
                    <Container fluid="x">
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={loc} width="100" />
                            </Col>
                            <Col xs={12} className="d-flex justify-content-center">
                                <h1><b>{place}</b></h1>
                            </Col>
                            <Col xs={12} className="my-3">
                                <h3><b>Temperature: {temp}{unit}</b></h3>
                            </Col>
                            <Col xs={12} className="my-3">
                                <h3><b>Feels Like: {feelsLikeTemp}{unit}</b></h3>
                            </Col>
                        </Row>
                        <Row className="py-4 px-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                {(type === 'Clear') ? <img src={clear} width="90" /> : (type === 'Overcast') ? <img src={overcast} width="90" /> : <img src={cloudy} width="90" />}
                            </Col>
                            <Col xs={12} className="weatherType d-flex justify-content-center">
                                {type}
                            </Col>
                            <Col xs={12} className="mt-2 minmax d-flex justify-content-center">
                                Max: {maxTemp}{unit}
                                <br />
                                Min: {minTemp}{unit}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {isOpen ? <Button onClick={toggle} style={{ marginBottom: '1rem' }}>Show Less</Button> : <Button onClick={toggle} style={{ marginBottom: '1rem' }}>Show More</Button>}
                                <Collapse isOpen={isOpen}>
                                    <Card>
                                        <CardBody>
                                            <Container>
                                                <Row>
                                                    <Col md={6} className="py-3 d-flex justify-content-start">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={vis} width="50" />
                                                        <h6 className="details"><b>Visibility: {visibilty} km</b></h6>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-end">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={hum} width="50" />
                                                        <h6 className="details"><b>Humidity: {humidity}%</b></h6>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-start">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={windD} width="50" />
                                                        <h6 className="details"><b>Wind Direction: {direction}</b></h6>
                                                    </Col>
                                                    <Col md={6} className="py-3 d-flex justify-content-end">
                                                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                                        <img src={windSpeed} width="50" />
                                                        <h6 className="details"><b>Wind Speed: {winSpeed} km</b></h6>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        </>
    );
};

export default Home;
