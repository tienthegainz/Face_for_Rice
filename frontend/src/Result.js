import React, { useState, useEffect } from "react";

function Result(props) {
    const [permission, setPermission] = useState();
    const [image, setImage] = useState();
    useEffect(() => {
        if (props.permission === true) {
            console.log("Ok");
            setPermission("Mời bạn ra lấy gạo");
        }
        else if (props.permission === false) {
            console.log("Ko ok");
            setPermission("Hôm nay bạn đã lấy gạo rồi mà");
        }
        else {
            setPermission("")
        }
    }, [props.permission]);


    return (<div>
        {permission}
    </div>);
}

export default Result;
