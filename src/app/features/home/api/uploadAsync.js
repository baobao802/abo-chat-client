import API from '../../../core/api';

export const uploadAsync = async (url, file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await API.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    // onUploadProgress: event => {
    //   let progress = Math.round((100 * event.loaded) / event.total);
    // },
  });
};
