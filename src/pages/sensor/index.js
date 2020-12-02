import React from 'react';

import { Modal, Button, Row, Col, Breadcrumb } from 'antd';

import TextField from '@material-ui/core/TextField';

import {
  PlusOutlined,
  HomeOutlined
} from '@ant-design/icons';

import Table from '../../components/table';

export default class Sensor extends React.Component {
  
  state = {
    loading: false,
    visible: false,
    fields: [{
      name: '',
      type_sensor: '',
      unit: '',
      mac: ''
    }],
    isView: false,
    records: [
      { entityId: '1', signal: 'ATIVO', name: 'CATRACA', type_sensor: 'CONTAGEM', unit: 'UNIDADE 1', mac: '00:E0:4C:02:F8:E6 ', status: 'ATIVO' },
      { entityId: '2', signal: 'INATIVO', name: 'FREEZER', type_sensor: 'TEMPERATURA', unit: 'UNIDADE 2', mac: '00:E0:4C:6B:75:87', status: 'INATIVO' },
      { entityId: '3', signal: 'EM ESPERA', name: 'COZINHA', type_sensor: 'BALANÇA', unit: 'UNIDADE 3', mac: '00:E0:4C:68:20:25 ', status: 'INATIVO' },
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
      this.state.records.map((sensor)=>(
         
        {
          key: sensor.entityId,
          entityId: sensor.entityId,
          signal: sensor.signal,
          name: sensor.name,
          type_sensor: sensor.type_sensor,
          unit: sensor.unit,
          mac: sensor.mac,
          status: sensor.status
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
            
            <Breadcrumb.Item>Sensores</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24} style={{position: 'absolute', marginTop: 50, zIndex: 2}}>
          <Button type="primary" icon={<PlusOutlined />} size='large' onClick={this.showModal} />
        </Col>
        
        <Col span={24}>
          <Table records={data} edit={this.handleEdit} view={this.handleView} db={'sensor'} />
        </Col>

        <Modal
          visible={visible}
          title="Cadastrar Sensor"
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
                <Col span={12}>
                  <TextField id="name" defaultValue={this.state.fields.name} label="Nome do Sensor" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="unit" defaultValue={this.state.fields.unit} label="Unidade" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="type_sensor" defaultValue={this.state.fields.type_sensor} label="Tipo de Sensor" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="mac" defaultValue={this.state.fields.mac} label="Endereço (MAC)" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>
              </Row>
              
            </form>
          </Row>
          
        </Modal>

      </Row>
    );
  }
}