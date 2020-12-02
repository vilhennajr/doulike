import React from 'react';

import { Modal, Button, Row, Col, Breadcrumb } from 'antd';

import TextField from '@material-ui/core/TextField';

import {
  PlusOutlined,
  HomeOutlined
} from '@ant-design/icons';

import Table from '../../components/table';

export default class Company extends React.Component {
  
  state = {
    loading: false,
    visible: false,
    fields: [{
      name: '',
    }],
    isView: false,
    records: [
      { entityId: '1', name: 'TEMPERATURA', status: 'ATIVO' },
      { entityId: '2', name: 'CONTAGEM', status: 'INATIVO' },
      { entityId: '3', name: 'BALANÇA', status: 'ATIVO' },
    ]
  };

  modal = Modal.info;

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      isView: false,
      fields: [{
        name: '',
        type_sensor: '',
        unit: '',
        mac: ''
      }]
    });
  };

  handleEdit = (data) => {
    this.setState({
      visible: true,
      fields: data
    });
  }

  handleView = (data) => {
    this.setState({
      visible: true,
      fields: data,
      isView: true
    });
  }

  /*   
  async componentDidMount() {
        
  }
  */

  render() {

    const { visible, loading } = this.state;
    
    const data = [
      this.state.records.map((sensortype)=>(
         
        {
          key: sensortype.entityId,
          entityId: sensortype.entityId,
          name: sensortype.name,
          status: sensortype.status
        }

      ))
    ];

    return (

   

      <Row>
        
        <Col span={24} style={{marginBottom: 16}}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            
            <Breadcrumb.Item>Tipos de Sensores</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24} style={{position: 'absolute', marginTop: 50, zIndex: 2}}>
          <Button type="primary" icon={<PlusOutlined />} size='large' onClick={this.showModal} />
        </Col>
        
        <Col span={24}>
          <Table records={data} edit={this.handleEdit} view={this.handleView} db={'sensortype'} />
        </Col>

        <Modal
          visible={visible}
          title="Formulário"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={800}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Salvar
            </Button>,
          ]}
        >

          <Row>
            <form noValidate autoComplete="off">

              <Row gutter={[12, 12]}>

                <Col span={24}>
                  <TextField id="name" defaultValue={this.state.fields.name} label="Nome do Sensor" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

              </Row>
              
            </form>
          </Row>
          
        </Modal>

      </Row>
    );
  }
}