import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { replaceName } from "./replaceName"
import { storage } from "../firebase/firebaseConfig";


export const uploadFile = async (file) => {
    const filename = replaceName(file.name);

    const storageRef = ref(storage, `image/${filename}`);

    const res = await uploadBytes(storageRef, file);


    if (res) {
        if (res.metadata.size === file.size) {
            return getDownloadURL(storageRef);
        } else {
            return "Uploading";
        }
    } else {
        return "Upload fail";
    }
}
