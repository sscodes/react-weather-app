/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { Col, Container, CustomInput, Form, FormGroup, Input, Row } from "reactstrap";
import loc from './placeholder.png';
import overcast from './clouds.png';
import cloudy from './sun.png';
import clear from './sunny.png';
import "./Style.css";

// TiWeatherCloudy

const Home = () => {

    const [place, setPlace] = useState('Kolkata');
    const [unit, setUnit] = useState('°C');
    const [temp, setTemp] = useState(23);
    const [maxTemp, setMaxTemp] = useState(25);
    const [minTemp, setMinTemp] = useState(15);
    const [type, setType] = useState()

    const unitChange = (value) => {
        if (unit === '°F') {
            setTemp(Math.round((5 / 9) * (temp - 32)));
            setMaxTemp(Math.round((5 / 9) * (maxTemp - 32)));
            setMinTemp(Math.round((5 / 9) * (minTemp - 32)));
        }
        else {
            setTemp(Math.round(((9 * temp) / 5) + 32));
            setMaxTemp(Math.round(((9 * maxTemp) / 5) + 32));
            setMinTemp(Math.round(((9 * minTemp) / 5) + 32));
        }
        setUnit(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b7f4df8ba6b30dcb40ebfbb1bab5b316`);
            console.log(res);
            if (unit === '°F') {
                setTemp(Math.round((9 / 5) * (res.data.main.temp - 273) + 32));
                setMaxTemp(Math.round((5 / 9) * (res.data.main.temp_max - 32)));
                setMinTemp(Math.round((5 / 9) * (res.data.main.temp_min - 32)));
            }
            else {
                setTemp(Math.round(res.data.main.temp - 273));
                setMaxTemp(Math.round((res.data.main.temp_max - 273)));
                setMinTemp(Math.round((res.data.main.temp_min - 273)));
            }
            if (res.data.clouds.all >= 75)
                setType('Overcast');
            else if (res.data.clouds.all >= 40)
                setType('Cloudy');
            else
                setType('Clear');
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [place])

    return (
        <>
            <Container className="my-4">
                <Row>
                    <Form className="my-5 d-flex justify-content-center">
                        <Col xs={12} md={7} className="d-flex justify-content-end">
                            <FormGroup>
                                <Input type="text" name="place" id="examplePlace" placeholder="Enter Place Name" onChange={(e) => setPlace(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={5} className="d-flex justify-content-start">
                            <FormGroup>
                                <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={(e) => unitChange(e.target.value)}>
                                    <option value="°C">Celsius</option>
                                    <option value="°F">Fahrenheit</option>
                                </CustomInput>
                            </FormGroup>
                        </Col>
                    </Form>
                </Row>
                <Row className="r mx-5 py-4">
                    <Container>
                        <Row>
                            <Col md={1} className="d-flex justify-content-start">
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <img src={loc} width="100" />
                            </Col>
                            <Col md={7} className="d-flex justify-content-start">
                                <h1><b>{place}</b></h1>
                            </Col>
                            <Col md={4} className="d-flex justify-content-end">
                                <h1><b>{temp}{unit}</b></h1>
                            </Col>
                        </Row>
                        <Row className="py-5">
                            <Col md={1} className="d-flex justify-content-start">
                                {(type === 'Clear') ? <img src={clear} width="90" /> : (type === 'Overcast') ? <img src={overcast} width="90" /> : <img src={cloudy} width="90" />}
                            </Col>
                            <Col md={7} className="weatherType d-flex justify-content-start">
                                {type}
                            </Col>
                            <Col md={4} className="minmax d-flex justify-content-end">
                                Max: {maxTemp}{unit}
                                <br />
                                Min: {minTemp}{unit}
                            </Col>
                        </Row>
                    </Container>
                </Row>

            </Container>
        </>
    );
};

export default Home;
