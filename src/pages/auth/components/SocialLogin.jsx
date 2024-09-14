import { Button } from "antd";

const SocialLogin = () => {
    return (
        <>
            <Button
                icon={
                    <img
                        width={24}
                        height={24}
                        src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"
                    />
                }
                size="large"
                style={{ width: " 100%" }}
            >Google</Button>
        </>
    );
}

export default SocialLogin;