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
  nameHelplinesUpdate,
  setNameHelplinesUpdate,
  titleHelplinesUpdate,
  setTitleHelplinesUpdate,
  phoneHelplinesUpdate,
  setPhoneHelplinesUpdate,
  typeHelplinesUpdate,
  setTypeHelplinesUpdate,
  helplinesActive,
  setHelplines,
  setModalVisibleUpdate,
}) => {
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    const resPutHelplines = await api.putHelplines(helplinesActive.id, {
      name: nameHelplinesUpdate,
      type: typeHelplinesUpdate,
      title: titleHelplinesUpdate,
      phone: phoneHelplinesUpdate,
    });
    if (resPutHelplines) {
      const resGetHelplines = await api.getHelplines(`page=1&limit=1000`);
      if (resGetHelplines) {
        setHelplines(resGetHelplines.data);
        setModalVisibleUpdate(false);
        setNameHelplinesUpdate("");
        setTitleHelplinesUpdate("");
        setPhoneHelplinesUpdate("");
        setTypeHelplinesUpdate("");
      }
    }
  };

  return (
    <Modal
      title="Update Helplines"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={cancel}
    >
      <Form.Item label="Name ">
        <Input
          placeholder="Name "
          value={nameHelplinesUpdate}
          onChange={(e) => setNameHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Title">
        <Input
          placeholder="Title"
          value={titleHelplinesUpdate}
          onChange={(e) => setTitleHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          placeholder="Phone"
          value={phoneHelplinesUpdate}
          onChange={(e) => setPhoneHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Type">
        <Select
          onChange={(e) => setTypeHelplinesUpdate(e)}
          defaultValue={typeHelplinesUpdate}
        >
          <Option value={"STAFF"}>STAFF</Option>
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
  nameHelplinesUpdate,
  setNameHelplinesUpdate,
  setHelplines,
  setModalVisibleAdd,
  titleHelplinesUpdate,
  setTitleHelplinesUpdate,
  phoneHelplinesUpdate,
  setPhoneHelplinesUpdate,
  typeHelplinesUpdate,
  setTypeHelplinesUpdate,
}) => {
  const onSubmit = async (values) => {
    const resPostHelplines = await api.postHelplines({
      name: nameHelplinesUpdate,
      type: typeHelplinesUpdate,
      title: titleHelplinesUpdate,
      phone: phoneHelplinesUpdate,
    });
    if (resPostHelplines) {
      setNameHelplinesUpdate("");
      setTitleHelplinesUpdate("");
      setPhoneHelplinesUpdate("");
      setTypeHelplinesUpdate("");
      const resGetHelplines = await api.getHelplines(`page=1&limit=1000`);
      if (resGetHelplines) {
        setHelplines(resGetHelplines.data);
        setModalVisibleAdd(false);
      }
    }
  };

  return (
    <Modal
      title="Add Helplines"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleAdd(false)}
    >
      <Form.Item label="Name ">
        <Input
          placeholder="Name "
          value={nameHelplinesUpdate}
          onChange={(e) => setNameHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Title">
        <Input
          placeholder="Title"
          value={titleHelplinesUpdate}
          onChange={(e) => setTitleHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Phone">
        <Input
          placeholder="Phone"
          value={phoneHelplinesUpdate}
          onChange={(e) => setPhoneHelplinesUpdate(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Type">
        <Select
          onChange={(e) => setTypeHelplinesUpdate(e)}
          defaultValue={typeHelplinesUpdate}
        >
          <Option value={""}>Select type</Option>
          <Option value={"STAFF"}>STAFF</Option>
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
  helplinesActive,
  setHelplines,
  setModalVisibleDelete,
}) => {
  const onSubmit = async (values) => {
    const resPostHelplines = await api.deleteHelplines(helplinesActive.id);
    if (resPostHelplines) {
      const resGetHelplines = await api.getHelplines(`page=1&limit=1000`);
      if (resGetHelplines) {
        setHelplines(resGetHelplines.data);
        setModalVisibleDelete(false);
      }
    }
  };

  return (
    <Modal
      title="Delete Helplines"
      visible={visible}
      footer={null}
      destroyOnClose={true}
      onCancel={() => setModalVisibleDelete(false)}
    >
      <p>Do you want to delete helplines {helplinesActive.name ?? ""}</p>
      <Form.Item className="text-right mb-0 mt-2">
        <Button type="primary" onClick={onSubmit}>
          Delete
        </Button>
      </Form.Item>
    </Modal>
  );
};

const Helplines = () => {
  let history = useHistory();
  const [list, setList] = useState(ProductListData);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [nameHelplinesUpdate, setNameHelplinesUpdate] = useState("");
  const [titleHelplinesUpdate, setTitleHelplinesUpdate] = useState("");
  const [phoneHelplinesUpdate, setPhoneHelplinesUpdate] = useState("");
  const [typeHelplinesUpdate, setTypeHelplinesUpdate] = useState("");

  const [helplinesActive, setHelplinesActive] = useState({});

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          setModalVisibleUpdate(true);
          setNameHelplinesUpdate(row.name);
          setPhoneHelplinesUpdate(row.phone);
          setTypeHelplinesUpdate(row.type);
          setTitleHelplinesUpdate(row.title);
          setHelplinesActive(row);
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
          setHelplinesActive(row);
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
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.name}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.type}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.phone}</p>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (_, record) => (
        <div className="d-flex">
          <p>{record.title}</p>
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

  const [helplines, setHelplines] = useState([]);

  React.useEffect(() => {
    const fecthData = async () => {
      const resGetHelplines = await api.getHelplines(`page=1&limit=1000`);
      if (resGetHelplines) {
        setHelplines(resGetHelplines.data);
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
            Add helplines
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={helplines}
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
        nameHelplinesUpdate={nameHelplinesUpdate}
        setNameHelplinesUpdate={(e) => setNameHelplinesUpdate(e)}
        titleHelplinesUpdate={titleHelplinesUpdate}
        setTitleHelplinesUpdate={(e) => setTitleHelplinesUpdate(e)}
        phoneHelplinesUpdate={phoneHelplinesUpdate}
        setPhoneHelplinesUpdate={(e) => setPhoneHelplinesUpdate(e)}
        typeHelplinesUpdate={typeHelplinesUpdate}
        setTypeHelplinesUpdate={(e) => setTypeHelplinesUpdate(e)}
        helplinesActive={helplinesActive}
        setHelplines={(e) => setHelplines(e)}
        setModalVisibleUpdate={(e) => setModalVisibleUpdate(e)}
      />
      <EventModalAdd
        visible={modalVisibleAdd}
        nameHelplinesUpdate={nameHelplinesUpdate}
        setNameHelplinesUpdate={(e) => setNameHelplinesUpdate(e)}
        titleHelplinesUpdate={titleHelplinesUpdate}
        setTitleHelplinesUpdate={(e) => setTitleHelplinesUpdate(e)}
        phoneHelplinesUpdate={phoneHelplinesUpdate}
        setPhoneHelplinesUpdate={(e) => setPhoneHelplinesUpdate(e)}
        typeHelplinesUpdate={typeHelplinesUpdate}
        setTypeHelplinesUpdate={(e) => setTypeHelplinesUpdate(e)}
        setHelplines={(e) => setHelplines(e)}
        setModalVisibleAdd={(e) => setModalVisibleAdd(e)}
      />
      <EventModalDelete
        visible={modalVisibleDelete}
        helplinesActive={helplinesActive}
        setHelplines={(e) => setHelplines(e)}
        setModalVisibleDelete={(e) => setModalVisibleDelete(e)}
      />
    </Card>
  );
};

export default Helplines;
