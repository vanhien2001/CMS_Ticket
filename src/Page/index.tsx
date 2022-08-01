import { Layout } from "antd";
import clsx from "clsx";
import SideBar from "../Layout/Sidebar";
import HeaderContent from "../Layout/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./Dashboard";
import ChangeTicket from "./Ticket/Change";
import ManageTicket from "./Ticket/Manage";
import Setting from "./Setting";

const { Sider, Content, Header } = Layout;

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <Layout style={{ height: "100%" }}>
                <Sider
                    width={250}
                    style={{
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                >
                    <SideBar />
                </Sider>
                <Layout style={{ marginLeft: 250 }}>
                    <Header
                        style={{
                            height: "88px",
                            padding: "0",
                            backgroundColor: "transparent",
                        }}
                    >
                        <HeaderContent />
                    </Header>
                    <Content>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/manage-ticket" element={<ManageTicket />} />
                            <Route path="/change-ticket/*" element={<ChangeTicket />} />
                            <Route path="/setting/*" element={<Setting />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
