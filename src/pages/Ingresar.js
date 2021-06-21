import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import { Form, Input, Button, Checkbox, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";

// Typography

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 14 }, // trabaja con 24 columnas
};

export const Ingresar = () => {

  // Para navegar a otra página
  const history = useHistory();

  const [usuario] = useState(getUsuarioStorage());


  useHideMenu(false);

  const onFinish = ({agente, escritorio }) => {

    localStorage.setItem('agente', agente);
    localStorage.setItem('escritorio', escritorio);

    console.log("Success:", agente);

    history.push('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Redirección para salirse

  if (usuario.agente && usuario.escritorio) {
      return <Redirect to="/escritorio" /> 
  }

  return (
    <>
      <Title level={ 2 } >Ingresar</Title>
      <Text>Ingrese su nombre y su número de escritorio</Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre del Agente"
          name="agente"
          rules={[{ required: true, message: "Porfavor ingrese su nombre!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[{ required: true, message: "Ingrese el numero de escritorio" }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
          >
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
