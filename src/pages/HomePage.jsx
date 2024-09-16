import { Button } from "antd";
import { useDispatch } from "react-redux";

const HomePage = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Button>Log out</Button>
        </>
    );
}

export default HomePage;