const request = {
  get: async (url) => {
    console.log(url);
    let result = await fetch(`${url}`, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${authorization}`,
      // },
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
  delete: async (url) => {
    console.log(url);
    let result = await fetch(`${url}`, {
      method: "DELETE",
      // headers: {
      //   Authorization: `Bearer ${authorization}`,
      // },
    }).catch((e) => {
      console.log(e);
    });
    if (result.ok) {
      return result;
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
  put: async (url, data) => {
    // console.log(url, data);
    let result = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    // console.log("post", result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },

  uploadFile: (url, data, token) => {
    console.log(data);
    console.log(url, data);
    return new Promise(function (resolve, reject) {
      fetch(url, {
        method: "POST",
        body: data,
      })
        .then((response) => {
          console.log(response);
          try {
            return response.json();
          } catch (err) {
            reject({ err: 2, msg: "Phiên làm việc hết hạn" });
          }
        })
        .then((data) => {
          console.info(data);
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject({ err: 1, msg: "Vui lòng kiểm tra kết nối mạng" });
        });
    });
  },
  postUploadFile: async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      // headers: myHeaders,
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
  post: async (url, data) => {
    // console.log(url, data);
    let result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // redirect: 'follow',
    }).catch((e) => {
      console.log(e);
    });
    console.log("post", result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
  postThemMoiDuLieu: async (url, data) => {
    let result = await fetch(url, {
      method: "POST",
      // headers: myHeaders,
      body: data,
      redirect: "follow",
    }).catch((e) => {
      console.log(e);
    });
    console.log(result);
    if (result.ok) {
      return result.json();
    } else {
      return {
        status: false,
        data: {},
        message: "connect server failed",
      };
    }
  },
};
export default request;
