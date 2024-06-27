import axios from "axios";

const URL = "https://elonsusk.cloud/users";

export const getUsers = async () => {
  try {
    let res = await axios.get(URL);
    return res.data;
  } catch (error) {
    console.log("Ошибка при получении всех юзеров", error);
  }
};

export const findUser = async (id) => {
  try {
    let res = await axios.get(`${URL}/findById/${id}`);
    return res.data;
  } catch (error) {
    console.log("Ошибка при поиске юзера по ID", error);
  }
};

export const udpateUser = async (user) => {
  try {
    console.log(user, 'инфа в апи')
    let res = await axios.put(`${URL}/update/${user.id}`, user, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      console.log("пользователь успешно обновлен");
    }
  } catch (error) {
    console.log("Ошибка при обновлении пользователя", error);
  }
};

export const udpateBalance = async (user) => {
  try {
    let res = await axios.put(`${URL}/updateBalance/`, user, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      console.log("пользователь успешно обновлен");
      return true
    }
  } catch (error) {
    console.log("Ошибка при обновлении пользователя", error);
  }
};

export const udpateWallet = async (user) => {
  console.log(user.id, user.balance, 'AAAAAAAA')
  try {
    let res = await axios.patch(`${URL}/updateWallet/`, user, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 200) {
      console.log("пользователь успешно обновлен");
      return true
    }
  } catch (error) {
    console.log("Ошибка при обновлении пользователя", error);
  }
};

export const findFriends = async (id) => {
  try {
    let res = await axios.get(`${URL}/friends/${id}`)
    return res.data
  } catch (error) {
    console.log("ошибка при поиске друзей", error)
  }
}
