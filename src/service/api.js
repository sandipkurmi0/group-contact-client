import axios from "axios";

const URL = "https://group-contact-api.herokuapp.com/api";

//group api

export const addGroup = async (data) => {
  try {
    return await axios.post(`${URL}/uploadCsvByGroup`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log("error while calling", error);
  }
};

export const deleteContactByGroup = async (id) => {
  try {
    return await axios.delete(`${URL}/deleteContactByGroup/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log("error while deleting contact by group in database", error);
  }
};

export const getGroupListName = async () => {
  try {
    return await axios.get(`${URL}/groupList`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while calling `, error);
  }
};

export const getGroupListById = async (id) => {
  try {
    return await axios.get(`${URL}/group/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while calling getUser api`, error);
  }
};

export const editGroupList = async (id, data) => {
  try {
    return await axios.put(`${URL}/group/${id}`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while calling getUser api`, error);
  }
};

export const getGroupList = async () => {
  try {
    return await axios.get(`${URL}/contact/getGroupByContact`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while calling `, error);
  }
};

//add single contact by groupId
export const addContactDetails = async (data) => {
  try {
    return await axios.post(`${URL}/contact`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while add contact details in database`, error);
  }
};

//get all contact by group
export const getContactBygroup = async (id) => {
  try {
    return await axios.get(`${URL}/getContactBygroup/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while callin getContactBygroup`, error);
  }
};

//delete contact
export const deleteContact = async (id) => {
  try {
    return await axios.delete(`${URL}/contact/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while deleting contact`, error);
  }
};

//get single contact by id
export const getContactById = async (id) => {
  try {
    return await axios.get(`${URL}/contact/${id}`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`Error while geting single contact from database`, error);
  }
};

//edit single contact
export const editContactDetails = async (id, data) => {
  try {
    return await axios.put(`${URL}/contact/${id}`, data, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
  } catch (error) {
    console.log(`error while edit contact data`, error);
  }
};

// user Auth
export const loginUser = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    console.log(`error while calling delete user api `, error);
  }
};

export const registerUser = async (data) => {
  try {
    return await axios.post(`${URL}/user`, data);
  } catch (error) {
    console.log(`error while register user in data base`, error);
  }
};
