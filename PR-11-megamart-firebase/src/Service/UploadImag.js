

import axios from "axios";

const UploadImag = async (fileData) => {
    let imageData = new FormData();

    imageData.append('file', fileData);
    imageData.append('upload_preset', 'Product');
    imageData.append('cloud_name', 'dqtanucgt');

    let res = await axios.post(`https://api.cloudinary.com/v1_1/dqtanucgt/image/upload`, imageData);
    return res.data.secure_url;
};

export default UploadImag;