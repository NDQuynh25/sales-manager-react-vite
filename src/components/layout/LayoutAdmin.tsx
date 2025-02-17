import React, { useState, useEffect } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    ApiOutlined,
    UserOutlined,
    BankOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AliwangwangOutlined,
    BugOutlined,
    ScheduleOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { callLogout } from '../../api/authApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { isMobile } from 'react-device-detect';
import type { MenuProps } from 'antd';
import { setLogoutAction } from '../../redux/slices/authSlice';
// import { setLogoutAction } from '@/redux/slice/accountSlide';
// import { ALL_PERMISSIONS } from '@/config/permissions';
import { Footer } from 'antd/es/layout/layout';
import { HeartTwoTone } from '@ant-design/icons';



interface IProps {
    children: React.ReactNode
}



const { Content, Sider } = Layout;

const LayoutAdmin = (props: IProps) => {
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const user = useAppSelector(state => state.auth.user);

    const permissions = useAppSelector(state => state.auth.user.role.permissions);
    const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const ACL_ENABLE = import.meta.env.VITE_ACL_ENABLE;
        if (permissions?.length || ACL_ENABLE === 'false') {

            // const viewCompany = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.COMPANIES.GET_PAGINATE.method
            // )

            // const viewUser = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            // )

            // const viewJob = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.JOBS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.JOBS.GET_PAGINATE.method
            // )

            // const viewResume = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.RESUMES.GET_PAGINATE.method
            // )

            // const viewRole = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
            // )

            // const viewPermission = permissions?.find(item =>
            //     item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath
            //     && item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
            // )
            const viewUser = true;
            const viewRole = true;

            const full = [
                {
                    label: <Link to='/admin'><b>Dashboard</b>,</Link>,
                    key: '/admin',
                    icon: <AppstoreOutlined />
                },

                ...(viewUser || ACL_ENABLE === 'false' ? [{
                    label: <b>User Management</b>,
                    key: '/admin/user-management',
                    //icon: <img src='/project-manager.png' alt='Product Icon' style={{ width: '26px', height: '26px' }} />,
                    children: [
                        {   
                            
                            label: <Link to='/admin/user-management/users'>Users</Link>, // Quản lý tài khoản người dùng
                            key: '/admin/user-management/users',
                        },
                        {
                            label: <Link to='/admin/user-management/roles'>Roles</Link>, // Quản lý vai trò (Roles)
                            key: '/admin/user-management/roles',
                        },
                        {
                            label: <Link to='/admin/user-management/permissions'>Permissions</Link>, // Quản lý quyền hạn (Permissions)
                            key: '/admin/user-management/permissions',
                        },
                    ],
                }] : []),
               
                ...(viewRole || ACL_ENABLE === 'false' ? [{
                    label: <b>Product Management</b>,
                    key: '/admin/product-management',
                    //icon: <img src='/best-product.png' alt='Product Icon' style={{ width: '26px', height: '26px' }} />, // Icon hình ảnh,
                    children: [ 
                        {
                            label: <Link to='/admin/product-management/products'>Products </Link>, 
                            key: '/admin/product-management/products',
                        },
                        {
                            label: <Link to='/admin/product-managment/new-product'>Add Product</Link>, 
                            key: '/admin/product-managemnt/new-product',
                        },
                        {
                            label: <Link to='/admin/product-management/category'>Categories</Link>, 
                            key: '/admin/product-managemnt/category',
                        },
                    ],
                }] : []),
            
            ];

            setMenuItems(full);
        }
    }, [permissions])
    useEffect(() => {
        setActiveMenu(location.pathname)
    }, [location])

    const handleLogout = async () => {
        const res = await callLogout();
        console.log('res', res);
        if (res && +res.status === 200) {
            console.log('logout success');
            await dispatch(setLogoutAction({}));
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    // if (isMobile) {
    //     items.push({
    //         label: <label
    //             style={{ cursor: 'pointer' }}
    //             onClick={() => handleLogout()}
    //         >Đăng xuất</label>,
    //         key: 'logout',
    //         icon: <LogoutOutlined />
    //     })
    // }

    const itemsDropdown = [
        {
            label: <Link to={'/'}>Trang chủ</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
    ];

    return (
        <>
            <Layout
                style={{ maxHeight: '100vh' }}
                className="layout-admin"
            >
                {!isMobile ?
                    <Sider
                        style={{ height: '100vh', position: 'sticky', top: 0, left: 0 }}
                        theme='light'
                        width={220}
                        collapsible
                        collapsed={collapsed}
                        onCollapse={(value) => setCollapsed(value)}>
                        <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                            <BugOutlined />  ADMIN
                        </div>
                        <Menu
                            selectedKeys={[activeMenu]}
                            mode="inline"
                            items={menuItems}
                            onClick={(e) => setActiveMenu(e.key)}
                        />
                    </Sider>
                    :
                    <Menu
                    
                        selectedKeys={[activeMenu]}
                        items={menuItems}
                        onClick={(e) => setActiveMenu(e.key)}
                        mode="horizontal"
                    />
                }

                <Layout>
                    {!isMobile &&
                        <div className='admin-header' style={{ display: "flex", justifyContent: "space-between",  height: 64, width: "100%" ,alignItems: 'center', backgroundColor: 'white', marginBottom: 0, paddingRight: "25px" }}>
                            <Button
                                type="text"
                                icon={collapsed ? React.createElement(MenuUnfoldOutlined) : React.createElement(MenuFoldOutlined)}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <Space style={{ cursor: "pointer" }}>
                                    Welcome {user?.fullname}
                                    <Avatar src={user?.avatar}/>
                                </Space>
                            </Dropdown>
                        </div>
                    }
                    <Content style={{ padding: '0px' }}>
                        {props.children}
                        
                        
                    </Content>
                    {/* <Footer style={{ padding: 10, textAlign: 'center' }}>
                        React Typescript series Nest.JS &copy; HAHAHA - Made with <HeartTwoTone />
                    </Footer> */}
                </Layout>
            </Layout>

        </>
    );
};

export default LayoutAdmin;