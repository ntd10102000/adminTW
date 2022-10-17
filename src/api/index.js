import * as apiLinks from "../constants/apiLinks";
import request from "./makeRequest";
const api = {
  getClassTeacherSubject: (params) =>
    request.get(`${apiLinks.CLASS_TEACHER_SUBJECT}?${params}`),
  getSubject: (params) => request.get(`${apiLinks.SUBJECT}?${params}`),
  putSubject: (subject_id, data) =>
    request.put(`${apiLinks.SUBJECT}/${subject_id}`, data),
  postSubject: (data) => request.post(`${apiLinks.SUBJECT}/`, data),
  deleteSubject: (subject_id) =>
    request.delete(`${apiLinks.SUBJECT}/${subject_id}`),
  getClasses: (params) => request.get(`${apiLinks.CLASSES}?${params}`),
  putClasses: (classes_id, data) =>
    request.put(`${apiLinks.CLASSES}/${classes_id}`, data),
  postClasses: (data) => request.post(`${apiLinks.CLASSES}/`, data),
  deleteClasses: (classes_id) =>
    request.delete(`${apiLinks.CLASSES}/${classes_id}`),
  getTCS: (params) => request.get(`${apiLinks.TCS}?${params}`),
  putTCS: (classes_id, data) =>
    request.put(`${apiLinks.TCS}/${classes_id}`, data),
  postTCS: (data) => request.post(`${apiLinks.TCS}/`, data),
  deleteTCS: (classes_id) => request.delete(`${apiLinks.TCS}/${classes_id}`),
  getHelplines: (params) => request.get(`${apiLinks.HELPLINES}?${params}`),
  putHelplines: (classes_id, data) =>
    request.put(`${apiLinks.HELPLINES}/${classes_id}`, data),
  postHelplines: (data) => request.post(`${apiLinks.HELPLINES}/`, data),
  deleteHelplines: (classes_id) =>
    request.delete(`${apiLinks.HELPLINES}/${classes_id}`),
  getRevision: (params) => request.get(`${apiLinks.REVISION}?${params}`),
  putRevision: (classes_id, data) =>
    request.put(`${apiLinks.REVISION}/${classes_id}`, data),
  postRevision: (data) => request.post(`${apiLinks.REVISION}/`, data),
  deleteRevision: (classes_id) =>
    request.delete(`${apiLinks.REVISION}/${classes_id}`),
  getUser: (params) => request.get(`${apiLinks.USER}/list?${params}`),
  putUser: (classes_id, data) =>
    request.put(`${apiLinks.USER}/${classes_id}`, data),
  postUser: (data) => request.post(`${apiLinks.USER}/`, data),
  deleteUser: (classes_id) => request.delete(`${apiLinks.USER}/${classes_id}`),
};
export default api;
