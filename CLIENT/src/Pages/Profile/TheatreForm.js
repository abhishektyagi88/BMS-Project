import React from "react";
import { Form, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../Redux/LoadersSlice";
function TheatreForm({
    showTheatreFormModal,
    setShowTheatreFormModal,
    selectedTheatre,
    setSelectedTheatre,
    formType,
    setFormType,
    getData,
}) {
    const dispatch = useDispatch();
    const { user} = useSelector((state) => state.users);
    const onFinish = async(values) => {
        values.owner = user._id;
        try{
            dispatch(ShowLoading());
            let response = null;
            if(formType === "add"){
                response = await AddTheatre(values);
            }else{
                values.theatreId = selectedTheatre._id;
                response  = await UpdateTheatre(values);
            }
            if(response.success){
                message.success(response.message);
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
                getData();
            }else{
                message.error(response.message);
            }
            dispatch(HideLoading());
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <Modal
            title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
            open={showTheatreFormModal}
            onCancel={() => {
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
            }}
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={selectedTheatre}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input theatre name!" }]}
                >
                    <input type="text" className="border-2 rounded-lg border-orange-500 w-[100%]"/>
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: "Please input theatre address!" }]}
                >
                    <textarea type="text" className="border-2 rounded-lg border-orange-500 w-[100%]"/>
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        { required: true, message: "Please input theatre phone number!" },
                    ]}
                >
                    <input type="text" className="border-2 rounded-lg border-orange-500 w-[100%]"/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please input theatre email!" }]}
                >
                    <input type="text" className="border-2 rounded-lg border-orange-500 w-[100%]"/>
                </Form.Item>
                <div className="flex justify-end gap-1">
                    <button type="button" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
        focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
        text-center me-2 mb-2 dark:focus:ring-orange-900" onClick={() => {
                            setShowTheatreFormModal(false);
                            setSelectedTheatre(null);
                        }}>Cancel</button>
                    <button type="submit" class="text-white bg-orange-400 hover:bg-orange-500 focus:outline-none 
        focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 
        text-center me-2 mb-2 dark:focus:ring-orange-900">Save</button>
                </div>
            </Form>
        </Modal>
    )
}

export default TheatreForm;