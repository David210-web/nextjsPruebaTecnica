"use client"
import { useCallback, useState } from "react";
import { Form, Input, Select, DatePicker, Button, Space } from 'antd';
import { useRouter } from "next/navigation"; // Asegúrate de importar useRouter
import TitleComponent from "./titleComponent";
import { useOrder } from "../context/OrderContext";
import Imagen from "../../public/Logo.svg";
import Image from "next/image";
import Header from "./header";

export default function OrderForm() {
    const [form] = Form.useForm();
    const { Option } = Select;
    const router = useRouter(); // Aquí obtenemos el router
    const [orders, setOrders] = useState([]);
    const { addOrder } = useOrder()



    const onFinish = useCallback((values) => {
        addOrder(values);
        router.push('/paquetes'); // Redirigir después de enviar el formulario
    },[addOrder,router])

    return (
        <>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <Header Imagen={Imagen} />
                <div className="max-w-3xl my-3 mx-auto p-6 bg-white rounded-lg shadow">
                    <TitleComponent />
                    {/* <h1 className="text-2xl font-semibold mb-2">Crea una orden</h1>
                <p className="text-gray-600 mb-8">
                    Dale una ventaja competitiva a tu negocio con entregas el mismo día (Área Metropolitana) y el día siguiente a nivel nacional.
                </p> */}
                    <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                                label={<span className="flex items-center gap-1">📍 Dirección de recolección</span>}
                                name="collectionAdress"
                                rules={[{ required: true, message: 'Por favor ingrese la direccion de recoleccion' }]}
                            >
                                <Input placeholder="Colonia Las Magnolias Calle ruta militar #1, San Miguel, San Miguel." />
                            </Form.Item>

                            <Form.Item label={<span className="flex items-center gap-1">📅 Fecha Programada</span>} name="scheduledDate" rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}>
                                <DatePicker className="w-full" format={'DD/MM/YYYY'} />
                            </Form.Item>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Form.Item label="Nombres" name="firstName" rules={[{ required: true, message: 'Por favor ingrese los nombres' }]}>
                                <Input placeholder="Odalys Abigail" />
                            </Form.Item>
                            <Form.Item label="Apellidos" name="lastname" rules={[{ required: true, message: 'Por favor ingrese los apellidos' }]}>
                                <Input placeholder="Larios Peña" />
                            </Form.Item>
                            <Form.Item label="Correo electronico" name="email" rules={[{ required: true, message: 'Por favor ingrese el correo electronico' }, { type: 'email', message: 'Por favor ingrese un correo electronico' }]}>
                                <Input placeholder="odalysLarios@gmail.com" />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Teléfono */}
                            <Form.Item
                                label="Teléfono"
                                name="phone"
                                rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
                            >
                                <Space.Compact>
                                    <Select defaultValue="503" style={{ width: '30%' }}>
                                        <Option value="503">503</Option>
                                    </Select>
                                    <Input style={{ width: '70%' }} placeholder="6962 8383" />
                                </Space.Compact>
                            </Form.Item>

                            {/* Dirección del destinatario */}
                            <Form.Item
                                label="Dirección del destinatario"
                                name="destinationAddress"
                                rules={[{ required: true, message: 'Por favor ingrese la dirección del destinatario' }]}
                                className="md:col-span-2"

                            >
                                <Input placeholder="Final 49 Av. Sur y Bulevar Los Próceres, Smartcenter, Bodega #8, San Salvador" />
                            </Form.Item>

                        </div>
                        {/* Departamento y Municipio */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <Form.Item
                                label="Departamento"
                                name="department"
                                rules={[{ required: true, message: 'Por favor seleccione el departamento' }]}
                            >
                                <Select placeholder="San Salvador">
                                    <Option value="san-salvador">San Salvador</Option>
                                    <Option value="la-libertad">La Libertad</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Municipio"
                                name="municipality"
                                rules={[{ required: true, message: 'Por favor seleccione el municipio' }]}
                            >
                                <Select placeholder="San Salvador">
                                    <Option value="san-salvador">San Salvador</Option>
                                    <Option value="mejicanos">Mejicanos</Option>
                                </Select>
                            </Form.Item>
                            {/* Punto de Referencia */}
                            <Form.Item
                                label="Punto de Referencia"
                                name="referencePoint"
                            >
                                <Input placeholder="Cerca de redondel Árbol de la Paz" />
                            </Form.Item>
                        </div>
                        {/* Indicaciones */}
                        <Form.Item
                            label="Indicaciones"
                            name="instructions"
                        >
                            <Input.TextArea placeholder="Llamar antes de entregar." />
                        </Form.Item>

                        <Form.Item className="flex justify-end">
                            <Button type="primary" htmlType="submit" size="large" className="bg-blue-500">
                                Enviar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
}
