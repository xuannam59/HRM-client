import { Avatar, Button, Input, Popover, Space } from "antd";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

const HeaderComponent = () => {
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );

    return (<>
        <div className="row bg-white gx-0 align-items-center"
            style={{ height: "80px" }}>
            <div className="col text-center">
                <Input
                    style={{
                        borderRadius: "100px",
                        width: "70%"
                    }}
                    placeholder="Search..."
                    size="large"
                    prefix={<CiSearch className="text-muted" size={20} />} />
            </div>
            <div className="col text-end me-3">
                <Space>
                    <Button type="text" icon={<IoMdNotificationsOutline size={24} color="#5d6679" />} />
                    <Popover placement="bottomLeft" content={content} title="Title" trigger="click">
                        <Avatar src={"https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/343980741_923843125401975_6534951445972646588_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=OWZVWXVlAe4Q7kNvgGRvX6V&_nc_ht=scontent.fhan2-3.fna&_nc_gid=AKuDq57kiDqO-M9bwukoorW&oh=00_AYDvqIq2BCskAzdC5FVulP8rM-e-zgWWs5AcRqXaaPBLXQ&oe=66EF74A5"} size={40} style={{ cursor: "pointer" }} />
                    </Popover>

                </Space>
            </div>
        </div>
    </>);
}

export default HeaderComponent