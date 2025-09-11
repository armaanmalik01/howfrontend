import { BsWallet2 } from "react-icons/bs";
import { TbRecharging } from "react-icons/tb";
import React, { useEffect, useState, useRef } from 'react';
import { Button, Modal, Form, Input, Card, message, Flex, App, Space } from 'antd';



const headerMenu = [
    {
        title: "Recharge",
        icon: TbRecharging,
        href: ""
    },
    {
        title: "Withdraw",
        icon: BsWallet2,
        href: ""
    },
]

import axios from "../utils/NetworkManager.js";



function convertMstoMinSec(ms = 0) {
    const total_second = Math.floor(ms / 1000);
    const min = Math.floor(total_second / 60);
    const seconds = total_second % 60;
    return `${min}:${seconds}`
}


export default function FinanceButton(props) {
    const [isDepositModalVisible, setIsDepositModalVisible] = useState(false);
    const [isWithdrawalModalVisible, setIsWithdrawalModalVisible] = useState(false);
    const [depositForm] = Form.useForm();
    const [utrForm] = Form.useForm();
    const [withdrawalForm] = Form.useForm();
    const [dep_loading, set_dep_loading] = useState(false);
    const [utr_loading, set_utr_loading] = useState(false);
    const [with_loading, set_with_loading] = useState(false);


    const [selectedAmount, setSelectedAmount] = useState(null);

    const ref = useRef();

    const { message, notification } = App.useApp()

    const [remain_time, set_remain_time] = useState(0);

    const [response, set_response] = useState({
        timeout: 0,
        upi_id: "",
        tr_id: ""
    });

    useEffect(() => {
        set_remain_time(response.timeout);
        const check = async () => {
            if (remain_time <= 0) {
                clearInterval(ref.current)
            }
            try {
                const res = await axios.post("/api/transactions/deposit/check", {
                    tr_id: response.tr_id
                })
                if (res.data.data?.status == "success") {
                    message.success("Payment Received !")
                    setIsDepositModalVisible(false);
                    set_response({
                        timeout: 0,
                        upi_id: "",
                        tr_id: ""
                    })
                }
            } catch (err) {
                console.log(err.message)
            }
        }

        if (!response.tr_id) return;

        ref.current = setInterval(check, 1000);

        return () => clearInterval(ref.current)
    }, [response])

    useEffect(() => {
        if (remain_time <= 0) {
            return;
        };
        const timeId = setInterval(() => set_remain_time(prev_time => (prev_time - 1000)), 1000);
        return () => clearInterval(timeId);
    }, [remain_time])

    const showDepositModal = () => {
        setIsDepositModalVisible(true);
    };

    // Show withdrawal modal
    const showWithdrawalModal = () => {
        setIsWithdrawalModalVisible(true);
    };


    // Handle deposit form submission
    const handleDepositSubmit = async (values) => {
        console.log()
        // return;
        try {
            // console.log('Deposit Request:', values);
            // Here you would typically send the data to your backend API.
            // For this example, we'll just show a success message.
            set_dep_loading(true);
            depositForm.resetFields();
            set_response(true);
            const { data } = await axios.post("/api/transactions/deposit", {
                amount: selectedAmount
            })
            set_response({
                timeout: data?.data?.timeout,
                tr_id: data?.data?.tr_id,
                upi_id: data?.data?.upi_id
            });
        } catch (err) {
            if (err.response) {
                message.error(err.response?.data?.message);
            } else {
                message.error(err.message)
            }
        } finally {
            set_dep_loading(false);
        }
    };


    const handleUtrSubmit = async ({ utrNumber }) => {
        set_utr_loading(true);
        try {
            await axios.post("/api/transactions/deposit/utr", {
                tr_id: response.tr_id,
                utr: utrNumber
            })
            utrForm.resetFields();
            message.success("UTR Submitted ! its take some time");
            setIsDepositModalVisible(false);
            set_response({
                timeout: 0,
                upi_id: "",
                tr_id: ""
            })
        } catch (err) {
            if (err.response) {
                message.error(err.response.data?.message)
            } else {
                message.error(err.message)
            }
        } finally {
            set_utr_loading(false)
        }
    }

    const amounts = [5, 20, 50, 100, 500, 1000];

    // Handle withdrawal form submission
    const handleWithdrawalSubmit = async (values) => {
        set_with_loading(true);
        try {
            await axios.post("/api/transactions/withdraw", values);
            setIsWithdrawalModalVisible(false);
            message.success("Withdrawal Request Submitted !");
        } catch (err) {
            if (err.response) {
                message.error(err.response.data?.message);
            } else {
                message.error(err.message)
            }
        } finally {
            set_with_loading(false)
        }
    };

    const handleAmountClick = (amount) => {
        setSelectedAmount(amount);
        depositForm.setFieldsValue({ customAmount: '' });
    };


    return <>
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2 ,1fr)",
                height: "65px",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                columnGap: "10px",
                margin: "1rem",
            }}
        >
            {
                headerMenu.map(ele => {
                    return <div
                        onClick={() => { ele.title == "Recharge" ? showDepositModal() : showWithdrawalModal() }}
                        style={
                            {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                gap: "4px",
                                backgroundColor: "black",
                                borderRadius: '5px',
                                color: "#fff"
                            }
                        }
                    >
                        <ele.icon style={{ fontSize: '25px' }} />
                        <span
                            style={
                                {
                                    fontSize: "0.8rem",
                                    fontWeight: 'bold'
                                }
                            }
                        >{ele.title}</span>
                    </div>
                })
            }


            {/* Deposit Modal */}
            <Modal
                title="Deposit Funds"
                open={isDepositModalVisible}
                onCancel={() => setIsDepositModalVisible(false)}
                footer={null}
                destroyOnClose={true}
                centered
            >

                {response?.timeout ? <Form
                    form={utrForm}
                    onFinish={handleUtrSubmit}
                    layout="vertical"
                    style={{ top: '0px' }}
                >

                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <p>Scan this QR code to deposit via UPI GPay/Phonepay/Paytm</p>
                        <br />
                        <img
                            src={`/${selectedAmount}.jpg`}
                            alt="UPI QR Code"
                            style={{ width: '200px', height: '200px', borderRadius: '8px' }}
                        />
                        <p style={{ color: "red" }}>{convertMstoMinSec(remain_time)}</p>
                    </div>

                    <Form.Item
                        name="utrNumber"
                        label="UTR Number"
                        rules={[{ required: true, message: 'Please enter the UTR number!' }]}
                    >
                        <Input placeholder="Enter UTR number" />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={utr_loading} type="primary" htmlType="submit" block>
                            Submit UTR
                        </Button>
                    </Form.Item>
                </Form> :
                    <Form
                        form={depositForm}
                        onFinish={handleDepositSubmit}
                        layout="vertical">
                        {/* Amount Options */}
                        <Form.Item label="Quick Select" className="mb-4">
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: "0.5rem" }}>
                                {amounts.map((amount) => (
                                    <Button
                                        key={amount}
                                        size="large"
                                        type={selectedAmount === amount ? 'primary' : 'default'}
                                        onClick={() => handleAmountClick(amount)}
                                        className="w-1/3 text-lg font-semibold rounded-xl"
                                    >
                                        ₹{amount}
                                    </Button>
                                ))}
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={dep_loading} type="primary" htmlType="submit" block>
                                Deposit
                            </Button>
                        </Form.Item>
                    </Form>
                }

            </Modal>

            {/* Withdrawal Modal */}
            <Modal
                title="Withdraw Funds"
                open={isWithdrawalModalVisible}
                onCancel={() => setIsWithdrawalModalVisible(false)}
                footer={null}
                destroyOnClose={true}
                centered
            >
                <Form
                    form={withdrawalForm}
                    onFinish={handleWithdrawalSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="amount"
                        label="Amount"
                        rules={[{ required: true, message: 'Please enter the amount!' }]}
                    >
                        <Input type="number" placeholder="Enter amount" />
                    </Form.Item>
                    <Form.Item>
                        <Button loading={with_loading} type="primary" htmlType="submit" block>
                            Withdraw
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>



        </div>


    </>

}