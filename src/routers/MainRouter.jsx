import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "antd";
import { HeaderComponent, SiderComponent } from "../components";
import { ClassPage, HomePage, StudentPage, TeacherPage } from "../pages";

const { Header, Sider, Content, Footer } = Layout;

const MainRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <SiderComponent />
                    <Layout>
                        <HeaderComponent />
                        <Content >
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/teacher" element={<TeacherPage />} />
                                <Route path="/student" element={<StudentPage />} />
                                <Route path="/class" element={<ClassPage />} />
                            </Routes>
                        </Content>
                        <Footer />
                    </Layout>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default MainRouter;