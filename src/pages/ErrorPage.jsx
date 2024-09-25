import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi, trang web này không tồn tại"
            extra={<Button type="primary" onClick={() => navigate("/dashboard")}>Back Home</Button>}
        />
    );
}

export default ErrorPage;