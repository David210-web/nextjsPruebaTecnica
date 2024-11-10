"use client"
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react-dom/client";
import TitleComponent from "./titleComponent";
import { Form, Button, Input, InputNumber, Space, Typography, message } from "antd";
import { DeleteOutlined, PlusOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from "next/link";
import { useOrder } from "../context/OrderContext";
import Header from "./header";
import Imagen from "../../public/Logo.svg";

const AgregarPaquete = () => {
    const [form] = Form.useForm();
    const [paquetes, setPaquetes] = useState([]);
    const { orders } = useOrder()

    useEffect(() => {
        if (paquetes.length > 0) {
            enviarPaquetes();
        }
    }, paquetes);


    const agregarPaquete = (values) => {
        // Convertir todos los valores numéricos a enteros
        const paquete = {
            ...values,
            peso: Math.floor(values.peso),
            largo: Math.floor(values.largo),
            alto: Math.floor(values.alto),
            ancho: Math.floor(values.ancho),
        };

        setPaquetes([...paquetes, { ...paquete, id: Date.now() }]);
        form.resetFields();
    };


    const eliminarPaquete = (id) => {
        setPaquetes(paquetes.filter((paquete) => paquete.id !== id));
    };

    const actualizarPaquete = (id, field, value) => {
        setPaquetes(paquetes.map((paquete) =>
            paquete.id === id ? { ...paquete, [field]: value } : paquete
        ));
    };

    const enviarPaquetes = async () => {
        const ordenData = form.getFieldsValue(); // Obtener los datos del formulario de la orden

        // Agregar los paquetes a los datos de la orden
        const requestData = {
            direccion: orders.collectionAdress,
            fecha: orders.scheduledDate.$D + "-" + orders.scheduledDate.$M + "-" + orders.scheduledDate.$y,
            nombre: orders.firstName,
            apellidos: orders.lastname,
            correo: orders.email,
            telefono: orders.municipality,
            direccionDestino: orders.destinationAddress,
            departamento: orders.department,
            municipio: orders.municipality,
            puntoReferencia: orders.referencePoint,
            indicaciones: orders.instructions,
            paquetes: [paquetes.map(paquete => ({
                peso: paquete.peso,
                contenido: paquete.descripcion,
                largo: paquete.largo,
                alto: paquete.alto,
                ancho: paquete.ancho,
                unidad: "cm"
            }))]
        };

        console.log(requestData);

        try {
            message.loading('Enviando paquete...', 0);
            const response = await fetch('http://localhost:3000/api/orders', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Error al enviar la orden: ${response.status}`);
            }

            message.success('Orden enviada exitosamente');
            setPaquetes([]); // Limpiar los paquetes
            form.resetFields(); // Limpiar el formulario de la orden
        } catch (error) {
            console.error(error);
            message.error("Hubo un error al enviar la orden");
        }
    };



    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <Header Imagen={Imagen}/>
            <div className="max-w-4xl my-3 mx-auto p-6 bg-white rounded-lg shadow">
                <TitleComponent />
                <section className="bg-inherit">
                    <p className="text-gray-500">Agrega tus bultos</p>
                    <Form
                        form={form}
                        onFinish={agregarPaquete}
                        layout="vertical"
                        className="grid grid-cols-1 md:grid-cols-6 gap-4"
                    >
                        <Form.Item
                            label="Largo"
                            name="largo"
                            rules={[{ required: true, message: 'Por favor ingrese el largo' }]}
                        >
                            <Space>
                                <InputNumber min={1} />
                                <Typography.Text type="secondary">cm</Typography.Text>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label="Alto"
                            name="alto"
                            rules={[{ required: true, message: 'Por favor ingrese el alto' }]}
                        >
                            <Space>
                                <InputNumber min={1} />
                                <Typography.Text type="secondary">cm</Typography.Text>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label="Ancho"
                            name="ancho"
                            rules={[{ required: true, message: 'Por favor ingrese el ancho' }]}
                        >
                            <Space>
                                <InputNumber min={1} />
                                <Typography.Text type="secondary">cm</Typography.Text>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label="Peso en libras"
                            name="peso"
                            rules={[{ required: true, message: 'Por favor ingrese el peso' }]}
                        >
                            <Space>
                                <InputNumber min={1} />
                                <Typography.Text type="secondary">lb</Typography.Text>
                            </Space>
                        </Form.Item>
                        <Form.Item
                            label="Descripción"
                            name="descripcion"
                            rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
                            className="md:col-span-2"
                        >
                            <Input placeholder="Descripción del paquete" />
                        </Form.Item>
                        <Form.Item className="md:col-span-6">
                            <Button
                                type="dashed"
                                htmlType="submit"
                                icon={<PlusOutlined />}
                                style={{ borderColor: 'red', color: 'red' }}
                            >
                                Agregar
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
                <section className="mt-2">
                    <p className="text-gray-500">Paquetes agregados</p>
                    {paquetes.map((paquete, index) => (
                        <Form
                            key={index}
                            layout="vertical"
                            className="grid grid-cols-1 md:grid-cols-6 border border-dashed border-gray-500 px-4 py-1 rounded mb-2"
                        >
                            <Form.Item label="Largo">
                                <InputNumber
                                    min={1}
                                    value={paquete.largo}
                                    onChange={(value) => actualizarPaquete(paquete.id, 'largo', value)}
                                />
                            </Form.Item>
                            <Form.Item label="Alto">
                                <InputNumber
                                    min={1}
                                    value={paquete.alto}
                                    onChange={(value) => actualizarPaquete(paquete.id, 'alto', value)}
                                />
                            </Form.Item>
                            <Form.Item label="Ancho">
                                <InputNumber
                                    min={1}
                                    value={paquete.ancho}
                                    onChange={(value) => actualizarPaquete(paquete.id, 'ancho', value)}
                                />
                            </Form.Item>
                            <Form.Item label="Peso">
                                <InputNumber
                                    min={1}
                                    value={paquete.peso}
                                    onChange={(value) => actualizarPaquete(paquete.id, 'peso', value)}
                                />
                            </Form.Item>
                            <Form.Item label="Descripción" className="md:col-span-2">
                                <Input
                                    value={paquete.descripcion}
                                    onChange={(e) => actualizarPaquete(paquete.id, 'descripcion', e.target.value)}
                                />
                            </Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => eliminarPaquete(paquete.id)}
                                icon={<DeleteOutlined />}
                                style={{ borderColor: 'red', color: 'red' }}
                                className="mt-2"
                            >
                                Eliminar
                            </Button>
                        </Form>
                    ))}
                </section>
                <section className="mt-5 space-y-4 grid grid-cols-1 md:grid-cols-6">
                    <Link
                        href="/"
                        className="mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 flex items-center gap-x-2 md:col-span-2"
                    >
                        <ArrowLeftOutlined />
                        <span>Regresar</span>
                    </Link>

                    <Button onClick={()=> console.log(orders)}>Mostrar</Button>
                    <Button
                        onClick={enviarPaquetes}
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center gap-x-2 md:col-span-2 md:col-start-5"
                    >
                        <ArrowRightOutlined />
                        <span>Enviar</span>
                    </Button>
                </section>
            </div>
        </div>
    );
};

export default AgregarPaquete;
