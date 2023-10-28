import { storage } from "@/config/appwrite";

const getUrl = async (image: Image) => {
  const url = storage.getFilePreview(image.bucketId, image.fileId);

  return url;

}

export default getUrl;