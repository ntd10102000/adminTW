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
  nameClassesUpdate,
  setNameClassesUpdate,
  classesActive,
  setClasses,
  setModalVisibleUpdate,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutClasses = await api.putClasses(classesActive.id, {
      name: nameClassesUpdate,
    });
    if (resPutClasses) {
      const resGetClasses = await api.getClasses(`page=1&limit=1000`);
      if (resGetClasses) {
        setClasses(resGetClasses.data);
        setModalVisibleUpdate(false);
        setNameClassesUpdate("");
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
      <Form.Item label="Name Classes">
        <Input
          placeholder="Name Classes"
          value={nameClassesUpdate}
          onChange={(e) => setNameClassesUpdate(e.target.value)}
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
  nameClassesUpdate,
  setNameClassesUpdate,
  setClasses,
  setModalVisibleAdd,
}) => {
  const onSubmit = async (values) => {
    const resPostClasses = await api.postClasses({
      name: nameClassesUpdate,
    });
    if (resPostClasses) {
      const resGetClasses = await api.getClasses(`page=1&limit=1000`);
      if (resGetClasses) {
        setClasses(resGetClasses.data);
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
      <Form.Item label="Name Classes">
        <Input
          placeholder="Name Classes"
          value={nameClassesUpdate}
          onChange={(e) => setNameClassesUpdate(e.target.value)}
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
  classesActive,
  setClasses,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostClasses = await api.deleteClasses(classesActive.id);
    if (resPostClasses) {
      const resGetClasses = await api.getClasses(`page=1&limit=1000`);
      if (resGetClasses) {
        setClasses(resGetClasses.data);
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
      <p>Do you want to delete classes {classesActive.name ?? ""}</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const Classes = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nameClassesUpdate, setNameClassesUpdate] = useState("");
  const [classesActive, setClassesActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setNameClassesUpdate(row.name);
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
      title: "Name Classes",
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

  const [classes, setClasses] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetClasses = await api.getClasses(`page=1&limit=1000`);
      if (resGetClasses) {
        setClasses(resGetClasses.data);
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
            Add classes
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={classes}
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
        nameClassesUpdate={nameClassesUpdate}
        setNameClassesUpdate={(e) => setNameClassesUpdate(e)}
        classesActive={classesActive}
        setClasses={(e) => setClasses(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        nameClassesUpdate={nameClassesUpdate}
        setNameClassesUpdate={(e) => setNameClassesUpdate(e)}
        setClasses={(e) => setClasses(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        classesActive={classesActive}
        setClasses={(e) => setClasses(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
    </Card>
  );
};

export default Classes;
