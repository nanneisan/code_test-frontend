//services
import httpService from "./httpService";

//constants
import endpoints from "../constants/api";

export async function getAll() {
  return await httpService.get(endpoints.Evoucher + "/");
}

export async function create(data) {
  return await httpService.post(endpoints.Evoucher + "/create", data);
}

export async function getDetail(id) {
  return await httpService.get(endpoints.Evoucher + "/" + id);
}

export async function update(data, id) {
  return await httpService.put(endpoints.Evoucher + "/update/" + id, data);
}

export async function deleteEvoucher(id) {
  return await httpService.put(endpoints.Evoucher + "/delete/" + id);
}

export async function getPaymentMethod() {
  return await httpService.get(endpoints.Payment);
}
