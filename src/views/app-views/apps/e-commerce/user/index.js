import React, { useState } from "react";
import {
  Card,
  Table,
  Select,
  Input,
  Button,
  Badge,
  Menu,
  Modal,
  Form,
  Row,
  Col,
  TimePicker,
} from "antd";
import ProductListData from "assets/data/product-list.data.json";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import utils from "utils";
import api from "../../../../../api/index";

const { Option } = Select;

const EventModalUpdate = ({
  visible,
  addEvent,
  cancel,
  lnUserUpdate,
  setlnUserUpdate,
  emailUserUpdate,
  setAddressUserUpdate,
  phoneUserUpdate,
  setPhoneUserUpdate,
  addressUserUpdate,
  setRoleUserUpdate,
  userActive,
  setUser,
  setModalVisibleUpdate,
  setUserUpdate,
  fnUserUpdate,
  setfnUserUpdate,
  setEmailUserUpdate,
  roleUserUpdate,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutUser = await api.putUser(userActive.id, {
      role: roleUserUpdate,
      email: emailUserUpdate,
      phone: phoneUserUpdate,
      first_name: fnUserUpdate,
      last_name: lnUserUpdate,
      address: addressUserUpdate,
    });
    if (resPutUser) {
      const resGetUser = await api.getUser(`page=1&limit=1000`);
      if (resGetUser) {
        setUser(resGetUser.data);
        setModalVisibleUpdate(false);
        setlnUserUpdate("");
        setAddressUserUpdate("");
        setPhoneUserUpdate("");
        setRoleUserUpdate("");
        setfnUserUpdate("");
        setEmailUserUpdate("");
      }
    }
  };

  return (
    <Modal
      title="Update User"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={cancel}
    >
      <Form.Item label="L-Name">
        <Input
          placeholder="L-Name "
          value={lnUserUpdate}
          onChange={(e) => setUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="F-Name">
        <Input
          placeholder="F-Name "
          value={fnUserUpdate}
          onChange={(e) => setfnUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          placeholder="Email"
          value={emailUserUpdate}
          onChange={(e) => setEmailUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          placeholder="Phone"
          value={phoneUserUpdate}
          onChange={(e) => setPhoneUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Address">
        <Input
          placeholder="Address"
          value={addressUserUpdate}
          onChange={(e) => setAddressUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Role">
        <Select
          onChange={(e) => setRoleUserUpdate(e)}
          defaultValue={roleUserUpdate}
        >
          <Option value={"STUDENT"}>STUDENT</Option>
          <Option value={"PARENT"}>PARENT</Option>{" "}
          <Option value={"TEACHER"}>TEACHER</Option>
        </Select>
      </Form.Item>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Update
        </Button>
      </Form.Item>
    </Modal>
  );
};

const EventModalAdd = ({
  visible,
  lnUserUpdate,
  setlnUserUpdate,
  setUser,
  setModalVisibleAdd,
  emailUserUpdate,
  setAddressUserUpdate,
  phoneUserUpdate,
  setPhoneUserUpdate,
  addressUserUpdate,
  setRoleUserUpdate,
  setUserUpdate,
  fnUserUpdate,
  setfnUserUpdate,
  setEmailUserUpdate,
  roleUserUpdate,
}) => {
  const onSubmit = async (values) => {
    const resPostUser = await api.postUser({
      role: roleUserUpdate,
      email: emailUserUpdate,
      phone: phoneUserUpdate,
      first_name: fnUserUpdate,
      last_name: lnUserUpdate,
      address: addressUserUpdate,
    });
    if (resPostUser) {
      setlnUserUpdate("");
      setAddressUserUpdate("");
      setPhoneUserUpdate("");
      setRoleUserUpdate("");
      setfnUserUpdate("");
      setEmailUserUpdate("");
      const resGetUser = await api.getUser(`page=1&limit=1000`);
      if (resGetUser) {
        setUser(resGetUser.data);
        setModalVisibleAdd(false);
      }
    }
  };

  return (
    <Modal
      title="Add User"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleAdd(false)}
    >
      <Form.Item label="L-Name">
        <Input
          placeholder="L-Name "
          value={lnUserUpdate}
          onChange={(e) => setUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="F-Name">
        <Input
          placeholder="F-Name "
          value={fnUserUpdate}
          onChange={(e) => setfnUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          placeholder="Email"
          value={emailUserUpdate}
          onChange={(e) => setEmailUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          placeholder="Phone"
          value={phoneUserUpdate}
          onChange={(e) => setPhoneUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Address">
        <Input
          placeholder="Address"
          value={addressUserUpdate}
          onChange={(e) => setAddressUserUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Role">
        <Select
          onChange={(e) => setRoleUserUpdate(e)}
          defaultValue={roleUserUpdate}
        >
          <Option value={""}>Select type</Option>
          <Option value={"STUDENT"}>STUDENT</Option>
          <Option value={"PARENT"}>PARENT</Option>{" "}
          <Option value={"TEACHER"}>TEACHER</Option>
        </Select>
      </Form.Item>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Add
        </Button>
      </Form.Item>
    </Modal>
  );
};

const EventModalDelete = ({
  visible,
  userActive,
  setUser,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostUser = await api.deleteUser(userActive.id);
    if (resPostUser) {
      const resGetUser = await api.getUser(`page=1&limit=1000`);
      if (resGetUser) {
        setUser(resGetUser.data);
        setModalVisibleDelete(false);
      }
    }
  };

  return (
    <Modal
      title="Delete User"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleDelete(false)}
    >
      <p>Do you want to delete user {userActive.last_name ?? ""}</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const User = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [lnUserUpdate, setlnUserUpdate] = useState("");
  const [emailUserUpdate, setEmailUserUpdate] = useState("");
  const [phoneUserUpdate, setPhoneUserUpdate] = useState("");
  const [addressUserUpdate, setAddressUserUpdate] = useState("");
  const [fnUserUpdate, setFNUserUpdate] = useState("");
  const [roleUserUpdate, setRoleUserUpdate] = useState("");

  const [userActive, setUserActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setlnUserUpdate(row.last_name);
          setPhoneUserUpdate(row.phone);
          setAddressUserUpdate(row.address);
          setEmailUserUpdate(row.email);
          setFNUserUpdate(row.first_name);
          setRoleUserUpdate(row.role);
          setUserActive(row);
        }}
      >
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Update</span>
        </Flex>
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          setModalVisibleDelete(true);
          setUserActive(row);
        }}
      >
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/apps/ecommerce/add-product`);
  };

  const viewDetails = (row) => {
    history.push(`/app/apps/ecommerce/edit-product/${row.id}`);
  };

  const tableColumns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      render: (_, record) => (
        <div className="d-flex">
          <p>
            {record.first_name} {record.last_name}
          </p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "first_name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.email}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.phone}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "phone"),
    },
    {
      title: "Birth",
      dataIndex: "date_of_birth",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.date_of_birth}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "date_of_birth"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.address}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "address"),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.role}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "role"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : ProductListData;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
    setSelectedRowKeys([]);
  };

  const [user, setUser] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetUser = await api.getUser(``);
      if (resGetUser) {
        setUser(resGetUser.payload);
      }
    };
    fecthData();
  }, []);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);

  const onAddEvent = (values) => {
    setModalVisibleUpdate(false);
  };

  const onAddEventCancel = () => {
    setModalVisibleUpdate(false);
  };
  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <div>
          <Button
            onClick={() => setModalVisibleAdd(true)}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Add user
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={user}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
      <EventModalUpdate
        visible={modalVisibleUpdate}
        addEvent={onAddEvent}
        cancel={onAddEventCancel}
        lnUserUpdate={lnUserUpdate}
        setlnUserUpdate={(e) => setlnUserUpdate(e)}
        fnUserUpdate={fnUserUpdate}
        setFNUserUpdate={(e) => setFNUserUpdate(e)}
        roleUserUpdate={roleUserUpdate}
        setRoleUserUpdate={(e) => setRoleUserUpdate(e)}
        emailUserUpdate={emailUserUpdate}
        setAddressUserUpdate={(e) => setAddressUserUpdate(e)}
        phoneUserUpdate={phoneUserUpdate}
        setPhoneUserUpdate={(e) => setPhoneUserUpdate(e)}
        addressUserUpdate={addressUserUpdate}
        setEmailUserUpdate={(e) => setEmailUserUpdate(e)}
        userActive={userActive}
        setUser={(e) => setUser(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        lnUserUpdate={lnUserUpdate}
        setlnUserUpdate={(e) => setlnUserUpdate(e)}
        fnUserUpdate={fnUserUpdate}
        setFNUserUpdate={(e) => setFNUserUpdate(e)}
        roleUserUpdate={roleUserUpdate}
        setRoleUserUpdate={(e) => setRoleUserUpdate(e)}
        emailUserUpdate={emailUserUpdate}
        setAddressUserUpdate={(e) => setAddressUserUpdate(e)}
        phoneUserUpdate={phoneUserUpdate}
        setPhoneUserUpdate={(e) => setPhoneUserUpdate(e)}
        addressUserUpdate={addressUserUpdate}
        setEmailUserUpdate={(e) => setEmailUserUpdate(e)}
        setUser={(e) => setUser(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        userActive={userActive}
        setUser={(e) => setUser(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
    </Card>
  );
};

export default User;
