import React from 'react';

import { Modal, Button, Row, Col, Breadcrumb, Steps } from 'antd';

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
      fancyname: '',
      cnpj: '',
      phone: '',
      email: '',
      address: ''
    }],
    isView: false,
    records: [
      { entityId: '1', unit: 'UNIDADE 1', title: 'PESQUISA 1', date1: '02/12/2020', date2: '02/12/2020', hour1: '13:00', hour2: '16:00', status: 'ATIVO' },
      { entityId: '2', unit: 'UNIDADE 1', title: 'PESQUISA 2', date1: '04/12/2020', date2: '10/12/2020', hour1: '10:00', hour2: '11:00', status: 'ATIVO' },
      { entityId: '3', unit: 'UNIDADE 1', title: 'PESQUISA 3', date1: '02/12/2020', date2: '02/12/2020', hour1: '14:00', hour2: '14:30', status: 'ATIVO' },
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

    const { Step } = Steps;

    const { visible, loading } = this.state;
    
    const data = [
      this.state.records.map((survey)=>(
         
        {
          key: survey.entityId,
          entityId: survey.entityId,
          unit: survey.unit,
          title: survey.title,
          date1: survey.date1,
          date2: survey.date2,
          hour1: survey.hour1,
          hour2: survey.hour2,
          status: survey.status
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
            
            <Breadcrumb.Item>Pesquisas</Breadcrumb.Item>
          </Breadcrumb>
        </Col>

        <Col span={24} style={{position: 'absolute', marginTop: 50, zIndex: 2}}>
          <Button type="primary" icon={<PlusOutlined />} size='large' onClick={this.showModal} />
        </Col>
        
        <Col span={24}>
          <Table records={data} edit={this.handleEdit} view={this.handleView} db={'survey'} />
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

            <Steps style={{padding: 20}}>
              <Step title="Etapa 1" description="Inf. da Pesquisa" />
              <Step title="Etapa 2" description="Boas-vindas!" />
              <Step title="Etapa 3" description="Perguntas" />
              <Step title="Etapa 4" description="Agradecimento" />
            </Steps>

            <form noValidate autoComplete="off">

              <Row gutter={[12, 12]}>

                <Col span={24}>
                  <TextField id="unit" defaultValue={this.state.fields.unit} label="Unidade" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={24}>
                  <TextField id="title" defaultValue={this.state.fields.title} label="Título" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="date1" defaultValue={this.state.fields.date1} label="Data de Início" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="date2" defaultValue={this.state.fields.date2} label="Data de Término" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="hour1" defaultValue={this.state.fields.hour1} label="Horário de Início" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>

                <Col span={12}>
                  <TextField id="hour2" defaultValue={this.state.fields.hour2} label="Horário de Término" variant="outlined" size="small" disabled={this.state.isView} required fullWidth />
                </Col>
                
              
              </Row>
              
            </form>
          </Row>
          
        </Modal>

      </Row>
    );
  }
}