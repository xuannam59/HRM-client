import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Affix, Layout } from "antd";
import { HeaderComponent, SiderComponent } from "../components";
import {
    HomePage, EmployeePage, ErrorPage,
    PositionPage, LevelPage, SpecializePage,
    DepartmentPage, EmployeeDetail, DepartmentDetail,
    ResetPasswordPage, PersonalInfoPage, ApplicationPage,
    SchedulePage,
    CollaboratePage,
    UserPage,
    FosteringPage,
    RewardDisciplinePage,
    SalaryPage
} from "../pages";

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
                                <Route path="/user" element={<UserPage />} />
                                <Route path="/employee/detail/:id" element={<EmployeeDetail />} />
                                <Route path="/position" element={<PositionPage />} />
                                <Route path="/level" element={<LevelPage />} />
                                <Route path="/specialize" element={<SpecializePage />} />
                                <Route path="/department" element={<DepartmentPage />} />
                                <Route path="/department/detail/:id" element={<DepartmentDetail />} />
                                <Route path="/personal-info" element={<PersonalInfoPage />} />
                                <Route path="/reset-password" element={<ResetPasswordPage />} />
                                <Route path="/application" element={<ApplicationPage />} />
                                <Route path="/schedule" element={<SchedulePage />} />
                                <Route path="/collaborate" element={<CollaboratePage />} />
                                <Route path="/fostering" element={<FosteringPage />} />
                                <Route path="/reward-discipline" element={<RewardDisciplinePage />} />
                                <Route path="/salary" element={<SalaryPage />} />


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