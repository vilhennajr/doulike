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
      company: '',
      name: '',
      fancyname: '',
      cnpj: '',
      phone: '',
      email: '',
      address: ''
    }],
    isView: false,
    records: [
      { entityId: '1', company: 'V V REFEICOES LTDA', name: 'UNIDADE 1', fancyname: 'UNIDADE 1', cnpj: '00.000.000/0000-00', phone: '(00) 00000-0000', email: 'email@email.com', address: 'Rua x, n X - Bairro X', status: 'INATIVO' },
      { entityId: '2', company: 'V V REFEICOES LTDA', name: 'UNIDADE 2', fancyname: 'UNIDADE 2', cnpj: '00.000.000/0000-00', phone: '(00) 00000-0000', email: 'email@email.com', address: 'Rua x, n X - Bairro X', status: 'ATIVO' },
      { entityId: '3', company: 'V V REFEICOES LTDA', name: 'UNIDADE 3', fancyname: 'UNIDADE 3', cnpj: '00.000.000/0000-00', phone: '(00) 00000-0000', email: 'email@email.com', address: 'Rua x, n X - Bairro X', status: 'INATIVO' },
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
      this.state.records.map((unit)=>(
         
        {
          key: unit.entityId,
          entityId: unit.entityId,
          company: unit.company,
          name: unit.name,
          fancyname: unit.fancyname,
          cnpj: unit.cnpj,
          phone: unit.phone,
          email: unit.email,
          address: unit.address,
          status: unit.status
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
            
            <Breadcrumb.Item>Unidades</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24} style={{position: 'absolute', marginTop: 50, zIndex: 2}}>
          <Button type="primary" icon={<PlusOutlined />} size='large' onClick={this.showModal} />
        </Col>
        
        <Col span={24}>
          <Table records={data} edit={this.handleEdit} view={this.handleView} db={'unit'} />
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
                  <TextField id="company" defaultValue={this.state.fields.company} label="Empresa" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="name" defaultValue={this.state.fields.name} label="Razão Social" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="fancyname" defaultValue={this.state.fields.fancyname} label="Nome Fantasia" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={24}>
                  <TextField id="cnpj" defaultValue={this.state.fields.cnpj} label="Cnpj" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="phone" defaultValue={this.state.fields.phone} label="Telefone" variant="outlined" size="small"  disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="email" defaultValue={this.state.fields.email} label="E-mail" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={24}>
                  <TextField id="address" defaultValue={this.state.fields.address} label="Endereço" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>
              </Row>
              
            </form>
          </Row>
          
        </Modal>

      </Row>
    );
  }
}