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
  idSubjectUpdate,
  setIdSubjectUpdate,
  idUserUpdate,
  setIdUserUpdate,
  user,
  subject,
  classesActive,
  setTSC,
  setModalVisibleUpdate,
  idClassesUpdate,
  setIdClassesUpdate,
  classes,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutClasses = await api.putClasses(classesActive.id, {
      subject: idSubjectUpdate,
      teacher: idUserUpdate,
      my_class: idClassesUpdate,
    });
    if (resPutClasses) {
      const resGetClasses = await api.getTCS(`page=1&limit=1000`);
      if (resGetClasses) {
        setTSC(resGetClasses.data);
        setModalVisibleUpdate(false);
        setIdSubjectUpdate("");
        setIdUserUpdate("");
      }
    }
  };

  return (
    <Modal
      title="Update Classes"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={cancel}
    >
      <Form.Item label="Subject">
        <Select
          onChange={(e) => setIdSubjectUpdate(e)}
          defaultValue={idSubjectUpdate}
        >
          {subject.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Teacher">
        <Select
          onChange={(e) => setIdUserUpdate(e)}
          defaultValue={idUserUpdate}
        >
          {user.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.first_name} {v.last_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Class">
        <Select
          onChange={(e) => setIdClassesUpdate(e)}
          defaultValue={idClassesUpdate}
        >
          {classes.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.name}
            </Option>
          ))}
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
  idSubjectUpdate,
  setIdSubjectUpdate,
  setTSC,
  setModalVisibleAdd,
  idUserUpdate,
  setIdUserUpdate,
  idClassesUpdate,
  setIdClassesUpdate,
  subject,
  user,
  classes,
}) => {
  const onSubmit = async (values) => {
    const resPostClasses = await api.postClasses({
      subject: idSubjectUpdate,
      teacher: idUserUpdate,
      my_class: idClassesUpdate,
    });
    if (resPostClasses) {
      setIdSubjectUpdate("");
      setIdUserUpdate("");
      const resGetClasses = await api.getTCS(`page=1&limit=1000`);
      if (resGetClasses) {
        setTSC(resGetClasses.data);
        setModalVisibleAdd(false);
      }
    }
  };

  return (
    <Modal
      title="Add Classes"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleAdd(false)}
    >
      <Form.Item label="Subject">
        <Select
          onChange={(e) => setIdSubjectUpdate(e)}
          defaultValue={idSubjectUpdate}
        >
          <Option value={""}>Select subject</Option>
          {subject.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Teacher">
        <Select
          onChange={(e) => setIdUserUpdate(e)}
          defaultValue={idUserUpdate}
        >
          <Option value={""}>Select teacher</Option>
          {user.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.first_name} {v.last_name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Class">
        <Select
          onChange={(e) => setIdClassesUpdate(e)}
          defaultValue={idClassesUpdate}
        >
          <Option value={""}>Select class</Option>
          {classes.map((v, key) => (
            <Option key={key} value={v.id}>
              {v.name}
            </Option>
          ))}
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
  classesActive,
  setTSC,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostClasses = await api.deleteClasses(classesActive.id);
    if (resPostClasses) {
      const resGetClasses = await api.getTCS(`page=1&limit=1000`);
      if (resGetClasses) {
        setTSC(resGetClasses.data);
        setModalVisibleDelete(false);
      }
    }
  };

  return (
    <Modal
      title="Delete Classes"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleDelete(false)}
    >
      <p>Do you want to delete ?</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const EventModalUser = ({ visible, userActive, setModalVisibleUser }) => {
  return (
    <Modal
      title="Teacher"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleUser(false)}
    >
      <p>
        Name: {userActive.teacher__first_name} {userActive.teacher__last_name}
      </p>
      <p>Email: {userActive.teacher__email}</p>
      <p>Phone: {userActive.teacher__phone}</p>
      <p>Address: {userActive.teacher__address}</p>
    </Modal>
  );
};

const TeacherClassSubject = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [idSubjectUpdate, setIdSubjectUpdate] = useState("");
  const [idUserUpdate, setIdUserUpdate] = useState("");
  const [idClassesUpdate, setIdClassesUpdate] = useState("");
  const [phoneClassesUpdate, setPhoneClassesUpdate] = useState("");
  const [typeClassesUpdate, setTypeClassesUpdate] = useState("");
  const [user, setUser] = useState([]);
  const [subject, setSubject] = useState([]);

  const [classesActive, setClassesActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setIdSubjectUpdate(row.subject_id);
          setIdUserUpdate(row.teacher_id);
          setIdClassesUpdate(row.my_class_id);
          setClassesActive(row);
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
          setClassesActive(row);
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
      <Menu.Item
        onClick={() => {
          setModalVisibleUser(true);
          setUserActive({
            teacher_id: row.teacher_id,
            teacher__email: row.teacher__email,
            teacher__address: row.teacher__address,
            teacher__phone: row.teacher__phone,
            teacher__first_name: row.teacher__first_name,
            teacher__last_name: row.teacher__last_name,
          });
        }}
      >
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">Teacher</span>
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
      title: "Name subject",
      dataIndex: "subject__name",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.subject__name}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Class",
      dataIndex: "my_class__name",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.my_class__name}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
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

  const [classes, setClasses] = useState([]);
  const [tsc, setTSC] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetClasses = await api.getClasses(`page=1&limit=1000`);
      if (resGetClasses) {
        setClasses(resGetClasses.data);
      }
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
      }
      const resGetUser = await api.getUser(`role=teacher`);
      if (resGetUser) {
        setUser(resGetUser.payload);
      }
      const resGetTCS = await api.getTCS(`page=1&limit=1000`);
      if (resGetTCS) {
        setTSC(resGetTCS.data);
      }
    };
    fecthData();
  }, []);
  const [modalVisibleUpdate, setModalVisibleUpdate] = useState(false);
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [modalVisibleUser, setModalVisibleUser] = useState(false);
  const [userActive, setUserActive] = useState({});

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
            Add classes
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={tsc}
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
        idSubjectUpdate={idSubjectUpdate}
        setIdSubjectUpdate={(e) => setIdSubjectUpdate(e)}
        idUserUpdate={idUserUpdate}
        setIdUserUpdate={(e) => setIdUserUpdate(e)}
        phoneClassesUpdate={phoneClassesUpdate}
        setPhoneClassesUpdate={(e) => setPhoneClassesUpdate(e)}
        typeClassesUpdate={typeClassesUpdate}
        setTypeClassesUpdate={(e) => setTypeClassesUpdate(e)}
        classesActive={classesActive}
        setTSC={(e) => setTSC(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
        subject={subject}
        user={user}
        classes={classes}
        idClassesUpdate={idClassesUpdate}
        setIdClassesUpdate={(e) => setIdClassesUpdate(e)}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        idSubjectUpdate={idSubjectUpdate}
        setIdSubjectUpdate={(e) => setIdSubjectUpdate(e)}
        idUserUpdate={idUserUpdate}
        setIdUserUpdate={(e) => setIdUserUpdate(e)}
        phoneClassesUpdate={phoneClassesUpdate}
        setPhoneClassesUpdate={(e) => setPhoneClassesUpdate(e)}
        typeClassesUpdate={typeClassesUpdate}
        setTypeClassesUpdate={(e) => setTypeClassesUpdate(e)}
        setTSC={(e) => setTSC(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
        subject={subject}
        user={user}
        classes={classes}
        idClassesUpdate={idClassesUpdate}
        setIdClassesUpdate={(e) => setIdClassesUpdate(e)}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        classesActive={classesActive}
        setTSC={(e) => setTSC(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
      <EventModalUser
        visible={modalVisibleUser}
        userActive={userActive}
        setModalVisibleUser={(e) => setModalVisibleUser(e)}
      />
    </Card>
  );
};

export default TeacherClassSubject;
