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
                            value={20}
                            formatter={formatter}
                        />

                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Nhân viên" bordered={false} >
                        <Statistic
                            title="Số nhân viên"
                            value={20}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8}>
                    <Card title="Người dùng" bordered={false} >
                        <Statistic
                            title="Số người dùng"
                            value={20}
                            formatter={formatter}
                        />
                    </Card>
                </Col>

            </Row>
        </>

    )
}

export default HomePage;