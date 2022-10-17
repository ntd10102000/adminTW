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

const EventModalUpdate = ({
  visible,
  addEvent,
  cancel,
  nameSubjectUpdate,
  setNameSubjectUpdate,
  subjectActive,
  setSubject,
  setModalVisibleUpdate,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutSubject = await api.putSubject(subjectActive.id, {
      name: nameSubjectUpdate,
    });
    if (resPutSubject) {
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
        setModalVisibleUpdate(false);
        setNameSubjectUpdate("");
      }
    }
  };

  return (
    <Modal
      title="Update Subject"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={cancel}
    >
      <Form.Item label="Name Subject">
        <Input
          placeholder="Name Subject"
          value={nameSubjectUpdate}
          onChange={(e) => setNameSubjectUpdate(e.target.value)}
        />
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
  nameSubjectUpdate,
  setNameSubjectUpdate,
  setSubject,
  setModalVisibleAdd,
}) => {
  const onSubmit = async (values) => {
    const resPostSubject = await api.postSubject({
      name: nameSubjectUpdate,
    });
    if (resPostSubject) {
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
        setModalVisibleAdd(false);
      }
    }
  };

  return (
    <Modal
      title="Add Subject"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleAdd(false)}
    >
      <Form.Item label="Name Subject">
        <Input
          placeholder="Name Subject"
          value={nameSubjectUpdate}
          onChange={(e) => setNameSubjectUpdate(e.target.value)}
        />
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
  subjectActive,
  setSubject,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostSubject = await api.deleteSubject(subjectActive.id);
    if (resPostSubject) {
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
        setModalVisibleDelete(false);
      }
    }
  };

  return (
    <Modal
      title="Delete Subject"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleDelete(false)}
    >
      <p>Do you want to delete subject {subjectActive.name ?? ""}</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const Feedbacks = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nameSubjectUpdate, setNameSubjectUpdate] = useState("");
  const [subjectActive, setSubjectActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setNameSubjectUpdate(row.name);
          setSubjectActive(row);
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
          setSubjectActive(row);
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
      title: "Name Subject",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.name}</p>
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

  const [classTeacherSubject, setClassTeacherSubject] = useState([]);
  const [subject, setSubject] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetClassTeacherSubject = await api.getClassTeacherSubject(
        `page=1&limit=1000`
      );
      if (resGetClassTeacherSubject) {
        setClassTeacherSubject(resGetClassTeacherSubject.data);
      }
      const resGetSubject = await api.getSubject(`page=1&limit=1000`);
      if (resGetSubject) {
        setSubject(resGetSubject.data);
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
            Add subject
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={subject}
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
        nameSubjectUpdate={nameSubjectUpdate}
        setNameSubjectUpdate={(e) => setNameSubjectUpdate(e)}
        subjectActive={subjectActive}
        setSubject={(e) => setSubject(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        nameSubjectUpdate={nameSubjectUpdate}
        setNameSubjectUpdate={(e) => setNameSubjectUpdate(e)}
        setSubject={(e) => setSubject(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        subjectActive={subjectActive}
        setSubject={(e) => setSubject(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
    </Card>
  );
};

export default Feedbacks;
