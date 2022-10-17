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
  revisionActive,
  setRevision,
  setModalVisibleUpdate,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutRevision = await api.putRevision(revisionActive.id, {
      subject: idSubjectUpdate,
      teacher: idUserUpdate,
    });
    if (resPutRevision) {
      const resGetRevision = await api.getRevision(`page=1&limit=1000`);
      if (resGetRevision) {
        setRevision(resGetRevision.data);
        setModalVisibleUpdate(false);
        setIdSubjectUpdate("");
        setIdUserUpdate("");
      }
    }
  };

  return (
    <Modal
      title="Update Revision"
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
  setRevision,
  setModalVisibleAdd,
  idUserUpdate,
  setIdUserUpdate,
  subject,
  user,
}) => {
  const onSubmit = async (values) => {
    const resPostRevision = await api.postRevision({
      time_start: null,
      time_end: null,
      status: true,
      subject: idSubjectUpdate,
      teacher: idUserUpdate,
    });
    if (resPostRevision) {
      setIdSubjectUpdate("");
      setIdUserUpdate("");
      const resGetRevision = await api.getRevision(`page=1&limit=1000`);
      if (resGetRevision) {
        setRevision(resGetRevision.data);
        setModalVisibleAdd(false);
      }
    }
  };

  return (
    <Modal
      title="Add Revision"
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
  revisionActive,
  setRevision,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostRevision = await api.deleteRevision(revisionActive.id);
    if (resPostRevision) {
      const resGetRevision = await api.getRevision(`page=1&limit=1000`);
      if (resGetRevision) {
        setRevision(resGetRevision.data);
        setModalVisibleDelete(false);
      }
    }
  };

  return (
    <Modal
      title="Delete Revision"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleDelete(false)}
    >
      <p>Do you want to delete revision {revisionActive.name ?? ""}</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const Revision = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [idSubjectUpdate, setIdSubjectUpdate] = useState("");
  const [idUserUpdate, setIdUserUpdate] = useState("");
  const [phoneRevisionUpdate, setPhoneRevisionUpdate] = useState("");
  const [typeRevisionUpdate, setTypeRevisionUpdate] = useState("");
  const [user, setUser] = useState([]);
  const [subject, setSubject] = useState([]);

  const [revisionActive, setRevisionActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setIdSubjectUpdate(row.subject_id);
          setIdUserUpdate(row.teacher_id);
          setRevisionActive(row);
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
          setRevisionActive(row);
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
      title: "Name subject",
      dataIndex: "subject_name",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.subject_name}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "teacher",
      dataIndex: "teacher_last_name",
      render: (_, record) => (
        <div className="d-flex">
          <p>
            {record.teacher_first_name} {record.teacher_last_name}
          </p>
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

  const [revision, setRevision] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetRevision = await api.getRevision(`page=1&limit=1000`);
      if (resGetRevision) {
        setRevision(resGetRevision.data);
      }
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
      }
      const resGetUser = await api.getUser(`role=teacher`);
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
            Add revision
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={revision}
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
        phoneRevisionUpdate={phoneRevisionUpdate}
        setPhoneRevisionUpdate={(e) => setPhoneRevisionUpdate(e)}
        typeRevisionUpdate={typeRevisionUpdate}
        setTypeRevisionUpdate={(e) => setTypeRevisionUpdate(e)}
        revisionActive={revisionActive}
        setRevision={(e) => setRevision(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
        subject={subject}
        user={user}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        idSubjectUpdate={idSubjectUpdate}
        setIdSubjectUpdate={(e) => setIdSubjectUpdate(e)}
        idUserUpdate={idUserUpdate}
        setIdUserUpdate={(e) => setIdUserUpdate(e)}
        phoneRevisionUpdate={phoneRevisionUpdate}
        setPhoneRevisionUpdate={(e) => setPhoneRevisionUpdate(e)}
        typeRevisionUpdate={typeRevisionUpdate}
        setTypeRevisionUpdate={(e) => setTypeRevisionUpdate(e)}
        setRevision={(e) => setRevision(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
        subject={subject}
        user={user}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        revisionActive={revisionActive}
        setRevision={(e) => setRevision(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
    </Card>
  );
};

export default Revision;
