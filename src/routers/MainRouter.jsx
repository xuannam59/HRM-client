import { useSelector } from "react-redux";
import { authSelector } from "../redux/reducers/authReducer";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Affix, Layout } from "antd";
import { HeaderComponent, SiderComponent } from "../components";
import { HomePage, EmployeePage, ErrorPage, PositionPage, LevelPage } from "../pages";
import EmployeeDetailComponent from "../components/EmployeeDetailComponent";

const { Header, Sider, Content, Footer } = Layout;

const MainRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <SiderComponent />
                    <Layout>
                        <HeaderComponent />
                        <Content className="mt-3 mb-3 container bg-white rounded-3">
                            <Routes>
                                <Route path="/login" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<HomePage />} />
                                <Route path="/employee" element={<EmployeePage />} />
                                <Route path="/employee/detail/:id" element={<EmployeeDetailComponent />} />
                                <Route path="/position" element={<PositionPage />} />
                                <Route path="/level" element={<LevelPage />} />
                                <Route path="*" element={<Navigate to="/404" />} />
                                <Route path="/404" element={<ErrorPage />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
            </BrowserRouter>
        </>
    );
}

export default MainRouter;