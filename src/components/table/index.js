import React from 'react';

import { Table, Input, Button, Space, Tag, Modal, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, EyeOutlined, ShareAltOutlined, CopyOutlined} from '@ant-design/icons';
import SignalTag from '../signalTag';

const { Text, Link } = Typography;

/* const data = [
  {
    key: '1',
    name: 'EMPRESA 1',
    cnpj: '00.000.000/0000-00',
    phone: '(00) 00000-0000',
    tags: ['ATIVO'],
  },
  {
    key: '2',
    name: 'EMPRESA 2',
    cnpj: '00.000.000/0000-00',
    phone: '(00) 00000-0000',
    tags: ['ATIVO'],
  },
  {
    key: '3',
    name: 'EMRPESA 3',
    cnpj: '00.000.000/0000-00',
    phone: '(00) 00000-0000',
    tags: ['ATIVO'],
  },
  {
    key: '4',
    name: 'EMPRESA 4',
    cnpj: '00.000.000/0000-00',
    phone: '(00) 00000-0000',
    tags: ['ATIVO'],
  },
]; */

const { confirm } = Modal;

function showDeleteConfirm() {
  confirm({
    title: 'CONFIRMAÇÃO DE AÇÃO',
    icon: <ExclamationCircleOutlined />,
    content: 'Tem certeza de que deseja excluir este registro?',
    okText: 'Sim',
    okType: 'danger',
    cancelText: 'Não',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default class ATable extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      data: [],
      searchText: '',
      searchedColumn: ''
    };
  }

  componentWillReceiveProps(props){

     //console.log(props);

  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  
  render() {

    const companyColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'NOME FANTASIA', dataIndex: 'name', ...this.getColumnSearchProps('name')},
      { title: 'CNPJ', dataIndex: 'cnpj', ...this.getColumnSearchProps('cnpj'),},
      { title: 'CONTATO', dataIndex: 'phone', ...this.getColumnSearchProps('phone')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
        render: partner =>
          <>
            <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
          </>
      },
      
      { title: 'AÇÕES', key: 'action',
        render: partner => 

          <>

            <Button type="primary" icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
            
          </>

      },
    
    ];

    const unitColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'EMPRESA', dataIndex: 'company', ...this.getColumnSearchProps('company')},
      { title: 'UNIDADE', dataIndex: 'name', ...this.getColumnSearchProps('name')},
      { title: 'CNPJ', dataIndex: 'cnpj', ...this.getColumnSearchProps('cnpj'),},
      { title: 'CONTATO', dataIndex: 'phone', ...this.getColumnSearchProps('phone')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
      render: partner =>
        <>
          <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
        </>
    },
    
    { title: 'AÇÕES', key: 'action',
      render: partner => 

        <>

          <Button type="primary" icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
          <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
          <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
          
        </>

    },
    
    ];

    const sensorTypeColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'NOME', dataIndex: 'name', ...this.getColumnSearchProps('name')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
        render: partner =>
          <>
            <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
          </>
      },
      
      { title: 'AÇÕES', key: 'action',
        render: partner => 

          <>

            <Button type="primary" icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
            
          </>

      },
    
    ];

    const mealTypeColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'UNIDADE', dataIndex: 'unit', ...this.getColumnSearchProps('unit')},
      { title: 'NOME', dataIndex: 'name', ...this.getColumnSearchProps('name')},
      { title: 'INÍCIO', dataIndex: 'date1', ...this.getColumnSearchProps('date1')},
      { title: 'TÉRMINO', dataIndex: 'date2', ...this.getColumnSearchProps('date2')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
        render: partner =>
          <>
            <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
          </>
      },
      
      { title: 'AÇÕES', key: 'action',
        render: partner => 

          <>

            <Button type="primary" icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
            
          </>

      },
    
    ];

    const sensorColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'SIGNAL', dataIndex: 'signal', ...this.getColumnSearchProps('signal'),
        render: partner =>
          <>
            <SignalTag value={partner}></SignalTag>
          </>
      },
      { title: 'NOME', dataIndex: 'name', ...this.getColumnSearchProps('name'),},
      { title: 'TIPO', dataIndex: 'type_sensor', ...this.getColumnSearchProps('type_sensor')},
      { title: 'UNIDADE', dataIndex: 'unit', ...this.getColumnSearchProps('unit')},
      { title: 'END. MAC', dataIndex: 'mac', ...this.getColumnSearchProps('mac')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
        render: partner =>
          <>
            <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
          </>
      },
      
      { title: 'AÇÕES', key: 'action',
        render: partner => 

          <>

            <Button type="primary" icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
            
          </>

      },
    
    ];

    const surveyColumns = [
      
      { title: 'ID', dataIndex: 'entityId', ...this.getColumnSearchProps('entityId')},
      { title: 'UNIDADE', dataIndex: 'unit', ...this.getColumnSearchProps('unit')},
      { title: 'TÍTULO', dataIndex: 'title', ...this.getColumnSearchProps('title')},
      { title: 'INÍCIO', dataIndex: 'date1', ...this.getColumnSearchProps('date1')},
      { title: 'TÉRMINO', dataIndex: 'date2', ...this.getColumnSearchProps('date2')},
      { title: 'STATUS', dataIndex: 'status', ...this.getColumnSearchProps('status'),
        render: partner =>
          <>
            <Tag color={partner=='ATIVO'?'green':'red'}  style={{width:80}}>{partner}</Tag>
          </>
      },
      
      { title: 'AÇÕES', key: 'action',
        render: partner => 

          <>
            <Button type="primary" icon={<ShareAltOutlined />} size='large' />
            <Button type="primary" style={{marginLeft: 5}} icon={<CopyOutlined />} size='large' />
            <Button type="primary" style={{marginLeft: 5}} icon={<EyeOutlined />} size='large' onClick={data => this.props.view(partner)} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={data => this.props.edit(partner)} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
            
          </>

      },
    
    ];

    /* 
    const columns = [
      {
        title: 'NOME',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'CNPJ',
        dataIndex: 'cnpj',
        key: 'cnpj',
        width: '20%',
        ...this.getColumnSearchProps('cnpj'),
      },
      {
        title: 'CONTATO',
        dataIndex: 'phone',
        key: 'phone',
        ...this.getColumnSearchProps('phone'),
      },

      {
        title: 'STATUS',
        key: 'action',
        render: (text, record) => (
          <>
            ATIVO
          </>
        ),
      },
       {
        title: 'STATUS',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
        
      }, 

      {
        title: 'AÇÕES',
        key: 'action',
        render: (text, record) => (
          <>
            <Button type="primary" icon={<EyeOutlined />} size='large' onClick={this.showModal} />
            <Button type="primary" style={{marginLeft: 5}} icon={<EditOutlined />} size='large' onClick={this.showModal} />
            <Button type="danger" style={{marginLeft: 5}} icon={<DeleteOutlined />} size='large' onClick={showDeleteConfirm} />
          </>
        ),
      },
      
    ]; 
    */

    const chosenColumns =  
    this.props.db == 'company' ? 
    companyColumns : 
    this.props.db == 'unit' ?
    unitColumns : 
    this.props.db == 'sensortype' ?
    sensorTypeColumns :
    this.props.db == 'mealtypes' ?
    mealTypeColumns :
    this.props.db == 'survey' ?
    surveyColumns :
    this.props.db == 'sensor' ?
    sensorColumns : null;
   
    return <Table columns={chosenColumns} dataSource={this.props.records[0]} pagination={{ position: ['topCenter'] }} />;
  }
}