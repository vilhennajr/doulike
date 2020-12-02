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
      unit: '',
      name: '',
      date1: '',
      date2: '' 
    }],
    isView: false,
    records: [
      { entityId: '1', unit: 'UNIDADE 1', name: 'ALMOÇO', date1: '11:00', date2: '13:00', status: 'ATIVO' },
      { entityId: '2', unit: 'UNIDADE 1', name: 'CONTAGEM', date1: '11:00', date2: '13:00', status: 'INATIVO' },
      { entityId: '3', unit: 'UNIDADE 1', name: 'BALANÇA', date1: '11:00', date2: '13:00', status: 'ATIVO' },
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
      this.state.records.map((mealtype)=>(
         
        {
          key: mealtype.entityId,
          entityId: mealtype.entityId,
          unit: mealtype.unit,
          name: mealtype.name,
          date1: mealtype.date1,
          date2: mealtype.date2,
          status: mealtype.status
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
            
            <Breadcrumb.Item>Tipos de Refeições</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24} style={{position: 'absolute', marginTop: 50, zIndex: 2}}>
          <Button type="primary" icon={<PlusOutlined />} size='large' onClick={this.showModal} />
        </Col>
        
        <Col span={24}>
          <Table records={data} edit={this.handleEdit} view={this.handleView} db={'mealtypes'} />
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
                  <TextField id="unit" defaultValue={this.state.fields.unit} label="Unidade" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>


                <Col span={24}>
                  <TextField id="name" defaultValue={this.state.fields.name} label="Nome da Refeição" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="date1" defaultValue={this.state.fields.date1} label="Horário de Início" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                
                <Col span={12}>
                  <TextField id="date2" defaultValue={this.state.fields.date2} label="Horário de Término" variant="outlined" size="small"  disabled={this.state.isView} required fullWidth />
                </Col>

              </Row>
              
            </form>
          </Row>
          
        </Modal>

      </Row>
    );
  }
}