import { useDispatch, useSelector } from "react-redux"
import { HideLoading, ShowLoading } from "../Redux/LoadersSlice";
import { SetUser } from "../Redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";


const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users);
    const getCurrentUser = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetCurrentUser();
            dispatch(HideLoading());
            if (response.success) {
                dispatch(SetUser(response.data));
            } else {
                dispatch(SetUser(null));
                localStorage.removeItem("token");
                message.error(response.message);
                navigate("/login")
            }
        } catch (err) {
            dispatch(HideLoading());
            dispatch(SetUser(null));
            message.error(err.message);
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token"))
            getCurrentUser();
        else
            navigate("/login");
    }, [])
    return (
        user &&
        (
            <div className=" box-border">
                <div className="flex h-[15vh] border-4 border-gray-900 bg-gray-800">
                    <div className="text-4xl font-bold w-[85vw] m-7 text-white">Book
                        <span className="bg-orange-500 text-4xl italic border-2 border-white rounded-lg p-2">my</span>
                        Show !!</div>
                    <div className="w-[15vw]">
                        <div className="flex align-middle w-[90%]  bg-white mx-2 my-1 rounded-md gap-3">
                            <i className="ri-shield-star-fill text-3xl text-orange-500"></i>
                            <span className="text-2xl font-bold text-sky-700"
                            // onClick={() => {
                            //     if(user.isAdmin){
                            //         navigate("/admin")
                            //     }else{
                            //         navigate("/profile")
                            //     }
                            // }}
                            >{user.name}</span>
                            <i className="ri-logout-circle-r-line text-3xl text-orange-500 cursor-pointer" 
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}></i>
                        </div>
                    </div>
                </div>
                <div className="h-[83.5vh] bg-gray-700">{children}</div>
            </div>
        )
    )
}

export default ProtectedRoute;