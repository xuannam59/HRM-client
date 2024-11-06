import { Button, Card, Col, notification, Row, Statistic } from "antd";
import Title from "antd/es/typography/Title";
import CountUp from 'react-countup';


const HomePage = () => {
    const formatter = (value) => {
        return (
            <CountUp end={Number(value)} separator="," />
        );
    };

    return (
        <>
            <div className="row m-3">
                <div className="col text-left">
                    <Title level={4}>Tổng quan</Title>
                </div>
            </div >
            <Row gutter={[20, 20]}>
                <Col span={24} md={8}>
                    <Card title="Đơn tuyển dụng" bordered={false} >
                        <Statistic
                            title="số người nộp"
                            value={200}
                            formatter={formatter}
                        />

                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Card title" bordered={false} >
                        <Statistic
                            title="Active Users"
                            value={250}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Card title" bordered={false} >
                        <Statistic
                            title="Active Users"
                            value={200}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

            </Row>
        </>

    )
}

export default HomePage;